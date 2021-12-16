const getMarks = async (db, query) => {
    let limit = 0
    if ('limit' in query) {
        limit = parseInt(Object.values(query.limit)[0])
        delete query['limit']
    }
    const marksInfo = await db.collection('marks').find(query).sort('subject').limit(limit).toArray()
    return marksInfo.map(m => {
        const mark = {
            subject: m.subject,
            name: m.name,
            mark: m.mark.toFixed(1)
        }
        return mark
    })
}

module.exports = getMarks