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
        console.log(req.body)
        var who = req.body.client;
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var ObjectId = require('mongodb').ObjectID;
        db.collection('Projects').findOne({'_id':ObjectId(req.body.id)},function(err,result){
          console.log(result.ProjectName);
           var Project = result.ProjectName;
           var num = Number(result.Progress)+1;
           //db.collection('Projects').updateOne({'_id':ObjectId(req.body.id)},{$set:{"Progress":num}});
           db.collection('User').findOne({"Status":"Assigned","FullName":who},function(err,result){
              // console.log(result)
               var pro = result;
            
              // console.log(pro)
              
               //console.log(noJohn)
            //    result.Projects.forEach(function(item){
            //       console.log(item)

            //       Proje = item;
            //    })
            var found = result.Projects.filter(function(item) { return item.ProjectName === Project ; });
                found.Progress = num;
            var noJohn = result.Projects.filter( el => el.ProjectName !== Project );
                console.log(found)
             noJohn.push(found);
             //console.log(noJohn)
             pro.Projects = noJohn;
             //console.log(pro)
           })
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
            var Projs = [];
            if(res.Projects){
                res.Projects.forEach(element => {
                    Projs.push(element);
               });
            }
                db.collection('Projects').findOne({'_id':ObjectId(req.body.idProject)},function(err,result){
                    console.log(result)
                    var ProjectN = result.ProjectName;
                    Projs.push(result.Tasks);
                    var proj = {
                        ProjectName:ProjectN,
                        Tasks:Projs,
                        DateAssigned:req.body.DateAssigned,
                        Progress:result.Progress
                    }
                    Projects.push(proj);
                    db.collection('User').updateOne({'_id':ObjectId(req.body.idClient)},{$set:{"Status":"Assigned","Projects":Projects}});
                })
            
        })

        // db.collection('Projects').findOne({'_id':ObjectId(req.body.idProject)},function(err,result){
        //     console.log(result.Tasks);
        //     ProjName = result.ProjectName;
        //     var proj = {
        //         Client:"",
        //         ProjectName:ProjName,
        //         Tasks:[]
        //     }
        //     //console.log(ProjName)
        //     db.collection('User').findOne({'_id':ObjectId(req.body.idClient)},function(err,res){
        //       // console.log(res.FullName)
        //        var Projs = [];
        //        if(res.Projects){
        //            //console.log("Defined")
        //            res.Projects.forEach(element => {
        //               Projs.push(element);
        //            });
        //            Projs.push(ProjName)

        //        }else{
        //            Projs.push(ProjName)
        //        }
        //       // db.collection('User').updateOne({'_id':ObjectId(req.body.idClient)},{$set:{"Status":"Assigned","DateAssigned":req.body.DateAssigned,"Projects":Projs}});
        //        //db.collection('Projects').updateOne({'_id':ObjectId(req.body.idProject)},{$set:{"Type":"Taken","Client":res.FullName}})
        //     })
        // })
        //db.collection('Projects').updateOne({'_id':ObjectId(req.body.idProject)},{$set:{"Status":"Taken","Projects":[]}});
        res.send("Successfully Assigned");
    })
}