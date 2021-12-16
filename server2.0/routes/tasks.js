const getTasks = async (db, query) => { 
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