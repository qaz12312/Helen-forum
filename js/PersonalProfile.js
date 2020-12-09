//PersonalProfile
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
        cmd[ "act" ] = "changeNickname";
        cmd[ "account" ] =sessionStorage.getItem("UserID");
        cmd[ "nickname" ] =document.getElementById("name").value;
        console.log(document.getElementById("name").value)
        document.getElementById('name').disabled = !document.getElementById('name').disabled;
        document.getElementById("edit").value = 'Edit'
    }

    alert(document.getElementById('name').disabled);



}        


)
document.querySelector('.PasswordEditBtn').addEventListener('click',
function () {
const div = document.createElement('div');
var value = document.getElementById("password").value;  
var value2 = document.getElementById("editPw").value;   

console.log(document.getElementById('password').disabled)
if(document.getElementById('password').disabled == true){
    document.getElementById('password').disabled = !document.getElementById('password').disabled;
    
    document.getElementById('editPw').disabled=true
    document.getElementById("editPw").value = 'save' 
    document.getElementById("password").setAttribute("placeholder",value);
    document.getElementById('InputWrap2').style.display='block'
    
}
else{
    let cmd = {};
        cmd[ "Act" ] = "changePassword";
        cmd[ "account" ] =sessionStorage.getItem("UserID");
        cmd[ "password" ] =document.getElementById("password").value;
        console.log(document.getElementById("password").value)
    document.getElementById('password').disabled = !document.getElementById('password').disabled;
    document.getElementById('InputWrap2').style.display='none'

    document.getElementById("editPw").value = 'Edit'
    $("#checkPw").html("");
    $("#pwMsg").html("");
    
}


alert(document.getElementById('password').disabled);



}  
)      
$("#password").keyup(function(){
    if(passwd()){

        $("#pwMsg").html("<p class='text-success'>Validated</p>");
        
    }
    else{

    $("#pwMsg").html("<p class='text-danger'>Password must be greater than 3</p>");
    }
    
});
$("#validatePW").keyup(function(){
    if(con_passwrd() && passwd()){

        $("#checkPw").html("<p class='text-success'>Validated</p>");
        document.getElementById('editPw').disabled=false

    }
    else{

    $("#checkPw").html("<p class='text-danger'>Password are not Matching</p>");
    }
    
});
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
function ChangeDisabled(value){
　if(value=='1'){
    
　document.getElementById('name').disabled=false;　// 變更欄位為可用
document.getElementById("email").setAttribute("onClict",value);
    

　}else{
　document.getElementById('name').disabled=true;　// 變更欄位為禁用

　}
}