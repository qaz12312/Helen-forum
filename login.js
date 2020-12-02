$(document).ready(function () {
    initial();
    $("#Log-inBtn").click(function () {
        let act = $("#account").val(),
            pw = $("#password").val();
        let format = Restrict();
        
        if ((!act)) {
            swal({
                title: 'Wrong',
                type: 'error',
                html: $('<h3>').text('請輸入學號 \u2620'),
                animation: false,
                customClass: 'animated tada',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#ecba73'
            })
            $("#account").focus().val("");
        }
        else if (!pw) {
            swal({
                title: 'Wrong',
                type: 'error',
                html: $('<h3>').text('沒輸入密碼喔 \u2620'),
                animation: false,
                customClass: 'animated tada',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#b9cd74'
            })
        }
        else if (format) {
            let cmd = {};
            cmd["act"] = "logIn";
            cmd["account"] = act;
            cmd["password"] = pw;
            $.post("../index.php", cmd, function (data) {
                console.log("onnect success")
                dataDB = JSON.parse(data);
                if (dataDB.statue == false) {
                    dataDB.data=""
                    swal({
                        title: 'OOPS...',
                        type: 'error',
                        text:'帳號或密號錯誤 \u2620',
                        animation: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6'
                    })
                }
                else {//登入成功
                    console.log("log in sucess")
                    leaveUserDetails(dataDB.data[0], dataDB.data[1], dataDB.data[2], dataDB.data[3], dataDB.data[4]);
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
                                window.location.href = "search.html";
                            }
                        }
                    )
                }
            });
        }
        
    });

    $("#Sign-upBtn").click(function () {
        swal({
            title: '歡迎',
            type: 'info',
            text: '本訊息1秒後自動關閉',
            width: 400,
            showConfirmButton: false,
            timer: 1000,
        }).then(
            function () { },
            function (dismiss) {
                if (dismiss === 'timer') {
                    window.location.href = "../html/registration.html";
                }
            }
        )
    });
    $("#forgetPw-Btn").click(function () {
        swal({
            title: '歡迎',
            type: 'info',
            text: '本訊息1秒後自動關閉',
            width: 400,
            showConfirmButton: false,
            timer: 1000,
        }).then(
            function () { },
            function (dismiss) {
                if (dismiss === 'timer') {
                    window.location.href = "../html/forgetPassword.html";
                }
            }
        )
    });
});

function initial() {
    let cmd = {};
    cmd["act"]="logIn";
    cmd[ "account" ] = $("#account").val();
    cmd[ "password" ] = $("#password").val();
    $("#account").val("");
    $("#password").val("");
}

function Restrict() {
    let act = $("#account").val(),
        pw = $("#password").val();



    

 if (pw.length > 20 || pw.length < 3) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html:'密碼字數只能在3~20內!!!!',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#7a96a2'
        })
        return false;
    }
    /*else if (okPassword) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html:'密碼只能是英文、數字 &#9888;',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#252621'
        })
        return false;
    }*/
    return true;
}

function leaveUserDetails(UserID, Password) {
    sessionStorage.setItem("Helen-UserID", UserID);
    sessionStorage.setItem("Helen-Password", Password);
   
}
