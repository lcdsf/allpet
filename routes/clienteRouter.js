const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const autenticadorCliente = require('../middlewares/autenticadorCliente');
const produtoController = require('../controllers/produtoController');



//ROTAS CLIENTE LOGADO
router.get('/home', autenticadorCliente, clienteController.home);
router.get('/sair', autenticadorCliente, clienteController.sair);
router.get('/painel', autenticadorCliente, clienteController.painel);
router.get('/historico', autenticadorCliente, clienteController.historico);
router.delete('/historico/delete', autenticadorCliente, clienteController.histdelete);


router.get('/carrinho', autenticadorCliente, clienteController.carrinho);
router.delete('/carrinho/delete', autenticadorCliente, clienteController.deletaItemCarrinho);

router.get('/:id/editar', autenticadorCliente, clienteController.edit);



module.exports = router;