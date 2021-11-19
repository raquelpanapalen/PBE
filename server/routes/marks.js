const express = require('express')
const router = express.Router()
const Mark = require('../models/mark')

router.get('/:id/marks', async (req, res) => {
    const query = req.query
    query.userid = req.params.id
    if ('mark' in query) {
        const restriction = `$${Object.keys(query.mark)[0]}`
        const number = parseFloat(Object.values(query.mark)[0])
        query.mark = { [restriction] : number }
    }
    const marksInfo = await Mark.find(query).sort('subject')
    const marks = marksInfo.map(m => {
        const mark = {
            subject: m.subject,
            name: m.name,
            mark: m.mark.toFixed(1)
        }
        return mark
    })
    res.send(marks)
})

module.exports = router