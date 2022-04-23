function autenticadorAdmin (req, res, next){

    if (!req.session.usuario){
        return res.redirect('/admin');
    }

    return next();

}


module.exports = autenticadorAdmin;