const jwt = require('jsonwebtoken');
const myKey = process.env.SECRETORPRIVATEKEY;

//Funcion generar JsonWebToken mediante un unico Id
const generateJWT = ( uid = '') => {

    return new Promise( (resolve, reject)  => {
        const payload = { uid };

        jwt.sign( payload, myKey, {
            expiresIn: '4h'
        }, (err , token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })

    })

}

module.exports = {
    generateJWT,
    myKey
}