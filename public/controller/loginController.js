$(document).ready(function(){
    $Login = $('#login');
    $Login1 = $('#login1');
    $logUsername = $('#logUsername');
    $logPassword = $('#logPassword');
 
    $Login.click(function(e){
        e.preventDefault();
        //alert("jejeje");
        if($logUsername.val().length <= 0 || $logPassword.val().length <= 0){
            $Login1.click();
        }else{
         var credentials = {
             Username:$logUsername.val(),
             Password:$logPassword.val(),
         }
         $.ajax({
              method:'POST',
              url:'/login',
              data:credentials,
              success:function(dat){
               caller(dat);
              }
          })
        }
        
    })
    function caller(message){
         if(message === 'Manager'){
             setTodefault();
             top.location.href = '/Manager_takenProjects';
         }else if(message === 'Secretary'){
             setTodefault();
             top.location.href = '/SecretaryDashboard';
         }else if(message === 'Client'){
             setTodefault();
             top.location.href = '/ClientDashboard';
         }else{
             alert("Invalid Credentials! Try Again.")
             location.reload();
         }
     }
     function setTodefault(){
         $logPassword.val('');
         $logUsername.val('');
     }
 });