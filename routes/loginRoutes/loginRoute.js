
module.exports = function(app){
    //const mongodb = require('../../public/assets/scripts/mongdb');
    
    app.get('/login',function(req,res){
        res.render('../views/login.ejs');
    })
    app.get('/',function(req,res){
        res.render('../views/login.ejs');
    })

    app.post('/login',function(req,res){
        var username = req.body.Username;
        var password = req.body.Password;
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('User').findOne({'Username':username,'Password':password},function(err,result){
            // console.log(result.Type);
            if(result == null){
                //console.log('no data');
                res.send("no data");
            }else{
                if(result.Type === "Client"){
                    req.session.username = username;
                    res.send("Client");
                }else if(result.Type === "Secretary"){
                    req.session.username = username;
                    res.send("Secretary");
                }else if(result.Type === "Manager"){
                    req.session.username = username;
                    res.send("Manager");
                }
            }
        });
    })
}