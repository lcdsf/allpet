const {Administrador, Requerimento, StatusRequerimento, Compra, StatusCompra, Produto, Foto, Cliente} = require('../database/models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const { compra } = require('./clienteController');


const adminController = {
    index: async (req, res) => {
        res.render('areaAdmin', {admin: req.session.admin});
    },

    listaAdmins: async (req, res) => {

        const admins = await Administrador.findAll();

        res.render('listaAdmins', {admin: req.session.admin, administradores: admins});
    },

    login: async (req, res) => {
        res.render('loginAdmin', { admin: req.session.admin});
    },

    create: async (req, res) => {
        res.render('cadastroAdmin', {admin: req.session.admin});
    },

    store: async (req, res) => {

        //console.log('DADOS DO ADMIN A SER CADASTRADO: ', req.body);

        const erros = validationResult(req);

        //console.log('CONTEUDO DE ERRROS: ', erros);

        if (!erros.isEmpty()){
            // res.render('cadastroUser', { erros: erros.array().map(erro => erro.msg) });
            res.render('cadastroAdmin', { erros: erros.array().map(erro => erro.msg), admin: req.session.admin});

            return;

            //return;
        }

        const {nome, sobrenome, email, senha, confirmaSenha} = req.body;

        if (senha === confirmaSenha){ 
            
            await Administrador.create(
                {
                    nome,
                    sobrenome,
                    email,
                    senha: bcrypt.hashSync(senha, 10),
                    data_cadastro: Date.now(),
                }
            );
            res.render('cadastroAdmin', {cadastroOK: 'Cadastro realizado com sucesso!',  admin: req.session.admin});
        }else{
            res.render('cadastroAdmin', {erro: 'Senhas não coincidem, tente novamente.',  admin: req.session.admin});
        }

        
    },

    listaCompras: async (req, res) => {

    const comprasabertas = await Compra.findAll({ 
        include: 'cliente',
        where: {finalizado: false} 
    });

    const comprasfinalizadas = await Compra.findAll({ 
        include: 'cliente',
        where: {finalizado: true} 
    });

        //console.log('LISTA DE COMPRAS', compras);


        
        res.render('listaCompras', {admin: req.session.admin, comprasabertas, comprasfinalizadas});
    },

    detalheCompra: async (req, res) => {
        const compra  = await Compra.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Produto, 
                as: 'produtos', 
                include:[{
                    model: Foto, 
                    as: 'fotos'
                }]
                },
                'endereco',
                'statuscompra',
                'requerimento', 
                'cliente'
            ]
        });


        res.render('detalheCompra', {compra, admin: req.session.admin});

    },

    editaStatusCompra: async (req, res) => {

        // console.log('STATUSCOMPRA EDIT: ', req.body);
        
        await StatusCompra.update(
            {
                status: req.body.descricao,
                data: Date.now()
            },
            {where: {id: req.body.statusid}}
        );

        res.redirect('/admin/compra/'+req.params.id+'?Status atualizado com sucesso!')
    },

    addStatusCompra: async (req, res) => {

        
        await StatusCompra.create({
                status: req.body.descricao,
                data: Date.now(),
                compras_id: req.params.id
        });

        res.redirect('/admin/compra/'+req.params.id+'?Status adicionado com sucesso!')
    },

    deleteStatusCompra: async (req, res) => {

        const status = await StatusCompra.findAll({ where: {compras_id: req.params.id}});

        if (status.length > 1){
            await StatusCompra.destroy({where: {id: req.body.statusid}});
            res.redirect('/admin/compra/'+req.params.id+'?Status removido com sucesso!')
        }else{
            res.redirect('/admin/compra/'+req.params.id+'?Não é permitido remover o primeiro status')
        }


    },

    finalizaCompra: async (req, res) => {
        await Compra.update({finalizado: true}, {where: {id: req.params.id}});

        res.redirect('/admin/compra/'+req.params.id+'?Compra finalizada com sucesso!')

    },


    listaReqs: async (req, res) => {

        const reqsabertos = await Requerimento.findAll({
            where: {finalizado: false},
            include: [{
                model: Compra, 
                as: 'compra', 
                include:[{
                    model: Cliente, 
                    as: 'cliente'
                }]
            }] 
        
        });

        const reqsfechados = await Requerimento.findAll({
            where: {finalizado: true},
            include: [{
                model: Compra, 
                as: 'compra', 
                include:[{
                    model: Cliente, 
                    as: 'cliente'
                }]
            }] 
        
        });

        res.render('listaReqs', {admin: req.session.admin, reqsabertos, reqsfechados});
    },

    detalheReq: async (req, res) => {

        const requerimento = await Requerimento.findByPk(req.params.id, {
            include: [{
                model: Compra, 
                as: 'compra', 
                    include:[
                        {
                            model: Cliente, 
                            as: 'cliente'
                        }]
                },
                'status'

            ] 
        
        });

        res.render('detalheRequerimento', {admin: req.session.admin, requerimento});
    },

    editaStatusReq: async (req, res) => {

        // console.log('STATUSCOMPRA EDIT: ', req.body);
        
        await StatusRequerimento.update(
            {
                status: req.body.descricao,
                data: Date.now()
            },
            {where: {id: req.body.statusid}}
        );

        res.redirect('/admin/requerimento/'+req.params.id+'?Status atualizado com sucesso!')
    },

    addStatusReq: async (req, res) => {

        
        await StatusRequerimento.create({
                status: req.body.descricao,
                datahora: Date.now(),
                requerimentos_id: req.params.id
        });

        res.redirect('/admin/requerimento/'+req.params.id+'?Status adicionado com sucesso!')
    },

    deleteStatusReq: async (req, res) => {

        const status = await StatusRequerimento.findAll({ where: {requerimentos_id: req.params.id}});

        if (status.length > 1){
            await StatusRequerimento.destroy({where: {id: req.body.statusid}});
            res.redirect('/admin/requerimento/'+req.params.id+'?Status removido com sucesso!')
        }else{
            res.redirect('/admin/requerimento/'+req.params.id+'?Não é permitido remover o primeiro status')
        }
    },

    finalizaReq: async (req, res) => {
        await Requerimento.update({finalizado: true}, {where: {id: req.params.id}});

        await StatusRequerimento.create({
            status: 'Requerimento finalizado pelo sistema',
            datahora: Date.now(),
            requerimentos_id: req.params.id
        });


        res.redirect('/admin/requerimento/'+req.params.id+'?Requerimento finalizado com sucesso!')

    },

    sair: async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = adminController;