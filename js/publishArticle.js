var fileStr;
var hashtags= [];

//this is test data
let articleData= {boardName: "美食版", 
                articleTitle: "測試文章標題",
                content: "測試測試測試測試測試測試測試測試測試測試測試測試", 
                hashtag: ["過", "聒聒", "00123"]}

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
    if(titleStr.length< 1){
        console.log("(Title) Too short.")
        swal({
            title: "文章標題太短嘍！",
            type: "warning",
            // text: dataDB.errorCode
        });
    }else if(titleStr.length> 127){
        console.log("(Title) Too long.")
        swal({
            title: "文章標題太長嘍！",
            type: "warning",
            // text: dataDB.errorCode
        });
    }else if(contentStr.length< 10){
        console.log("(Content) Too shor.")
        swal({
            title: "文章內容太少嘍！",
            type: "warning",
            // text: dataDB.errorCode
        });
    }else if(contentStr.length> 20000){
        console.log("(Content) Too long.")
        swal({
            title: "文章標題太多嘍！",
            type: "warning",
            // text: dataDB.errorCode
        });
    }else{
        cmd["act"]= "addArticle";
        cmd["userID"]= sessionStorage.getItem("Helen-userID")
        cmd["articleTitle"]= titleStr;
        cmd["boardName"]= $("#chooseBoard :selected").val();//text()
        cmd["content"]= contentStr;
        cmd["hashtag"]= hashtags;
        console.log(hashtags);
        
        // $.post("../index.php", cmd, function(){
            var dataDB= JSON.parse(dataDB);
            // if(dataDB.status== false){
            //     swal({
            //         title: "發佈文章失敗，請稍後重試！",
            //         type: "error",
            //         text: dataDB.errorCode,
            //         animation: false
            //     });
            // }
            // else{
                sessionStorage.setItem("act", "home");
                sessionStorage.setItem("sort", "time");
                location.href =  "../html/home.html";
            // }
        // })
    }
})

$("#cancelPublish").on("click", function(){
    console.log("Back To HOME Page.")
    location.href =  "../html/home.html";
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
    //selector 載入所有看版
    if(sessionStorage.getItem("Helen-act")== "editArticle"){
        let cmd= {};
        cmd["act"]= "aditArticle";

        // $.post("../index.php", cmd, function(dataDB){
        //     dataDB= JSON.parse(dataDB);

        //     if(dataDB.status == false){
        //         swal({
        //             title: "載入頁面失敗",
        //             type: "error",
        //             text: dataDB.errorCode
        //         });
        //     }
        //     else{
                articleData= dataDB.data
                $(".tabContent").find("h2").text("Helen－編輯文章");
                $(".tabContent").find("p").text("Edit your post.");
                //從後端拿資料
                $("#chooseBoard").find("option[text= '" + articleData.boardName+ "版']").attr("selected", true);
                //依 text 為"看版名(美食版)"的項選中
                $("#articleTitle").val()= articleData.articleTitle;
                $("#articleContent").val()= articleData.content;
                hashtags= articleData.hashtag;
                printHashtag();
        //     }
        // })
    }
}
