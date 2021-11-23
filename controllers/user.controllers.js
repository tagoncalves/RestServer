const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

//-----------------------------------------------------\\
const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'no name', page = '1' , limit} = req.query;

    res.json({
    msg: 'Get Api - controlador',
    q,
    nombre,
    page,
    limit
    });
}
//-----------------------------------------------------\\
const usuariosPut = (req, res) => {
    const { id } = req.params;
    
    res.status(201).json({
        msg: 'Put Api - controlador',
        id
    });
}
//-----------------------------------------------------\\
const usuariosPost = async(req, res) => {
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Verificar si el correo existe

    // Encriptar la contraseña
    try {
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
    } catch (error) {
        console.log(error);
    }

    //Guardar en BD
    await usuario.save();
    
    res.json({
        usuario
    });
}
//-----------------------------------------------------\\
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch Api - controlador'
    });
}

//-----------------------------------------------------\\
const usuariosDelete = (req, res) => {
    res.json({
    msg: 'Delete Api - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};