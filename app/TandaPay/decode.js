import JWT from 'jwt-claims';

const key = 'secret'
export default function (token) {return JWT(token)};