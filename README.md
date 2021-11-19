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
- [server](https://github.com/raquelpanapalen/PBE/tree/main/server) made with Express.js, Mongoose, and Nodemon
- [server2.0](https://github.com/raquelpanapalen/PBE/tree/main/server2.0) made with http and mongoDB

## Setup (for both server and server2.0)
- `git clone https://github.com/raquelpanapalen/PBE.git && cd PBE/server` or `PBE/server2.0`
- `npm install`
- `sudo service mongod start`
- Create .env file with `PORT` and `DATABASE_URL` fields. Example:
```
PORT = 3001
DATABASE_URL = 'mongodb://localhost/pbe'
```

Dev mode (nodemon, only for [server](https://github.com/raquelpanapalen/PBE/tree/main/server)):
- To create testdata in DB: `npm run devStart --create_testdata=true`
- Without creating testdata in DB: `npm run devStart`

Prod mode (node, for both [server](https://github.com/raquelpanapalen/PBE/tree/main/server) and [server2.0](https://github.com/raquelpanapalen/PBE/tree/main/server2.0)):
- To create testdata in DB: `npm run start --create_testdata=true`
- Without creating testdata in DB: `npm run start`


