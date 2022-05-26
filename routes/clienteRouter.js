const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const autenticadorCliente = require('../middlewares/autenticadorCliente');
const produtoController = require('../controllers/produtoController');
const upload = require('../middlewares/multer');




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
router.put('/requerimento/:id/cancelar', autenticadorCliente, clienteController.cancelaRequerimento);


//ENDERECOS
router.get('/enderecos', autenticadorCliente, clienteController.listaEnderecos);
router.get('/endereco/:id/editar', autenticadorCliente, clienteController.editaEndereco);
router.get('/endereco/criar', autenticadorCliente, clienteController.criaEndereco);
router.post('/endereco/criar', autenticadorCliente, clienteController.salvaEndereco);
router.put('/endereco/:id/editar', autenticadorCliente, clienteController.alteraEndereco);
router.delete('/endereco/:id/deletar', autenticadorCliente, clienteController.deletaEndereco);

//GERENCIAR DADOS PESSOAIS - EXCLUIR CONTA
router.get('/:id/editar', autenticadorCliente, clienteController.edit);
router.put('/:id/editar', upload.single('fotoperfil'), autenticadorCliente, clienteController.alteraDados);
router.delete('/:id/delete', autenticadorCliente, clienteController.delete);


module.exports = router;