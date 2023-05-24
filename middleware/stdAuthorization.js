const stdCheckLoggedIn = (req, res, next) => {
    const authHeader = req.header.authorization
    res.send(authHeader)
    next()
    return
    const token = authHeader
}

