const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.post('/logincliente', loginController.clienteStore);
router.get('/admin/login', loginController.adminIndex);
router.post('/admin/login', loginController.adminStore);


module.exports  = router;
