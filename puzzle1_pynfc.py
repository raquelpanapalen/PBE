from pynfc import Nfc

class Rfid:
    def __init__(self):
        self.nfc = Nfc("pn532_i2c:/dev/i2c-1") # I2C method

    def read_uid(self):
        for target in self.nfc.poll():
            if target.uid: 
                return str(target.uid, 'utf-8').upper() # decode from bytes to hex string format, then uppercase

if __name__ == "__main__":
    rf = Rfid()
    uid = rf.read_uid()
    print(uid)
