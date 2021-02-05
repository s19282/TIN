module.exports = (req, res, next) =>
{
    const {user} = req

    if(user && user.role !== 1)
        res.sendStatus(403)
    else
        next()
}