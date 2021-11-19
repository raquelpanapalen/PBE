import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk, Gdk, GLib
import requests
from requests.exceptions import *
import threading
from threading import Timer
from puzzle1_pynfc import Rfid
import lcd_drivers

class TreeView(Gtk.TreeView):
    def __init__(self, info):
        self.model = Gtk.ListStore.new([type(e) for e in info[0].values()])
        for elem in info:
            self.model.append(elem.values())

        super().__init__(model = self.model)
        
        for i, key in enumerate(info[0].keys()):
            renderer = Gtk.CellRendererText(single_paragraph_mode=True)
            renderer.set_alignment(0.5, 0.5)
            col = Gtk.TreeViewColumn(key, renderer, text=i)
            col.set_expand(True)
            col.set_alignment(0.5)
            self.append_column(col)

class MyApplication(Gtk.Window):
    def __init__(self):
        super().__init__(title="Course manager")
        self.DOMAIN = 'http://192.168.1.53:3001'
        self.SESSION_TIME = 300 #seconds

        self.set_position(Gtk.WindowPosition.CENTER)
        self.set_default_size(800, 600)
        self.set_border_width(50)

        self.dialog = Gtk.MessageDialog(text="Error Warning", parent = self)
        self.dialog.add_button("_Close", Gtk.ResponseType.CLOSE)
        self.dialog.set_default_size(500, 100)

        self.nfc_reader = Rfid()
        self.display_login()
        self.start_thread(self.scan_uid)
        self.display = lcd_drivers.Lcd()
        
    def display_login(self):
        self.box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=10)
        self.add(self.box)
        label = Gtk.Label(label="Please, login with your university card")
        label.set_name("init-label") 
        label.set_size_request(400,75)
        self.box.set_center_widget(label)

    def start_thread(self, method, args=()):
        thread = threading.Thread(target=method, args=args)
        thread.setDaemon(True) 
        thread.start()
    
    def start_timer(self):
        self.timer = Timer(self.SESSION_TIME, self.on_logout)
        self.timer.start()
    
    def on_tag(self):
        self.display.show_lines("Welcome             "+self.username)
        self.remove(self.box)
        self.create_dashboard()
        self.show_all()

    def scan_uid(self):
        self.uid = self.nfc_reader.read_uid()
        try:
            self.username = self.get_username(self.uid)
            GLib.idle_add(self.on_tag)
        except HTTPError as e:
            GLib.idle_add(self.show_error, e.response.reason, e.response.text)
        except (ConnectionError):
            GLib.idle_add(self.show_error, "SERVICE UNAVAILABLE", "Unable to connect: server is not up.")
            
    def get_username(self,id):
        r = requests.get(self.DOMAIN+'/'+id)
        r.raise_for_status()
        return r.json()["username"]

    def create_dashboard(self):
        self.start_timer()
        self.box = Gtk.Grid(column_homogeneous=True,column_spacing=10,row_spacing=50) 
        self.add(self.box)
        welcome_text = Gtk.Label(label="Welcome %s" % self.username)
        welcome_text.set_name("welcome_text")
        self.box.attach(welcome_text,0,0,2,1)

        logout = Gtk.Button(label="Logout")
        logout.set_name("Logout")
        logout.connect("clicked", self.on_logout)
        self.box.attach(logout,5,0,1,1)

        entry = Gtk.SearchEntry()
        entry.set_placeholder_text("Enter your query")
        entry.connect("activate", self.on_query)
        self.box.attach(entry,0,1,6,1)

    def on_query(self, entry):
        self.timer.cancel()
        self.start_timer()
        query = entry.get_text()
        self.start_thread(self.get_data, (query,))

    def get_data(self, query):
        try: 
            req = requests.get(self.DOMAIN+'/'+self.uid+'/'+query)
            req.raise_for_status()
            self.info = req.json()
            GLib.idle_add(self.display_info)
        except HTTPError as e:
            GLib.idle_add(self.show_error, e.response.reason, e.response.text)
        except (ConnectionError):
            GLib.idle_add(self.show_error, "SERVICE UNAVAILABLE", "Unable to connect: server is not up.")
            
    def display_info(self):
        self.remove(self.box)
        self.create_table()
        self.show_all()
            
    def on_logout(self,button = None):
        self.remove(self.box)
        self.timer.cancel()
        self.display_login()
        self.start_thread(self.scan_uid)
        self.show_all()
    
    def create_table(self):
        self.box = Gtk.Grid(column_homogeneous=True,column_spacing=10,row_spacing=15) 
        self.add(self.box)
        
        welcome_text = Gtk.Label(label="Welcome %s" % self.username)
        welcome_text.set_name("welcome_text")
        self.box.attach(welcome_text,0,0,2,1)

        logout = Gtk.Button(label="Logout")
        logout.set_name("Logout")
        logout.connect("clicked", self.on_logout)
        self.box.attach(logout,5,0,1,1)

        entry = Gtk.SearchEntry()
        entry.set_placeholder_text("Enter your query")
        entry.connect("activate", self.on_query)
        self.box.attach(entry,0,1,6,1)

        self.scrollable = Gtk.ScrolledWindow()
        self.box.attach(self.scrollable, 0, 2, 6, 25)
    
        if len(self.info) > 0:
            self.treeview = TreeView(self.info)
            self.treeview.columns_autosize()
            self.scrollable.add(self.treeview)
        else:
            self.show_error("NOT FOUND", "No data matches your query.")

    def show_error(self, reason, text):
        self.dialog.set_markup("<span><b>%s</b></span>" % reason.upper())
        self.dialog.set_name("dial")
        self.dialog.format_secondary_text(text)
        self.dialog.run()
        self.dialog.hide()


if __name__ == "__main__":
    style_provider = Gtk.CssProvider()
    style_provider.load_from_path('page_styles.css')
    Gtk.StyleContext.add_provider_for_screen(
        Gdk.Screen.get_default(), style_provider,
        Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
    )
    win = MyApplication()
    
    win.show_all()
    win.connect("destroy", Gtk.main_quit)
    Gtk.main()