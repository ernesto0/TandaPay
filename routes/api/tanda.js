const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');

//load user validation
const validateCodeInput = require('../../validation/join');

const Tanda = require('../../models/Tanda');

router.get('/test', (req, res) => res.json({msg: "tanda works"}));

//@route    POST api/users/register
//@desc     Register user
//@body     name, email, password
//@access   Public   
router.post('/join', (req,res) => {

    const {errors, isValid} = validateCodeInput(req);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    // use tanda code and reg code?
    // search for tanda by what
    // resp is tanda
    Tanda.findOne({code: req})
    .then(tanda => {
        if(tanda){
            // uhhh
        }else{
            errors.code = 'No Tanda is associated with this code.';
            return res.status(400).json(errors);
        }
    })
})
