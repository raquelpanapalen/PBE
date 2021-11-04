const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/:id/tasks', async (req, res) => {
    const query = req.query
    query.userid = req.params.id
    const limit = ('limit' in query) ? parseInt(Object.values(query.limit)[0]) : -1
    if ('date' in query) {
        if (typeof query.date == 'object') {
            const restriction = `$${Object.keys(query.date)[0]}`
            query.date = { [restriction] : new Date() }
        } else {
            query.date = new Date(query.date)
        }
    }
    const tasksInfo = await Task.find(query).sort('date')
    const tasks = tasksInfo.map(t => {
        const task = {
            date: t.date.toJSON().split('T')[0],
            subject: t.subject,
            name: t.name
        }
        return task
    })
    res.send(limit == -1 ? tasks : tasks.slice(0, limit))
})

module.exports = router