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
        res.render('../views/sec_clients.ejs');
    })
    app.get('/sec_openProjects',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').find({"Type":"Open"}).toArray(function(err,doc){
            res.render('../views/sec_openProjects.ejs',{User:req.session.username,Project:doc});
        });
       // res.render('../views/sec_openProjects.ejs');
    })
}