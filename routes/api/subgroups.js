const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');

const Subgroup = require('../../models/SubGroups');

router.get('/test', (req, res) => res.json({msg: "tanda works"}));

//@route    GET api/tanda
//@desc     Get subgroup - returns subgroup
//@body     
//@access   Public
router.get('/', (req, res) => {
    Subgroup.find()
    .then(subgroup => res.json(subgroup))
    .catch(err => res.status(404).json({noSubgroupsFound: 'no subgroups found'}));
})

//@route    GET api/tanda
//@desc     Get subgroup - returns subgroup
//@body     
//@access   Public
router.post('/getSubgroupByID', (req, res) => {
    Subgroup.findOne({'_id': req.body.subgroupID})
    .then(subgroup => {
        return res.json(subgroup);
    })
    .catch(err => res.status(404).json({noSubgroupsFound: 'no subgroup found'}));
})

//Craete Tanda
router.post('/create', passport.authenticate('jwt', {session: false}), (req,res) =>{
    const newSubgroup = new Subgroup({
        name: req.body.name,
        admin: req.user.id,
        members: [req.user.id],
        tanda: req.body.tandaID

    })
    
    newSubgroup.save().then(subgroup => res.json(subgroup)); 
})

//@route    POST api/subgroup/addMember
//@desc     adds user to subgroup if code and email are correct
//@body     email, newMemberID, code
//@access   Public 
router.post('/addMember', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const errors = {};
    newMember = {'user' : req.body.newMemberID, 'name': req.body.name};
    Subgroup.findByIdAndUpdate(req.body.subgroupID, 
    {$push: {members: newMember}})
    .then(subgroup => {
            console.log(subgroup.members);
            return res.json(subgroup);
      
    })
    .catch(err => res.status(404).json({tandaDNE: 'Invalid code'}));

});

//Delete members
router.delete('/deleteMember', passport.authenticate('jwt', {session: false}), (req, res) => {
    Subgroup.findById(req.body.id)
    .then(subgroup => {
        if(subgroup){
            var index = subgroup.members.indexOf(req.body.user);
            subgroup.members.splice(index, 1);
            subgroup.save();
            return res.json(subgroup.members);
        }
    })
});

//Get Members
router.get('/members', (req, res) => {
    Subgroup.findById(req.body.id)
    .then(subgroup => res.json(subgroup.members))
    .catch(err => res.status(404).json({noSubgroupsFound: 'no subgroup found'}));
})

//Get Member
router.get('/memberByID', (req, res) => {
    Subgroup.findBy({'members' : req.body.user})
    .then(subgroup => {
        let i = subgroup.members.indexOf[req.body.user];
        return res.json(subgroup.members[i]);
    })
    .catch(err => res.status(404).json({noSubgroupsFound: 'no subgroup found'}));
})

//Delete Subgroup
router.post('/delete', (req, res) => {

    console.log(req.body.id);

    Subgroup.deleteOne({'_id': req.body.id})
    .then(subgroup => res.json(subgroup))
})

module.exports = router;
