const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const upload = require('../middlewares/multer');
const validadores = require('../middlewares/validadores');
const autenticadorCliente = require('../middlewares/autenticadorCliente');
const produtoController = require('../controllers/produtoController');



router.get("/cadastro", clienteController.create);
router.post("/cadastro", upload.single('fotoperfil'), validadores.cadastroCliente, clienteController.store);

//ROTAS CLIENTE LOGADO
router.get('/home', autenticadorCliente, clienteController.home);
router.get('/sair', autenticadorCliente, clienteController.sair);
router.get('/painel', autenticadorCliente, clienteController.painel);
router.get('/produto/:id', autenticadorCliente, produtoController.telaProduto);
router.get('/historico', autenticadorCliente, clienteController.historico);


module.exports = router;