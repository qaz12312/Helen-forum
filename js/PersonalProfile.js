//PersonalProfile
var thisAccount = sessionStorage.getItem( "Helen-account" );
$( document ).ready( function() 
{
    initial();
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
            $.post( "../index.php", cmd, function( dataDB ){
                dataDB = JSON.parse( dataDB );
                if (dataDB.statue == false) {
                    dataDB.data = ""
                    swal({
                        title: 'OOPS...',
                        type: 'error',
                        text: 'Failed to Update personal information in nickname ',
                        animation: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6'
                    })
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
                    })
                    
                    cmd[ "new" ] =document.getElementById("name").value;
                    console.log(document.getElementById("name").value)
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
    

    console.log(document.getElementById('password').disabled)
    if(document.getElementById('password').disabled == true){
        document.getElementById('password').disabled = !document.getElementById('password').disabled;
        
        document.getElementById('editPw').disabled=true
        document.getElementById("editPw").value = '驗證密碼' 
        document.getElementById("password").setAttribute("placeholder","請輸入原始密碼");
        
    }
    else{
        let cmd = {};
            cmd["act"] = "editPersonalInfo";
            cmd[ "account" ] =sessionStorage.getItem("Helen-account");
            $.post( "../index.php", cmd, function( dataDB ){
                dataDB = JSON.parse( dataDB );
                    if (dataDB.statue == false) {
                        dataDB.data = ""
                        swal({
                            title: 'OOPS...',
                            type: 'error',
                            text: '驗證失敗 ',
                            animation: false,
                            customClass: 'animated rotateOutUpLeft',
                            confirmButtonText: 'okay!',
                            confirmButtonColor: '#eda2b6'
                        })
                
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
                                let cmd = {};
                                cmd["act"] = "editPersonalInfo";
                                cmd["option"] = "password";
                                cmd["account"] = sessionStorage.getItem("Helen-account");
                                $.post("../index.php", cmd, function (data) {
                                    dataDB = JSON.parse(data);
                                    if (dataDB.statue == false) {
                                        dataDB.data = ""
                                        swal({
                                            title: 'OOPS...',
                                            type: 'error',
                                            text: '更改password失敗 ',
                                            animation: false,
                                            customClass: 'animated rotateOutUpLeft',
                                            confirmButtonText: 'okay!',
                                            confirmButtonColor: '#eda2b6'
                                        })
                                    }
                                    else {
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
                                                input: "text",
                                            });
                                        
                                            steps.push( parseInt(i) + 1 );
                                        }
                                        
                                        swal.setDefaults( { progressSteps: steps } );
                                        
                                        swal.queue( yourQueue ).then( ( result ) => 
                                        {
                                            if( result[0]==result[1] )
                                            {
                                                swal({
                                                    title: 'Congratulation!!',
                                                    type: 'success',
                                                    text: 'success to change the password',
                                                    showConfirmButton: false,
                                                    customClass: 'animated rotateOutUpLeft',
                                                    confirmButtonText: 'okay!',
                                                    confirmButtonColor: '#eda2b6',
                                                    timer: 2000
                                                })
                                                
                                                document.getElementById("password").setAttribute("placeholder","");
                                                
                                                cmd["new"]=result[1] ;
                                                console.log(cmd["new"])
                                            }
                                            else{
                                                swal({
                                                    title: 'opps!!',
                                                    type: 'warning',
                                                    text: 'Failed to Update personal information in password',
                                                    showConfirmButton: false,
                                                    customClass: 'animated rotateOutUpLeft',
                                                    confirmButtonText: 'okay!',
                                                    confirmButtonColor: '#eda2b6',
                                                    timer: 2000
                                                })
                                            }
                                            swal.setDefaults( { progressSteps: false } );
                                        }, (dismiss) =>
                                        {
                                            swal.setDefaults( { progressSteps: false } );
                                        });
                                    }
                                });
                            }
                        )
                    }
                });
            }
        });
        $('#color').colpick({
            layout:'hex',
            submit:0,
            colorScheme:'dark',
            onChange:function(hsb,hex,rgb,el,bySetColor){
                let cmd = {};
                cmd["act"] = "editPersonalInfo";
                cmd[ "account" ] =sessionStorage.getItem("Helen-account");
                cmd["option"] = "color";
                $.post( "../index.php", cmd, function( dataDB ){
                    dataDB = JSON.parse( dataDB );

                    if (dataDB.statue == false) {
                        dataDB.data = ""
                        swal({
                            title: 'OOPS...',
                            type: 'error',
                            text: 'Failed to Update personal information in color ',
                            animation: false,
                            customClass: 'animated rotateOutUpLeft',
                            confirmButtonText: 'okay!',
                            confirmButtonColor: '#eda2b6'
                        })
                    }
                    else {
                        cmd["new"] = hex;
                        console.log(hex)
                        $(el).css('border-color',hex);
                        }
                    }).keyup(function(){
                        $(this).colpickSetColor(this.value); 
                    });
            }
        });
        $("#password").keyup(function(){
            if(passwd()){
                document.getElementById('editPw').disabled=false
            }
            else{
    
            }
            
        });
});
function passwd(){
    var passwrdstr = $('#password').val();    
    if(passwrdstr.length<3){
        return false;
    }else{
        return true;
    } 
}
function ChangeDisabled(value){
　if(value=='1'){
    
　document.getElementById('name').disabled=false;　// 變更欄位為可用
document.getElementById("email").setAttribute("onClict",value);
    

　}else{
　document.getElementById('name').disabled=true;　// 變更欄位為禁用

　}
}
function initial()
{
    checkPermission()
    let cmd = {};
    let permission, color, nickname;
    cmd[ "act" ] = "editPersonalInfo";
    cmd[ "account" ] = sessionStorage.getItem("Helen-account");
    color = sessionStorage.getItem("Helen-color");
    

    

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );
        console.log(dataDB)

        console.log(cmd[ "account" ]);
        console.log(color);

            permission = dataDB.data.permission;
            color = sessionStorage.getItem("Helen-color");
            nickname = sessionStorage.getItem("Helen-nickname");

            
           $("#color").css("border-right", "100px solid "+ color);
           
           // $(el).css('border-color',color);
           //document.getElementById("color"). $(el).css('border-color',color);
           document.getElementById("name").setAttribute("placeholder",nickname);
           document.getElementById("email").setAttribute("placeholder",thisAccount+"@mail.ntou.edu.tw");
            //$(".InputWrap").find("fname").placeholder(nickname);
            
        
    });
}
    

function checkPermission()
{
    if(!thisAccount)
    return false
    
}