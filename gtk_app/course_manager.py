from threading import Timer
import time
import requests
import threading
from gi.repository import Gtk, Gdk, GLib
import gi
gi.require_version('Gtk', '3.0')
#from puzzle1_pynfc import Rfid


class Table(Gtk.TreeView):
    def __init__(self, info):
        self.model = Gtk.ListStore.new([type(e) for e in info[0].values()])
        for elem in info:
            self.model.append(elem.values())

        super().__init__(model=self.model)

        for i, key in enumerate(info[0].keys()):
            col = Gtk.TreeViewColumn(key, Gtk.CellRendererText(
                single_paragraph_mode=True), text=i)
            self.append_column(col)


class Window(Gtk.Window):
    def __init__(self):
        super().__init__(title="Course manager")
        self.DOMAIN = 'http://localhost:3001'
        self.set_position(Gtk.WindowPosition.CENTER)
        self.set_default_size(800, 600)
        self.set_border_width(50)
        self.display_login()
        self.start_thread(self.read_uid)
        self.t = Timer(5, self.log_out)


    def restart_timer(self):
        self.t = Timer(5, self.log_out)
        self.t.start()

    def display_login(self):
        self.box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=10)
        self.add(self.box)
        label = Gtk.Label(label="Please, login with your university card")
        label.set_name("init-label")
        label.set_size_request(400, 75)
        self.box.set_center_widget(label)

    def start_thread(self, method, args=()):
        thread = threading.Thread(target=method, args=args)
        thread.setDaemon(True)
        thread.start()

    def on_tag(self):
        self.remove(self.box)
        self.create_dashboard()
        self.show_all()

    def read_uid(self):
        time.sleep(5)
        self.uid = '8AACFA3F'
        info = requests.get(self.DOMAIN+'/'+self.uid).json()
        self.username = info['username']
        GLib.idle_add(self.on_tag)

    def create_dashboard(self):

        self.box = Gtk.Grid(column_homogeneous=True,
                            column_spacing=10, row_spacing=200)
        self.add(self.box)
        welcome_text = Gtk.Label(label="Welcome %s" % self.username)
        self.box.attach(welcome_text, 0, 0, 2, 1)
        logout = Gtk.Button(label="Logout")
        logout.connect("clicked", self.on_logout)
        self.box.attach(logout, 5, 0, 1, 1)
        entry = Gtk.SearchEntry()
        entry.set_placeholder_text("Enter your query")
        entry.connect("activate", self.on_query)
        self.box.attach(entry, 0, 1, 6, 1)
        self.restart_timer()

    def on_query(self, entry):
        self.t.cancel()
        self.restart_timer()
        query = entry.get_text()
        self.start_thread(self.get_data, (query,))

    def get_data(self, query):
        self.info = requests.get(self.DOMAIN+'/'+self.uid+'/'+query).json()
        GLib.idle_add(self.display_info)

    def display_info(self):
        self.remove(self.box)
        self.create_table()
        self.show_all()

    def create_table(self):
        self.box = Gtk.Grid(column_homogeneous=True,
                            column_spacing=50, row_spacing=15)
        self.add(self.box)

        welcome_text = Gtk.Label(label="Welcome %s" % self.username)
        self.box.attach(welcome_text, 0, 0, 2, 1)

        logout = Gtk.Button(label="Logout")
        logout.connect("clicked", self.on_logout)
        self.box.attach(logout, 5, 0, 1, 1)

        entry = Gtk.SearchEntry()
        entry.set_placeholder_text("Enter your query")
        entry.connect("activate", self.on_query)
        self.box.attach(entry, 0, 1, 6, 1)

        self.scrollable = Gtk.ScrolledWindow()
        self.scrollable.set_vexpand(True)
        self.box.attach(self.scrollable, 0, 2, 6, 8)

        self.table = Table(self.info)
        self.scrollable.add(self.table)

    def on_logout(self, button):
        self.log_out()
        self.t.cancel()

    def log_out(self):
        self.remove(self.box)
        self.display_login()
        self.start_thread(self.read_uid)
        self.show_all()


if __name__ == "__main__":
    style_provider = Gtk.CssProvider()
    style_provider.load_from_path('gtk_app/styles.css')
    Gtk.StyleContext.add_provider_for_screen(
        Gdk.Screen.get_default(), style_provider,
        Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
    )

    win = Window()
    win.connect("destroy", Gtk.main_quit)
    win.show_all()
    Gtk.main()
