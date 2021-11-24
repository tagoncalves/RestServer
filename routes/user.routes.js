
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/user.controllers');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('email','El correo no es valido').isEmail()
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);


module.exports = router;