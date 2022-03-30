const { Router } = require("express");
const router = Router();
const ClienteController = require("../controllers/ClienteController");


router.get("/clientes", ClienteController.index);

module.exports = router;