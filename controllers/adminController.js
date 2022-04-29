const {Administrador} = require('../database/models');

const adminController = {
    index: async (req, res) => {
        res.render('areaAdmin');
    },

    login: async (req, res) => {
        res.render('loginAdmin');
    },

    store: async (req, res) => {

        const erros = validationResult(req);

        //console.log('CONTEUDO DE ERRROS: ', erros);

        if (!erros.isEmpty()){
            res.render('cadastroUser', { erros: erros.array().map(erro => erro.msg) });
            //return;
        }

        const {nome, sobrenome, email, senha, confirmaSenha} = req.body;

        if (senha === confirmaSenha){ 
            
            await Administrador.create(
                {
                    nome,
                    sobrenome,
                    email,
                    senha: bcrypt.hashSync(senha, 10),
                    data_cadastro: Date.now(),
                }
            );
            res.render('cadastroAdmin', {cadastroOK: 'Cadastro realizado com sucesso!'});
        }else{
            res.render('cadastroAdmin', {erro: 'Senhas não coincidem, tente novamente.'});
        }

        
    },

    sair: async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = adminController;