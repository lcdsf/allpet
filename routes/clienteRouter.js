const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const upload = require('../middlewares/multer');
const validadores = require('../middlewares/validadores');
const autenticadorCliente = require('../middlewares/autenticadorCliente');


router.get('/home', autenticadorCliente, clienteController.home);
router.get("/cadastro", clienteController.create);
router.post("/cadastro", upload.single('fotoperfil'), validadores.cadastroCliente, clienteController.store);

module.exports = router;