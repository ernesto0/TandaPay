const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TandaSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    secretary: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    members: [
        {
            user : {type: Schema.Types.ObjectId, ref : 'users'},
            status: {type: String, default: 'waiting'},
        }
    ],
    invited:[
        {
            user: {type: Schema.Types.ObjectId, ref : 'users'},
            status: {type: String, default: 'invited'},
        }
    ],
    registrationCodes: [{
        code: {type: Schema.Types.ObjectId, ref: 'users'},
        email: {type: String, required: true},
    }]

})

module.exports = Tanda = mongoose.model('tanda', TandaSchema);