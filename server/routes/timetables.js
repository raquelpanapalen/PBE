const express = require('express')
const router = express.Router()
const Timetable = require('../models/timetable')
const { days } = require('../utils/testdata')

router.get('/:id/timetables', async (req, res) => {
    const query = req.query
    query.userid = req.params.id
    let limit = ('limit' in query) ? parseInt(Object.values(query.limit)[0]) : -1
    
    if ('hour' in query) {
        const restriction = `$${Object.keys(query.hour)[0]}`
        const hour = Object.values(query.hour)[0]
        query.hour = { [restriction] : (hour.split(":").map(part => part.padStart(2,0))).join(':')+':00' }
        limit = 1
    }
    if ('day' in query) {
        query.day = parseInt(Object.keys(days).find(key => days[key] === query.day)) 
        var timetableInfo = await Timetable.find(query).sort({'day': 1, 'hour': 1}) 
    } else {
        const now = new Date()
        const day = now.getDay()
        const hh = now.getHours().toString().padStart(2,0)
        const mm = now.getMinutes().toString().padStart(2,0)
        const ss = now.getSeconds().toString().padStart(2,0)
        const hour = hh+':'+mm+':'+ss
        
        query.day = { $gte: day }
        const timetable1 = await Timetable.find(query).sort({'day': 1, 'hour': 1})
        
        query.day = { $lt: day }
        const timetable2 = await Timetable.find(query).sort({'day': 1, 'hour': 1})
        var timetableInfo = timetable1.concat(timetable2)
        
        query.day = { $eq: day }
        const elementsToday = await Timetable.find(query).count()
        for (var i = 1; i < elementsToday; i++) {
            if (timetableInfo[i].hour < hour) {
                var e = timetableInfo.shift()
                timetableInfo.push(e)
            }
        }
    }
       
    const timetables = timetableInfo.map(t => {
        const timetable = {
            day: days[t.day],
            hour: t.hour,
            subject: t.subject,
            room: t.room
        }
        return timetable
    })
    res.send(limit == -1 ? timetables : timetables.slice(0, limit))
})
module.exports = router