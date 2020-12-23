$(document).ready(function () {
    barInitial();
    $("#verify").click(function(){ 
        var btn=$('#verify');
        var email = $("#email").val(); $('#btnGetVerifyCode');
        if(email==''){ 
            $("#chkmsg").html("請輸入學校信箱！"); 
        }
        else{ 
                $("#chkmsg").html(""); 
                let cmd = {};
                cmd[ "act" ] = "sendMailPwd";
                cmd[ "account"] = $('#email').val();
                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        swal({
                            title: "驗證失敗",
                            type: "success",
                            text: dataDB.errorCode,
                            showConfirmButton: false,
                            timer: 1000,
    
                        })
                    }
                    else{
                        swal({
                            title: "驗證成功",
                            type: "success",
                            text: dataDB.errorCode,
                            showConfirmButton: false,
                            timer: 3000,
    
                        })
                        
                    }
                
                    });
                
                time(btn);
                
            }
    }); 
    
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