const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const produtoController = require('../controllers/produtoController');


router.get("/clientes", clienteController.index);

router.get("/produtos", produtoController.index);
router.get("/produtos/cadastro", produtoController.create);
router.post("/produtos/cadastro", produtoController.store);
router.put("/produtos/:id/editar", produtoController.update);

module.exports = router;