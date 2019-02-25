const Validator = require('validator');
const isEmpty =  require('./is-empty');

module.exports = function validateCodeInput(data){
    let errors = {};

    data.code = !isEmpty(data.code) ? data.code: '';
 
    if(!Validator.isEmail(data.code)){
        errors.code = 'Code is invalid';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };

}