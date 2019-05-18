module.exports = function(app){
    app.post('/addProject',function(req,res){
        console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').insertOne(req.body);
        res.send("Successfully added");
    })
    app.post('/addClient',function(req,res){
        console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('User').insertOne(req.body);
        res.send("Successfully added");
    })
    app.post('/deleteClient',function(req,res){
        console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        db.collection('User').deleteOne({'_id':ObjectId(req.body.id)});
        res.send("Successfully deleted");
    })
}