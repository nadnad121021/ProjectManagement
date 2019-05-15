module.exports = function(app){
    app.get('/ClientDashBoard',function(req,res){
        res.send("Client Dashboard");
    })
}