const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');
const Tanda = require('../../models/Tanda');
const User = require('../../models/User');
const Subgroup = require('../../models/SubGroups');
const Claim = require('../../models/Claim');

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
        members: [{user: req.user.id, name: req.body.userName}],
        tanda: req.body.tandaID       
    })
    
    newSubgroup.save();

    User.findByIdAndUpdate(req.user.id, {isInSubgroup: true})
            .then(user => {
                console.log(user);
            });
    
        Tanda.findByIdAndUpdate(req.body.tandaID, 
            {$push: {subgroups: newSubgroup}}, {new: true})
            .then(tanda =>{
                let index = -1;
                for (var i = 0; i < tanda.members.length; i++){
                    if(tanda.members[i]['user'] == req.user.id){
                        index = i;
                        break;
                    }
                }
                const newMem = tanda.members[index];
                newMem.isInSubgroup = true;
                console.log(index);
                console.log (tanda);
                tanda.members[index] = newMem;
                tanda.save();
 
            })
    
            return res.json(newSubgroup);  
      


    // Subgroup.findById(req.body.subgroupID)
    // .then(subgroup => {
    //     let index = subgroup.members.indexOf(req.body.newMember);
    //     subgroup.members[index] = newMember;
    //     subgroup.save();
    //     return res.json(subgroup);
    // })
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
            Tanda.findById(subgroup.tanda)
            .then(tanda => { 
                console.log("members!! "+tanda.members);
                let index = -1;
                
                for (var i = 0; i < tanda.members.length; i++){
                    if(tanda.members[i]['user'] == req.body.newMemberID){
                        index = i;
                        break;
                    }
                }

                console.log(index);
                const newMem = tanda.members[index];
                newMem.isInSubgroup = true;
                console.log(index);
                console.log (newMem);
                tanda.members[index] = newMem;
                tanda.save();
            });
            User.findByIdAndUpdate(req.body.newMemberID, {isInSubgroup: true, memberOfSubgroup: subgroup._id})
            .then(user => {
                console.log(user);
            });
            console.log(subgroup.members);
            return res.json(subgroup);
      
    })
    .catch(err => res.status(404).json({tandaDNE: 'Invalid code'}));
})

//Delete members
router.delete('/deleteMember', passport.authenticate('jwt', {session: false}), (req, res) => {
    Subgroup.findById(req.body.id)
    .then(subgroup => {
        if(subgroup){
            var index = subgroup.members.indexOf(req.body.user);
            subgroup.members.splice(index, 1);
            subgroup.save(); 


            User.findByIdAndUpdate(req.body.user, {isInSubgroup: false, memberOfSubgroup: null})
            .then(user => {
                console.log(user);
            });
            return res.json(subgroup);
        }
    });

});

//Get Members
router.get('/members', (req, res) => {
    Subgroup.findById(req.body.id)
    .then(subgroup => res.json(subgroup.members))
    .catch(err => res.status(404).json({noSubgroupsFound: 'no subgroup found'}));
})

//Get claims
router.get('/claims', (req, res) => {
    Subgroup.findById(req.body.id)
    .then(subgroup => res.json(subgroup.claims))
    .catch(err => res.status(404).json({noSubgroupsFound: 'no subgroup found'}));
})

//Get claims
router.get('/claimObject', (req, res) => {
    Subgroup.findById(req.body.id)
    .then(subgroup => {
        let claimDetails = [];
        for(let x=0; x<subgroup.claims.length; x++){
            Claim.findById(subgroups.claims[x])
            .then(claim => {
                claimDetails.push(claim);
            })
        }
        return res.json(claimDetails);
    })
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

    console.log("delete: "+req.body.id);

    Subgroup.deleteOne({'_id': req.body.id})
    .then(subgroup => {
        Tanda.findById(req.body.tandaID)
        .then(tanda => {
            var index = tanda.subgroups.indexOf(req.body.id);
            tanda.subgroups.splice(index, 1);
            tanda.save(); 
        })
        return res.json(subgroup);
    })
})

module.exports = router;
