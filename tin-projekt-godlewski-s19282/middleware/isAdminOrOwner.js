module.exports = (req, res, next) =>
{
    const {user} = req

    if(user && user.role === 1)
        next()
    else
        res.sendStatus(403)
}