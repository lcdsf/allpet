const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/clienteController");
const produtoController = require('../controllers/produtoController');
const adminController = require('../controllers/adminController');
const autenticadorAdmin = require('../middlewares/autenticadorAdmin');
const upload = require('../middlewares/multer');

//const uploads = upload.fields([{name: 'img1'}, {name: 'img2'}, {name: 'img3'}, {name: 'img4'}]);


router.get("/", autenticadorAdmin, adminController.index);

//GERENCIAMENTO DE CLIENTES (EXIBICAO)
router.get("/clientes", autenticadorAdmin, clienteController.index);


//GERENCIAMENTO DE PRODUTOS
router.get("/produtos", autenticadorAdmin, produtoController.index);
router.get("/produtos/cadastro", autenticadorAdmin, produtoController.create);
router.post("/produtos/cadastro", autenticadorAdmin, upload.array('imgprod', 4), produtoController.store);
router.get('/produtos/:id', autenticadorAdmin, produtoController.details);
router.get('/produtos/:id/editar', autenticadorAdmin, produtoController.edit);
router.put("/produtos/:id/editar", autenticadorAdmin, upload.array('imgprod', 4), produtoController.update);
router.delete("/produtos/:id/excluir", autenticadorAdmin, produtoController.delete);


//MOSTRA TODOS OS ADMINS
router.get("/users", autenticadorAdmin, adminController.listaAdmins);


//CADASTRA ADMINS
router.get("/user/cadastro", autenticadorAdmin, adminController.create);
router.post("/user/cadastro", autenticadorAdmin, adminController.store);


//GERENCIAMENTO DE COMPRAS
router.get("/compras", autenticadorAdmin, adminController.listaCompras);
router.get("/compra/:id", autenticadorAdmin, adminController.detalheCompra);
router.put("/compra/:id/editastatuscompra", autenticadorAdmin, adminController.editaStatusCompra);
router.post("/compra/:id/addstatuscompra", autenticadorAdmin, adminController.addStatusCompra);
router.delete("/compra/:id/deletestatuscompra", autenticadorAdmin, adminController.deleteStatusCompra);
router.put("/compra/:id/finalizar", autenticadorAdmin, adminController.finalizaCompra);


//GERENCIAMENTO DE REQUERIMENTOS
router.get("/requerimentos", autenticadorAdmin, adminController.listaReqs);
router.get("/requerimento/:id", autenticadorAdmin, adminController.detalheReq);
router.put("/requerimento/:id/editastatusreq", autenticadorAdmin, adminController.editaStatusReq);
router.post("/requerimento/:id/addstatusreq", autenticadorAdmin, adminController.addStatusReq);
router.delete("/requerimento/:id/deletestatusreq", autenticadorAdmin, adminController.deleteStatusReq);
router.put("/requerimento/:id/finalizar", autenticadorAdmin, adminController.finalizaReq);


//LOGOUT ADMIN
router.get('/sair', adminController.sair);


module.exports = router;