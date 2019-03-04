const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');

const Tanda = require('../../models/Tanda');


router.get('/test', (req, res) => res.json({msg: "tanda works"}));

//@route    GET api/tanda
//@desc     Get tandas - returns tandas
//@body     
//@access   Public
router.get('/', (req, res) => {
    Tanda.find()
    .then(tandas => res.json(tandas))
    .catch(err => res.status(404).json({noTandasFound: 'no tandas found'}));
})

//Craete Tanda
router.post('/create', passport.authenticate('jwt', {session: false}), (req,res) =>{
    const newTanda = new Tanda({
        name: req.body.name,
        secretary: req.user.id,
        members: [req.user.id]

    })
    
    newTanda.save().then(tanda => res.json(tanda)); 
})

//@route    POST api/tanda/addMember
//@desc     adds user to tanda if code and email are correct
//@body     email, newMemberID, code
//@access   Public 
router.post('/addMember', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const errors = {};
    Tanda.find()
    .where('members')
    .in(req.body.code)
    .then(tanda => {
        if(tanda.members.find(req.body.email)){
            tanda.members.push(req.body.newMemberID);
            tanda.save();
            return res.json(tanda);
        }
        errors.code = 'Email is not associated with code';

    })
    .catch(err => res.status(404).json({tandaDNE: 'Invalid code'}));
});

//Delete members
router.delete('/deleteMember', passport.authenticate('jwt', {session: false}), (req, res) => {
    Tanda.findById(req.body.tanda)
    .then(tanda => {
        if(tanda){
            var index = tanda.members.indexOf(req.body.user);
            tanda.members.splice(index, 1);
            tanda.save();
            return res.json(tanda.members);
        }
    })
});

//Get Members
router.get('/members', (req, res) => {
    Tanda.findById(req.body.tanda)
    .then(tandas => res.json(tandas.members))
    .catch(err => res.status(404).json({noTandasFound: 'no tandas found'}));
})

//Get Member
router.get('/member', (req, res) => {
    Tanda.findById(req.body.tanda)
    .then(tandas => res.json(tandas.members))
    .catch(err => res.status(404).json({noTandasFound: 'no tandas found'}));
})

//Delete Tanda

//invite members

module.exports = router;

