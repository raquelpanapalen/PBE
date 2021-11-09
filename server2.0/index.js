require('dotenv').config()
const http = require('http')
const url = require("url")
const mongoClient = require('mongodb').MongoClient
const { initDB } = require('./utils/index')
const getMarks = require('./routes/marks')
const getUser = require('./routes/users')
const getTasks = require('./routes/tasks')
const getTimetables = require('./routes/timetables')

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001
const CREATE_TESTDATA = process.env.npm_config_create_testdata

mongoClient.connect(DATABASE_URL, function(err, client) {
    if (err) {
        console.log(err)
        return
    }
    const db = client.db('pbe')
    console.log('Connected to DB')
    if (CREATE_TESTDATA == 'true') {
        console.log('Creating test data...')
        initDB(db) // this function will remove all collections on DB and create test data
        console.log('DONE: Test data saved on DB')
    }
})

const server = http.createServer(async (req, res) => {
    const client = await mongoClient.connect(DATABASE_URL)
    const db = client.db('pbe')
    res.setHeader('Access-Control-Allow-Origin', '*')
    const parsed = url.parse(req.url, true)
    const reqPath = parsed.pathname.split('/')
    reqPath.shift()
    parsed.query.userid = reqPath[0]
    if (req.method == 'GET') {
        if (reqPath.length == 1) {
            const user = await getUser(db, parsed.query, parsed.search)
            res.end(JSON.stringify(user))
        }
        else if (reqPath[1] == 'tasks') {
            const tasks = await getTasks(db, parsed.query, parsed.search)
            res.end(JSON.stringify(tasks))
        } else if (reqPath[1] == 'marks') {
            const marks = await getMarks(db, parsed.query, parsed.search)
            res.end(JSON.stringify(marks))
        } else if (reqPath[1] == 'timetables') {
            const timetables = await getTimetables(db, parsed.query, parsed.search)
            res.end(JSON.stringify(timetables))
        } else {
            res.writeHead(400)
            //res.write()
            res.end('Bad request.')
        }
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.write('Bad request. Cannot POST')
        res.end()
    }
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))