const {Foto, Cliente, Endereco, Produto, Avaliacao, Requerimento, StatusRequerimento, Compra, StatusCompra, ItemCompra, 
    FormaPgto, Historico, ItemCarrinho} = require("../database/models");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const session = require("express-session");
//const fs = require('fs');

const clienteController = {

    index: async (req, res) =>{
        const clientes = await Cliente.findAll();
        res.render('listaClientes', { clientes } );
    },

    create: (req, res) => {
        res.render("cadastroUser");
    },

    edit: async (req, res) =>{
        const usuario = await Cliente.findByPk(req.params.id, {raw:true});

        res.render('editaCliente', {usuario});
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
        
        res.render('home', {usuario: req.session.usuario, produtos, ultimovisto});
    },

    carrinho: async (req, res) => {
        
        const cliente_id = req.session.usuario.id;

        const itensCarrinho = await ItemCarrinho.findAll({
            where: {clientes_id: cliente_id},
            include: 'produto'
        })
        .then(result => result.map(produto => produto.toJSON()));

        // //BUSCA FORMAS DE PAGAMENTO
        // const formasPgto = await FormaPgto.findAll()
        // .then(result => result.map(item => item.toJSON()))
        // .catch(error => console.log('ERRO AO BUSCAR FORMA PGTO: ', error));

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
            include: 'produto'
        })
        .then(result => result.map(item => item.toJSON()));

        // console.log('RESULTADO CARRINHO: ', itensCarrinho);

        //SOMA VALOR TOTAL DA COMPRA
        // itensCarrinho.map(item => valortotal += (item.quantidade * item.produto.preco));
        itensCarrinho.forEach(item => {
            valortotal += (item.quantidade * item.produto.preco);
        })

        

        //ADD NA TABELA FORMA DE PAGAMENTO
        switch (fpgto){
            case 'cartao':
                pagamento = await FormaPgto.create({
                    tipo: 'Cartão'
                })
            break;

            case 'boleto':
                pagamento = await FormaPgto.create({
                    tipo: 'Boleto'
                })
            break;

            case 'pix':
                pagamento = await FormaPgto.create({
                    tipo: 'Pix'
                })
            break;
        }
        

        //SE TEM ENDERECO, CRIA COMPRA COM ENDERECO_ID
        if (enderecoid !== undefined){

            endereco = await Endereco.findByPk(enderecoid, {
                raw: true,
                //attributes: {exclude: 'enderecos_id', include: 'id'}
            });

            compra = await Compra.create({
                valor: valortotal,
                data: new Date(),
                clientes_id: cliente_id,
                formas_pgto_id: pagamento.id,
                enderecos_id: enderecoid
            });


        }else{
            compra = await Compra.create({
                valor: valortotal,
                data: new Date(),
                clientes_id: cliente_id,
                formas_pgto_id: pagamento.id,
                enderecos_id: null
            });
        }

        //ADD NA TABELA ITENS COMPRAS (COMPRAS N:M PRODUTOS)

        // console.log('TAMANHO ITENS CARRINHO: ', itensCarrinho.length);

        for (let i = 0; i < itensCarrinho.length; i++){


            // console.log('\n\n\nITERATOR: ',i);
            // console.log('LOOP INSERT ITEMCOMPRA:') 
            // console.log('Quantidade: ', itensCarrinho[i].quantidade);
            // console.log('Produto ID: ', itensCarrinho[i].produto.id);
            // console.log('Compra ID: ', compra.id);

            await ItemCompra.create({
                quantidade: itensCarrinho[i].quantidade,
                produtos_id: itensCarrinho[i].produto.id,
                compras_id: compra.id
            })
            .catch(error => console.log('ERRO AO INSERIR ITEMCOMPRA: ', error));        
        }


        //DECREMENTAR QTD PRODUTOS DA COMPRA
        console.log('AQUI ROTINA UPDATE PRODUTOS')




        //LIMPA CARRINHO APOS COMPRA FINALIZADA
        // await Carrinho.destroy({
        //     where: {clientes_id: cliente_id}
        
        // })

        console.log('AQUI ROTINA LIMPACARRINHO')

        // console.log('ENDERECO ENCONTRADO: ', endereco);

        res.render('compraConcluida', {usuario: req.session.usuario, valortotal, itenscompra: itensCarrinho, compra, endereco, pagamento});

        //return;
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
        

        res.render('historico', {produtos});
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
        }

        await Avaliacao.create({
            descricao: comentario,
            datahora: Date.now(),
            nota,
            produtos_id: idproduto,
            clientes_id: idcliente,

        });


        res.redirect('/produto/'+req.params.id);


    },

    histdelete: async (req, res) =>{
        await Historico.destroy({
            where: {clientes_id: req.session.usuario.id}
        });

        res.redirect('/cliente/historico');
    }

};

module.exports = clienteController;