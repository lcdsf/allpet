const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");


router.get("/cadastro", clienteController.create);
router.post("/cadastro", clienteController.store);

module.exports = router;