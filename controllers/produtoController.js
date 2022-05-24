const {Op} = require('sequelize');
const sequelize = require('sequelize');
const {Produto, Foto, CategoriaPrincipal, CategoriaEspecifica, ItemCompra, 
    Avaliacao, ItemHistorico, Historico} = require('../database/models');

const produtoController = {

    busca: async (req, res) =>{

        const resultado = await Produto.findAll({ 
            where: {
                nome: {
                    [Op.like]: '%'+req.query.buscaprod+'%'
                }
            },
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));

        //console.log(resultado);

        const usuariologado = req.session.usuario;
        const adminlogado = req.session.admin;


        res.render('resultadoBusca', {produtos: resultado, strbusca: req.query.buscaprod, usuario: usuariologado, admin: adminlogado});
    },

    acessBrinqs: async (req, res) => {
        const catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Acessórios e Brinquedos'}})

        const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}})
        const ids = catesps.map(item => item.id);
        const produtos = await Produto.findAll({
            where: {categorias_especificas_id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));;

        const usuariologado = req.session.usuario;
        const adminlogado = req.session.admin;

        res.render('acessoriosBrinquedos', {produtos, usuario: usuariologado, admin: adminlogado});

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
        const usuariologado = req.session.usuario;
        const adminlogado = req.session.admin;
        res.render('saude', {produtos, usuario: usuariologado, admin: adminlogado});
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
        const usuariologado = req.session.usuario;
        const adminlogado = req.session.admin;
        res.render('estetica', {produtos, usuario: usuariologado, admin: adminlogado});
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
        const usuariologado = req.session.usuario;
        const adminlogado = req.session.admin;
        res.render('descartaveis', {produtos, usuario: usuariologado, admin: adminlogado});
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

        const usuariologado = req.session.usuario;
        const adminlogado = req.session.admin;




        //BUSCA FOTO DO ULTIMO ITEM VISTO - HISTORICO CLIENTE
        let ultimovisto = "";
        if (req.session.usuario){

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

        res.render('home', {produtos, usuario: usuariologado, admin: adminlogado, ultimovisto, top3: top3Produtos});
    },

    telaProduto: async (req, res) =>{
        const {id} = req.params;
        const produto = await Produto.findByPk(id, {include: 'fotos'})
        //.then(result => result.map(produto => produto.toJSON()));

        let usuarioJaAvaliou;
        req.session.avaliou = 0;

        //SE CLIENTE LOGADO
        if (req.session.usuario){

            //SALVA PRODUTO NO HISTORICO
            await Historico.create({
                clientes_id: req.session.usuario.id,
                produtos_id: id
            })
            .catch(error => console.log('ERRO AO ADICIONAR ITEM NO HISTORICO: ', error));

            //VERIFICA SE CLIENTE JA AVALIOU PRODUTO
            usuarioJaAvaliou = await Avaliacao.findOne({
                where: {
                    clientes_id: req.session.usuario.id,
                    produtos_id: id
                }
            })
            if (usuarioJaAvaliou){
                req.session.avaliou = 1;
            }
        }


        const avaliacoes = await Avaliacao.findAll({
            //raw: true, 
            where: {produtos_id: id},
            order: [['id', 'DESC']],
            include: 'cliente'
        })
        .then(result => result.map(avaliacao => avaliacao.toJSON()));

       // console.log('AVALIAÇÕES: ', avaliacoes);

        const notas = avaliacoes.map(item => item.nota);

        //GERAR NOTA MEDIA DAS AVALIACOES DO PRODUTO
        let mediageral = 0;
        notas.forEach(nota => { mediageral += nota });
        mediageral = mediageral/notas.length;

        const usuariologado = req.session.usuario;
        const adminlogado = req.session.admin;

        let ultimovisto = "";

        // console.log('AVALIACAO DO USUARIO')
        // console.log(usuarioJaAvaliou);


        res.render('produto', {avaliacao: usuarioJaAvaliou, produto, avaliacoes, mediageral, usuario: usuariologado, admin: adminlogado, avaliou: req.session.avaliou, ultimovisto});
    },

    filtraBuscaAcessBrinqs: async (req, res) =>{
        
        console.log(req.body);

        const {range_preco} = req.body;
        // const resultado;
        let resultado, cat, cats_ids = [];


        //PEGA TODOS OS IDS DAS CATEGORIAS SELECIONADAS NO CHECKBOX
        if (req.body.Brinquedos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Brinquedos'}}); cats_ids.push(cat.id); };
        if (req.body.Roupas){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Roupas'}}); cats_ids.push(cat.id); };
        if (req.body.Aderecos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Adereços'}}); cats_ids.push(cat.id); };
        if (req.body.ColeirasGuias){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Coleiras/Guias'}}); cats_ids.push(cat.id); };
        if (req.body.Camas){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Camas'}}); cats_ids.push(cat.id); };
        if (req.body.Tapetes){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Tapetes'}}); cats_ids.push(cat.id); };


        //FILTRA O RESULTADO DA BUSCA PELA FAIXA DE PREÇO SELECIONADA
        switch(range_preco){
            case '<=150': 
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.lte ]: 50}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '51_100':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 50, [Op.lte]: 100}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '101_200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 100, [Op.lte]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '>200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
        }

        res.render('acessoriosBrinquedos', {produtos: resultado, usuario: req.session.usuario, admin: req.session.admin});

    },

    filtraBuscaEstetica: async (req, res) =>{
        
        console.log(req.body);

        const {range_preco} = req.body;
        // const resultado;
        let resultado, cat, cats_ids = [];


        //PEGA TODOS OS IDS DAS CATEGORIAS SELECIONADAS NO CHECKBOX
        if (req.body.Shampoos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Shampoos'}}); cats_ids.push(cat.id); };
        if (req.body.Sabonetes){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Sabonetes'}}); cats_ids.push(cat.id); };
        if (req.body.AlicatesTesouras){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Alicates e Tesouras'}}); cats_ids.push(cat.id); };
        if (req.body.Perfumes){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Perfumes'}}); cats_ids.push(cat.id); };
        if (req.body.Cosmeticos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Cosméticos'}}); cats_ids.push(cat.id); };
        // if (req.body.Tapetes){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Tapetes'}}); cats_ids.push(cat.id); };


        //FILTRA O RESULTADO DA BUSCA PELA FAIXA DE PREÇO SELECIONADA
        switch(range_preco){
            case '<=150': 
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.lte ]: 50}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '51_100':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 50, [Op.lte]: 100}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '101_200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 100, [Op.lte]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '>200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
        }

        res.render('estetica', {produtos: resultado, usuario: req.session.usuario, admin: req.session.admin});

    },

    filtraBuscaSaude: async (req, res) =>{
        
        const {range_preco} = req.body;
        let resultado, cat, cats_ids = [];


        //PEGA TODOS OS IDS DAS CATEGORIAS SELECIONADAS NO CHECKBOX
        if (req.body.RacoesPetiscos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Rações e Petiscos'}}); cats_ids.push(cat.id); };
        if (req.body.Vermifugos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Vermífugos'}}); cats_ids.push(cat.id); };
        if (req.body.Pomadas){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Pomadas'}}); cats_ids.push(cat.id); };
        if (req.body.Medicamentos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Medicamentos'}}); cats_ids.push(cat.id); };
        if (req.body.PulgasCarr){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Antipulgas e Carrapatos'}}); cats_ids.push(cat.id); };


        //FILTRA O RESULTADO DA BUSCA PELA FAIXA DE PREÇO SELECIONADA
        switch(range_preco){
            case '<=150': 
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.lte ]: 50}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '51_100':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 50, [Op.lte]: 100}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '101_200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 100, [Op.lte]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '>200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
        }

        res.render('saude', {produtos: resultado, usuario: req.session.usuario, admin: req.session.admin});

    },

    filtraBuscaDescartaveis: async (req, res) =>{
        
        const {range_preco} = req.body;
        let resultado, cat, cats_ids = [];


        //PEGA TODOS OS IDS DAS CATEGORIAS SELECIONADAS NO CHECKBOX
        if (req.body.Embalagens){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Embalagens'}}); cats_ids.push(cat.id); };
        if (req.body.TapetesHig){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Tapetes Higiênicos'}}); cats_ids.push(cat.id); };
        if (req.body.Curativos){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Curativos'}}); cats_ids.push(cat.id); };
        if (req.body.Seringas){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Seringas'}}); cats_ids.push(cat.id); };
        if (req.body.ComeBebeDesc){ cat = await CategoriaEspecifica.findOne({where: {nome: 'Comedouros/Bebedouros descartáveis'}}); cats_ids.push(cat.id); };


        //FILTRA O RESULTADO DA BUSCA PELA FAIXA DE PREÇO SELECIONADA
        switch(range_preco){
            case '<=150': 
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.lte ]: 50}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '51_100':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 50, [Op.lte]: 100}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '101_200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 100, [Op.lte]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
            case '>200':
                resultado = await Produto.findAll({
                    where: {
                        categorias_especificas_id: cats_ids,
                        preco: { [ Op.gt ]: 200}
                    },
                    include: 'fotos'
                })
                .then(result => result.map(produto => produto.toJSON()));
                break;
        }

        res.render('descartaveis', {produtos: resultado, usuario: req.session.usuario, admin: req.session.admin});

    },


    details: async (req, res) => {
        
        const {id} = req.params;
        const produto = await Produto.findByPk(id);
        const categoria = await CategoriaEspecifica.findByPk(produto.categorias_especificas_id);

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