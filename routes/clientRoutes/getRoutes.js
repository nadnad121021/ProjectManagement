module.exports = function(app){
    app.get('/ClientDashboard',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var User =  req.session.username ;
        console.log(User)
        db.collection('User').findOne({"Username":User},function(err,doc){
           console.log(doc)
           if(doc){
            var FulName = doc.FullName;
              db.collection('Projects').find({"Client":FulName}).toArray(function(err,result){
                res.render("../views/client.ejs",{Data:result});
              })
           }else{
             res.render("../views/client.ejs",{Data:undefined});
           }
        })
    })

    app.get('/client_viewTasks',function(req,res){
      console.log(req.query)
      var mongoUtil = require( '../../public/assets/scripts/mongdb' );
      var db = mongoUtil.getDb();
      db.collection('Projects').findOne({'ProjectName':req.query.ProjectName},function(err,result){
        console.log(result)
        res.render('../views/client_viewTasks.ejs',{Project:result});
      })
    })
    app.get('/client_chat',function(req,res){
      // console.log(req.query)
      // var mongoUtil = require( '../../public/assets/scripts/mongdb' );
      // var db = mongoUtil.getDb();
      //db.collection('Projects').findOne({'ProjectName':req.query.ProjectName},function(err,result){
       // console.log(result)
        res.render('../views/client_chat.ejs');
      //})
    })
}