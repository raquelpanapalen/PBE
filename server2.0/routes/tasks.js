const getTasks = async (db, query, search) => { 
    const match = search != null ? search.match(/\[(.*)\]/) : null
    if (match != null) {
        const restriction = `$${match.pop()}`
        const dateString = `date${match.pop()}`
        delete query[dateString]
        query.date = { [restriction] : new Date() }  
    } else if ('date' in query) {
        query.date = new Date(query.date)
    }
    let limit = 0
    if ('limit' in query) {
        limit = parseInt(Object.values(query.limit)[0])
        delete query['limit']
    }

    const tasksInfo = await db.collection('tasks').find(query).sort('date').limit(limit).toArray()
    return tasksInfo.map(t => {
        const task = {
            date: t.date.toJSON().split('T')[0],
            subject: t.subject,
            name: t.name
        }
        return task
    })

}

module.exports = getTasks