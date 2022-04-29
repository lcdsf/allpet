function autenticadorCliente (req, res, next){

    if (!req.session.usuario){
        res.redirect('/');
        //res.render('home', {erro: 'Por favor, faça o login como Cliente.'})
    }

    return next();

}


module.exports = autenticadorCliente;