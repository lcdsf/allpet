require('dotenv').config();

const {Cliente, Endereco, CategoriaEspecifica} = require('./database/models');

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
            nome: "Receba",
            sobrenome: "Zequel",
            email: "recebaaa@mail.com",
            senha: "1234",
            cpf: "00011122299",
            telefone: "669999999",
            data_cadastro: Date.now()
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

cadastraCatEsp();