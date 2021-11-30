const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async( req = request, res = response) => {
    const { email, password } = req.body;

    try {   
        //Verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ){
            return res.status(400).json({
                msg:'User or password is wrong'
            });
        }

        //Verificar si el usuario esta activo
        if ( !user.status ){
            return res.status(400).json({
                msg:'User disabled'
            });
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, user.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg:'Password is wrong'
            });
        }


        //generar JWT
        const token = await generateJWT( user.id );



    //Respuesta si la validacion resultó correcta
        res.json({
            msg: 'Login ok',
            user,
            token
        })

    //Capturar el Error
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}