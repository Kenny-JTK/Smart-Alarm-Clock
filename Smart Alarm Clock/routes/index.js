'use strict';
var express = require('express');
var router = express.Router();
var jsondb = require('node-json-db');
var settings = new jsondb("./settings/config");

/* GET home page. */
router.get('/', function (req, res) {
    var input = settings.getData("/");
    res.render('index', { title: 'Smart Alarm Clock', jsonInput: input });
});

router.get('/settings', function (req, res) {
    var input = settings.getData("/");
    res.json(input);
});


module.exports = router;
