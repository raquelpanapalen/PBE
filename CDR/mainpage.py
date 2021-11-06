import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk, Gdk, GLib
import requests
import threading
import gi
from puzzle1_pynfc import Rfid
#import drivers



class MyApplication(Gtk.Window):
    def __init__(self):
       self.current_page = LoginPage()     
       self.nfc_reader = Rfid() 
       self.start_thread()
       #self.display = drivers.Lcd()
    

    def start_thread(self):
        thread = threading.Thread(target=self.scan_uid)
        thread.setDaemon(True)
        thread.start()

    def scan_uid(self):
        self.uid = self.nfc_reader.read_uid()
        GLib.idle_add(self.update_page)


    def get_username(self,id):
        r = requests.get('http://192.168.43.65:3001/'+id)
        dic = r.json()
        return dic["username"]


    def update_page(self):
        self.username = self.get_username(self.uid)
        try:
            self.current_page.hide()
            self.current_page = QueryPage(self.username)
            self.current_page.connect("destroy", Gtk.main_quit)
            self.current_page.show_all()
            self.current_page.logoutbutton.connect("clicked",self.log_out_clicked)
            #self.display.show_lines("      Welcome      "+self.username)
            

        except ConnectionError:
            GLib.idle_add(self.error_message)
            
    
    def log_out_clicked(self,button):
            GLib.idle_add(self.return_login_page)
        

    def return_login_page(self):
            self.current_page.hide()
            self.current_page = LoginPage()
            self.nfc_reader = Rfid() 
            self.start_thread()
            self.current_page.connect("destroy", Gtk.main_quit)
            self.current_page.show_all()
            
            
    def error_message(self):
        self.current_page.label.set_text("Error, no existe este usuario")
        self.current_page.label.set_name("error-label")
        



  
       


class LoginPage(Gtk.Window):
    def __init__(self):
        super().__init__(title="Login Page")

        box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=10)
        self.add(box)
        self.set_border_width(100)

        self.label = Gtk.Label(label="Please, login with your university card")
        self.label.set_name("init-label")
        self.label.set_size_request(400, 70)
        box.add(self.label)
      


class QueryPage(Gtk.Window):
    def __init__(self, user):
        super().__init__(title="Query page")

        self.grid = Gtk.Grid(column_spacing=10, row_spacing=10)
        self.add(self.grid)
        self.entry = Gtk.SearchEntry()
        self.entry.set_placeholder_text("Enter your query")
    
        self.grid.attach(self.entry, 1, 1, 1, 1)
        self.entry.set_size_request(400, 50)
        # self.set_border_width(100)
        self.logoutbutton = Gtk.Button(label="Log out")
        self.logoutbutton.set_size_request(70, 30)
        self.grid.attach(self.logoutbutton, 2, 0, 1, 1)
        self.userlabel = Gtk.Label(label="Welcome "+user)
        self.grid.attach(self.userlabel, 0, 0, 1, 1)
        vbox = Gtk.Box(orientation=Gtk.Orientation.HORIZONTAL, spacing=6)
        vbox.set_size_request(400, 50)
        self.grid.attach(vbox, 0, 2, 2, 5) 





if __name__ == "__main__":
    style_provider = Gtk.CssProvider()
    style_provider.load_from_path('page_styles.css')
    Gtk.StyleContext.add_provider_for_screen(
        Gdk.Screen.get_default(), style_provider,
        Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
    )
    myapp = MyApplication()

    win = myapp.current_page
    
    win.show_all()
    win.connect("destroy", Gtk.main_quit)
    Gtk.main()
