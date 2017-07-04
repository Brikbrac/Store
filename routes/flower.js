var express = require('express');
var router = express.Router();

var assert = require('assert');
var md5 = require('md5');
var objectID = require('mongodb').ObjectId;
var Model = require('../models/model');

router.get('/', function(req, res, next) {
  new Model.Model( db => {
        db.collection('flowers')
        .find({})
        .project({_id : 0})
        .toArray((error, r) => {
            res.json(r);
            db.close();
        })
    });
});

router.get('/get/:id', (req, res, next) => {
    if(typeof req.params.id == "undefined") return false;

    new Model.Model((db) => {
        db.collection('flowers').find(objectID(req.params.id))
        .toArray(function(err, rp){
            assert.equal(null, err);

            db.close();
            res.json(rp);
        });
    })
    
});

router.get('/edit/:id', (req, res, next) => {
  
});



module.exports = router;
