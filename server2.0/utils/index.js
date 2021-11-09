const { users, marks, tasks, timetables } = require('./testdata')

const initDB = (db) => {
    db.collection('users').drop()
    db.collection('tasks').drop()
    db.collection('marks').drop()
    db.collection('timetables').drop()
    db.dropDatabase()
    db.createCollection('users')
    db.createCollection('tasks')
    db.createCollection('marks')
    db.createCollection('timetables')
    
    users.forEach(userInfo => {
        db.collection('users').insertOne(userInfo)
    })
    marks.forEach(markInfo => {
        db.collection('marks').insertOne(markInfo)
    })
    tasks.forEach(taskInfo => {
        db.collection('tasks').insertOne(taskInfo)
    })
    timetables.forEach(timetableInfo => {
        db.collection('timetables').insertOne(timetableInfo)
    })
}

const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value)
const hourFormat = hour => (hour.split(":").map(part => part.padStart(2,0))).join(':') // HH:mm format
  
module.exports = { initDB, getKeyByValue, hourFormat }