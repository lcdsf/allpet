const req = require('express/lib/request');
const res = require('express/lib/response');
const {Produto, Foto, CategoriaPrincipal, CategoriaEspecifica, ItemCompra, Avaliacao} = require('../database/models');

const produtoController = {
    acessBrinqs: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Acessórios e Brinquedos'}})

        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            where: {categorias_especificas_id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));;

        res.render('acessoriosBrinquedos', {produtos});

    },
    saude: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Saúde'}})
        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            where: {categorias_especificas_id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));
        res.render('saude', {produtos});
    },

    estetica: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Estética'}})
        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            where: {categorias_especificas_id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));
        res.render('estetica', {produtos});
    },

    descartaveis: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Descartáveis'}})
        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            where: {categorias_especificas_id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));
        res.render('descartaveis', {produtos});
    },

    index: async (req, res) => {
        const produtos = await Produto.findAll({include: 'fotos'})
        .then(result => result.map(produto => produto.toJSON()));
        res.render('listaProdutos', { produtos});
    },

    indexHome: async (req, res) =>{
        const produtos = await Produto.findAll({
            order: [['id', 'DESC']],
            include: 'fotos' 
        })
        .then(result => result.map(produto => produto.toJSON()));

        res.render('home', {produtos});
    },
    telaProduto: async (req, res) =>{
        const {id} = req.params;
        const produto = await Produto.findByPk(id, {include: 'fotos'})
        //.then(result => result.map(produto => produto.toJSON()));

        //SALVAR ITEM VISITADO NO COOKIE DE HISTÓRICO
        let histnav = req.cookies['historico'];
        histnav.push(id);
        res.cookie('historico', histnav);


        const avaliacoes = await Avaliacao.findAll({
            //raw: true, 
            where: {produtos_id: id},
            include: 'cliente'
        })
        .then(result => result.map(avaliacao => avaliacao.toJSON()));

       // console.log('AVALIAÇÕES: ', avaliacoes);

        const notas = avaliacoes.map(item => item.nota);

        //GERAR NOTA MEDIA DAS AVALIACOES DO PRODUTO
        let mediageral = 0;
        notas.forEach(nota => { mediageral += nota });
        mediageral = mediageral/notas.length;



        res.render('produto', {produto, avaliacoes, mediageral});
    },
    details: async (req, res) => {
        
        const {id} = req.params;
        const produto = await Produto.findByPk(id);
        const categoria = await CategoriaEspecifica.findByPk(produto.categorias_especificas_id);

        /*const compras = await Produto.findAll({
            raw: true, 
            where: {id: id},
            include: 'compras'
        
        });*/

        const qtdcompras = await ItemCompra.count({
            where: {produtos_id: id}
        });

        //console.log('QTDCOMPRAS: ', qtdcompras)



        const avaliacoes = await Avaliacao.findAll({
            raw: true, 
            where: {produtos_id: id},
            include: 'cliente'
        
        });

        console.log('AVALIAÇÕES: ', avaliacoes)
        res.render('detalheProduto', {produto, avaliacoes, categoria, qtdcompras});


    },
    create: async (req, res) => {
        const catesps = await CategoriaEspecifica.findAll();
        res.render("cadastroProduto", { catesps });
    },

    store: async (req, res) => {
        const {nome, preco, descricao, quantidade, catespnome} = req.body;

       // let produto;

       //console.log("CORPO DA REQUISIÇÃO: ", req.body);


        const cat_esp = await CategoriaEspecifica.findAll({raw: true,  where: {nome: catespnome} })
       // .then(console.log("CATEGORIA ESPECÍFICA ENCONTRADA"))
        //.catch(error => console.log("ERRO AO BUSCAR CATEGORIA ESPECÍFICA: ", error));
        
        //console.log("CATEGORIA ESPECÍFICA ENCONTRADA COM ID : ", cat_esp[0].id);


        //console.log(req.files[0].filename);
        //console.log('TAMANHO DO REQFILES: ',req.files.length);


        const produtoNovo = await Produto.create(
            {
                nome,
                preco,
                descricao,
                quantidade,
                categorias_especificas_id: cat_esp[0].id,
               // fotourl: "defaultprod.png"
            }
        );

        if (req.files){
            for (let i = 0; i < 4; i++){
                if (req.files[i]){
                    await Foto.create(
                        {
                            fotourl: req.files[i].filename,
                            produtos_id: produtoNovo.id
                        }
                    )
                }else{
                    await Foto.create(
                        {
                            fotourl: "defaultprod.png",
                            produtos_id: produtoNovo.id
                        }
                    )
                }
            }
        }else{
            for (let i = 0; i < 4; i++){
                await Foto.create(
                    {
                        fotourl: "defaultprod.png",
                        produtos_id: produtoNovo.id
                    }
                )
            }
        }


        //COM UMA FOTO SO - FOTOURL
        /*if (!req.file){
            await Produto.create(
                {
                    nome,
                    preco,
                    descricao,
                    quantidade,
                    categorias_especificas_id: cat_esp[0].id,
                    fotourl: "defaultprod.png"
                }
            )
            .then(console.log("PRODUTO CADASTRADO COM SUCESSO"))
            .catch(error => console.log("ERRO AO CADASTRAR PRODUTO: ", error))
        }else{
            await Produto.create(
                {
                    nome,
                    preco,
                    descricao,
                    quantidade,
                    categorias_especificas_id: cat_esp[0].id,
                    fotourl: req.file.filename
                }
            )
            .then(console.log("PRODUTO CADASTRADO COM SUCESSO"))
            .catch(error => console.log("ERRO AO CADASTRAR PRODUTO: ", error))
        }*/

       res.redirect("/admin/produtos");


    },
    edit: async (req, res) => {
//        const {nome, preco, descricao, quantidade, categorias_especificas_id, fotourl} = req.body;

        //res.send('EDIÇÃO')

        const {id} = req.params;

        const produto = await Produto.findByPk(id, {include: 'fotos'});
        const catesps = await CategoriaEspecifica.findAll();
        const catprod = await CategoriaEspecifica.findByPk(produto.categorias_especificas_id, {raw:true});
        //catprod = categoria.map(item => item.nome);

        //console.log('CATPROD: ', catprod);

        res.render('editaProduto', {produto, catesps, catprod});
    },
    update: async (req, res) => {
        const {nome, preco, descricao, quantidade, catespnome} = req.body;
        const {id} = req.params;
        
        const categoria = await CategoriaEspecifica.findOne({raw: true, where: {nome: catespnome}});

        await Produto.update(
            {
                nome: nome,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade,
                categorias_especificas_id: categoria.id
            },
            {where: {id: id}}
        );

        //if (req.file) await Produto.update({fotourl: req.file.filename}, {where: {id: id}});
        
        if (req.files){

            let fotosatuais = await Foto.findAll({
                where: {produtos_id: id}
            })
            .then(result => result.map(foto => foto.toJSON()));
            

            console.log('TAMANHO DO FOTOSATUAIS: ', fotosatuais.length);
            console.log('CONTEUDO FOTOS ATUAIS: ', fotosatuais);

            for (let i = 0; i < fotosatuais.length; i++){
            
                if (req.files[i]){
                    await Foto.update(
                        {fotourl: req.files[i].filename},
                        {where: {id: fotosatuais[i].id}}
                    )
                }
                        
            }
        }
        
        
        res.redirect('/admin/produtos');
    },
    delete: async (req, res) => {
        const {id} = req.params;
        const deletado = await Produto.findByPk(id);

        //console.log('PRODUTO A SER DELETADO: ', deletado);
        

       await Produto.destroy({where: {id: id}});

       //ENVIA LISTA ATUALIZADA DE PRODUTOS PARA A VIEW
       const produtos = await Produto.findAll({raw: true});
        res.redirect('/admin/produtos');
    }

    
};

module.exports = produtoController;