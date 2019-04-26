const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const Claim = require('../../models/Claim');
const Subgroup = require('../../models/SubGroups');

router.get('/test', (req, res) => res.json({msg: "Claim works"}));
  
router.get('/', (req, res) => {
    Claim.find()
    .then(claim => res.json(claim))
    .catch(err => res.status(404).json({noClaimsFound: 'no users found'}));
})

router.post('/getClaimbyID', (req, res) => {
    Claim.findOne({'_id': req.body.claimID})
    .then(claim => {
        return res.json(claim);
    })
    .catch(err => res.status(404).json({noClaimFound: 'no subgroup found'}));
})

router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    const newClaim = new Claim({
        claimant:{
            user: req.body.claimantID,
            name: req.body.name, 
        },
        evidence: req.body.evidence,
        description: req.body.description
    })
    newClaim.save();
    
    Subgroup.findById(req.body.subgroupID) 
        .then(subgroup => {
        let claims = subgroup.claims;
        console.log(claims);
        claims.push(newClaim._id);
        subgroup.claims = claims;
        subgroup.save();
    });
    
    return res.json(newClaim);
    

})

router.post('/delete', (req, res) => {

    Claim.deleteOne({'_id': req.body.claimID})
    .then(claim => {
        Subgroup.findById(req.body.subgroupID)
        .then(subgroup => {
            var index = subgroup.claims.indexOf(req.body.claimID);
            subgroup.claims.splice(index, 1);
            subgroup.save(); 
        })
        return res.json(claim);
    });
})

router.post('/updateEvidence', (req, res) => {
    Claim.findByIdAndUpdate(req.body.claimID, {evidence: req.body.evidence}, {new: true})
    .then(claim =>{
        console.log(claim);
        return res.json(claim);
    });

})






module.exports = router;