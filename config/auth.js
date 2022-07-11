module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        req.flash('error_msg', 'Please login to view the dashboard');
        res.redirect('/users/login')
    }
}