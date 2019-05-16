module.exports = function(app){
    app.get('/ManagerDashboard',function(req,res){
        res.render('../views/managertakenProject.ejs');
    })
}