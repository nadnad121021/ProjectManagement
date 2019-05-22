module.exports = function(app){
    app.post('/addProject',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        console.log(req.body.ProjectName)
        db.collection('Projects').findOne({"ProjectName":req.body.ProjectName},function(err,result){
            if(result){
                res.send("Project is already exist!")
            }else{
                db.collection('Projects').insertOne(req.body);
                res.send("Successfully added");
            }
        })
        //db.collection('Projects').insertOne(req.body);
        // res.send("Successfully added");
    })
    app.post('/addClient',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('User').findOne(req.body,function(err,result){
            if(result){
                res.send("Client is already exist!")
            }else{
                db.collection('User').insertOne(req.body);
                res.send("Successfully added");
            }
        })
       // db.collection('User').insertOne(req.body);
       
    })
    app.post('/updateProgress',function(req,res){
        console.log(req.body)
        var who = req.body.client;
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        db.collection('Projects').findOne({'_id':ObjectId(req.body.id)},function(err,result){
          console.log(result.ProjectName);
           var Project = result.ProjectName;
           var num = Number(result.Progress)+1;
           db.collection('Projects').updateOne({'_id':ObjectId(req.body.id)},{$set:{"Progress":num}});
        });
       // db.collection('Projects').updateOne({'_id':ObjectId(req.body.id)},{$set:{"Progress":"Assigned"}});
        //db.collection('User').insertOne(req.body);
        res.send("Successfully Updated");
    })
    app.post('/deleteClient',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        db.collection('User').deleteOne({'_id':ObjectId(req.body.id)});
        res.send("Successfully deleted");
    })
    app.post('/approve',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        // db.collection('Approval').updateOne({'_id':})
         db.collection('Approval').updateOne({'_id':ObjectId(req.body.Id)},{$set:{'Status':'Approved'}});
        //res.send("Successfully deleted");
    })
    app.post('/deny',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;  
         db.collection('Approval').updateOne({'_id':ObjectId(req.body.Id)},{$set:{'Status':'Denied'}});
        //res.send("Successfully deleted");
    })
    app.post('/assignClient',function(req,res){
        console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        // find Project name
        var ProjName;
        var Projects = [];
        
        db.collection('User').findOne({'_id':ObjectId(req.body.idClient)},function(err,res){
            console.log(res)
            db.collection('Projects').updateOne({'_id':ObjectId(req.body.idProject)},{$set:{"Type":"Taken","Client":res.FullName,"DateAssigned":req.body.DateAssigned}})
                    db.collection('User').updateOne({'_id':ObjectId(req.body.idClient)},{$set:{"Status":"Assigned"}});        
        })
        res.send("Successfully Assigned");
    })
}