const jwt_decode = require('jwt-decode');

module.exports = function parseJwt(token){
    return jwt_decode(token);
}