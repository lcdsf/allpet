const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.post('/logincliente', loginController.clienteStore);
router.post('/loginadmin', loginController.adminStore);
// router.get('/admin/login', loginController.adminIndex);


module.exports  = router;
