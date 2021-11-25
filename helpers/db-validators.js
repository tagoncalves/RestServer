const Role = require('../models/role');
const User = require('../models/user');

const isValidId = async(id) =>{
    const idExist = await User.findById(id);
    if ( !idExist ){
        throw new Error(`The Id ${ id } doesn't exist in the database`);
    }
}

const isValidEmail = async(email = '') =>{
    const emailExist = await User.findOne({email});
    if ( emailExist ){
        throw new Error(`The email ${ email } is already registred in database`);
    }
}

const isValidRole = async(role = '') => {
    const roleExist = await Role.findOne({ role });
    if ( !roleExist ) {
        throw new Error(`The role ${ role } doesn't exist in the database`);
    }
}


module.exports = {
    isValidRole,
    isValidEmail,
    isValidId
}