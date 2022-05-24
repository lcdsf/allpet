require('dotenv').config();

const raw = require('body-parser/lib/types/raw');
const {Cliente, Endereco, CategoriaPrincipal, CategoriaEspecifica, 
    Produto, Administrador, Compra, FormaPgto, Avaliacao,
Boleto, Cartao, ChavePix, Requerimento, StatusRequerimento,
StatusCompra, ItemCompra, Foto, Historico, ItemHistorico, ItemCarrinho} = require('./database/models');

const sequelize = require('sequelize');

async function buscarClientes(){
    const clientes = await Cliente.findAll( {include: 'enderecos'} )
    .then(clientes => clientes.map(cliente => cliente.toJSON()));

    console.log(JSON.stringify(clientes, null, 4));
}


async function buscarEnderecos(){
    const enderecos = await Endereco.findAll( {include: 'cliente'} )
    .then(enderecos => enderecos.map(endereco => endereco.toJSON()));

    console.log(JSON.stringify(enderecos, null, 4));
}

async function cadastrarCliente(){

    
    await Cliente.create(
        {
            nome: "Victor",
            sobrenome: "Santos",
            email: "vs@code.com",
            senha: "2022",
            cpf: "00011173599",
            telefone: "8522221111",
            data_cadastro: Date.now()
        }
    );

};

async function cadastrarProduto(){

    
    await Produto.create(
        {
            nome: "Roupa VS Code",
            preco: 29.90,
            descricao: "Uma roupinha para demonstrar seu espírito Dev por meio do seu pet",
            quantidade: 8,
            categorias_especificas_id: 2
        }
    );

}


async function cadastraCatEsp(){
    await CategoriaEspecifica.create(
        {
        nome: "Coleiras e Guias",
        categorias_principais_id: 1
        }
    );
}


async function buscarSoClientes(){
    const clientes = await Cliente.findAll()
    .then(clientes => clientes.map(cliente => cliente.toJSON()));

    console.log(JSON.stringify(clientes, null, 4));
}

async function buscarSoProdutos(){
    const itens = await Produto.findAll( {include: [/*'categoria',*/ 'avaliacoes'/*,'itens_compras'*/]} )
    .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    console.log(JSON.stringify(itens, null, 4));
}

async function buscarAdmins(){
    const itens = await Administrador.findAll()
    .then(itens => itens.map(item => item.toJSON()));

    console.log(JSON.stringify(itens, null, 4));
}


async function buscarCatPrinc(){
    const itens = await CategoriaPrincipal.findAll()
    .then(itens => itens.map(item => item.toJSON()));

    console.log(JSON.stringify(itens, null, 4));
}


async function buscarCatEsp(){
    const itens = await CategoriaEspecifica.findAll()
    .then(itens => itens.map(item => item.toJSON()));

    console.log(JSON.stringify(itens, null, 4));
}

async function teste(){
    const itens = await Produto.findAll( 
        //{attributes: {exclude: ['clientes_id']} },
        //{include: ['cliente']}
    )
    .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    console.log(JSON.stringify(itens, null, 4));
}

async function buscaCP(){
    const  catprinc = await CategoriaPrincipal.findOne({raw: true, where: {nome: 'Acessórios e Brinquedos'}})
    console.log(catprinc);

    const catesps = await CategoriaEspecifica.findAll({raw: true, where: {categorias_principais_id: catprinc.id}});

    console.log(catesps);
}


async function FotosProds(){
    const itens = await Produto.findAll( 
        {include: ['fotos']}
    )
    .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    //console.log(itens);
    
    itens.forEach(item => {
        console.log('\n\nO produto '+item.nome+' possui as seguintes fotos: ');

        let fotos = item.fotos.map(foto => foto.fotourl);
        
        console.log(fotos[0]);
        console.log(fotos[1]);
        console.log(fotos[2]);
        console.log(fotos[3]);
        // console.log(item.fotos[1].fotourl);
        // console.log(item.fotos[2].fotourl);
        // console.log(item.fotos[3].fotourl);
    })
}


async function insereFotos(){
    for (let i = 0; i < 4; i++){
        await Foto.create({
            fotourl: 'defaultprod.png',
            produtos_id: 21
        })
    }
}


async function buscaCompra(id){
   // const  itens = await Compra.findAll({raw: true, include: 'produtos'})

    const  itens = await ItemCompra.findAll({where: {compras_id: id}, include: 'produto'})
    .then(result => result.map(item => item.toJSON()))
    .catch(error => console.log('ERRO AO BUSCAR COMPRA: ', error));

    let x = itens.map(item => item.produto);

    let vtotal = 0;
    
    x.map(item => vtotal += item.preco * item.quantidade);

    console.log('====== VALOR TOTAL: R$ '+vtotal.toFixed(2)+'======\n');
    
    x.forEach(item => {
        console.log('PRODUTO: '+item.nome+'\nQUANTIDADE: '+item.quantidade+'\nVALOR UNITÁRIO: '+item.preco+'\n\n');
    });

}

async function buscaVendasProd(id){
    // const  itens = await Compra.findAll({raw: true, include: 'produtos'})
 
     const  itens = await ItemCompra.findAll({where: {produtos_id: id}, include: 'compra'})
     .then(result => result.map(item => item.toJSON()))
     .catch(error => console.log('ERRO AO BUSCAR PRODUTO: ', error));

    

     let produto = await Produto.findByPk(id, {raw: true})
     //.then(result => result.map(item => item.toJSON()))

     console.log(produto)

     console.log('VENDAS DO PRODUTO ', produto.nome)

    // console.log(itens);
 
    let compras = itens.map(item => item.compra);

    compras.forEach(compra => {
        console.log(compra);
        console.log('Foi vendido na compra ID '+compra.id+', '+compra.quantidade+' unidades');
    });

    let vtotal = 0;

    compras.map( compra => vtotal += compra.quantidade * produto.preco);

 
    //  let vtotal = 0;
     
    //  x.map(item => vtotal += item.preco * item.quantidade);
 
    console.log('====== VALOR TOTAL DE VENDAS DO PRODUTO: R$ '+vtotal.toFixed(2)+'======\n');
     
    //  x.forEach(item => {
    //      console.log('PRODUTO: '+item.nome+'\nQUANTIDADE: '+item.quantidade+'\nVALOR UNITÁRIO: '+item.preco+'\n\n');
    //  });
 
 }




 async function buscaCompraProd(id){
 
     const  itens = await ItemCompra.findAll({where: {compras_id: id}, include: 'produto'})
     .then(result => result.map(item => item.toJSON()))
     .catch(error => console.log('ERRO AO BUSCAR PRODUTO: ', error));

     console.log(itens);

 }

//buscaCompraProd(1);

async function testeHistorico(id){
    const itens = await Historico.findAll( {
        include: [/*'categoria',*/'produto'/*,'itens_compras'*/],
        where: {clientes_id: id},
        order: [['id', 'DESC']]
    } )
    .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    console.log(JSON.stringify(itens, null, 4));
}


async function testeCarrinho(id){

    // await ItemCarrinho.create({
    //     quantidade: 5, 
    //     clientes_id: id,
    //     produtos_id: 2
    // })
    // .catch(error => console.log("ERRO AO INSERIR DADOS: ", error));


    const itens = await ItemCarrinho.findAll( {
        include: [/*'categoria',*/'produto'/*,'itens_compras'*/],
        where: {clientes_id: id},
        //order: [['id', 'DESC']]
    } )
    .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    console.log(JSON.stringify(itens, null, 4));
}


async function testeEndereco(id){

    const itens = await Endereco.findAll({
        //attributes: {exclude: 'enderecos_id', include: 'id'},
        // where: {clientes_id: id}
       // raw: true
    })
    //.then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    console.log(JSON.stringify(itens, null, 4));
}



// testeEndereco(50);

async function testeItemCarrinho(id){
    const itens = await ItemCarrinho.findAll({
    //    where: {clientes_id: id},
    //    include: 'produtos'
    })
    .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    console.log(JSON.stringify(itens, null, 4));
}


async function testeProdutosCompra(id){
    const itens = await Compra.findAll({
       where: {id: id},
       include: 'produtos'
    })
    .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    console.log(JSON.stringify(itens, null, 4));
}


async function testeProdutosStatusCompra(id){
    const itens = await Compra.findByPk(id, {
        // raw: true,
       //  where: {clientes_id: cliente_id},
         include: ['produtos', 'statuscompra', 'endereco']
     })

    // .then(itens => itens.map(item => item.toJSON()))
    .catch(error => console.log("ERRO AO BUSCAR DADOS: ", error));

    itens.produtos.forEach(item => {
        console.log(item.ItemCompra.quantidade);
    })
    
    
    
}



async function teste3MaisVendidos(){

    //BUSCA COM SOMA DE QUANTIDADE VENDIDA, AGRUPADA POR PRODUTOS
    let itens = await ItemCompra.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('quantidade')), 'total_vendido'],
            'produtos_id'
        ],
        group: ['produtos_id'],
    })
    //.then(result => result.map(produto => produto.toJSON()));

    //ORDENA POR MAIOR QTD VENDIDA
    itens = itens.sort(function (a, b){
        return b.total_vendido - a.total_vendido;
    });

    //SELECIONA OS 3 COM MAIS VENDAS
    let tresMais = itens.slice(0, 3);

    //GUARDA SOMENTE OS IDS DOS 3 MAIS VENDIDOS
    tresMais = tresMais.map(item => item.produtos_id);

    //BUSCA OS 3 MAIS VENDIDOS
    let top3Produtos = await Produto.findAll({
        include: ['fotos'],
        where: {id: tresMais}
    })
    //.then(result => result.map(produto => produto.toJSON()));


    console.log(top3Produtos)

}



// teste3MaisVendidos();



/* for (let i of x){
     console.log(i.filename);
 }*/

//  let x = new Date().toLocaleString('pt-br')

async function todasCompras(){
    let x = await Compra.findAll();
    console.log(x)
}

todasCompras();
