var MongoClient = require('mongodb').MongoClient;
var Config = require('../bin/DBConfigs');
var assert = require('assert');
var DBCollections = {
    users: 'users',
    flowers: 'flowers'
}
class Model{
    constructor(callback){
        this.url = 'mongodb://localhost:' + Config.db.Port + '/' + Config.db.DBName;
        MongoClient.connect(this.url, function (err, db) {
            assert.equal(null, err);

            console.log("Connected correctly to server");
            //autoload.createValidated(db, () => db.close());
            ///db.close();
            callback(db);
        });
    }
}

module.exports.Model = Model;