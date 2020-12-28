//PersonalProfile
var thisAccount = sessionStorage.getItem( "Helen-account" );
$( document ).ready(function() 
{
    
    barInitial();
    initiall();
    
    value = document.getElementById("name").value;
    document.querySelector('.PersonEditBtn').addEventListener('click',
    function () {
        const div = document.createElement('div'); 
        console.log(document.getElementById('name').disabled)
        if(document.getElementById('name').disabled == true){
            
            document.getElementById('name').disabled = !document.getElementById('name').disabled;
            document.getElementById("edit").value = 'save'
            document.getElementById("name").setAttribute("placeholder",value);
            }
        else{
            let cmd = {};
            cmd["act"] = "editPersonalInfo";
            cmd["option"] = "nickname";
            cmd[ "account" ] =sessionStorage.getItem("Helen-account");
            cmd[ "new" ] =document.getElementById("name").value;
            
            console.log(cmd[ "new" ])
            $.post( "../index.php", cmd, function( dataDB ){
                dataDB = JSON.parse( dataDB );
                if (dataDB.status  == false) {
                    dataDB.data = ""
                    swal({
                        title: 'OOPS...',
                        type: 'error',
                        text: 'Failed to Update personal information in nickname ',
                        animation: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6',
                    }).then(( result ) => {}, ( dismiss ) => {});
                }
                else {
                    
                    swal({
                        title: 'Congratulation!!',
                        type: 'success',
                        text: 'success to change the nickname',
                        showConfirmButton: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6',
                        timer: 2000
                    }).then(( result ) => {}, ( dismiss ) => {});
                    //sessionStorage.setItem("Helen-nickname")=document.getElementById("name").value;
                    sessionStorage.setItem("Helen-nickname", document.getElementById("name").value)
                    document.getElementById('name').disabled = !document.getElementById('name').disabled;
                    document.getElementById("edit").value = 'Edit'
                }
            });
        }
    });
    document.querySelector('.PasswordEditBtn').addEventListener('click',
    function () {
        const div = document.createElement('div');
        var value = document.getElementById("password").value;  
        if(document.getElementById('password').disabled == true){
            document.getElementById('password').disabled = !document.getElementById('password').disabled;
            document.getElementById('editPw').disabled=true
            document.getElementById("editPw").value = '驗證密碼' 
            document.getElementById("password").setAttribute("placeholder","請輸入原始密碼");
            
        }
        else{
            
            let cmd = {};
                cmd["act"] = "checkPassword";
                cmd[ "account" ] =sessionStorage.getItem("Helen-account");
                cmd["password"] = value;
                console.log(value)
                $.post( "../index.php", cmd, function( dataDB ){
                    dataDB = JSON.parse( dataDB );
                        if (dataDB.status  == false) {
                            dataDB.data = ""
                            swal({
                                title: 'OOPS...',
                                type: 'error',
                                text: '驗證失敗 ',
                                animation: false,
                                customClass: 'animated rotateOutUpLeft',
                                confirmButtonText: 'okay!',
                                confirmButtonColor: '#eda2b6'
                            }).then(( result ) => {}, ( dismiss ) => {});
                            location.reload();//重整
                        }
                        else { 
                            swal({
                                title: 'Congratulation!!',
                                type: 'success',
                                text: '驗證成功',

                                showConfirmButton: false,
                                customClass: 'animated rotateOutUpLeft',
                                confirmButtonText: 'okay!',
                                confirmButtonColor: '#eda2b6',
                                timer: 2000
                            }).then(
                                function () { },
                                function (dismiss) {
                                    console.log("驗證成功");
                                    document.getElementById('password').disabled = !document.getElementById('password').disabled;
                                    document.getElementById("editPw").value = 'Edit'
                                            let yourQueue = [];
                                            let steps = [];
                                            let yourDataArray=["新密碼","確認密碼"];
                                            for( let i = 0; i <= 1; i++ )
                                            {
                                                yourQueue.push(
                                                { 
                                                    title: yourDataArray[i],
                                                    
                                                    showCancelButton: true,
                                                    confirmButtonText: "Next &rarr;",
                                                    cancelButtonText: "取消",
                                                    input: "password",
                                                });
                                            
                                                steps.push( parseInt(i) + 1 );
                                            }
                                            
                                            swal.setDefaults( { progressSteps: steps } );
                                            
                                            swal.queue( yourQueue ).then( ( result ) => 
                                            {
                                                
                                                if( result[0]==result[1] )
                                                {
                                                    let cmd = {};
                                                    cmd["act"] = "editPersonalInfo";
                                                    cmd["option"] = "password";
                                                    cmd["account"] = sessionStorage.getItem("Helen-account");
                                                    cmd["new"]=result[0];
                                                    $.post( "../index.php", cmd, function( dataDB )
                                                    {
                                                        dataDB = JSON.parse( dataDB );
                                                        if (dataDB.status  == false) {
                                                            dataDB.data = ""
                                                            swal({
                                                                title: 'OOPS...',
                                                                type: 'error',
                                                                text: '更改password失敗 ',
                                                                animation: false,
                                                                customClass: 'animated rotateOutUpLeft',
                                                                confirmButtonText: 'okay!',
                                                                confirmButtonColor: '#eda2b6'
                                                            }).then(( result ) => {}, ( dismiss ) => {});
                                                            location.reload();//重整
                                                        }
                                                        else{
                                                            swal({
                                                                title: 'Congratulation!!',
                                                                type: 'success',
                                                                text: 'success to change the password',
                                                                showConfirmButton: false,
                                                                customClass: 'animated rotateOutUpLeft',
                                                                confirmButtonText: 'okay!',
                                                                confirmButtonColor: '#eda2b6',
                                                                timer: 2000
                                                            }).then(( result ) => {}, ( dismiss ) => {});
                                                           
                                                            location.reload();//重整
                                                        }

                                                    
                                                    
                                                    });
                                                }
                                                else{
                                                    swal({
                                                        title: 'OOPS...',
                                                        type: 'error',
                                                        text: 'The New and Confirm passwords do not match ',
                                                        animation: false,
                                                        customClass: 'animated rotateOutUpLeft',
                                                        confirmButtonText: 'okay!',
                                                        confirmButtonColor: '#eda2b6',
                                                    }).then(( result ) => {}, ( dismiss ) => {});
                                                    location.reload();//重整
                                                }
                                                
                                                swal.setDefaults( { progressSteps: false } );
                                            }, (dismiss) =>
                                            {
                                                swal.setDefaults( { progressSteps: false } );
                                            });
                                        
                                    
                                }
                            )
                        }
                    });
            }
        });
        $("#color").colpick({
            layout:'hex',
            submit:0,
            colorScheme:'dark',
            onChange:function(hsb,hex,rgb,el,bySetColor){
                let cmd = {};
                cmd["act"] = "editPersonalInfo";
                cmd[ "account" ] =sessionStorage.getItem("Helen-account");
                cmd["option"] = "color";
                cmd["new"] = '#'+hex;
                $.post( "../index.php", cmd, function( dataDB ){
                    dataDB = JSON.parse( dataDB );
                    if (dataDB.status == false) {
                        dataDB.data = ""
                        swal({
                            title: 'OOPS...',
                            type: 'error',
                            text: 'Failed to Update personal information in color ',
                            animation: false,
                            customClass: 'animated rotateOutUpLeft',
                            confirmButtonText: 'okay!',
                            confirmButtonColor: '#eda2b6'
                        }).then(( result ) => {}, ( dismiss ) => {});
                    }
                    else {
                        
                        sessionStorage.setItem("Helen-color",'#'+hex )
                        console.log('#'+hex)
                        $("#color").css("border-right", "100px solid "+ '#'+hex);
                        location.reload();//重整
                        }
                    })
                }.keyup(function(){
                    $(this).colpickSetColor(this.value); 
                })
            
        });
    

    $("#password").keyup(function(){
        if(passwd()){
            document.getElementById('editPw').disabled=false
        }

    });
});
function passwd(){
    var passwrdstr = $('#password').val();    
    if(passwrdstr.length<3){
        return false;
    }
    else{
        return true;
    } 
}
function ChangeDisabled(value){
    　if(value=='1'){    
    　  document.getElementById('name').disabled=false;　// 變更欄位為可用
        document.getElementById("email").setAttribute("onClict",value);
    　}
    else{
    　  document.getElementById('name').disabled=true;　// 變更欄位為禁用
    　}
}
function initiall(resolve, reject)
{
    checkPermission();
    let  color, nickname;
    
    color = sessionStorage.getItem("Helen-color");
    nickname = sessionStorage.getItem("Helen-nickname");
    $("#color").css("border-right", "100px solid "+ color);
    document.getElementById("name").setAttribute("placeholder",nickname);
    document.getElementById("email").setAttribute("placeholder",thisAccount+"@mail.ntou.edu.tw");

}
    

function checkPermission()
{
    if(sessionStorage.getItem("Helen-account")){
        return true;
    }
    else{
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {
            if ( result ){
                $( ".tabContent" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( ".tabContent" ).append( httpStatus );
            }
        }, ( dismiss ) => {});
        return false;
    }
    
}