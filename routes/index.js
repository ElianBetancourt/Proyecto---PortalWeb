var express = require('express');
var router = express.Router();
const pool = require('../database');

const passport = require('passport');

/* GET index / page. */
  router.get('/', function(req, res, next) {
    res.render('auth/signin');
  });
  
  router.get('/home', function(req, res, next) {
    res.render('home');
  });
  
 



 module.exports = router;