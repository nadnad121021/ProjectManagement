module.exports = function(app){
    app.get('/ClientDashBoard',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var User =  req.session.username ;
        db.collection('User').find({"Username":User}).toArray(function(err,doc){
           console.log(doc)
           console.log(doc.length)
           if(doc.length>0){
              res.render("../views/client.ejs",{Data:doc[0]})
             console.log((doc[0].Projects)[0])
           }else{
              // res.render("../views/client.ejs");
           }
        })
    })
}