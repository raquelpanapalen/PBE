const getUser = async (db, query) => {
    try {
        const userInfo = await db.collection('users').findOne({userid: query.userid})
        return userInfo != null ? {
            id: userInfo.userid,
            username: userInfo.username
        } : null
    } catch (err) {
        return err
    }
}

module.exports = getUser