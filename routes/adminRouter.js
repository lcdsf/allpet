const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const produtoController = require('../controllers/produtoController');
const adminController = require('../controllers/adminController');
const autenticadorAdmin = require('../middlewares/autenticadorAdmin');
const upload = require('../middlewares/multer');

//const uploads = upload.fields([{name: 'img1'}, {name: 'img2'}, {name: 'img3'}, {name: 'img4'}]);


router.get("/", autenticadorAdmin, adminController.index);


router.get("/clientes", clienteController.index);
router.get("/produtos", produtoController.index);
router.get("/produtos/cadastro", produtoController.create);

//router.post("/produtos/cadastro", upload.single('imgprod'), produtoController.store);
router.post("/produtos/cadastro", upload.array('imgprod', 4), produtoController.store);


router.get('/produtos/:id', produtoController.details);
router.get('/produtos/:id/editar', produtoController.edit);
router.put("/produtos/:id/editar", upload.array('imgprod', 4), produtoController.update);
router.delete("/produtos/:id/excluir", produtoController.delete);

module.exports = router;