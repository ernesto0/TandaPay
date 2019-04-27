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
        type: Boolean,
        default: false
    },
    isInSubgroup: {
        type: Boolean,
        default: false
    },
    memberOfTanda: {
        type: Schema.Types.ObjectId, 
        ref : 'tanda'
    },
    memberOfSubgroup: {
        type: Schema.Types.ObjectId, 
        ref : 'subgroup'
    }
});

module.exports = User = mongoose.model('users', UserSchema);