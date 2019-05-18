$(document).ready(function(){
    $Add = $('#Add');
    $Name =$('#Name');
    $Submit = $('#Submit');
    $Lastname =$('#Lastname');
    $Add.click(function(){
        if($Name.val().length <= 0 || $Lastname.val().length <= 0){
           $Submit.click();
        }else{
            var date = new Date();
            var month = date.getMonth() + 1;
            if(month < 10){month="0"+month};
            var day = date.getDate();
            if(day < 10 ){day="0"+day};
            var year = date.getFullYear();
            var client ={
                FullName:$Name.val() + " " +$Lastname.val(),
                Username:$Lastname.val(),
                Password:"Password",
                Type:"Client",
                DateAdded:month+"/"+day+"/"+year,
                Status:"Unassigned"
            }
            $.ajax({
                method:'POST',
                url:'/addClient',
                data:client,
                success:function(message){
                    alert(message);
                    top.location.href = "/manager_unassignedClients"
                }
            })
        }
    })
})