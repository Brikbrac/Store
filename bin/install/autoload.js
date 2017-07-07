var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var Config = require('../DBConfigs');
var DBCollections = {
    users: 'users',
    flowers: 'flowers'
}

class autoload {
    constructor() {
        this.url = 'mongodb://localhost:' + Config.db.Port + '/' + Config.db.DBName;
    }

    getCon() {
        MongoClient.connect(this.url, function (err, db) {
            try{
                assert.equal(null, err);
            } catch (MongoError){
                console.log('Connection error with MongoDB');
                process.exit();
                return false;
            }
            

            console.log("Connected correctly to server");
            autoload.createValidated(db, () => db.close());
        });
    }
    static createValidated(db, callback) {
        db.collection(DBCollections.users, { strict: true }, (err, r) => {
            //console.log(err);
            try { 
                assert.notEqual(null, err); 
                db.createCollection(DBCollections.users,
                    {
                        'validator': {
                            '$or':
                            [
                                { 'name': { '$type': "string" } },
                                { 'email': { '$regex': /\S+@\S+\.\S+/ } } ,
                                { 'password': { '$type': "string" } },
                                { 'token' : {'$type' : "string"}}
                            ]
                        }
                    },
                    (err, results) => {
                        assert.equal(null, err);
                        console.log("Collection User created.");
                        //callback();
                        db.collection(DBCollections.flowers, { strict : true}, (err, r) => {
                            try{ assert.notEqual(null, err); } catch (AssertionError) { return false; }
                            db.createCollection(DBCollections.flowers, {
                                'validator' :{
                                    '$or':[
                                        {'name' : {'$type' : "string"}},
                                        {'price' : {'$type' : "double"}},
                                        {'color' : {'$type' : "string"}}
                                    ]
                                }
                            },
                            (err, res) => {
                                assert.equal(null, err);
                                
                                var insert = [
                                    { 
                                        name : "BOUQUET ADONIS", 
                                        price : 149, 
                                        color : 'Pink', 
                                        description : 'Spécial Saint Valentin ! C’est pour comparateur-fleuriste.com, le bouquet de la saint valentin.'
                                    },
                                    {
                                        name : "BOUQUET FEELING", 
                                        price : 30.5, 
                                        color : 'Red', 
                                        description : `Spécial Saint-Valentin ! Faites plaisir et dites lui combien vous l’aimez 
                                        follement avec ce magnifique bouquet spécialement conçu par les fleuristes de florajet pour un moment inoubliable`
                                    },
                                    {
                                        name : "BOUQUET MARTINGALE", 
                                        price : 77.3, 
                                        color : 'Green', 
                                        description : `Spécial Saint Valentin ! Voilà un bouquet qui ne laisse rien au hasard. Avec ce superbe bouquet, 
                                        ue vous pouvez faire livrer par internet à la destination de votre choix par un fleuriste (évidemment), 
                                        vous n’aurez plus besoin de parler`
                                    }
                                ];

                                db.collection(DBCollections.flowers).insertMany(insert, (err, res) => {
                                    assert.equal(null, err);
                                    assert.equal(insert.length, res.insertedCount);

                                    db.close();
                                    callback();
                                })
                                console.log("Collection flowers created");
                            });
                        });
                    }
                );
            } catch (AssertionError) { return false;}
        });

    };
}

module.exports.autoload = autoload;