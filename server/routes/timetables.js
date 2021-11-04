const express = require('express')
const router = express.Router()
const Timetable = require('../models/timetable')
const { getKeyByValue, hourFormat } = require('../utils/index')

const days = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri'
}

router.get('/:id/timetables', async (req, res) => {
    const query = req.query
    query.userid = req.params.id
    const limit = ('limit' in query) ? parseInt(Object.values(query.limit)[0]) : 0
    
    if ('hour' in query && 'day' in query) {
        const restriction = `$${Object.keys(query.hour)[0]}`
        query.hour = { [restriction] :  hourFormat(Object.values(query.hour)[0])}
        query.day = parseInt(getKeyByValue(days, query.day)) 
        var timetableInfo = await Timetable.find(query).limit(1)
    }
    else if ('day' in query) {
        query.day = parseInt(getKeyByValue(days, query.day)) 
        var timetableInfo = await Timetable.find(query).sort({'day': 1, 'hour': 1}).limit(limit) 
    } 
    else {
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
        for (var i = 0; i < elementsToday; i++) {
            if (timetableInfo[i].hour < hour) {
                var e = timetableInfo.shift()
                timetableInfo.push(e)
            }
        }
        timetableInfo = limit == 0 ? timetableInfo : timetableInfo.slice(0, limit)
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
    res.send(timetables)
})
module.exports = router