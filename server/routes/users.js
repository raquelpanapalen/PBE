const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/:id', async (req, res) => {
    const userid = req.params.id
    const userInfo = await User.findOne({ id: userid })
    const user = {
        id: userInfo.id,
        username: userInfo.username
    }
    res.send(user)
})

module.exports = router