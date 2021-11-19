require('dotenv').config()
const http = require('http')
const mongoClient = require('mongodb').MongoClient
const { initDB, parseParams } = require('./utils/index')
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
    
    const url = new URL(req.url, `http://${req.headers.host}`)
    const query = parseParams(url.search)
    const reqPath = url.pathname.split('/')
    reqPath.shift()
    query.userid = reqPath[0]
    const decodedURI = decodeURI(url.search)
    if (req.method == 'GET') {
        if (reqPath.length == 1) {
            const user = await getUser(db, query, decodedURI)
            if (user != null) {
                res.end(JSON.stringify(user))
            } else {
                res.writeHead(404)
                res.end(`User with ID ${query.userid} not found in DB.`)
            }
        }
        else if (reqPath[1] == 'tasks') {
            const tasks = await getTasks(db, query, decodedURI)
            res.end(JSON.stringify(tasks))
        } else if (reqPath[1] == 'marks') {
            const marks = await getMarks(db, query, decodedURI)
            res.end(JSON.stringify(marks))
        } else if (reqPath[1] == 'timetables') {
            const timetables = await getTimetables(db, query, decodedURI)
            res.end(JSON.stringify(timetables))
        } else {
            res.writeHead(400)
            res.end(`No data related to: ${reqPath[1]}. Write "marks", "tasks" or "timetables" to see some content.`)
        }
    } else {
        res.writeHead(400)
        res.end('Cannot POST.')
    }
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))