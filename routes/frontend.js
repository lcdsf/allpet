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