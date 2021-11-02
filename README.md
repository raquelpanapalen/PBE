# Puzzle 1
Python scripts to get UID of NFC Card using different libraries:

- <https://github.com/HubCityLabs/py532lib>
- <https://github.com/BarnabyShearer/pynfc>
- <https://github.com/adafruit/Adafruit_CircuitPython_PN532/>

# Puzzle 2
Graphic user interface for Puzzle 1 scripts using PyGObject. More information:
- <https://athenajc.gitbooks.io/python-gtk-3-api/content/>
- <https://pygobject.readthedocs.io/en/latest/index.html>

# Server (backend)
Needs: npm, nodejs, mongodb

## Setup
- `git clone https://github.com/raquelpanapalen/PBE.git && cd PBE/server`
- `npm install`
- `sudo service mongod start`

Dev mode (nodemon):
- To create testdata in DB: `npm run devStart --create_testdata=true`
- Without creating testdata in DB: `npm run devStart`

Prod mode (node):
- To create testdata in DB: `npm run start --create_testdata=true`
- Without creating testdata in DB: `npm run start`


