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

const days = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri'
}

const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value)
const hourFormat = hour => (hour.split(":").map(part => part.padStart(2,0))).join(':') // HH:mm format

const parseParams = (querystring) => {
    const params = new URLSearchParams(querystring)
    const obj = {}
    for (const key of params.keys()) {
        const restriction = key.match(/\[(.*)\]/) != null ? `$${key.match(/\[(.*)\]/).pop()}` : null
        const initial_value = params.get(key)
        if (restriction != null) {
            const clean_key = key.split('[')[0]
            switch(clean_key) {
                case 'hour':
                    var value = hourFormat(initial_value)
                    break;
                case 'date':
                    if (initial_value == 'now') {
                        value = new Date()
                    } else {
                        value = new Date(initial_value)
                    }
                    break;
                case 'mark':
                    value = parseFloat(initial_value)
                    break;
                default:
                    break;
            }
            if (clean_key in obj) {
                obj[clean_key] = Object.assign(obj[clean_key], { [restriction]: value })
            } else {
                obj[clean_key] = { [restriction]: value }
            }
            
        } else {
            switch(key) {
                case 'date':
                    obj[key] = new Date(initial_value)
                    break;
                case 'day':
                    obj[key] = parseInt(getKeyByValue(days, initial_value))
                    break;
                default:
                    obj[key] = initial_value
            }
        }
    }
    
    return obj
}

const parseCookie = cookie =>
  cookie.split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});
  
module.exports = { initDB, days, parseParams, parseCookie }