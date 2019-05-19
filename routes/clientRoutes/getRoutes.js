module.exports = function(app){
    app.get('/ClientDashBoard',function(req,res){
        res.render("../views/client.ejs");
    })
}