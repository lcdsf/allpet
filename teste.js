require('dotenv').config();

const {Cliente} = require('./database/models');

async function buscarClientes(){
    const clientes = await Cliente.findAll()
    .then(clientes => clientes.map(cliente => cliente.toJSON()));

    console.log(clientes);
}


buscarClientes();