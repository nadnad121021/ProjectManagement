$(document).ready(function(){
    $Login = $('#login');
    $Login1 = $('#login1');
    $logUsername = $('#logUsername');
    $logPassword = $('#logPassword');
    // for Change Credentials
    $changeCredential = $('#changeCredential');
    $changeCredential1 = $('#changeCredential1');
    $newUsername = $('#newUsername');
    $newPassword = $('#newPassword');
    $confrimPassword = $('#confirmPassword');

    $Login.click(function(e){
        e.preventDefault();
        if($logUsername.val().length <= 0 || $logUsername.val()=== ''|| $logPassword.val().length <= 0
         || $logUsername.val()=== ''){
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
    $('.close').on('click', function() {
       alert("Change Credentials Is Recommended\n For Security Purposes")
    });
    function caller(message){
         if(message === 'Manager'){
             setTodefault();
             top.location.href = '/Manager_takenProjects';
         }else if(message === 'Secretary'){
             setTodefault();
             top.location.href = '/sec_takenProjects';
         }else if(message === 'Client'){
             if($logPassword.val()==="Password"){
               $('.container').stop().addClass('active');
             }else{
                top.location.href = '/ClientDashboard'; 
             }    
         }else{
             alert("Invalid Credentials! Try Again.")
             location.reload();
         }
     }

     $changeCredential.click(function(e){
        e.preventDefault();
        if($newUsername.val().length <= 0 || $newUsername.val()=== ''|| $newPassword.val().length <= 0
        || $newPassword.val()=== ''|| $confrimPassword.val().length <= 0
        || $confrimPassword.val()=== ''){
            changeCredential1.click();
        }else{
            if($confrimPassword.val()===$newPassword.val()){
                var newcredentials = {
                    ClientUserName:$logUsername.val(),
                    newUsername:$newUsername.val(),
                    newPassword:$newPassword.val()
                }
                $.ajax({
                    method:'POST',
                    url:'/changeCredential',
                    data:newcredentials,
                    success:function(dat){
                     alert("Credential Changed!");
                     top.location.href ="/";
                    }
                })
            }else{
                alert("Password not Match!");
                $newPassword.val('')
                $confrimPassword.val('')
            }
        }
       // alert($newUsername.val())
     })
     function setTodefault(){
         $logPassword.val('');
         $logUsername.val('');
     }
 });