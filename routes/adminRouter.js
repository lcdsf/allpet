const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const produtoController = require('../controllers/produtoController');
const adminController = require('../controllers/adminController');
const autenticadorAdmin = require('../middlewares/autenticadorAdmin');
const upload = require('../middlewares/multer');

//const uploads = upload.fields([{name: 'img1'}, {name: 'img2'}, {name: 'img3'}, {name: 'img4'}]);


router.get("/", autenticadorAdmin, adminController.index);


router.get("/clientes", autenticadorAdmin, clienteController.index);
router.get("/produtos", autenticadorAdmin, produtoController.index);
router.get("/produtos/cadastro", autenticadorAdmin, produtoController.create);

//router.post("/produtos/cadastro", upload.single('imgprod'), produtoController.store);
router.post("/produtos/cadastro", autenticadorAdmin, upload.array('imgprod', 4), produtoController.store);


router.get('/produtos/:id', autenticadorAdmin, produtoController.details);
router.get('/produtos/:id/editar', autenticadorAdmin, produtoController.edit);
router.put("/produtos/:id/editar", autenticadorAdmin, upload.array('imgprod', 4), produtoController.update);
router.delete("/produtos/:id/excluir", autenticadorAdmin, produtoController.delete);


//MOSTRA TODOS OS ADMINS
router.get("/users", autenticadorAdmin, adminController.listaAdmins);

//CADASTRA ADMIN
router.get("/user/cadastro", autenticadorAdmin, adminController.create);
router.post("/user/cadastro", autenticadorAdmin, adminController.store);


router.get("/compras", autenticadorAdmin, adminController.listaCompras);
router.get("/compra/:id", autenticadorAdmin, adminController.detalheCompra);
router.put("/compra/:id/editastatuscompra", autenticadorAdmin, adminController.editaStatusCompra);
router.post("/compra/:id/addstatuscompra", autenticadorAdmin, adminController.addStatusCompra);
router.delete("/compra/:id/deletestatuscompra", autenticadorAdmin, adminController.deleteStatusCompra);
router.put("/compra/:id/finalizar", autenticadorAdmin, adminController.finalizaCompra);


router.get("/requerimentos", autenticadorAdmin, adminController.listaReqs);



router.get('/sair', adminController.sair);


module.exports = router;