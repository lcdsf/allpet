const {Foto, Cliente, Endereco, Produto, Avaliacao, Requerimento, StatusRequerimento, Compra, StatusCompra, ItemCompra, 
    FormaPgto, Historico, ItemCarrinho} = require("../database/models");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const session = require("express-session");
const sequelize = require('sequelize');
const { resolveInclude } = require("ejs");
//const fs = require('fs');

const clienteController = {

    index: async (req, res) =>{
        const clientes = await Cliente.findAll();
        res.render('listaClientes', { clientes, admin: req.session.admin } );
    },

    details: async (req, res) =>{
        const cliente = await Cliente.findByPk(req.params.id, {
            include: ['compras', 'avaliacoes']
        });

        let totalgasto = 0.0;
        cliente.compras.forEach(c => totalgasto += c.valor);

        const avaliacoes = await Avaliacao.findAll({
            where: {clientes_id : req.params.id},
            include: 'produto'
        })

        res.render('detalheCliente', { admin: req.session.admin, cliente, totalgasto, avaliacoes } );
    },

    create: (req, res) => {
        res.render("cadastroUser");
    },

    edit: async (req, res) =>{
        const usuario = await Cliente.findByPk(req.params.id, {raw:true});

        res.render('editaCliente', {usuario});
    },

    alteraDados: async (req, res) =>{

        const {nome, sobrenome, telefone} = req.body;

            
        //SE MUDOU FOTO DE PERFIL, ENTÃO ALTERA NOME DA FOTO
        if (req.file){
            await Cliente.update(
                {fotourl: req.file.filename},
                {where: {id: req.session.usuario.id}}
            );

            //ALTERA NA SESSAO TAMBEM
            req.session.usuario.fotourl = req.file.filename;
        }

        await Cliente.update(
            {nome, sobrenome, telefone},
            {where: {id: req.session.usuario.id}}
        );

        //ALTERA DADOS DA SESSAO TAMBEM
        req.session.usuario.nome = nome;
        req.session.usuario.sobrenome = sobrenome;
        req.session.usuario.telefone = telefone;

        res.render('areaCliente', {usuario: req.session.usuario});
    },

    delete: async(req, res) => {
        await Cliente.destroy({
            where: {id: req.session.usuario.id}
        })

        req.session.destroy();

        res.redirect('/?Cadastro removido com sucesso!');
    },
    
    home: async(req, res) => {

        //BUSCA TODOS OS PRODS PARA A VIEW
        const produtos = await Produto.findAll({
            order: [['id', 'DESC']],
            include: 'fotos' 
        })
        .then(result => result.map(produto => produto.toJSON()));


        //BUSCA FOTO DO ULTIMO ITEM VISTO - HISTORICO CLIENTE

        let ultimovisto = "";

        const ultimoItemHistorico = await Historico.findOne({
            raw: true,
            where: {clientes_id: req.session.usuario.id},
            include: 'produto',
            order:[['id', 'DESC']]
        });

        if (ultimoItemHistorico){

            const FotoUltimoProd = await Foto.findOne({
                raw: true,
                where: {produtos_id: ultimoItemHistorico.produtos_id}
            });

            ultimovisto = FotoUltimoProd.fotourl;

           // console.log('ULTIMO PROD VISTO: ', FotoUltimoProd);
        }



               //BUSCA COM SOMA DE QUANTIDADE VENDIDA, AGRUPADA POR PRODUTOS
               let produtosVendidos = await ItemCompra.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('quantidade')), 'total_vendido'],
                    'produtos_id'
                ],
                group: ['produtos_id'],
            })
            //.then(result => result.map(produto => produto.toJSON()));
    
            //ORDENA POR MAIOR QTD VENDIDA
            produtosVendidos = produtosVendidos.sort(function (a, b){
                return b.total_vendido - a.total_vendido;
            });
    
            //SELECIONA OS 3 COM MAIS VENDAS
            let tresMais = produtosVendidos.slice(0, 3);
            //GUARDA SOMENTE OS IDS DOS 3 MAIS VENDIDOS
            tresMais = tresMais.map(item => item.produtos_id);
    
            //BUSCA OS 3 MAIS VENDIDOS
            let top3Produtos = await Produto.findAll({
                include: 'fotos',
                where: {id: tresMais}
            })
            //.then(result => result.map(produto => produto.toJSON()));




        res.render('home', {usuario: req.session.usuario, produtos, ultimovisto, top3: top3Produtos});
    },

    carrinho: async (req, res) => {
        
        const cliente_id = req.session.usuario.id;

        const itensCarrinho = await ItemCarrinho.findAll({
            where: {clientes_id: cliente_id},
            // include: 'produto'
            include: [{
                model: Produto, 
                as: 'produto', 
                include:[{
                    model: Foto, 
                    as: 'fotos'
                }]
            }]
        })
        .then(result => result.map(produto => produto.toJSON()));


        //BUSCA ENDERECOS DO CLIENTE
        const enderecos = await Endereco.findAll({
            attributes: {exclude: 'enderecos_id', include: 'id'},
            where: {clientes_id: cliente_id},
        })
        .then(result => result.map(item => item.toJSON()))
        .catch(error => console.log('ERRO AO BUSCAR ENDERECO: ', error));

        //enderecos.map(end => console.log(end));


        res.render('carrinho', {itenscarrinho: itensCarrinho, usuario: req.session.usuario, enderecos});
    },

    addCarrinho: async (req, res) => {

        const {qtditem} = req.body;
        const produto_id = req.params.id;
        const cliente_id = req.session.usuario.id;

        const produtoAtual = await Produto.findByPk(produto_id, {raw: true});

        let temNoCarrinho = await ItemCarrinho.findAll({
            where: {produtos_id: produto_id, clientes_id: cliente_id}
        })

        if (temNoCarrinho.length > 0){ 
            temNoCarrinho.pop();
            res.redirect('/produto/'+req.params.id+'?error="Este item já está no carrinho"'); 
            return;
        } 


        if (qtditem > 0 && (qtditem <= produtoAtual.quantidade)){
            await ItemCarrinho.create({
                produtos_id: produto_id,
                clientes_id: cliente_id,
                quantidade: qtditem

            });


            res.redirect('/produto/'+req.params.id+'?success="Item adicionado ao carrinho"');
        }else{
            res.redirect('/produto/'+req.params.id+'?error="Erro ao adicionar ao carrinho, verifique a quantidade informada"');
        }
        
    },

    deletaItemCarrinho: async (req, res) => {
        
        const {itemdelete} = req.body;
        const cliente_id = req.session.usuario.id;

        await ItemCarrinho.destroy({
            where:{
                clientes_id: cliente_id,
                produtos_id: itemdelete
            }
        });


       res.redirect('/cliente/carrinho');
    },

    alteraQtdCarrinho: async (req, res) => {
        
        const {qtditem, produtoaltera} = req.body;
        const cliente_id = req.session.usuario.id;

        console.log('req body: ', req.body);


        const produtoAtual = await Produto.findByPk(produtoaltera, {raw: true});

        if (qtditem > 0 &&  qtditem <= produtoAtual.quantidade){

            await ItemCarrinho.update(
                {
                    quantidade: qtditem,

                },

                {
                    where:{
                    clientes_id: cliente_id,
                    produtos_id: produtoaltera
                    }
                }

            );

            res.redirect('/cliente/carrinho?success="Quantidade alterada com sucesso!"');
        }

        res.redirect('/cliente/carrinho?error="Falha ao alterar quantidade, verifique a quantidade informada."');

    },

    compra: async (req, res) => {

        // console.log('\n\n\n', req.body);

        const {semfrete, enderecoid, fpgto} = req.body;
        const cliente_id =  req.session.usuario.id;
        let valortotal = 0
        let compra, endereco, pagamento;


        const itensCarrinho = await ItemCarrinho.findAll({
            where: {clientes_id: cliente_id},
            include:{ 
                model: Produto, 
                as: 'produto', 
                include:[{
                    model: Foto, 
                    as: 'fotos'
                }]
            }
        })
        // .then(result => result.map(item => item.toJSON()));

        // console.log('RESULTADO CARRINHO: ', itensCarrinho);

        //SOMA VALOR TOTAL DA COMPRA
        // itensCarrinho.map(item => valortotal += (item.quantidade * item.produto.preco));
        itensCarrinho.forEach(item => {
            valortotal += (item.quantidade * item.produto.preco);
        })

        

        //ADD NA TABELA FORMA DE PAGAMENTO
        switch (fpgto){
            case 'cartao':
                pagamento = 'Cartão'
            break;

            case 'boleto':
                pagamento = 'Boleto'
            break;

            case 'pix':
                pagamento = 'Pix'
            break;
        }
        

        //SE TEM FRETE, ENTAO BUSCA ENDERECO PARA ADD NA COMPRA
        if (enderecoid !== undefined){

            endereco = await Endereco.findByPk(enderecoid, {
                raw: true,
                //attributes: {exclude: 'enderecos_id', include: 'id'}
            });

            compra = await Compra.create({
                valor: valortotal,
                data: new Date(),
                clientes_id: cliente_id,
                forma_pgto: pagamento,
                enderecos_id: enderecoid
            });

        //SE CLIENTE FOR RETIRAR NA LOJA, ENTAO ENDERECO = NULL
        }else{
            compra = await Compra.create({
                valor: valortotal,
                data: new Date(),
                clientes_id: cliente_id,
                forma_pgto: pagamento,
                enderecos_id: null
            });
        }

        // ADD NA TABELA ITENS COMPRAS (COMPRAS N:M PRODUTOS)
        // E DA BAIXA NO ESTOQUE, DENTRO DO MESMO FOR

     
        for (let i = 0; i < itensCarrinho.length; i++){

            await ItemCompra.create({
                quantidade: itensCarrinho[i].quantidade,
                produtos_id: itensCarrinho[i].produto.id,
                compras_id: compra.id
            })
            .catch(error => console.log('ERRO AO INSERIR ITEMCOMPRA: ', error));

            await Produto.update(
                {quantidade: (itensCarrinho[i].produto.quantidade -  itensCarrinho[i].quantidade)},
                {where:{ id: itensCarrinho[i].produto.id}}
            )
            .catch(error => console.log('ERRO AO ATUALIZAR QTD PRODUTOS: ', error));
            
            
        }

        //ADD PRIMEIRO STATUS PADRAO PARA A COMPRA
        await StatusCompra.create({
            status: 'Pedido recebido pela loja',
            data: new Date(),
            compras_id: compra.id
        })
        .catch(error => console.log('ERRO AO ADD STATUS COMPRA: ', error));

        //LIMPA CARRINHO APOS COMPRA FINALIZADA
        await ItemCarrinho.destroy({
            where: {clientes_id: cliente_id}
        
        })

        res.render('compraConcluida', {usuario: req.session.usuario, valortotal, itenscompra: itensCarrinho, compra, endereco});

    },

    detalheCompra: async (req, res) => {

        const compra_id = req.params.id;
        const cliente_id = req.session.usuario.id;
        
        const compra = await Compra.findByPk(compra_id, {
            // include: ['produtos', 'statuscompra', 'endereco']
            include: [{
                model: Produto, 
                as: 'produtos', 
                include:[{
                    model: Foto, 
                    as: 'fotos'
                }]
                },
                'endereco',
                'statuscompra',
                'requerimento',
                'cliente'
            ]
        });


        //console.log('DADOS DA COMPRA: ', compra);

        //IMPEDIR QUE CLIENTES VEJAM DADOS DOS OUTROS
        if (compra.clientes_id == req.session.usuario.id)
            res.render('detalheCompra', {compra, usuario: req.session.usuario});
        else
            res.redirect('/cliente/home');
    },

    listaCompras: async (req, res) => {

        // const cliente_id = req.session.usuario.id;

        // const compras = await Compra.findAll({
        //     where: {clientes_id: cliente_id}
        // })

        const todasComprasAbertas = await Compra.findAll({
            where: {finalizado: false, clientes_id: req.session.usuario.id}
        });

        const todasComprasFinalizadas = await Compra.findAll({
            where: {finalizado: true, clientes_id: req.session.usuario.id}
        });


        const comprasabertas = todasComprasAbertas.filter( c => c.clientes_id === req.session.usuario.id);
        const comprasfinalizadas = todasComprasFinalizadas.filter( c => c.clientes_id === req.session.usuario.id);


        res.render('minhasCompras', {usuario: req.session.usuario, comprasabertas, comprasfinalizadas});
    },

    ajuda: async (req, res) => {

        const todasCompras = await Compra.findAll({ 
            where: {clientes_id: req.session.usuario.id},
            include: 'requerimento'
        });

        //FILTRAR SOMENTE COMPRAS EM ABERTO QUE NAO POSSUEM REQUERIMENTOS
        const compras = todasCompras.filter( c => c.requerimento === null && !c.finalizado);

        res.render('ajuda', {usuario: req.session.usuario, compras});
    },

    abreRequerimento: async (req, res) => {

        const compra_id = req.body.compracontestada;
        const {motivo} = req.body;

        const compra = await Compra.findByPk(compra_id);

        const requerimento = await Requerimento.create({
            datahora: new Date(),
            motivo,
            compras_id: compra_id
        });

        await StatusRequerimento.create({
            datahora: new Date(),
            status: 'Requerimento recebido',
            requerimentos_id: requerimento.id
        });

        res.render('ajuda2', {usuario: req.session.usuario, requerimento, compra})
    },

    detalheRequerimento: async (req, res) => {

        const requerimento = await Requerimento.findByPk(req.params.id, {
            // include: ['status', 'compra']
            include: [{
                model: Compra, 
                as: 'compra', 
                    include:[
                        {
                            model: Cliente, 
                            as: 'cliente'
                        }]
                },
                'status'

            ] 
        })

        res.render('detalheRequerimento', {usuario: req.session.usuario, requerimento})
    },

    listaRequerimentos: async (req, res) => {


        const todosReqsAbertos = await Requerimento.findAll({
            where: {finalizado: false},
            include: [{
                model: Compra, 
                as: 'compra', 
                include:[{
                    model: Cliente, 
                    as: 'cliente',
                    where: {id: req.session.usuario.id}
                }]
            }] 
        
        });

        const todosReqsFechados = await Requerimento.findAll({
            where: {finalizado: true},
            include: [{
                model: Compra, 
                as: 'compra', 
                include:[{
                    model: Cliente,
                    as: 'cliente', 
                }]
            }] 
        
        });

        const reqsabertos = todosReqsAbertos.filter( r => r.compra.cliente.id === req.session.usuario.id);
        const reqsfechados = todosReqsFechados.filter( r => r.compra.cliente.id === req.session.usuario.id);

        res.render('meusRequerimentos', {usuario: req.session.usuario, reqsabertos, reqsfechados});
    },

    cancelaRequerimento: async (req, res) => {
        await Requerimento.update({finalizado: true}, {where: {id: req.params.id}});

        await StatusRequerimento.create({
            status: 'Requerimento cancelado pelo cliente',
            datahora: Date.now(),
            requerimentos_id: req.params.id
        });


        res.redirect('/cliente/requerimento/'+req.params.id+'?Requerimento cancelado com sucesso!')

    },
    
    store: async (req, res) => {

        const erros = validationResult(req);

        //console.log('CONTEUDO DE ERRROS: ', erros);

        if (!erros.isEmpty()){
            res.render('cadastroUser', { erros: erros.array().map(erro => erro.msg) });
            //return;
        }

        const {nome, sobrenome, cpf, telefone, 
        rua, cep, numero, bairro, cidade, estado, complemento, 
        email, senha, confirmaSenha} = req.body;

            
        if (senha === confirmaSenha){ 

            let cliente;

            if (!req.file){
                cliente = await Cliente.create(
                    {
                        nome,
                        sobrenome,
                        email,
                        senha: bcrypt.hashSync(senha, 10),
                        cpf,
                        telefone,
                        data_cadastro: Date.now(),
                        fotourl: "defaultprofile.jpg"
                    }
                );
            }else{
                cliente = await Cliente.create(
                    {
                        nome,
                        sobrenome,
                        email,
                        senha: bcrypt.hashSync(senha, 10),
                        cpf,
                        telefone,
                        data_cadastro: Date.now(),
                        fotourl: req.file.filename
                    }
                );
            }
 

            await Endereco.create(
                {
                    cep,
                    rua,
                    numero,
                    bairro,
                    cidade,
                    estado,
                    complemento,
                    clientes_id: cliente.id
                }
            );

            res.render('cadastroUser', {cadastroOK: 'Cadastro realizado com sucesso! Clique no botão acima "Entrar" para fazer o login.'});
        }else{
            res.render('cadastroUser', {erro: 'Senhas não coincidem, tente novamente.'});
        }

        
    },

    sair: async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },

    painel: async (req, res) => {
        res.render('areaCliente', {usuario: req.session.usuario});
    },

    historico: async (req, res) => {

        // let ids = req.cookies['historico'];
        // console.log('IDs do histórico: ', ids);
        // ids = ids.map(id => parseInt(id));
       // result => result.map(produto => produto.toJSON()))

        const historico = await Historico.findAll( {
        include: [/*'categoria',*/'produto'/*,'itens_compras'*/],
        where: {clientes_id: req.session.usuario.id},
        order: [['id', 'DESC']]
        })
        .then(itens => itens.map(item => item.toJSON()));

        let ids = historico.map(item => item.produto.id);

        console.log('IDS encontrados: ', ids);

        const produtos = await Produto.findAll({
            where: {id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));
        

        res.render('historico', {produtos, usuario: req.session.usuario});
    },

    avaliacao: async (req, res) =>{
        const {nota, comentario} = req.body;

        const idcliente = req.session.usuario.id;
        const idproduto = req.params.id;

        const usuarioJaAvaliou = await Avaliacao.findOne({
            where: {
                clientes_id: idcliente,
                produtos_id: idproduto
            }
        })

        if (usuarioJaAvaliou){
            req.session.usuario.avaliou = idproduto;

            //SE JA EXISTE AVALIACAO, ENTAO ALTERA
            await Avaliacao.update(
                {
                    descricao: comentario,
                    datahora: Date.now(),
                    nota
                },
                {
                    where: {
                        produtos_id: idproduto,
                        clientes_id: idcliente
                    }
                }
            );
        }else{
            //SE NAO EXISTE AVALIACAO, ENTAO CRIA
            await Avaliacao.create({
                descricao: comentario,
                datahora: Date.now(),
                nota,
                produtos_id: idproduto,
                clientes_id: idcliente,

            });
        }



        res.redirect('/produto/'+req.params.id);


    },

    deletaAvaliacao: async (req, res) =>{
        await Avaliacao.destroy({
            where: {
                produtos_id: req.params.id,
                clientes_id: req.session.usuario.id
            }

        });

        res.redirect('/produto/'+req.params.id);

    },

    histdelete: async (req, res) =>{
        await Historico.destroy({
            where: {clientes_id: req.session.usuario.id}
        });

        res.redirect('/cliente/historico');
    },

    listaEnderecos: async (req, res) =>{

        const enderecos = await Endereco.findAll({
            where: {clientes_id: req.session.usuario.id}
        });

        res.render('listaEnderecos', {usuario: req.session.usuario, enderecos});
    },

    editaEndereco: async (req, res) =>{

        const endereco = await Endereco.findByPk(req.params.id);
        const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
        'MG', 'MS', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SE', 'TO'];

        res.render('editaEndereco', {usuario: req.session.usuario, endereco, estados});
    },

    alteraEndereco: async (req, res) =>{

        const {cep, rua, numero, bairro, cidade, estado, complemento} = req.body;

        await Endereco.update(
            {cep, rua, numero, bairro, cidade, estado, complemento},
            {where: {id: req.params.id}}
        );

        res.redirect('/cliente/enderecos?Endereco alterado com sucesso!');
    },

    criaEndereco: async (req, res) =>{
       res.render('addEndereco');
    },

    deletaEndereco: async (req, res) =>{
        await Endereco.destroy({
            where: {id: req.params.id}
        });

        res.redirect('/cliente/enderecos?Endereco removido com sucesso!');
     },

    salvaEndereco: async (req, res) => {
        const {cep, rua, numero, bairro, cidade, estado, complemento} = req.body;

        await Endereco.create(
            {cep, rua, numero, bairro, cidade, estado, complemento, clientes_id: req.session.usuario.id}
        );

        res.redirect('/cliente/enderecos?Endereco adicionado com sucesso!');
    }

};

module.exports = clienteController;