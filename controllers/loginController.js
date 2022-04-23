const {Cliente, Administrador} = require('../database/models');
const bcrypt = require('bcrypt');


const loginController = {

    clienteStore: async (req, res) => {
        const {email, senha} = req.body;

        console.log('DADOS REQ BODY - email: '+email+" | senha: "+senha);

        const usuario = await Cliente.findOne({ raw: true, where: {email: email}} )

        console.log('RESULTADO BUSCA USUARIO: ', usuario);


        if (!usuario){
            res.render('home', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }

        if (!bcrypt.compareSync(senha, usuario.senha)){
            res.render('home', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }

        console.log('DADOS DO REQ SESSION: ', req.session);

        req.session.usuario = usuario;
        res.redirect('/cliente/home');
    },

    adminIndex: async (req, res) => {
        res.render('loginAdmin');
    },

    adminStore: async (req, res) => {

        const {email, senha} = req.body;
        const usuario = await Administrador.findAll({ raw: true, where: {email: email}});

        if (!usuario){
            res.render('home', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }

        if (!bcrypt.compareSync(senha, usuario.senha)){
            res.render('home', {erro: 'E-mail e/ou senha incorretos. Tente novamente'});
        }

        res.redirect('/');

    }
    
    
};




module.exports = loginController;