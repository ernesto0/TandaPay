const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubgroupSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required: true
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref : 'users',
        }
    ],
    isLocked:{
        type: Boolean,
        default: false
    },
    tanda: {
        type: Schema.Types.ObjectId,
        ref : 'tanda', 
    }

})

module.exports = Subgroup = mongoose.model('subgroup', SubgroupSchema);