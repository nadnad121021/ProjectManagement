module.exports = function(app){
    app.get('/manager_takenProjects',function(req,res){
        res.render('../views/manager_takenProjects.ejs');
    })
    app.get('/manager_addTasks',function(req,res){
        res.render('../views/manager_addTasks.ejs');
    })
    app.get('/manager_clients',function(req,res){
        res.render('../views/manager_clients.ejs');
    })
    app.get('/manager_viewTasks',function(req,res){
        res.render('../views/manager_viewTasks.ejs');
    })
    app.get('/manager_openProjects',function(req,res){
        res.render('../views/manager_openProjects.ejs');
    })
    app.get('/manager_addProjects',function(req,res){
        res.render('../views/manager_addProjects.ejs');
    })
    app.get('/manager_assignedProjects',function(req,res){
        res.render('../views/manager_assignedProjects');
    })
}