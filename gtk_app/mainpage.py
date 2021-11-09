import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk, Gdk, GLib
import requests
from requests.exceptions import *
import threading
import time
from puzzle1_pynfc import Rfid
import lcd_drivers

class TreeView(Gtk.TreeView):
    def __init__(self, info):
        self.model = Gtk.ListStore.new([type(e) for e in info[0].values()])
        for elem in info:
            self.model.append(elem.values())

        super().__init__(model = self.model)
        
        for i, key in enumerate(info[0].keys()):
            col = Gtk.TreeViewColumn(key, Gtk.CellRendererText(single_paragraph_mode=True), text=i)
            self.append_column(col)

class MyApplication(Gtk.Window):
    def __init__(self):
        super().__init__(title="Course manager")
        self.DOMAIN = 'http://localhost:3001'
        self.set_position(Gtk.WindowPosition.CENTER)
        self.set_default_size(800, 600)
        self.set_border_width(50)

        self.error_text = ""
        self.dialog = Gtk.MessageDialog(text="Error Warning", parent = self)
        self.dialog.add_button("_Close", Gtk.ResponseType.CLOSE)
        self.dialog.set_default_size(500, 100)


        
        self.nfc_reader = Rfid()
        self.display_login()
        self.start_thread(self.scan_uid)
        #self.display = drivers.Lcd()
        
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
    
    def on_tag(self):
        self.remove(self.box)
        self.create_dashboard()
        self.show_all()

    def scan_uid(self):
        self.uid = self.nfc_reader.read_uid()
        try:
            self.username = self.get_username(self.uid)
        except HTTPError as err:
            print(err)
            GLib.idle_add(self.show_error,str(err))	
        except (ConnectionError):
            print("Unable to connect. Server is not up")
            GLib.idle_add(self.show_error, "Unable to connect. Server is not up")
        else:
            GLib.idle_add(self.on_tag)

    def get_username(self,id):
        r = requests.get(self.DOMAIN+'/'+id)
        r.raise_for_status()
        return r.json()["username"]

    def create_dashboard(self):
        self.box = Gtk.Grid(column_homogeneous=True,column_spacing=10,row_spacing=100) 
        self.add(self.box)
        welcome_text = Gtk.Label(label="Welcome %s" % self.username) 
        self.box.attach(welcome_text,0,0,2,1)

        logout = Gtk.Button(label="Logout")
        logout.connect("clicked", self.on_logout)
        self.box.attach(logout,5,0,1,1)

        entry = Gtk.SearchEntry()
        entry.set_placeholder_text("Enter your query")
        entry.connect("activate", self.on_query)
        self.box.attach(entry,0,1,6,1)

    def on_query(self, entry):
        query = entry.get_text()
        self.start_thread(self.get_data, (query,))

    def get_data(self, query):
        try: 
            req = requests.get(self.DOMAIN+'/'+self.uid+'/'+query)
            req.raise_for_status()
            self.info = req.json()
        except HTTPError as err:
            print(err)
            GLib.idle_add(self.show_error, str(err))	
        except (ConnectionError):
            print("Unable to connect. Server is not up")
            GLib.idle_add(self.show_error, "Unable to connect. Server is not up")	
        else:
            GLib.idle_add(self.display_info)
    def display_info(self):
        self.remove(self.box)
        self.create_table()
        self.show_all()
            
    def on_logout(self,button):
        self.remove(self.box)
        self.display_login()
        self.start_thread(self.scan_uid)
        self.show_all()
    
    def create_table(self):
        self.box = Gtk.Grid(column_homogeneous=True,column_spacing=10,row_spacing=15) 
        self.add(self.box)
        
        welcome_text = Gtk.Label(label="Welcome %s" % self.username) 
        self.box.attach(welcome_text,0,0,2,1)

        logout = Gtk.Button(label="Logout")
        logout.connect("clicked", self.on_logout)
        self.box.attach(logout,5,0,1,1)

        entry = Gtk.SearchEntry()
        entry.set_placeholder_text("Enter your query")
        entry.connect("activate", self.on_query)
        self.box.attach(entry,0,1,6,1)

        self.scrollable = Gtk.ScrolledWindow()
        self.box.attach(self.scrollable, 0, 2, 6, 15)
    
        if len(self.info) > 0:
            self.treeview = TreeView(self.info)
            self.scrollable.add(self.treeview)
        else:
            print("Empty collection")
            GLib.idle_add(self.show_error, "Empty collection")

    def show_error(self, error):
        self.error_label = error
        self.dialog.format_secondary_text(self.error_label)		
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