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
            user: {type: Schema.Types.ObjectId, ref: 'users'},
            status: {type: String, default: 'waiting'}
        },
           
          
    ],
    invited:[
        {
            email: {type: String, required: true},
            status: {type: String, default: 'invited'},
        }
    ],
    registrationCodes: [
        {
        code : {type: String, required : true},
        email: {type: String, required: true},
        tanda: this
        }
    ]
})

module.exports = Tanda = mongoose.model('tanda', TandaSchema);