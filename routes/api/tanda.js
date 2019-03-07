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

//@route    GET api/tanda
//@desc     Get tandas - returns tandas
//@body     
//@access   Public
router.post('/getTandaByID', (req, res) => {
    Tanda.findOne({'_id': req.body.id})
    .then(tanda => {
        return res.json(tanda);
    })
    .catch(err => res.status(404).json({noTandasFound: 'no tandas found'}));
})

//@route    GET api/tanda
//@desc     Get tandas - returns tandas
//@body     
//@access   Public
router.post('/checkCode', (req, res) => {
    Tanda.findOne({'registrationCodes.email': req.body.email, 'registrationCodes.code': req.body.code})
    .then(tanda => {
        // console.log(req.body.email);
        return res.json(tanda);
    })
    .catch(err => res.status(404).json({tandaDNE: 'Invalid code'}));
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
    Tanda.findOneAndUpdate({'registrationCodes.email': req.body.email}, 
    {$push: {members: {'user' : req.body.newMemberID}}})
    .then(tanda => {
            console.log(tanda);
            var index = tanda.invited.indexOf(req.body.newMemberID);
            if(index!== -1){
                tanda.invited.splice(index, 1);
            }
            tanda.save;
            return res.json(tanda);
      
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
    Tanda.findById(req.body.id)
    .then(tanda => res.json(tanda.members))
    .catch(err => res.status(404).json({noTandasFound: 'no tanda found'}));
})

//Get Member
router.get('/memberByID', (req, res) => {
    Tanda.findBy({'members' : req.body.user})
    .then(tanda => {
        let i = tanda.members.indexOf[req.body.user];
        return res.json(tanda.members[i]);
    })
    .catch(err => res.status(404).json({noTandasFound: 'no tanda found'}));
})

//Delete Tanda
router.post('/delete', (req, res) => {

    console.log(req.body.name);

    Tanda.deleteOne({'name': req.body.name})
    .then(tanda => res.json(tanda))
})

//invite members

module.exports = router;

