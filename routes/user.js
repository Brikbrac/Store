var express = require('express');
var router = express.Router();

var assert = require('assert');
var md5 = require('md5');

var objectID = require('mongodb').ObjectId;
var Model = require('../models/model');

router.get('/', (req, res, next) => {
    new Model.Model( db => {
        db.collection('users')
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
        db.collection('users').find(objectID(req.params.id))
        .project({password:0})
        .toArray(function(err, rp){
            assert.equal(null, err);

            db.close();
            res.json(rp);
        });
    })
    
});

router.get('/add', (req, res, next) => {
    if(typeof req.query.mail == "undefined") { 
        res.json([{msg:'Mail undefined', type : 'Error'}]); return false; };
    
    if(typeof req.query.password == "undefined") { 
        res.json([{msg:'Password undefined', type : 'Error'}]); return false; };

    new Model.Model( db => {
        var user = db.collection('users');
        user.insertOne({
            name : req.query.name,
            email : req.query.mail,
            password : md5(req.query.password),
            token : md5(Date.now())
        },(err, rs) => {
            assert.equal(null, err);
            assert.equal(1, rs.insertedCount);
            
            user.find({ 
                email : req.query.mail, 
                password : md5(req.query.password)
            })
            .project({_id: 0, name: 0, email: 0, password: 0})
            .toArray( (errno, rp) => {
                assert.equal(null, errno);
                res.json(rp);
                db.close();
            });
        });
    });

});

router.post('/login', (req, res, next) => {
    new Model.Model( (db) => {
        db.collection('users')
        .find({ 
            email : req.query.mail, 
            password : req.query.password
        })
        .project({_id:0})
        .limit(1)
        .toArray( (errno, rp) => {
            assert.equal(null, errno);
            assert.equal(1, rp.length)
            res.json(rp);
            db.close();
        })
    });
});

router.get('/delete/:id', (req, res, next) => {
    if(typeof req.params.id == "undefined") return false;
    new Model.Model( (db) => {
        db.collection('users').remove({_id : objectID(req.params.id)});
        db.close();

        res.send('Remove: ' + req.params.id);
    });
});

module.exports = router;