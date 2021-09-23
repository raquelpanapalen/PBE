from py532lib.i2c import *
from py532lib.mifare import *
from py532lib.frame import *
from py532lib.constants import *

class Rfid:
	def __init__(self):
		self.card = Mifare()

	def read_uid(self):
		self.card.SAMconfigure()
		self.card.set_max_retries(MIFARE_WAIT_FOR_ENTRY) #MIFARE_WAIT_FOR_ENTRY--> it waits until entry of a card
		uid = self.card.scan_field()
		return uid.hex() # converts bytearray to hex string
	

if __name__ == "__main__":
	rf = Rfid()
	uid = rf.read_uid()
	print(uid)
