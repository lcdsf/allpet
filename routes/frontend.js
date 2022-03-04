const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('home');
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


module.exports = router;