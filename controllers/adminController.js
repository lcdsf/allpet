const {Administrador} = require('../database/models');

const adminController = {
    index: async (req, res) =>{
        res.render('areaAdmin');
    }
}

module.exports = adminController;