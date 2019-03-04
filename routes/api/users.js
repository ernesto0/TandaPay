const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load user validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: "Users works"}));
  

router.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({noUsersFound: 'no users found'}));
})


//@route    POST api/users/register
//@desc     Register user
//@body     name, email, password
//@access   Public   
router.post('/register', (req,res) => {
    // const {errors, isValid} = validateRegisterInput(req.body);

    // //check validation
    // if(!isValid){
    //     return res.status(400).json(errors);
    // }
    let errors = {};

    User.findOne({email: req.body.email})
    .then(user => {
        console.log("here");
        if(user){
            errors.email = 'An account is already registered with this email address';
            return res.status(400).json(errors);
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password   
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
})

//@route    POST api/users/login
//@desc     Login User / returns jwt
//@body     email, password
//@access   Public  
router.post('/login', (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);

    //check validation
    // if(!isValid){
    //     return res.status(400) .json(errors) ;
    // }

    let errors = {};

    console.log(req.body.email);
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
        .then(user => {
            //check if user exists
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            //Authenticate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //password is correct
                    if(isMatch){
                       //create payload
                       const payload = { id: user.id, name: user.name }
                       
                       //sign token
                       jwt.sign(payload, keys.secretOrKey, {expiresIn: 86400}, (err, token)=>{
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                       });
                    }
                    else{
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
                
        })
})

//@route    GET api/users/curent
//@desc     Return current user
//@access   Private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json(req.user);
})

//Delete User
router.post('/delete', (req, res) => {

    User.deleteOne({'email': req.body.email})
    .then(user => res.json(user))
})




module.exports = router;