const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const autenticadorCliente = require('../middlewares/autenticadorCliente');
const produtoController = require('../controllers/produtoController');



//ROTAS DO CLIENTE
router.get('/home', autenticadorCliente, clienteController.home);
router.get('/sair', autenticadorCliente, clienteController.sair);
router.get('/painel', autenticadorCliente, clienteController.painel);
router.get('/historico', autenticadorCliente, clienteController.historico);
router.delete('/historico/delete', autenticadorCliente, clienteController.histdelete);

//CARRINHO
router.get('/carrinho', autenticadorCliente, clienteController.carrinho);
router.delete('/carrinho/delete', autenticadorCliente, clienteController.deletaItemCarrinho);
router.put('/carrinho/alteraqtditem', autenticadorCliente, clienteController.alteraQtdCarrinho);

//COMPRAS
router.post('/compra', autenticadorCliente, clienteController.compra);
router.get('/compra/:id', autenticadorCliente, clienteController.detalheCompra);
router.get('/compras', autenticadorCliente, clienteController.listaCompras);

//REQUERIMENTOS
router.get('/ajuda', autenticadorCliente, clienteController.ajuda);
router.post('/ajuda2', autenticadorCliente, clienteController.abreRequerimento);
router.get('/requerimento/:id', autenticadorCliente, clienteController.detalheRequerimento);
router.get('/requerimentos', autenticadorCliente, clienteController.listaRequerimentos);



router.get('/:id/editar', autenticadorCliente, clienteController.edit);



module.exports = router;