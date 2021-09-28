import board
import busio
from adafruit_pn532.i2c import PN532_I2C

class Rfid:
	def __init__(self):
		self.i2c = busio.I2C(board.SCL, board.SDA)
		self.pn532 = PN532_I2C(self.i2c, debug=False)

	def read_uid(self):
		self.pn532.SAM_configuration()
		self.pn532.listen_for_passive_target()
		while True:
			uid = self.pn532.get_passive_target()
			if uid:
				return uid.hex().upper()

 
if __name__ == "__main__":
    rf = Rfid()
    uid = rf.read_uid()
    print(uid)
