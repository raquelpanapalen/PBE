const getUser = async (db, query) => {
    try {
        const userInfo = await db.collection('users').findOne({id: query.id})
        return {
            id: userInfo.id,
            username: userInfo.username
        }
    } catch (err) {
        return err
    }
}

module.exports = getUser