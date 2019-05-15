$(document).ready(function(req,res){
   
   $SignUp = $('#SignUp');
   $SignUp1 = $('#SignUp1');
   $FullName = $('#FullName');
   $EmailAdd = $('#EmailAdd');
   $Username  = $('#Username');
   $Password = $('#Password');
   $ConfirmPassword = $('#ConfirmPassword');
    
   $SignUp.click(function(){
       if($FullName.val() <= 0 || $FullName.val()==='' || $EmailAdd.val() <= 0 || $EmailAdd.val()==='' || $Password.val() <=0
         || $Password.val()==='' || $ConfirmPassword.val() <=0 || $ConfirmPassword.val()===''){
          $SignUp1.click();
       }else{
           if($Password.va() === $ConfirmPassword.val()){
            var credentials = {
                FullName:$FullName.val(),
                EmailAdd:$EmailAdd.val(),
                Username:$logUsername.val(),
                Password:$logPassword.val(),
                Type:"Client"
            }
            $.ajax({
                 method:'POST',
                 url:'/signup',
                 data:credentials,
                 success:function(dat){
                  caller(dat);
                 }
             })
           }else{
               alert('Password Not Match');
           }
       }
   })
    function caller(message){
        if(message === 'Success'){
            top.location.href = '/';
        }else{
            alert(message)
            setTodefault()
        }
    }
        function setTodefault(){
            $Password.val('');
            $Username.val('');
            $EmailAdd.val('');
            $ConfirmPassword.val('');
            $FullName.val('');
        }
});