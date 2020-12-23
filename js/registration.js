$(document).ready(function () {
    barInitial();
    initial();

    
    $("#password").keyup(function () {
        if (passwd()) {
            $("#password").css("border", "2px solid green");
            $("#pwMsg").html("<p class='text-success'>Validated</p>");
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
            cmd["act"] = "sendMailRegister";
            cmd["account"] = $('#email').val();
            cmd["password"] = $("#password").val();
            cmd["option"] = "create";
            $.post("../index.php", cmd, function (dataDB) {
                dataDB = JSON.parse(dataDB);
                if (dataDB.status == false) {
                    swal({
                        title: 'ERROR',
                        type: 'error',
                        text: dataDB.errorCode,
                        animation: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6'
                    })
                }
                else {
                    swal({
                        title: '完成!',
                        type: 'success',
                        html: '創建成功\n歡迎使用Helen ',
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

    $("#verify").click(function () {
        var btn = $('#verify');
        // if(document.getElementById('name').disabled == false){
        // document.getElementById('creatBtn').disabled = !document.getElementById('creatBtn').disabled;
        // }
        $("#chkmsg").html("");
        let cmd = {};
        cmd["act"] = "sendMailRegister";
        cmd["account"] = $('#email').val();
        cmd["option"] = "verify";
        $.post("../index.php", cmd, function (dataDB) {
            dataDB = JSON.parse(dataDB);
            if (dataDB.status == false) {
                swal({
                    title: 'ERROR',
                    type: 'error',
                    text: dataDB.errorCode,
                    animation: false,
                    customClass: 'animated rotateOutUpLeft',
                    confirmButtonText: 'okay!',
                    confirmButtonColor: '#eda2b6',
                    timer: 1300,
                })
            }
            else {
                console.log($(".createBtn").disabled)
                swal({
                    title: "請輸入驗證碼",
                    input: "textarea",
                    input: "textarea",
                    inputPlaceholder: "請輸入文字...",
                    showCancelButton: true,
                    confirmButtonText: "確認",
                    cancelButtonText: "取消",
                    inputPlaceholder: $(this).parents('.Page').find("span").text(),
                    animation: false

                }).then((result) => {
                    console.log(result)
                    if (result == dataDB.data) {
                        console.log("123")
                        swal({
                            title: "驗證成功",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,

                        })
                        document.getElementById('createBtn').disabled = !document.getElementById('createBtn').disabled;
                    }
                    else {

                        swal({
                            title: "驗證失敗",
                            type: "warning",
                            showConfirmButton: false,
                            timer: 2000,

                        }).then(
                            function () { },
                            function (dismiss) {
                                if (dismiss === 'timer') {
                                    window.location.href = "../HTMLs/registration.html";
                                }
                            }
                        )

                    }
                });

            }

        });
    });
});


function initial() {
    // let cmd = {};
    // cmd["act"] = "SignUp"
    // cmd["account"] = $("#account").val();
    // cmd["password"] = $("#password").val("");
    // $("#email").val("");
    // $("#password").val("");
    // $("#validatePW").val("");
}
function Restrict() {

     if (!passwd()) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html: '密碼字數只能在3~20內!!!!',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#7a96a2'
        })
        return false;
    }
    else if (!con_passwrd()) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html: 'Password are not Matching &#9888;',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#252621'
        })
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