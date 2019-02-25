const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    secretary: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true
    },
    members: [{
            type: Schema.Types.ObjectId,
            ref : 'users',
    }],
    registrationCodes: [{
        type: String
    }]
})