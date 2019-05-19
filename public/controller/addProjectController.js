$(document).ready(function(){
    $ProjectName = $('#ProjectName');
    $Submit = $('#Submit');
    $Add = $('#Add');
    $task1 = $('#task1');
    $task2 = $('#task2');
    $task3 = $('#task3');
    $task4 = $('#task4');
    $task5 = $('#task5');
    $task6 = $('#task6');
    var task = [];
    var project={
        ProjectName:$ProjectName.val(),
        Tasks:task
    }

    $Add.click(function(){
        if($task1.val().length > 0){task.push($task1.val());}
        if($task2.val().length > 0){task.push($task2.val());}
        if($task3.val().length > 0){task.push($task3.val());}
        if($task4.val().length > 0){task.push($task4.val());}
        if($task5.val().length > 0){task.push($task5.val());}
        if($task6.val().length > 0){task.push($task6.val());}
        
        if($ProjectName.val().length <= 0){
            $Submit.click();
        }else if(task.length<3){
           alert("Required atleast three Tasks!");
           task = [];
        }else{
            var date = new Date();
            var month = date.getMonth() + 1;
            if(month < 10){month="0"+month};
            var day = date.getDate();
            if(day < 10 ){day="0"+day};
            var year = date.getFullYear();

            var project={
                ProjectName:$ProjectName.val(),
                Tasks:task,
                Type:"Open",
                DateAdded:month+"/"+day+"/"+year,
                Progress:0
            }
            $.ajax({
                method:"POST",
                url:'/addProject',
                data:project,
                success:function(message){
                   alert(message);
                    top.location.href = "/manager_openProjects";
                }
            })
        }
    });

})