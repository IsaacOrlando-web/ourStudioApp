const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login/federated/google');
    }
};

const ensureGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        return next();
    }
};


module.exports = { ensureAuth, ensureGuest };