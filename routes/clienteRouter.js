const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const autenticadorCliente = require('../middlewares/autenticadorCliente');
const produtoController = require('../controllers/produtoController');



// router.get("/cadastro", clienteController.create);
// router.post("/cadastro", upload.single('fotoperfil'), validadores.cadastroCliente, clienteController.store);

//ROTAS CLIENTE LOGADO
router.get('/home', autenticadorCliente, clienteController.home);
router.get('/sair', autenticadorCliente, clienteController.sair);
router.get('/painel', autenticadorCliente, clienteController.painel);
//router.get('/produto/:id', autenticadorCliente, produtoController.telaProduto);
router.get('/historico', autenticadorCliente, clienteController.historico);

//NAVEGACAO SETORES LOGADO
// router.get('/acessoriosbrinquedos', autenticadorCliente, produtoController.acessBrinqs);
// router.get('/saude', autenticadorCliente, produtoController.saude);
// router.get('/estetica', autenticadorCliente, produtoController.estetica);
// router.get('/descartaveis', autenticadorCliente, produtoController.descartaveis);

router.get('/:id/editar', autenticadorCliente, clienteController.edit);



module.exports = router;