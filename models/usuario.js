const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name:{
        type: String,
        require: [true,'El nombre es Obligatorio']
    },
    email:{
        type: String,
        require: [true,'El correo es Obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true,'la contraseña es Obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    state:{
        type: Boolean,
        require: true
    },
    google:{
        type: Boolean,
        default: false
    }
});



module.exports = model( 'Usuario', UsuarioSchema );