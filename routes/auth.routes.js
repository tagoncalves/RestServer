const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldsValidate } = require('../middlewares/fieldsValidate');

const router = Router();


router.post('/login',[
    check('email', 'The  email is requested').isEmail(),
    check('password', 'The password is requested').not().isEmpty(),
    fieldsValidate
] ,login );



module.exports = router;