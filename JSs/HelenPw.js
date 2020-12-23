$(document).ready(function () {
    barInitial();
    checkPermission();
    $("#password").keyup(function () {
        if (passwd()) {
            $("#password").css("border", "2px solid green");
            $("#pwMsg").html("<p class='text-success'>Validated</p>");
            document.getElementById('validatePW').disabled = !document.getElementById('validatePW').disabled;

        }
        else {
            $("#password").css("border", "2px solid red");
            $("#pwMsg").html("<p class='text-danger'>Password must be greater than 3</p>");
        }

    });
    $("#validatePW").keyup(function () {
        if (con_passwrd()) {
            $("#validatePW").css("border", "2px solid green");
            $("#checkPw").html("<p class='text-success'>Validated</p>");
        }
        else {
            $("#validatePW").css("border", "2px solid red");
            $("#checkPw").html("<p class='text-danger'>Password are not Matching</p>");
        }
        if(Restrict())
        {
            document.getElementById('final').disabled = !document.getElementById('final').disabled;

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
    $("#final").click(function () {
        
        
        swal({
            title: 'Welcome To Helen',
            type: 'success',
            text: '本訊息1秒後自動關閉',
            showConfirmButton: false,
            timer: 1000,
        }).then(
            function () { },
            function (dismiss) {
                if (dismiss === 'timer') {
                    window.location.href = "../HTMLs/login.html";
                }
            }
        )
    });
});

function Restrict() {

     if (!passwd()) {
        
        return false;
    }
    else if (!con_passwrd()) {
        
        return false;
    }
    return true;
}

function con_passwrd() {
    var conpass = $('#validatePW').val();
    var passwrdstr = $('#password').val();
    if (passwrdstr != conpass) {
        return false;
    } else {
        return true;
    }
}
function passwd() {

    var passwrdstr = $('#password').val();
    if (passwrdstr.length < 3) {
        return false;
    } else {
        return true;
    }
}
// ^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$(較強的密碼)
function checkPermission()
{
    console.log("0")
    let cmd = {};
        cmd["act"] = "verifyForgetPwd";
        var url = location.href;
        var ans; 
            if(url.indexOf('?')!=-1)
            {
                var perm = url.split('?')[1];
                var ans = perm.split('=')[1];
            }
        cmd["token"] =ans;
            $.post("../index.php", cmd, function (dataDB) {
                if (dataDB.status == false) {
                    console.log("1")
                    $( ".tabContent" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( ".tabContent" ).append( httpStatus );
                    
                }
                else{
                    console.log("2")
                    return true
                }
                
        });
    
    
}