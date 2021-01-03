var fileStr; // add picture
var boards= [];
var hashtags= [];

//this is test data for edit article
// let articleData= {boardName: "美食版", 
//                 articleTitle: "測試文章標題",
//                 content: "測試測試測試測試測試測試測試測試測試測試測試測試", 
//                 hashtag: ["過", "聒聒", "00123"]};
//test End

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

$(document).ready(async function(){
    barInitial();
    await new Promise((resolve, reject) => initial(resolve, reject));
})

$("#publishBtn").on("click", function(){
    console.log("I want publish.");
    var titleStr= $("#articleTitle").val().trim();
    var contentStr= $("#articleContent").val().trim();

    if(titleStr.length< 1){
        console.log("(Title) Too short.")
        swal({
            title: "文章標題太短嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }else if(titleStr.length> 127){
        console.log("(Title) Too long.")
        swal({
            title: "文章標題太長嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    if(contentStr.length< 10){
        console.log("(Content) Too shor.")
        swal({
            title: "文章內容太少嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }else if(contentStr.length> 20000){
        console.log("(Content) Too long.")
        swal({
            title: "文章內容太多嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    
    let cmd= {};
    if(sessionStorage.getItem("Helen-act")== "editArticle"){ // 編輯文章
        cmd["articleID"]= sessionStorage.getItem("Helen-articleID");
        cmd["act"]= "editArticle";
    }
    else{ //發布文章
        cmd["act"]= "newArticle";
    }
    cmd["account"]= sessionStorage.getItem("Helen-account")
    cmd["title"]= titleStr;
    let chooseStr= $("#chooseBoard :selected").val();
    cmd["blockName"]= chooseStr.substring(0, chooseStr.length- 1);//text()
    cmd["content"]= contentStr;
    cmd["hashTag"]= hashtags;
    cmd["picture"]= "Image"; // no picture
    console.log(cmd);
    
    $.post("../index.php", cmd, function(dataDB){
        console.log(dataDB);
        var dataDB= JSON.parse(dataDB);
        if(dataDB.status== false){
            swal({
                title: "發佈文章失敗，請稍後重試！",
                type: "error",
                text: dataDB.errorCode,
                animation: false
            }).then(( result ) => {}, ( dismiss ) => {});
        }
        else{
            // ?依最新排序的首頁
            sessionStorage.setItem("Helen-act", "home");
            sessionStorage.setItem("Helen-sort", "最新");
            location.href =  "../HTMLs/home.html";
        }
    })
})

$("#cancelPublish").on("click", function(){
    sessionStorage.removeItem('Helen-act');
    location.href =  "../HTMLs/home.html";
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

$("#hashtags").on( "click", "#clearHashtags", function(){
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

async function initial(res, rej){
    let r = await new Promise((resolve, reject) => checkPermission(resolve, reject)
         // 未登入
    );

    if(!r) return;

    //selector 載入所有看版(從 session)
    let boardData= sessionStorage.getItem("Helen-boards");
    boards= JSON.parse(boardData);

    $("#chooseBoard").empty();
    for(var i= 0; i< boards.length; i++){
        $("#chooseBoard").append(new Option(boards[i]+ "版", i));
    }

    //編輯文章
    //前 -> 後：{動作:編輯文章, 文章ID: 201}
    // !要取得文章ID!
    //後 -> 前：{"文章所屬看版", "文章標題", "文章內容", [文章的hastags], ?圖片?}
    if(sessionStorage.getItem("Helen-act")== "editArticle"){
        let cmd= {};
        cmd["act"]= "showArticleComment";
        cmd["account"]= sessionStorage.getItem("Helen-account");
        cmd["articleID"]= sessionStorage.getItem("Helen-articleID");

        $.post("../index.php", cmd, function(dataDB){
            dataDB= JSON.parse(dataDB);

            if(dataDB.status == false){
                swal({
                    title: "載入頁面失敗",
                    type: "error",
                    text: dataDB.errorCode
                }).then(( result ) => {}, ( dismiss ) => {});
            }
            else{
                article= dataDB.data
                $(".tabContent").find("h2").text("Helen－編輯文章");
                $(".tabContent").find("p").text("Edit your post.");
                //從後端拿資料
                for(var i= 0; i< boards.length; i++){ // 選取看版
                    if((boards[i])== article.boardName){
                        $("#chooseBoard")[0].selectedIndex= i; //依 text 為"看版名(美食版)"的項選中
                    }
                }
                
                $("#articleTitle").val(article.title);
                $("#articleContent").val(article.content);
                hashtags= article.hashTag;
                printHashtag();
            }
        })
    }
    res(0);
}

function checkPermission(resolve, reject){
    if(sessionStorage.getItem("Helen-account")){
        resolve(true);
    }
    else{
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {
            if ( result ){
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        }).then(( result ) => {}, ( dismiss ) => {});
        resolve(false);
    }
}