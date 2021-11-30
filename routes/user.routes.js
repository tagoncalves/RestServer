const { Router } = require('express');
const { check } = require('express-validator');

//Importar Middlewares
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const validateJWT = require('../middlewares/validate-jwt');
const { isValidRole, isValidEmail, isValidId } = require('../helpers/db-validators');

//Importar Funciones
const { userGet,
    userPut,
    userPost,
    userPatch,
    userDelete } = require('../controllers/user.controllers');

const router = Router();

router.get('/', userGet);

router.put('/:id',[
    check('id','Is not a valid ID').isMongoId(),
    check('id').custom(isValidId),
    check('role').custom(isValidRole),
    fieldsValidate
], userPut);

router.post('/', [
    check('name','The name is required').not().isEmpty(),
    check('password','Password must contain more than 6 characters').isLength({min: 6}),
    check('email','The email is not valid').isEmail(),
    check('email').custom(isValidEmail),
    check('role').custom(isValidRole),
    fieldsValidate
], userPost);

router.delete('/:id',[
    validateJWT,
    check('id','Is not a valid ID').isMongoId(),
    check('id').custom(isValidId),
    fieldsValidate
], userDelete);

router.patch('/', userPatch);


module.exports = router;