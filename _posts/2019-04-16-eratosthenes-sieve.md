---
title:  "Union Find"
excerpt: "Union Find By Lank With Path Compression"

categories:
 - Algorithm

tags:
  - Data Structure
  
last_modified_at: 2019-09-13T08:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo2.jpg
  overlay_filter: 0.3 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"
---
# code
```js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Mongoose user model
const User = require('../models/User');
// If user approach to /user/login
router.get('/login', (req, res) => res.render('login'));
// If user approach to /user/register 
router.get('/register', (req, res) => res.render('register'));

// Register Handle
// If POST method which is in register.ejs is executed
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];
    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }
    // Check passwords match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }
    // Check passwords length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }
    // If not satisfied conditions are exist
    if (errors.length > 0) {
        // Reload the register page.
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        // Validation passed
        User.findOne({ email: email}) // Find specific user in database.
        .then(user => {
            if(user){ // If user is already exists
                errors.push({ msg: 'Email is already registered'});
                // Reload the register page.
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{ // If user is not exists
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });
                // Hash password
                bcrypt.genSalt(10, (err, salt) => // Generate salt
                 bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        //Save user
                        newUser.save() // Return promise
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can login');
                            res.redirect('/users/login');
                        }).catch(err => console.log(err));
                    }))
            }
        });
    }
});

// Login handle
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

  // Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
module.exports = router;
```