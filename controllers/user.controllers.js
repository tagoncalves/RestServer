const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

//-----------------------------------------------------\\
const userGet = (req = request, res = response) => {

    const { q, name , page, limit} = req.query;

    res.json({
    msg: 'Get Api - controller',
    q,
    name,
    page,
    limit
    });
}
//---------------------Put---------------------------\\
const userPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //TODO: Validar contra base de datos

    if ( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(5);
        resto.password = bcryptjs.hashSync( password, salt ); 
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.status(201).json({
        msg: 'Put Api - controller',
        user
    });
}



//--------------------Post-------------------------------\\
const userPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Verificar si el correo existe

    // Encriptar la contraseña
    try {
        const salt = bcryptjs.genSaltSync(5);
        user.password = bcryptjs.hashSync( password, salt );
        
    } catch (error) {
        console.log(error);
    }

    //Guardar en BD
    await user.save();
    
    res.json({
        user
    });
}
//-----------------------------------------------------\\
const userPatch = (req, res) => {
    res.json({
        msg: 'Patch Api - controller'
    });
}

//-----------------------------------------------------\\
const userDelete = (req, res) => {
    res.json({
    msg: 'Delete Api - controller'
    });
}



module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
};