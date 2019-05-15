module.exports = function(app){
    app.get('/ManagerDashoard',function(req,res){
        res.render('../views/managertakenProject.ejs');
    })
}