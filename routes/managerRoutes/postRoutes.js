module.exports = function(app){
    app.post('/addProject',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').insertOne(req.body);
        res.send("Successfully added");
    })
    app.post('/addClient',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('User').insertOne(req.body);
        res.send("Successfully added");
    })
    app.post('/updateProgress',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        db.collection('Projects').findOne({'_id':ObjectId(req.body.id)},function(err,result){
          // console.log(result.Progress);
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
    app.post('/assignClient',function(req,res){
        //console.log(req.body);
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        // find Project name
        var ProjName;
        db.collection('Projects').findOne({'_id':ObjectId(req.body.idProject)},function(err,result){
            console.log(result.Tasks);
            ProjName = result.ProjectName;
            
            //console.log(ProjName)
            db.collection('User').findOne({'_id':ObjectId(req.body.idClient)},function(err,res){
              // console.log(res.FullName)
               var Projs = [];
               if(res.Projects){
                   //console.log("Defined")
                   res.Projects.forEach(element => {
                     Projs.push(element);
                   });
                   Projs.push(ProjName)
               }else{
                  Projs.push(ProjName)
               }
               db.collection('User').updateOne({'_id':ObjectId(req.body.idClient)},{$set:{"Status":"Assigned","DateAssigned":req.body.DateAssigned,"Projects":Projs}});
               db.collection('Projects').updateOne({'_id':ObjectId(req.body.idProject)},{$set:{"Type":"Taken","Client":res.FullName}})
            })
        })
        //db.collection('Projects').updateOne({'_id':ObjectId(req.body.idProject)},{$set:{"Status":"Taken","Projects":[]}});
        res.send("Successfully Assigned");
    })
}