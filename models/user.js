const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name:{
        type: String,
        require: [true,'Name is required']
    },
    email:{
        type: String,
        require: [true,'Email is required'],
        unique: true
    },
    password:{
        type: String,
        require: [true,'Password is required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type: Boolean,
        require: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );