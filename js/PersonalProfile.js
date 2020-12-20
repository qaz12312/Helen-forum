//PersonalProfile
$( document ).ready( function() 
{
    initial();
    
    document.querySelector('.PersonEditBtn').addEventListener('click',
    function () {
        const div = document.createElement('div');
        /*var value = document.getElementById("name").value;    
        var value2 = document.getElementById("edit").value;*/ 
        console.log(document.getElementById('name').disabled)
        if(document.getElementById('name').disabled == true){
            
            document.getElementById('name').disabled = !document.getElementById('name').disabled;
            document.getElementById("edit").value = 'save'
            document.getElementById("name").setAttribute("placeholder",value);
            }
        else{
            let cmd = {};
            
            // $.post("./index.php", cmd, function (data) {
            //     dataDB = JSON.parse(data);
            //     if (dataDB.statue == false) {
            //         dataDB.data = ""
            //         swal({
            //             title: 'OOPS...',
            //             type: 'error',
            //             text: '更改名稱失敗 ',
            //             animation: false,
            //             customClass: 'animated rotateOutUpLeft',
            //             confirmButtonText: 'okay!',
            //             confirmButtonColor: '#eda2b6'
            //         })
            //     }
            //     else {//登入成功
                    
                    swal({
                        title: 'Congratulation!!',
                        type: 'success',
                        text: '更改名稱成功',
                        showConfirmButton: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6',
                        timer: 2000
                    })
                    cmd["act"] = "modifyPersonalInfo";
                    cmd["option"] = "nickname";
                    cmd[ "account" ] =sessionStorage.getItem("UserID");
                    cmd[ "new" ] =document.getElementById("name").value;
                    console.log(document.getElementById("name").value)
                    document.getElementById('name').disabled = !document.getElementById('name').disabled;
                    document.getElementById("edit").value = 'Edit'
            //     }
            // });
        }



    }        


    )
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
            cmd["act"] = "verify";
            cmd[ "account" ] =sessionStorage.getItem("UserID");
            //cmd["token"] = "userId-Time";(email裡的)
        // $.post("./index.php", cmd, function (data) {
            //     dataDB = JSON.parse(data);
            //     if (dataDB.statue == false) {
            //         dataDB.data = ""
            //         swal({
            //             title: 'OOPS...',
            //             type: 'error',
            //             text: '更改password失敗 ',
            //             animation: false,
            //             customClass: 'animated rotateOutUpLeft',
            //             confirmButtonText: 'okay!',
            //             confirmButtonColor: '#eda2b6'
            //         })
            //     }
            //     else {//密碼正確
                    
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
                    document.getElementById('password').disabled = !document.getElementById('password').disabled;
                    document.getElementById("editPw").value = 'Edit'
                    $("#checkPw").html("");
                    $("#pwMsg").html("");
                    document.getElementById('InputWrap2').style.display='block'
                }
            )
            
            
    //     }
    // });
        
    }



    }  )      
    $('#color').colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor){
             // $.post("./index.php", cmd, function (data) {
            //     dataDB = JSON.parse(data);
            //     if (dataDB.statue == false) {
            //         dataDB.data = ""
            //         swal({
            //             title: 'OOPS...',
            //             type: 'error',
            //             text: '更改color失敗 ',
            //             animation: false,
            //             customClass: 'animated rotateOutUpLeft',
            //             confirmButtonText: 'okay!',
            //             confirmButtonColor: '#eda2b6'
            //         })
            //     }
            //     else {//登入成功
                    
            swal({
                title: 'Congratulation!!',
                type: 'success',
                text: '更改color成功',
                showConfirmButton: false,
                customClass: 'animated rotateOutUpLeft',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#eda2b6',
                timer: 2000
            })
                    let cmd = {};
                    cmd["act"] = "modifyPersonalInfo";
                    cmd[ "account" ] =sessionStorage.getItem("UserID");
                    cmd["option"] = "color";
                    cmd["new"] = hex;
                    console.log(hex)
                    $(el).css('border-color','#'+hex);
                    //if(!bySetColor) $(el).val(hex);
                    }
                }).keyup(function(){
                    $(this).colpickSetColor(this.value); 
                });
    //     }
    // });
            
         
    $("#password").keyup(function(){
        if(passwd()){

            $("#pwMsg").html("<p class='text-success'>Validated</p>");
            document.getElementById('editPw').disabled=false
        }
        else{

        $("#pwMsg").html("<p class='text-danger'>Password must be greater than 3</p>");
        }
        
    });
    
});

// function con_passwrd(){
//     var conpass = $('#validatePW').val();
//     var passwrdstr = $('#password').val();
//     if(passwrdstr != conpass){
//         return false;
//     }else{
//         return true;
//     } 
// }
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
    //checkPermission()
    let cmd = {};
    cmd[ "act" ] = "modifyPersonalInfo";
    cmd[ "account" ] = sessionStorage.getItem( "account" );

    let permission, color, nickname;

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

        // if( dataDB.status == false )
        // {
        //     swal({
        //         title: "載入頁面失敗",
        //         type: "error",
        //         text: dataDB.errorCode
        //     })
        // }
        // else
        // {
        //     permission = dataDB.data.permission;
        //     color = dataDB.data.color;
        //     nickname = dataDB.data.nickname;
        //     password = dataDB.data.password;
        //     if(sessionStorage.getItem("Helen-act")== "modifyPersonalInfo"){
                
        //         $(el).css('border-color','#'+color);//??
        //         $(".InputWrap").find("fname").placeholder(nickname);
        //         $(".InputWrap").find("password").placeholder(password);
        //     }
        // }
    //});
}
    

function checkPermission()
{
    let perm = sessionStorage.getItem( "Helen-permission" );
    console.log( "Permission:　"+ perm );

    if( perm && perm.valueOf() >= 1 ) return true;

    else 
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {
            if ( result ) 
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });

        return false;
    }
}
// else
        // {
        ////     permission = dataDB.data.permission;
        ////     color = dataDB.data.color;
        ////     nickname = dataDB.data.nickname;
            // nickname=sessionStorage.getItem( "Helen-nickname" );
            // color=sessionStorage.getItem( "Helen-color" );
        //     if(sessionStorage.getItem("Helen-act")== "modifyPersonalInfo"){
                
        //         $(el).css('border-color','#'+color);//??
        //         $(".InputWrap").find("fname").placeholder(nickname);
        //         
        //     }
        // }