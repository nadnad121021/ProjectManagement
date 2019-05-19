module.exports = function(app){
    app.get('/sec_takenProjects',function(req,res){
        res.render('../views/sec_takenProjects.ejs');
    })
    app.get('/sec_clients',function(req,res){
        res.render('../views/sec_clients.ejs');
    })
    app.get('/sec_openProjects',function(req,res){
        res.render('../views/sec_openProjects.ejs');
    })
}