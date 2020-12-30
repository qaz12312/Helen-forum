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
            var contentStr= article.content;
            contentStr+= "\n";
            for(var i= 0; i< article.hashTag.length; i++){
                contentStr+= "#"+ article.hashTag[i]+ " ";
            }

            $(".tabContent").find("h2").text(article.title); // 文章標題
            $("#authorDiv").parent().html("<div id= \"authorDiv\" class= \"head\" style=\"float:left;\"></div>"+
                                            "&emsp;"+ article.authorNickName); // 原po暱稱
            
            $("#authorDiv").css("background-color", article.authorColor); // 原po頭像
            $(".tabContent").find("p").text(contentStr); // 文章內容

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
            $("#commentTable").empty();
        
            if(comments.length== 0){
                $("#commentTable").append("<tr><td colspan=\"2\" style= \"width: 750px;\">&emsp;No Comments</td></tr>");
            }
            for(var i= 0; i< comments.length; i++){
                let oldStr= comments[i].content;
                var newStr= oldStr.replace(tagRe, "<a>"+ "$1"+ "</a>");
                
                var oneRow= "<tr><td rowspan=\"2\" style=\"vertical-align: top;\">"+
                            "<div class= \"head\" style=\"background-color: "+ 
                            comments[i].color +";\">B"+ 
                            comments[i].floor+ "</div></td><td style=\"font-size: 15px;\">&nbsp;"+ 
                            comments[i].nickname;
                if(comments[i].isOwn== 1){
                    oneRow+= "<button type=\"button\" class=\"btn btn-dark deleteComment\">"+
                            "<span class=\"glyphicon glyphicon-trash\"></span></button>"
                }
                oneRow+= "</td></tr><tr><td>"+ newStr+ "</td></tr>";
                
                $("#commentTable").append(oneRow);
            }
        }
    });
    res(0);
}

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

    $.post( "../index.php", cmd, function(dataDB){
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
                $(this).removeClass("btn-secondary");
                $(this).addClass("btn-danger");
                
                var heartCount= parseInt($(heartText).eq(1).text())+ 1; // 愛心數
                $(heartText).eq(1).html(" "+ heartCount);
            }
            else{ // 按過愛心
                $(this).removeClass("btn-danger");
                $(this).addClass("btn-secondary");
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
    await new Promise ((resolve, reject) => {getKeepMenu(resolve, reject);});
	
    if(keepMenu.length== 0){
        swal({
            title: "錯誤",
            type: "error",
            text: "沒有可用的收藏分類哦！",

        }).then(( result ) => {}, ( dismiss ) => {} );
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
                        $(this).addClass("btn-warning");
                        $(this).removeClass("btn-secondary");

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
                $(this).removeClass("btn-warning");
                $(this).addClass("btn-secondary");
                $(keepText).addClass("text-warning");
                $(keepText).removeClass("text-light");

                var keepCount= parseInt($(keepText).eq(1).text())- 1; // 收藏數
                $(keepText).eq(1).html(" "+ keepCount);
            }
        });
    }
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

$("#commentTable").on("click", "button", function(){
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