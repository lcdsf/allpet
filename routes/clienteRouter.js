const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const upload = require('../middlewares/multer');


router.get("/cadastro", clienteController.create);
router.post("/cadastro", upload.single('fotoperfil'), clienteController.store);

module.exports = router;