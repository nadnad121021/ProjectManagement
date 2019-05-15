module.exports = function(app){
    app.get('/SecretaryDashboard',function(req,res){
        res.send("Secretary Dashboard");
    })
}