

const authenticated = (req, res, next) => {
    const authentication = req.session.user_id;
    return authentication
        ? next()
        : res.redirect('/login');
};





module.exports = authenticated;