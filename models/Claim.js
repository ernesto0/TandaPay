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

    amount:{
        type: Number
    },

    status:{
        type: String,
        default: 'pending'
    },

    



})

module.exports = Claim = mongoose.model('claim', ClaimSchema);