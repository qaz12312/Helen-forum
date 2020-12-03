$(document).ready(function () {
    $("#email").keyup(function(){
        
    if(validateEmail()){
        
        $("#email").css("border","2px solid green");
        
        $("#emailMsg").html("<p class='text-success'>Validated</p>");
    }else{
        
        $("#email").css("border","2px solid red");
        $("#emailMsg").html("<p class='text-danger'>Un-validated</p>");
    }
    });
   function validateEmail(){
        console.log("1");
        // get value of input email
        var email=$("#email").val();
        // use reular expression
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if(reg.test(email)){
            return true;
        }else{
            return false;
        }
    }
  

    $("#sub_btn").click(function(){ 
        var email = $("#email").val(); 
        var preg = /^w ([- .]w )*@w ([-.]w )*.w ([-.]w )*/; //匹配Email 
        if(email=='' || !preg.test(email)){ 
            $("#chkmsg").html("請填寫正確的郵箱！"); 
        }
        else{ 
            $("#sub_btn").attr("disabled","disabled").val('提交中..').css("cursor","default"); 
            $.post("sendmail.php",{mail:email},function(msg){ 
                if(msg=="noreg"){ 
                    $("#chkmsg").html("該郵箱尚未註冊！"); 
                    $("#sub_btn").removeAttr("disabled").val('提 交').css("cursor","pointer"); 
                }
                else{ 
                    //$(".demo").html("<h3>" msg "</h3>"); ///好像要下載
                } 
            }); 
            }
        }); 

     });