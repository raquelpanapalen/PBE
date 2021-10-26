const mongoose = require('mongoose')
const User = require('../models/user')
const Timetable = require('../models/timetable')
const Task = require('../models/task')
const Mark = require('../models/mark')
const { users, marks, tasks, timetables } = require('./testdata')

const initDB = async () => {
    mongoose.connection.db.dropDatabase()
    users.forEach(async userInfo => {
        const user = new User(userInfo)
        try {
            await user.save()
        } catch(err) {
            console.log(err)
        }
    })
    marks.forEach(async markInfo => {
        const mark = new Mark(markInfo)
        try {
            await mark.save()
        } catch(err) {
            console.log(err)
        }
    })
    tasks.forEach(async taskInfo => {
        const task = new Task(taskInfo)
        try {
            await task.save()
        } catch(err) {
            console.log(err)
        }
    })
    timetables.forEach(async timetableInfo => {
        const timetable = new Timetable(timetableInfo)
        try {
            await timetable.save()
        } catch(err) {
            console.log(err)
        }
    })
}

module.exports = initDB