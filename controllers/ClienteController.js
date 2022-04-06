const {Cliente, Endereco} = require("../database/models");

const clienteController = {

    index: async (req, res) =>{
        const clientes = await Cliente.findAll();
        res.render('listaClientes', { clientes } );
    },

    create: (req, res) => {
        res.render("cadastroUser");
    }, 

    store: async (req, res) =>{

        const {nome, sobrenome, cpf, telefone, 
        rua, numero, bairro, cidade, estado, complemento, 
        email, senha, confirmaSenha} = req.body;
        
            
        if (senha === confirmaSenha){ 
            
            //Var cliente para guardar id a ser vinculado com o endereço
            const cliente = await Cliente.create(
                {
                    nome,
                    sobrenome,
                    email,
                    senha,
                    cpf,
                    telefone,
                    data_cadastro: Date.now()
                }
            );
 

            await Endereco.create(
                {
                    rua,
                    numero,
                    bairro,
                    cidade,
                    estado,
                    complemento,
                    clientes_id: cliente.id
                }
            );

            res.redirect('/');
        }

        
    }
};

module.exports = clienteController;