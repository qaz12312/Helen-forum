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
   
  

    $("#verify").click(function(){ 
        var btn=$('#verify');
        var email = $("#email").val(); $('#btnGetVerifyCode');
        var preg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //匹配Email 
        if(email=='' || !preg.test(email)){ 
            $("#chkmsg").html("請填寫正確的郵箱！"); 
        }
        else{ 
                $("#chkmsg").html(""); 
                let cmd = {};
                cmd[ "act" ] = "sendMail";
                cmd[ "account"] = $('#email').val().split( "@" )[0];
                console.log( cmd[ "account"] );
                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        $(".showAlert").text(dataDB.errorCode);
                    }
                    else{
                        $(".showAlert").text(dataDB.data);
                    }
                
                    });
                
                time(btn);
                // $.post("sendmail.php",{mail:email},function(msg){ 
                //     if(msg=="noreg"){ 
                //         $("#chkmsg").html("該郵箱尚未註冊！"); 
                //         $("#sub_btn").removeAttr("disabled").val('提 交').css("cursor","pointer"); 
                //     }
                    
                // }); 
            }
    }); 
    setTimeout("document.getElementById('alert').innerHTML=html",5000)
});
     
var wait=60
function time(o) {
$(o).find("span").text("");
    if (wait == 0) {
        $(o).attr("disabled", false);
        
        o.find("span").text("獲取驗證碼");
        wait = 60;
    } else {
        $(o).attr("disabled", true);
        o.find("span").text(" "+wait + "秒後可重新發送");
        console.log(wait)
        wait--;
        setTimeout(function () {time(o);},1000);
    }
}
function validateEmail(){
var email=$("#email").val();
var reg = /^\w+([-+.']\w+)*@(mail|email){1}\.ntou\.edu\.tw/
if(reg.test(email)){
    return true;
}else{
    return false;
}
}