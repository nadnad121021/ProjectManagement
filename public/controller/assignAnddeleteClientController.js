$(document).ready(function(){
    $assignBtn = $('.but-assign');
    $dleteBtn = $('.but-delete');

    $assignBtn.click(function(){
        alert($(this).attr('id'));
    })

    $dleteBtn.click(function(){
      var choice =   confirm("Are you sure to delete this Client?");
      var dat = {
          id:$(this).attr('id')
      }
      if(choice){
          $.ajax({
              method:'POST',
              url:'/deleteClient',
              data:dat,
              success:function(mesage){
                  alert(mesage);
                //   top.location.href = ""
              }
          })
      }
      location.reload();
    })
})