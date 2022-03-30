const {Cliente} = require("../database/models");

const ClienteController = {

    create: (req, res) => {
        res.render("cadastroUser");
    }, 

    store: async (req, res) =>{
        
        let idcliente;

        const {nome, sobrenome, cpf, telefone, 
        rua, numero, bairro, cidade, estado, complemento, 
        email, senha, confirmaSenha} = req.body;
        
            
        if (senha === confirmaSenha){    
            await Cliente.create(
                {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    senha: senha,
                    cpf: cpf,
                    telefone: telefone,
                    data_cadastro: Date.now()
                }
            );


        }

        //res.send(req.body);

        res.redirect('/');
    }
};

module.exports = ClienteController;