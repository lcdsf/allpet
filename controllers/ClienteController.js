const {Cliente, Endereco} = require("../database/models");
//const fs = require('fs');

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
        rua, cep, numero, bairro, cidade, estado, complemento, 
        email, senha, confirmaSenha} = req.body;

        //let fotoperfil =  JSON.stringify(req.file);

     //   console.log('FILENAME:      ', req.file.filename);
        
       // if (!fotoperfil) fotoperfil = "defaultprofile.jpg";

      //  if (!req.file.filename) req.file.filename = "/img/defaultprofile.jpg";

      //let filename = "defaultprofile.jpg";



        
            
        if (senha === confirmaSenha){ 
            
            //Var cliente para guardar id a ser vinculado com o endereço


            let cliente;

            if (!req.file){
                cliente = await Cliente.create(
                    {
                        nome,
                        sobrenome,
                        email,
                        senha,
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
                        senha,
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

            res.redirect('/');
        }

        
    }
};

module.exports = clienteController;