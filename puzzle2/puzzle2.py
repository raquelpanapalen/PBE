import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk, Gdk, GLib
from puzzle1_pynfc import Rfid
import threading

class Window(Gtk.Window):
    def __init__(self):
        super().__init__(title="RFID reader")

        box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=10)
        self.add(box)
        self.set_border_width(10)

        self.label = Gtk.Label(label="Please, login with your university card")
        self.label.set_name("init-label") 
        self.label.set_size_request(400,100)
        box.add(self.label)

        self.button = Gtk.Button(label = "Clear")
        self.button.set_sensitive(False)
        self.button.connect("clicked", self.clear)
        box.pack_start(self.button, True, True, 0)

        self.nfc_reader = Rfid() 
        self.start_thread()
        
        
    def start_thread(self):
        thread = threading.Thread(target=self.scan_uid) 
        thread.setDaemon(True) 
        thread.start()

    def update_label(self):
        self.label.set_name("uid-label")
        self.label.set_text("UID: %s" % self.uid)
        self.button.set_sensitive(True)
    
    def scan_uid(self):
        self.uid = self.nfc_reader.read_uid()
        GLib.idle_add(self.update_label)        

    def clear(self, button):
        self.label.set_text("Please, login with your university card")
        self.label.set_name("init-label")
        self.button.set_sensitive(False)
        self.start_thread()
    
if __name__ == "__main__":
    style_provider = Gtk.CssProvider()
    style_provider.load_from_path('styles.css')
    Gtk.StyleContext.add_provider_for_screen(
        Gdk.Screen.get_default(), style_provider,
        Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
    )

    win = Window()
    win.connect("destroy", Gtk.main_quit)
    win.show_all()
    Gtk.main()
