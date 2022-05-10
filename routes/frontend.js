const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
// const adminController = require('../controllers/adminController');
const clienteController = require("../controllers/clienteController");
const upload = require('../middlewares/multer');
const validadores = require('../middlewares/validadores');
const loginController = require('../controllers/loginController');
const autenticadorCliente = require('../middlewares/autenticadorCliente');

router.get('/', produtoController.indexHome);
router.get('/acessoriosbrinquedos', produtoController.acessBrinqs);
router.get('/saude', produtoController.saude);
router.get('/estetica', produtoController.estetica);
router.get('/descartaveis', produtoController.descartaveis);
router.get('/loginadm', loginController.adminIndex);
router.get('/produto/:id', produtoController.telaProduto);

router.post('/produto/:id/avaliar', clienteController.avaliacao);

router.post('/produto/:id/addcarrinho', autenticadorCliente, clienteController.addCarrinho);

router.get('/busca', produtoController.busca);

router.get("/cadastro", clienteController.create);
router.post("/cadastro", upload.single('fotoperfil'), validadores.cadastroCliente, clienteController.store);


//router.get('/cadastrouser', function(req, res){
//    res.render('cadastroUser');
//});

router.get('/cadastroprod', function(req, res){
    res.render('cadastroProduto');
});

router.get('/produto', function(req, res){
    res.render('produto');
});



router.get('/carrinho', function(req, res){
    res.render('carrinho');
});

router.get('/compraconcluida', function(req, res){
    res.render('compraConcluida');
});

router.get('/detalhecompra', function(req, res){
    res.render('detalheCompra');
});

router.get('/resultadobusca', function(req, res){
    res.render('resultadoBusca');
});



router.get('/areacliente', function(req, res){
    res.render('areaCliente');
});

router.get('/minhascompras', function(req, res){
    res.render('minhasCompras');
});

router.get('/ajuda', function(req, res){
    res.render('ajuda');
});

router.get('/ajuda2', function(req, res){
    res.render('ajuda2');
});

router.get('/meusrequerimentos', function(req, res){
    res.render('meusRequerimentos');
});

router.get('/detalhereq', function(req, res){
    res.render('detalheRequerimento');
});


module.exports = router;