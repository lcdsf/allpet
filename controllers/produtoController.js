const {Produto, Foto} = require('../database/models');

const produtoController = {
    index: async (req, res) => {
        const produtos = await Produto.findAll();
        const fotosprods = await Foto.findAll();

        res.render('listaProdutos', { produtos });

        
    },
    create: async (req, res) => {

    },
    store: async (req, res) => {

    },
    update: async (req, res) => {

    }
};

module.exports = produtoController;