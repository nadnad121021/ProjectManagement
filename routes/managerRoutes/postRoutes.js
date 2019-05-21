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
        //    db.collection('User').findOne({"Status":"Assigned","FullName":who},function(err,result){
        //      // console.log(result)
        //        var pro ={
        //            FullName:result.FullName,
        //            Username:result.Username,
        //            Password:result.Password,
        //            Type:result.Type,
        //            DateAdded:result.DateAdded,
        //            Status:result.Status,
        //            Projects:result.Projects
        //        };

        //     var projectssss = result.Projects;
        //     var projecccc = {
        //         ProjectName:"",
        //         Tasks:[],
        //         DateAssigned:"",
        //         Progress:0
        //     }
        //     var found = result.Projects.filter(function(item) { return item.ProjectName === Project ; });
        //         found[0].Progress = num;
        //        projecccc.ProjectName = found[0].ProjectName;
        //        projecccc.Tasks = found[0].Tasks;
        //        projecccc.DateAssigned = found[0].DateAssigned;
        //        projecccc.Progress = found[0].Progress;
        //     var noJohn = result.Projects.filter( el => el.ProjectName !== Project );
        //     noJohn.push(projecccc);
        //     pro.Projects = noJohn;
        //      db.collection('User').deleteOne({"FullName":who});
        //      db.collection('User').insertOne(pro);
        //    })
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
            // var Projs = [];
            // if(res.Projects){
            //     res.Projects.forEach(element => {
            //         Projs.push(element);
            //    });
            // }
                //db.collection('Projects').findOne({'_id':ObjectId(req.body.idProject)},function(err,result){
                    // console.log(result)
                    // var ProjectN = result.ProjectName;
                    // Projs.push(result.Tasks);
                    // var proj = {
                    //     ProjectName:ProjectN,
                    //     Tasks:Projs,
                    //     DateAssigned:req.body.DateAssigned,
                    //     Progress:result.Progress
                    // }
                    // Projects.push(proj);
                    db.collection('User').updateOne({'_id':ObjectId(req.body.idClient)},{$set:{"Status":"Assigned"}});
              //  })
            
        })
        res.send("Successfully Assigned");
    })
}