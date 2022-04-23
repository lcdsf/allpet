require('dotenv').config();

const {Cliente, Endereco, CategoriaPrincipal, CategoriaEspecifica, 
    Produto, Administrador, Compra, FormaPgto, Avaliacao,
Boleto, Cartao, ChavePix, Requerimento, StatusRequerimento,
StatusCompra, ItemCompra, Foto} = require('./database/models');

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
    const itens = await Produto.findAll( {include: ['categoria', 'avaliacoes','itens_compras']} )
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



teste();




/* for (let i of x){
     console.log(i.filename);
 }*/

