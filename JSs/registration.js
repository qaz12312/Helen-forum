$(document).ready(function () {
    initial();

    $("#email").keyup(function(){
        
    if(validateEmail()){
        
        $("#email").css("border","2px solid green");
        
        $("#emailMsg").html("<p class='text-success'>Validated</p>");
    }else{
        
        $("#email").css("border","2px solid red");
        $("#emailMsg").html("<p class='text-danger'>Un-validated</p>");
    }
    });
    $("#password").keyup(function(){
        if(passwd()){
            $("#password").css("border","2px solid green");
            $("#pwMsg").html("<p class='text-success'>Validated</p>");
        }
        else{
        $("#password").css("border","2px solid red");
        $("#pwMsg").html("<p class='text-danger'>Password must be greater than 3</p>");
        }
        
    });
    $("#validatePW").keyup(function(){
        if(con_passwrd()){
            $("#validatePW").css("border","2px solid green");
            $("#checkPw").html("<p class='text-success'>Validated</p>");
        }
        else{
        $("#validatePW").css("border","2px solid red");
        $("#checkPw").html("<p class='text-danger'>Password are not Matching</p>");
        }
        
    });

    
    $("#createBtn").click(function () {
        let uid = $("#email").val(),
            pw = $("#password").val(),
            vd = $("#validatePW").val();
        let format = Restrict();

        if (!uid) {
            swal({
                title: 'OOPS...',
                type: 'error',
                html: '請輸入帳號 \u2620',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#a1268e'
            })
        }
        else if (!pw) {
            swal({
                title: 'OOPS...',
                type: 'error',
                html: '請輸入密碼 \u2620',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#8a54a2'
            })
        }
        else if (!vd) {
            swal({
                title: 'OOPS...',
                type: 'error',
                html: '請在驗證密碼處輸入密碼 \u2620',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#7a96a2'
            })
        }
        else if (pw != vd) {
            swal({
                title: 'OOPS...',
                type: 'error',
                html: '輸入的驗證密碼有誤 \u2620',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#252621'
            })
        }
        else {
            let cmd = {};
            cmd["act"]="SignUp"
            cmd[ "account" ] = $("#account").val();
            cmd[ "password" ] = $("#password").val("");
            $.post("../index.php", cmd, function (data) {
                dataDB = JSON.parse(data);
                if (data.statue == false) {
                    dataDB.data=""
                    swal({
                        title: 'ERROR',
                        type: 'error',
                        text: data.errorCode,
                        animation: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6'
                    })
                }
                else {
                    leaveUserDetails(dataDB.data[0], dataDB.data[1], dataDB.data[2], dataDB.data[3], dataDB.data[4]);
                    swal({
                        title: '完成!',
                        type: 'success',
                        html: '創建成功\n歡迎使用LM Search \U+1F60A',
                        showConfirmButton: false,
                        timer: 1300,
                    }).then(
                        function () { },
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                window.location.href = "../HTMLs/login.html";
                            }
                        }
                    )
                }
            });
        }
    });

    $("#backBtn").click(function () {
        swal({
            title: 'OPPS!',
            type: 'warning',
            text: '尚未建立，確定要離開此頁面嗎?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '取消',
            confirmButtonText: '確定',
            width: 500,
        }).then(function () {
            window.location.href = "../HTMLs/login.html";
        })
    });
    let cmd = {};

    $("#verify").click(function(){ 
        var btn=$('#verify');
        var email = $("#email").val(); $('#btnGetVerifyCode');
        var preg = /^\w+([-+.']\w+)*@(mail|email){1}\.ntou\.edu\.tw/; //匹配Email 
        if(email=='' || !preg.test(email)){ 
            $("#chkmsg").html("請填寫正確的郵箱！"); 
        }
        else{ 
                $("#chkmsg").html(""); 
                let cmd = {};
                cmd[ "act" ] = "sendMailRegister";
                cmd[ "account"] = $('#email').val().split( "@" )[0];
                console.log( cmd[ "account"] );
                // $.post( "../index.php", cmd, function( dataDB )
                // {
                //     dataDB = JSON.parse( dataDB );

                //     if( dataDB.status == false )
                //     {
                //         $(".showAlert").text(dataDB.errorCode);
                //     }
                //     else{
                //         $(".showAlert").text(dataDB.data);
                //     }
                
                //     });
                
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


function initial() {
    let cmd = {};
    cmd["act"]="SignUp"
    cmd[ "account" ] = $("#account").val();
    cmd[ "password" ] = $("#password").val("");
    $("#email").val("");
    $("#password").val("");
    $("#validatePW").val("");
}
function Restrict() {
    
    if (!validateEmail()) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html:'信箱錯誤',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#8a54a2'
        })
        return false;
    }
    else if (!passwd()) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html:'密碼字數只能在3~20內!!!!',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#7a96a2'
        })
        return false;
    }
    else if (!con_passwrd()) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html:'Password are not Matching &#9888;',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#252621'
        })
        return false;
    }
    return true;
}



function leaveUserDetails(UserID, Password, Permissions, Color, Nickname) {
    sessionStorage.setItem("Helen-UserID", UserID);
    sessionStorage.setItem("Helen-Password", Password);
    sessionStorage.setItem("Helen-Permissions", Permissions);
    sessionStorage.setItem("Helen-Color", Color);
    sessionStorage.setItem("Helen-Nickname", Nickname);
}
function validateEmail(){

// get value of input email
var email=$("#email").val();
// use reular expression
 var reg = /^\w+([-+.']\w+)*@(mail|email){1}\.ntou\.edu\.tw/
 if(reg.test(email)){
     return true;
 }else{
     return false;
 }
}
function con_passwrd(){
    var conpass = $('#validatePW').val();
    var passwrdstr = $('#password').val();
    if(passwrdstr != conpass){
        return false;
    }else{
        return true;
    } 
}
function passwd(){
    
    var passwrdstr = $('#password').val();    
    if(passwrdstr.length<3){
        return false;
    }else{
        return true;
    } 
}
// ^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$(較強的密碼)


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