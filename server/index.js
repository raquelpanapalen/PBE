require('dotenv').config()
const cors = require("cors")
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const initDB = require('./utils/index')

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001

mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', async () => {
    console.log('Connected to DB')
    console.log('Creating test data...')
    //await initDB() // this function will remove all collections on DB and create test data
    console.log('DONE: Test data saved on DB')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes/tasks'))
app.use(require('./routes/marks'))
app.use(require('./routes/timetables'))
app.use(require('./routes/users'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))