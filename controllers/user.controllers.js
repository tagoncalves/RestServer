const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

//-------------------Get - User - Paginado-----------------------\\ 
const userGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = {status:true};

    const [ total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number( from ))
        .limit(Number( limit ))
    ])
    res.json({
        total,
        users
    });
}

//---------------------Actualize User--------------------------\\
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
        user
    });
}



//--------------------Create User---------------------------\\
const userPost = async(req, res) => {

    const { name, email, password, role, status } = req.body;
    const user = new User({ name, email, password, role, status });

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


//--------------------User - Delete---------------------------\\
const userDelete = async(req, res) => {

    const { id } = req.params;

    // const uid = req.uid;
    
    // Borrar Fisicamente
    // const user = await User.findByIdAndDelete( id );

    //Cambiar estado
    const user = await User.findByIdAndUpdate( id, {status: false});

    const userAutenticated = req.user;
    


    res.json({
    user,
    userAutenticated
    });

    console.log("Usuario Eliminado");
}


//-----------------------------------------------------\\
const userPatch = (req, res) => {
    res.json({
        msg: 'Patch Api - controller'
    });
}




module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
};