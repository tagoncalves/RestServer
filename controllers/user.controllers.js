const { response } = require('express');
const { request } = require('express');

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
const usuariosPut = (req, res) => {
    const { id } = req.params;

    res.status(201).json({
    msg: 'Put Api - controlador',
    id
});
}
const usuariosPost = (req, res) => {
    const {nombre, edad = 18} = req.body;

    res.json({
    msg: 'Post Api - controlador',
    nombre,
    edad
});
}
const usuariosPatch = (req, res) => {
    res.json({
    msg: 'Patch Api - controlador'
});
}

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