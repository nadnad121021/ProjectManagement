module.exports = function(app){
    app.post('/updateTasks',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        //db.collection('Projects').updateOne({'ProjectName':req.body.TaskName},{$set:{'Tasks':req.body.Tasks}});
        db.collection('Projects').findOne({'ProjectName':req.body.TaskName},function(err,result){
            var from = result.Tasks;
            db.collection('Approval').insertOne({'Client':req.body.ClientName,'Type':'Update','ProjectName':req.body.TaskName,'From':from,'To':req.body.Tasks,'Status':'Pending'})
        })
        //db.collection('Approval').insertOne({'Client':"hehe",'Type':'Update','ProjectName':req.body.TaskName,'From':[],'To':req.body.Tasks})
        //console.log(req.body)
        res.send("Your request has been send to manager!");
    })
}