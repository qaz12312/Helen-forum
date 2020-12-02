var fileStr;
var hashtags= [];

document.querySelector("html").classList.add('js');

var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector( ".file-return");
    
button.addEventListener( "keydown", function( event ) {  
    if ( event.keyCode == 13 || event.keyCode == 32 ) {  
        fileInput.focus();  
    }  
});
button.addEventListener( "click", function( event ) {
    fileInput.focus();
    return false;
});  
fileInput.addEventListener( "change", function( event ) { 
    var fileStr= this.value;
    fileStr= fileStr.substring(12, fileStr.length);
    the_return.innerHTML = fileStr;
});

$(document).ready(function(){
    initial();
})

$("#publishBtn").on("click", function(){
    console.log("I want publish.");
    var titleStr= $("#articleTitle").val().trim();
    var contentStr= $("#articleContent").val().trim();
    let cmd= {};
    if(titleStr.length< 1|| titleStr.length> 127){
        console.log("(Title) Too short or Too long.")
    }else if(contentStr.length< 10|| contentStr.length> 20000){
        console.log("(Content) Too short or Too long.")
    }else{
        cmd["act"]= "addArticle";
        cmd["userID"]= sessionStorage.getItem("Helen-userID")
        cmd["articleTitle"]= titleStr;
        cmd["boardName"]= $("#chooseBoard :selected").val();//text()
        cmd["content"]= contentStr;
        cmd["hashtag"]= hashtags;
        console.log(hashtags);
        
        $.post("../index.php", cmd, function(){
            var dataDB= JSON.parse(dataDB);
            if(dataDB.status== false){

            }else{

            }
        })
    }
})

$("#cancelPublish").on("click", function(){
    console.log("Back To HOME Page.")
})

$("#inputHashtag").keypress(function (event){
    var hashtagStr= $("#inputHashtag").val().trim();
    if(event.keyCode== 13){
        if(hashtags.length>= 5){
            console.log(hashtags+ " >= 5");
        }else if(hashtagStr.length<= 0){
            console.log("no Input");
        }else if(hashtagStr== "#"){
            console.log("no Input");
        }else{
            if(hashtagStr[0] == "#"){
                hashtagStr= hashtagStr.substring(1, hashtagStr.length).trim();
            }
            console.log(hashtagStr)
            hashtags.push(hashtagStr);
            $("#inputHashtag").val("#");
            printHashtag();
        }
        console.log(hashtags);
    }
})

$( document ).on( "click", "#clearHashtags", function(){
    hashtags= [];
    printHashtag();
});

function printHashtag(){
    $("#hashtags").empty();
    var temp= "";
    for(let h in hashtags){
        temp+= '<span class="badge badge-pill">#'+ hashtags[h]+ "</span> ";
    }
    if(temp!= ""){
        temp= '<span id= "clearHashtags" class="glyphicon glyphicon-remove"></span> '+ temp;
    }
    $("#hashtags").append(temp);
}

function initial(){
    if(sessionStorage.getItem("Helen-act")== "editArticle"){
        $(".tabContent").find("h2").text("Helen－編輯文章");
        $(".tabContent").find("p").text("Edit your post.");
        //從後端拿資料
        // $("#chooseBoard :selected")
        // $("#articleTitle").val()
        // $("#articleContent").val()
        // hashtags
        printHashtag()
    }
}