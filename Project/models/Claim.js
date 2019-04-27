const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
    claimant:{
        user: {type: Schema.Types.ObjectId, ref : 'users'},
        name: String
    },
    
    date:{
        type: Date,
        default: Date.now
    },

    evidence:{
        type: String
    },

    status:{
        type: String,
        default: 'pending'
    },

    description:{
        type: String
    }

    



})

module.exports = Claim = mongoose.model('claim', ClaimSchema);