let hasReport= false;
let comments= [];
let keepMenu= [];

$(document).ready(async function(){
    barInitial();
    await new Promise((resolve, reject) => initial(resolve, reject));
});

//test
// let dataDB= {data: {title: "蜘蛛人2情報", 
//                     content: "奇異博士已經確認演出，聽說最新消息是陶比麥奎爾與安德魯加菲爾德，也就是前兩代索尼版蜘蛛人也確認將會加入演出。也就是說，粉絲將有機會看到三代蜘蛛人出現在同一部電影！PS:陶比版蜘蛛人真的是經典", 
//                     like: 520, 
//                     keep: 11, 
//                     nickname: "Apple", 
//                     color: "#ff0012",
//                     time: "2020/12/21 07:06 p.m.",  
//                     comment: [{content: "@B3 喜歡@B2", floor: 1, nickname: "aaa", color: "#f0f0f0"},
//                             {content: "跟大家說， @B1 是醜男", floor: 2, nickname: "bbb", color: "#abcda0"},
//                             {content: "我不喜歡 @B2 辣", floor: 4, nickname: "ccc", color: "#123355"},
//                             {content: "哈哈哈嫁給我吧 @B7", floor: 6, nickname: "ddd", color: "#343434"},
//                             {content: "@B6才不要", floor: 7, nickname: "eee", color: "#5f4bec"},
//                             {content: "@B1 @B2 @B4 @B6 @B7 你們這群擊敗人", floor: 9, nickname: "fff", color: "#f0f0f0"}]}};
//test end

async function initial(res, rej){
    let articleID= sessionStorage.getItem("Helen-articleID");
    let cmd = {};
    let tagRe= /(@\d+波)/g;
    cmd["act"]= "showArticleComment";
    if(sessionStorage.getItem("Helen-account")){
        cmd["account"]= sessionStorage.getItem("Helen-account");
    }
    cmd["articleID"]= articleID;

    $.post("../index.php", cmd, function(dataDB){
        var dataDB= JSON.parse(dataDB);
        if(dataDB.status== false){
            swal({
                title: "查看文章失敗，請稍後重試！",
                type: "error",
                text: dataDB.errorCode,
                animation: false
            }).then(( result ) => {}, ( dismiss ) => {});
        }
        else{
            let article= dataDB.data;
            comments= article.comment;
            // 如果是我的文章，就會出現 編輯文章button
            if (article.isAuthor){
                let editCol = $("#editArticle");
                let editBtn = "<button type='button' class='btn btn-default'>" +
                                "<span class='glyphicon glyphicon-book'></span> 編輯" +
                              "</button>";
                editCol.append(editBtn);
            }
            var contentStr= article.content; // 文章內文
            let brRe= /(\n)/g;
            contentStr= contentStr.replace(brRe, "<br />"); // 文章內文的換行變成html的<br>

            let imgRe= /!\[http\S+\]/g;
            contentStr= contentStr.replace(imgRe, function(word){ // 加上圖片
                return "<img src= \""+ word.substring(2, word.length- 1)+ "\">";
            });
            contentStr+= "<br/>";
            // 加上本地端圖片
            if(article.image)
                contentStr+= "<img src= \""+ article.image+ "\" style='width: 45%;height: 45%;'>";
		
            if(article.hashTag){
                contentStr+= "<br/>";
                for(var h= 0; h< article.hashTag.length; h++){ // 加上hashtags
                    if(h== 0) contentStr+= "<br />";
                    contentStr+= "<button type='button' class='hashTagSearch'><span class='badge badge-pill'>#"+ article.hashTag[h]+ "</span> </button>";
                }
            }
            
            $(".tabContent").find("h2").text(article.title); // 文章標題
            $("#authorDiv").parent().html("<div id= \"authorDiv\" class= \"head\" style=\"float:left;\"></div>"+
                                            "&emsp;"+ article.authorNickName); // 原po暱稱
            
            $("#authorDiv").css("background-color", article.authorColor); // 原po頭像
            $(".tabContent").find("p").html(contentStr); // 文章內容
            $("#getm").val(contentStr); // markdown

            let heartText= $("#heartBtn").find("span"); // Text: 愛心 & 數字
            if(article.hasLike== 1){
                $(heartText).removeClass("text-danger");
                $(heartText).addClass("text-light");
                $("#heartBtn").removeClass("btn-secondary");
                $("#heartBtn").addClass("btn-danger");
            }
            heartText.eq(1).html(" "+ article.like);

            let keepText= $("#keepBtn").find("span");
            if(article.hasKeep== 1){ // 已收藏
                $(keepText).removeClass("text-warning");
                $(keepText).addClass("text-light");
                $("#keepBtn").removeClass("btn-secondary");
                $("#keepBtn").addClass("btn-warning");
            }
            keepText.eq(1).html(" "+ article.keep);

            $("#postTime").text(article.time) // 顯示po文時間

            $("#myColor").css("background-color", sessionStorage.getItem("Helen-color")); // 自己的頭像

            // 載入留言
            $("#commentTable tbody").empty();
        
            if(comments.length== 0){
                $("#commentTable tbody").append("<tr><td colspan=\"2\" style= \"width: 250px;\" \"max-height: 500px;\" overflow-x:hidden;\" overflow-y:auto;\">&emsp;No Comments</td></tr>");
            }
            for(var i= 0; i< comments.length; i++){
                let oldStr= comments[i].content;
                var newStr= oldStr.replace(tagRe, "<a>"+ "$1"+ "</a>");
                
                var oneRow = "<tr>" +
                                "<td rowspan=\"2\" style=\"vertical-align: top;\">" +
                                "<div class= \"head\" style=\"font-size: 15px; background-color: " + comments[i].color + ";\"> B" + comments[i].floor + "</div></td>" +
                                "<td style=\"font-size: 15px;\">&nbsp;" + comments[i].nickname;
                if(comments[i].isOwn== 1){ // 是自己的留言
                    oneRow+= "<button type=\"button\" class=\"btn btn-dark deleteComment\">"+
                            "<span class=\"glyphicon glyphicon-trash\"></span></button>"+
                            "<button type=\"button\" class=\"btn btn-dark editComment\">"+
                            "<span class=\"glyphicon glyphicon-pencil\"></span></button>"
                }
                oneRow+= "</td></tr><tr><td>"+ newStr+ "</td></tr>";
                
                $("#commentTable tbody").append(oneRow);
            }
        }
    });
    res(0);
}

// edit article
$(document).on("click", ".btn-default", function () {
    sessionStorage.setItem("Helen-act", "editArticle");
    window.location.href = "../HTMLs/publishArticle.html";
});
// edit article
$("#reportBtn").click(function(){
    if(hasReport){
        swal({
            title: "檢舉過嘍！",
            type: "error",
            text: "不可再次檢舉"
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }if(!(sessionStorage.getItem("Helen-account"))){
        swal({
            title: "無法檢舉！",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    swal({
        title: "檢舉",
        input: "textarea",
        inputPlaceholder: "請輸入檢舉原因...",
        showCancelButton: true,
        confirmButtonText: "送出",
        cancelButtonText: "取消",
        animation: false
        }).then((result) => {
            let cmd = {};
            cmd["act"] = "sendReport";
            cmd["account"] = sessionStorage.getItem("Helen-account");
            cmd["articleID"] = sessionStorage.getItem("Helen-articleID");
            cmd["reason"] = result;

            $.post( "../index.php", cmd, function(dataDB){
                console.log(dataDB);
                dataDB = JSON.parse(dataDB);

                if(dataDB.status== false ){
                    swal({
                        title: "檢舉失敗",
                        type: "error",
                        text: dataDB.errorCode
                    })
                    .then((result)=> {}, (dismiss)=> {});
                }
                else{
                    swal({
                        title: "已成功檢舉此文章",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    .then((result)=> {}, (dismiss)=> {});
                    hasReport= true;
                }
            });
        }, (dismiss)=> {});
});

// 擋掉enter自動submit，並在按下enter時加入"\n"
$('body').on('keydown', 'textarea', function(e){
    if(e.which === 13){
        e.preventDefault();
        var value = e.target.value;
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;

        if(start === end){
            value = value.substring(0, start) + "\n" + value.substring(start, value.length);
        }
        else{
            value = value.substring(0, start) + "\n" + value.substring(end, value.length);
        }
        e.target.value = value;
    }
    return e.which !== 13;
});

function escapeHtml(str){ // 擋掉html攻擊
    return $('<div/>').text(str).html();
}

$("#heartBtn").click( function(){
    if(!(sessionStorage.getItem("Helen-account"))){
        swal({
            title: "無法按讚！",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    let cmd = {};
    cmd["act"] = "heart";
    cmd["account"] = sessionStorage.getItem("Helen-account");
    cmd["articleID"] = sessionStorage.getItem("Helen-articleID");
    let heartText= $(this).find("span"); // Text: 愛心 & 數字
    let heartBtn= $(this);

    $.post( "../index.php", cmd, function(dataDB){
        console.log(dataDB);
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false ){
            swal({
                title: "錯誤！",
                type: "error",
                text: "dataDB.errorCode"
    
            }).then((result)=> {}, (dismiss)=> {} );
        }
        else{
            if( $(heartText).hasClass("text-danger")){ // 沒按過愛心
                $(heartText).removeClass("text-danger");
                $(heartText).addClass("text-light");
                $(heartBtn).removeClass("btn-secondary");
                $(heartBtn).addClass("btn-danger");
                
                var heartCount= parseInt($(heartText).eq(1).text())+ 1; // 愛心數
                $(heartText).eq(1).html(" "+ heartCount);
            }
            else{ // 按過愛心
                $(heartBtn).removeClass("btn-danger");
                $(heartBtn).addClass("btn-secondary");
                $(heartText).addClass("text-danger" );
                $(heartText).removeClass("text-light" );

                var heartCount= parseInt($(heartText).eq(1).text())- 1; // 愛心數
                $(heartText).eq(1).html(" "+ heartCount);
            }
        }
    });
});

$("#keepBtn").click(async function(){
    if(!(sessionStorage.getItem("Helen-account"))){
        swal({
            title: "無法收藏！",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    let keepText = $(this).find("span");
    let keepBtn = $(this);
    await new Promise ((resolve, reject) => {getKeepMenu(resolve, reject);});
	
    if(keepMenu.length== 0){
        swal({
            title: "警告",
            type: "warning",
            text: "沒有可用的收藏分類哦",
            showCancelButton: true,
            confirmButtonText: "\u002b 分類",
            cancelButtonText: "取消",

        }).then(( result ) => {
            swal({
                title: "新增收藏分類",
                input: "text",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                
            }).then( async ( result ) =>{
                let dirName = result;

                while( dirName == "" ){
                    let dismissing = await swal({

                        title: "請輸入收藏分類名稱",
                        type: "warning",
                        input: "text",
                        showCancelButton: true,
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",

                    }).then((result) =>{
                        dirName = result;
                        return false

                    }, ( dismiss ) =>{
                        return true;
                    });

                    if( dismissing ) break;
                }

                let cmd = {};
                cmd[ "act" ] = "newDir";
                cmd[ "account" ] = thisAccount;
                cmd[ "dirName" ] = dirName;

                $.post( "../index.php", cmd, function( dataDB ){
                    dataDB = JSON.parse( dataDB );

                    if(dataDB.status== false){
                        swal({
                            title: "新增收藏分類失敗",
                            type: "error",
                            text: dataDB.errorCode,
                            confirmButtonText: "確定",

                        }).then(( result ) => {}, ( dismiss ) => {});
                    }
                    else{
                        keepMenu.push( dirName );
                        let cmd = {};
                        cmd[ "act" ] = "keep";
                        cmd[ "account" ] = thisAccount;
                        cmd[ "articleID" ] = thisArticle.articleID;
                        cmd[ "dirName" ] =  dirName;

                        $.post( "../index.php", cmd, function(dataDB){
                            dataDB = JSON.parse( dataDB );

                            if( dataDB.status == false ){
                                swal({
                                    title: "錯誤！",
                                    type: "error",
                                    text: dataDB.errorCode,
                        
                                }).then(( result ) => {}, ( dismiss ) => {} );
                            }
                            else{
                                swal({
                                    title: "收藏成功<br/><small>&lt;" + dirName + "&gt;</small>",
                                    type: "success",
                                    showConfirmButton: false,
                                    timer: 1000,
                            
                                }).then(( result ) => {}, ( dismiss ) => {
                                    $(keepText).removeClass("text-warning");
                                    $(keepText).addClass("text-light");
                                    $(keepBtn).addClass("btn-warning");
                                    $(keepBtn).removeClass("btn-secondary");

                                    var keepCount= parseInt($(keepText).eq(1).text())+ 1; // 收藏數
                                    $(keepText).eq(1).html(" "+ keepCount);
                                });
                            }
                        });
                        
                    }
                });
            }, ( dismiss ) => {});
        }, ( dismiss ) => {} );
        return;
    }
    else if( $(keepText).hasClass("text-warning") ){ // 沒按過收藏
        swal({
            title: "選擇收藏目錄",
            input: 'select',
            inputOptions: keepMenu,
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",

        }).then((result) => {
            let cmd = {};
            cmd["act"] = "keep";
            cmd["account"] = sessionStorage.getItem("Helen-account");
            cmd["articleID"] = sessionStorage.getItem("Helen-articleID");
            cmd["dirName"] = keepMenu[result];

            $.post( "../index.php", cmd, function(dataDB){
                dataDB = JSON.parse(dataDB);

                if( dataDB.status == false){
                    swal({
                        title: "錯誤！",
                        type: "error",
                        text: dataDB.errorCode,
            
                    }).then((result)=> {}, (dismiss)=> {} );
                }
                else{
                    swal({
                        title: "收藏成功<br/><small>&lt;" + keepMenu[result] + "&gt;</small>",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
                
                    }).then(( result ) => {}, ( dismiss ) => {
                        $(keepText).removeClass("text-warning");
                        $(keepText).addClass("text-light");
                        $(keepBtn).addClass("btn-warning");
                        $(keepBtn).removeClass("btn-secondary");

                        var keepCount= parseInt($(keepText).eq(1).text())+ 1; // 收藏數
                        $(keepText).eq(1).html(" "+ keepCount);
                    });
                }
            });
        }, ( dismiss ) => {});
    }
    else{ // 已按過收藏
        let cmd = {};
        cmd["act"] = "keep";
        cmd["account"] = sessionStorage.getItem("Helen-account");
        cmd["articleID"] = sessionStorage.getItem("Helen-articleID");
        cmd["dirName"] = "";

        $.post( "../index.php", cmd, function( dataDB ){
            dataDB = JSON.parse( dataDB );

            if( dataDB.status == false ){
                swal({
                    title: "錯誤！",
                    type: "error",
                    text: dataDB.errorCode,
        
                }).then((result)=> {}, (dismiss)=> {});
            }
            else{
                $(keepBtn).removeClass("btn-warning");
                $(keepBtn).addClass("btn-secondary");
                $(keepText).addClass("text-warning");
                $(keepText).removeClass("text-light");

                var keepCount= parseInt($(keepText).eq(1).text())- 1; // 收藏數
                $(keepText).eq(1).html(" "+ keepCount);
            }
        });
    }
});

// 搜尋
$(".content p").on("click","hashTagSearch",function(){
   alert($(this).Text);
	
});

// 取得收藏目錄
function getKeepMenu(resolve, reject){
    // return ["最愛", "漫威", "小說"];
    keepMenu= [];
    let cmd = {};
    cmd["act"] = "showDirList";
    cmd["account"] = sessionStorage.getItem("Helen-account");

    $.post( "../index.php", cmd, function(dataDB){
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false){
            swal({
                title: "取得收藏資分類失敗",
                type: "error",
                text: dataDB.errorCode
            }).then((result) => {}, ( dismiss ) => {} );
        }
        else{
            let keep= dataDB.data;
            for(var k= 0; k< keep.length; k++){
                keepMenu.push(keep[k]);
            }
        }
        resolve(0);
    });
}

$("#commentBtn").click(function(){
    leaveComment();
});
$("#inputComment").keypress(function(event){
    if(event.keyCode== 13){ // 按下 ENTER
        leaveComment();
    }
});

function leaveComment(){
    if(!(sessionStorage.getItem("Helen-account"))){
        swal({
            title: "無法留言！",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    let inputComment= $("#inputComment").val().trim();
    if(inputComment.length< 1){
        swal({
            title: "留言是空的！",
            type: "warning",
            // text: dataDB.errorCode
        });
        return;
    }else if(inputComment.length> 1000000){
        swal({
            title: "留言太長嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    let cmd = {};
    cmd["act"] = "newComment";
    cmd["account"] = sessionStorage.getItem("Helen-account");
    cmd["articleID"] = sessionStorage.getItem("Helen-articleID");	
    cmd["content"] = inputComment;
    
    $.post( "../index.php", cmd, function(dataDB){
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false){
            swal({
                title: "留言失敗",
                type: "error",
                text: dataDB.errorCode
            }).then((result) => {}, ( dismiss ) => {} );
        }
        else{
            swal({
                title: "留言成功",
                type: "success",
                timer: 1000,
                showConfirmButton: false
            }).then((result)=> {}, (dismiss)=>
            {
                location.reload();
            });
        }
    });
}
/*刪除此留言*/
$("#commentTable").on("click", ".deleteComment", function(){
    console.log("delete")
    let commentIndex= $(this).parent().prev().text().trim().substring(1);
    commentIndex= parseInt(commentIndex);

    swal({
        title: "確定要刪除此留言？",
        text: "將無法恢復該留言！",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "確定",
        cancelButtonText: "取消"
    }).then(( result ) => {
            let cmd= {};
            cmd["act"]= "deleteComment";
            cmd["account"]= sessionStorage.getItem("Helen-account");
            cmd["articleID"]= sessionStorage.getItem("Helen-articleID");
            cmd["floors"]= commentIndex;
            $.post( "../index.php", cmd, function(dataDB){
                dataDB = JSON.parse( dataDB );
        
                if( dataDB.status == false){
                    swal({
                        title: "刪除失敗",
                        type: "error",
                        text: dataDB.errorCode
                    }).then((result) => {}, ( dismiss ) => {} );
                }
                else{
                    swal({
                        title: "刪除成功",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
                    }).then((result) => {}, ( dismiss ) =>
                    {
                        location.reload();
                    } );
                }
            });
    }, ( dismiss ) => {})
})
/*修改留言*/ 
$("#commentTable").on("click", ".editComment", function(){
    let commentIndex= $(this).parent().prev().text().trim().substring(1);
    commentIndex= parseInt(commentIndex);
    console.log("edit")
    swal({
        title: "修改留言",
        input: "textarea",
        inputPlaceholder: "請輸入文字...",
        showCancelButton: true,
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        animation: false
            
        }).then(( result ) => {
            let cmd = {};
            cmd["act"] = "editComment";
            cmd["account"] = sessionStorage.getItem("Helen-account");
            cmd["detail"] = result;
            cmd["articleID"] = sessionStorage.getItem("Helen-articleID");
            cmd["floors"] = commentIndex;
            $.post( "../index.php", cmd, function( dataDB ){
            dataDB = JSON.parse( dataDB );
               
                    if( dataDB.status == false )
                    {
                                
                        swal({
                            title: "修改失敗",
                            
                            type: "error",
                             text: dataDB.errorCode,
                            animation: false
                        }).then(( result ) => {}, ( dismiss ) => {});
                    }
                    else
                    {
                        console.log(result)
                            
                        swal({
                            title: "已成功修改留言！",
                            type: "success",
                            timer: 1000,
                            showConfirmButton: false,

                        }).then(( result ) => {}, ( dismiss ) => {
                            if ( dismiss ) 
                            {
                                
                                location.reload();
                            }
                        }).then(( result ) => {}, ( dismiss ) => {
                            if ( dismiss ) 
                            {
                                
                                location.reload();
                            }
                        });

                    }
                
            });
        
        }, ( dismiss ) => {} );           
})

// 點擊樓層tag
$("#commentTable").on("click", "a", function() { 
    clickTag(this); 
} );

function clickTag( thisTag ){
    let tagStr= $(thisTag).text().trim();
    let commentIndex= tagStr.substring(1, tagStr.length- 1);
    commentIndex= parseInt(commentIndex);

    // let comments= dataDB.data.comment;
    let floorComment= comments.find((element)=> element.floor== commentIndex);

    if(floorComment){
        let tagRe= /(@\d+波)/g;
        let oldStr= floorComment.content;
        var newStr= oldStr.replace(tagRe, "<a onclick='clickTag(this)'>"+ "$1"+ "</a>");
        
        swal({
            title: "<div style= \"text-align: left;\"><div class= \"head\" style=\"background-color: "+ 
                    floorComment.color+ ";\">B"+ 
                    floorComment.floor+ "</div>&nbsp;"+ 
                    "<span style= \"font-size: 18px;\">"+ 
                    floorComment.nickname+ "</span></div>",
            html: newStr,
        }).then((result) => {}, ( dismiss ) => {} );
    }else{
        swal({
            title: "查看留言失敗",
            type: "error",
            text: "無此留言"
        }).then((result) => {}, ( dismiss ) => {} );
    }
}
