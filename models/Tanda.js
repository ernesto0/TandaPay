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
            status: {type: String, default: 'waiting'},
            name: {type: String},
            isInSubgroup: {type: Boolean}
        },
           
          
    ],
    invited:[
        {
            email: {type: String, required: false},
            status: {type: String},
        }
    ],
    registrationCodes: [
        {
        code : {type: String, required : true},
        email: {type: String, required: true},
        tanda: this
        }
    ],
    subgroups:[
        {
            type: Schema.Types.ObjectId,
            ref : 'subgroup', 
        }
    ],

})

module.exports = Tanda = mongoose.model('tanda', TandaSchema);