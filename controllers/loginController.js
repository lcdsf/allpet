const {Cliente, Administrador} = require('../database/models');
const bcrypt = require('bcrypt');


const loginController = {

    clienteStore: async (req, res) => {
        const {email, senha} = req.body;
        //console.log('DADOS REQ BODY - email: '+email+" | senha: "+senha);
        const usuario = await Cliente.findOne({ raw: true, where: {email: email}} )

        //console.log('RESULTADO BUSCA USUARIO: ', usuario);

        if (!usuario){
            res.render('home', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }

        if (!bcrypt.compareSync(senha, usuario.senha)){
            res.render('home', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }
        

        req.session.usuario = usuario;
        res.cookie('carrinho', [])
        res.cookie('historico', []);

        console.log('REQ SESSION CLIENTE: ', req.session);


        res.redirect('/cliente/home');
    },

    adminIndex: async (req, res) => {
        res.render('loginAdmin');
    },

    adminStore: async (req, res) => {

        const {email, senha} = req.body;

        //console.log('DADOS DO REQ BODY: ', req.body);
        //console.log('DADOS ADMIN: '+email+' '+senha);

        const admin = await Administrador.findOne({ raw: true, where: {email: email}});
        

        if (!admin){
            res.render('loginAdmin', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }

        if (!bcrypt.compareSync(senha, admin.senha)){
            res.render('loginAdmin', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }

        req.session.admin = admin;

        console.log('REQ SESSION ADMIN: ', req.session);

        res.redirect('/admin');

    }

};




module.exports = loginController;