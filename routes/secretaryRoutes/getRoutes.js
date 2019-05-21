module.exports = function(app){
    app.get('/sec_takenProjects',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').find({"Type":"Taken"}).toArray(function(err,doc){
            res.render('../views//sec_takenProjects.ejs',{User:req.session.username,Project:doc});
        });
       // res.render('../views/sec_takenProjects.ejs');
    })
    app.get('/sec_clients',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('User').find({'Type':"Client"}).toArray(function(err,result){
          console.log(result)
          res.render('../views/sec_clients.ejs',{Clients:result})
        })
    });
    app.get('/sec_openProjects',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').find({"Type":"Open"}).toArray(function(err,doc){
            res.render('../views/sec_openProjects.ejs',{User:req.session.username,Project:doc});
        });
       // res.render('../views/sec_openProjects.ejs');
    })
    app.get('/sec_history',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').find({"Client":req.query.ClientName}).toArray(function(err,doc){
            res.render('../views/sec_history.ejs',{Projects:doc,User:req.query.ClientName});
        });
       // res.render('../views/sec_openProjects.ejs');
    })
    app.get('/sec_chat',function(req,res){
        // var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        // var db = mongoUtil.getDb();
       // db.collection('Projects').find({"Client":req.query.ClientName}).toArray(function(err,doc){
            res.render('../views/sec_chat.ejs');
       // });
       
    })
}