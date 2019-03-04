const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isInTanda: {
        type: boolean,
        default: false
    },
    memberOf: {
        type: Schema.Types.ObjectId, 
        ref : 'tanda'
    }
});

module.exports = User = mongoose.model('users', UserSchema);