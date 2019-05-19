$(document).ready(function(){
    $('#Projects').hide();
    $assignBtn = $('.but-assign');
    $dleteBtn = $('.but-delete');
    $Continue = $('#Continue');
    $Proj = $('#Proj');
    var IDClient;
    $assignBtn.click(function(){
        $('#Projects').show();
        IDClient = $(this).attr('id');
    })
    $Continue.click(function(){
        if($Proj.val()==="EX"){
            alert("Choose Project First!")
        }else{
            var date = new Date();
            var month = date.getMonth() + 1;
            if(month < 10){month="0"+month};
            var day = date.getDate();
            if(day < 10 ){day="0"+day};
            var year = date.getFullYear();
            var client = {
                idClient:IDClient,
                idProject:$Proj.val(),
                DateAssigned:month+"/"+day+"/"+year,
            }
          $.ajax({
            method:'POST',
            url:'/assignClient',
            data:client,
            success:function(mesage){
                alert(mesage);
                top.location.href = "/manager_unassignedClients"
            }
        })
        }
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