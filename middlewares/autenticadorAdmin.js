function autenticadorAdmin (req, res, next){

    if (!req.session.admin){
       res.redirect('/');
       //res.render('home', {erro: 'Por favor, faça o login como Administrador.'})
    }

    return next();

}


module.exports = autenticadorAdmin;