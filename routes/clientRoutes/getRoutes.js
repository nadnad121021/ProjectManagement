module.exports = function(app){
    app.get('/ClientDashboard',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var User =  req.session.username ;
        db.collection('User').findOne({"Username":User},function(err,doc){
           console.log(doc)
           res.render("../views/client.ejs",{Data:doc});
         //   if(doc.length >0){
         //      res.render("../views/client.ejs",{Data:doc[0]})
         //     console.log((doc[0].Projects)[0])
         //   }else{
         //      // res.render("../views/client.ejs");
         //   }
        })
    })
}