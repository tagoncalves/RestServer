const { request, response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { myKey } = require('../helpers/generate-jwt');
const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    console.log(token);

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify( token , myKey );

        // leer el usuario que corresponde al uid

        const user = await User.findById( uid );

        req.user = user;


        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token invalido'
        });
        
    }

    next();
}




module.exports = validateJWT;