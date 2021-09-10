var express = require('express');
var router = express.Router();
const pool = require('../database');

const passport = require('passport');

router.get('/signin', (req, res, next)=> {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin',{
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});


router.get('/signup', (req, res)=> {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/signin',
  failureRedirect: '/signup',
  failureFlash: true
}));

module.exports = router