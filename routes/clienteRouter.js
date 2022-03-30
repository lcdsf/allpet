const { Router } = require("express");
const router = Router();
const ClienteController = require("../controllers/ClienteController");


router.get("/cadastro", ClienteController.create);
router.post("/cadastro", ClienteController.store);

module.exports = router;