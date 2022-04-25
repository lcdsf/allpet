const req = require('express/lib/request');
const res = require('express/lib/response');
const {Produto, Foto, CategoriaPrincipal, CategoriaEspecifica, ItemCompra, Avaliacao} = require('../database/models');

const produtoController = {
    acessBrinqs: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Acessórios e Brinquedos'}})
        //.then(response => console.log('CATEGORIA PRINCIPAL ENCONTRADA COM SUCESSO!'))
        //.catch(error => console.log('ERRO AO BUSCAR CATEGORIA PRINCIPAL: ', error));

       // console.log('CATEGORIA PRINCIPAL: ', catprinc);

        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        //.then(response => console.log('CATEGORIAS ESPECÍFICAS ENCONTRADAS COM SUCESSO'))
        //.catch(error => console.log('ERRO AO BUSCAR CATEGORIAS ESPECÍFICAS: ', error));
        const ids = catesps.map(item => item.id);
        //console.log('IDs: ', ids);        
        const produtos = await Produto.findAll({
            raw: true,
            where: {categorias_especificas_id: ids}
        });

        //console.log('CATEGORIAS ESPECIFICAS: ', catesps);
        //console.log('PRODUTOS: ', produtos);


        res.render('acessoriosBrinquedos', {produtos});

    },
    saude: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Saúde'}})
        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            raw: true,
            where: {categorias_especificas_id: ids}
        });
        res.render('saude', {produtos});
    },
    estetica: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Estética'}})
        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            raw: true,
            where: {categorias_especificas_id: ids}
        });
        res.render('estetica', {produtos});
    },
    descartaveis: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Descartáveis'}})
        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            raw: true,
            where: {categorias_especificas_id: ids}
        });
        res.render('descartaveis', {produtos});
    },
    index: async (req, res) => {
        const produtos = await Produto.findAll({raw: true});
        const fotosprods = await Foto.findAll({raw: true});
        res.render('listaProdutos', { produtos, fotosprods });
    },
    indexHome: async (req, res) =>{
        const produtos = await Produto.findAll({
            raw: true, 
            order: [['id', 'DESC']]
        });

        res.render('home', {produtos});
    },
    telaProduto: async (req, res) =>{
        const {id} = req.params;

        const produto = await Produto.findByPk(id);

        const avaliacoes = await Avaliacao.findAll({
            raw: true, 
            where: {produtos_id: id},
            include: 'cliente'
        });

        const notas = avaliacoes.map(item => item.nota);

        //console.log("NOTAS: ", notas);

        let mediageral = 0;
        notas.forEach(nota => { mediageral += nota });
        mediageral = mediageral/notas.length;

        //console.log('QTD NOTAS: ', notas.length);
       // console.log('MÉDIA DAS NOTAS: ', mediageral);

        //const clientes = await Cliente.findAll({raw: true});



        //console.log('AVALIAÇÕES ENCONTRADAS: ', avaliacoes)



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
        .then(console.log("CATEGORIA ESPECÍFICA ENCONTRADA"))
        .catch(error => console.log("ERRO AO BUSCAR CATEGORIA ESPECÍFICA: ", error));
        
        console.log("CATEGORIA ESPECÍFICA ENCONTRADA COM ID : ", cat_esp[0].id);

        //let produto

        if (!req.file){
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
        }

        //.then(console.log("PRODUTO "+nome+" CADASTRADO COM SUCESSO!"))
        //.catch(error => console.log("ERRO AO CADASTRAR PRODUTO: ", error));

    
      /*  if (!req.file){
            await Foto.create(
                {
                    produtos_id: produto.id,
                    fotourl: "defaultprod.png"
                }
            );
        }else{
            await Foto.create(
                {
                    produtos_id: produto.id,
                    fotourl: req.file.filename
                }
            );
        }
        

        /*for (let file of req.file.fields){
            if (file){
                await Foto.create(
                    {
                        produtos_id: produto.id,
                        fotourl: file
                    }
                );
            }else{
                await Foto.create(
                    {
                        produtos_id: produto.id,
                        fotourl: "defaultprod.png"
                    }
                );
            }
        }*/

        //console.log("REQ FILE: ", req.file.fields);

       /* let teste = [req.files.img1[0].filename, req.files.img2[0].filename,
            req.files.img3[0].filename, req.files.img4[0].filename];*/


        //let teste = req.files.img1[0].filename;


        //VER SE req.files é nulo/vazio (nenhum arquivo upado)


       // let teste = JSON.stringify(req.files);

        

      //  let nomes = teste['img1'];



        /*for (let file of req.files){
            if (file){
                teste += file;
            }
        }*/

        /*if (!req.files.img1[0].filename) console.log('SEM ARQUIVO IMG 1');
        if (!req.files.img2[0].filename) console.log('SEM ARQUIVO IMG 2');
        if (!req.files.img3[0].filename) console.log('SEM ARQUIVO IMG 3');
        if (!req.files.img4[0].filename) console.log('SEM ARQUIVO IMG 4');**/

//        let dados = JSON.stringify(req.files);

  //      let imgs;

        /*for (let i in dados){
            console.log('forloop: ', i);
            imgs += dados[i].filename;
        }*/
//
  //      res.send(req.files);

        res.redirect("/admin/produtos");


    },
    edit: async (req, res) => {
//        const {nome, preco, descricao, quantidade, categorias_especificas_id, fotourl} = req.body;

        //res.send('EDIÇÃO')

        const {id} = req.params;

        const produto = await Produto.findByPk(id);
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

        if (req.file) await Produto.update({fotourl: req.file.filename}, {where: {id: id}});
        res.redirect('/admin/produtos');
    },
    delete: async (req, res) => {
        const {id} = req.params;
        const deletado = await Produto.findByPk(id);

        //console.log('PRODUTO A SER DELETADO: ', deletado);
        

       await Produto.destroy({where: {id: id}});

       //ENVIA LISTA ATUALIZADA DE PRODUTOS PARA A VIEW
       const produtos = await Produto.findAll({raw: true});
        res.render('listaProdutos', {deletado, produtos});
    }

    
};

module.exports = produtoController;