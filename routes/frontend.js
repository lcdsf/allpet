const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('home');
});

router.get('/homeloginaberto', function(req, res){
    res.render('homeLoginAberto');
});

router.get('/cadastrouser', function(req, res){
    res.render('cadastroUser');
});

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

/*router.get('/bemestar', function(req, res){
    res.render('bemEstar');
});*/

router.get('/acessoriosbrinquedos', function(req, res){
    res.render('acessoriosBrinquedos');
});

router.get('/saude', function(req, res){
    res.render('saude');
});

router.get('/estetica', function(req, res){
    res.render('estetica');
});

router.get('/descartaveis', function(req, res){
    res.render('descartaveis');
});

router.get('/areacliente', function(req, res){
    res.render('areaCliente');
});


module.exports = router;