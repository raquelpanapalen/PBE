const { getKeyByValue, hourFormat } = require('../utils/index')

const days = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri'
}
const getTimetables = async (db, query, search) => {
    let limit = 0
    const match = search != null ? search.match(/\[(.*)\]/) : null
    if ('limit' in query) {
        limit = parseInt(Object.values(query.limit)[0])
        delete query['limit']
    }
    if ('day' in query) {
        query.day = parseInt(getKeyByValue(days, query.day))
    }
    if ('hour' in query && match == null) {
        query.hour = hourFormat(query.hour)
    }
    
    if (match != null) {
        const restriction = `$${match.pop()}`
        const hourString = `hour${match.pop()}`
        query.hour = {[restriction]: hourFormat(query[hourString])}
        delete query[hourString]
        var timetableInfo = await db.collection('timetables').find(query).limit(1).toArray() 
    } else if (Object.keys(query).length == 1) { // only userid
        const now = new Date()
        const day = now.getDay()
        const hh = now.getHours().toString().padStart(2,0)
        const mm = now.getMinutes().toString().padStart(2,0)
        const ss = now.getSeconds().toString().padStart(2,0)
        const hour = hh+':'+mm+':'+ss
        
        query.day = { $gte: day }
        const timetable1 = await db.collection('timetables').find(query).sort({'day': 1, 'hour': 1}).toArray()
        
        query.day = { $lt: day }
        const timetable2 = await db.collection('timetables').find(query).sort({'day': 1, 'hour': 1}).toArray()
        var timetableInfo = timetable1.concat(timetable2)
        
        query.day = { $eq: day }
        const elementsToday = await db.collection('timetables').find(query).count()
        for (var i = 0; i < elementsToday; i++) {
            if (timetableInfo[i].hour < hour) {
                var e = timetableInfo.shift()
                timetableInfo.push(e)
            } else {
                break
            }
        }
        timetableInfo = limit == 0 ? timetableInfo : timetableInfo.slice(0, limit)
    } else {
        var timetableInfo = await db.collection('timetables').find(query).sort({'day': 1, 'hour': 1}).limit(limit).toArray()
    }
       
    return timetableInfo.map(t => {
        const timetable = {
            day: days[t.day],
            hour: t.hour,
            subject: t.subject,
            room: t.room
        }
        return timetable
    })
    
}

module.exports = getTimetables