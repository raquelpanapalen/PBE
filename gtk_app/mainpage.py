import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk, Gdk, GLib
import requests
import threading
import time
from puzzle1_pynfc import Rfid
#import lcd_drivers

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
        self.DOMAIN = 'http://10.42.0.1:3001'
        self.set_position(Gtk.WindowPosition.CENTER)
        self.set_default_size(800, 600)
        self.set_border_width(50)
        
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
        self.username = self.get_username(self.uid)
        GLib.idle_add(self.on_tag)

    def get_username(self,id):
        r = requests.get(self.DOMAIN+'/'+id).json()
        return r["username"]

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
        self.info = requests.get(self.DOMAIN+'/'+self.uid+'/'+query).json()
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
                   
    def error_message(self):
        self.current_page.label.set_text("Error, no existe este usuario")
        self.current_page.label.set_name("error-label")
    
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
    
        self.treeview = TreeView(self.info)
        self.scrollable.add(self.treeview) 


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