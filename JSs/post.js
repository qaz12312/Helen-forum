let hasReport= false;

$(document).ready(function(){
    barInitial();
    initial();
});

function initial(){
    let articleID= sessionStorage.getItem("Helen-articleID");
    let cmd = {};
    cmd["act"]= "showAritcleComment";
    cmd["articleID"]= articleID;

    // $.post("../index.php", cmd, function(){
    //     var dataDB= JSON.parse(dataDB);
    //     if(dataDB.status== false){
    //         swal({
    //             title: "查看文章失敗，請稍後重試！",
    //             type: "error",
    //             text: dataDB.errorCode,
    //             animation: false
    //         });
    //     }
    //     else{
            // let article= dataDB.data;
            // let comments= article.comment;
            let article= {};
            let comments= [];

            $(".tabContent").find("h2").text(article.title); // 文章標題
            $("#authorDiv").css("background-color", article.color); // 原po頭像
            $("#authorDiv").parent().append("&emsp;"+ article.nickname); // 原po暱稱
            $(".tabContent").find("p").text(article.content); // 文章內容

            let heartText= $("#heartBtn").find("span"); // Text: 愛心 & 數字
            if(article.hasLike== 1){
                $(heartText).removeClass("text-danger");
                $(heartText).addClass("text-light");
                $("#heartBtn").addClass("btn-danger");
            }
            $(heartText).eq(1).html(" "+ article.heart);

            let keepText= $("#keepBtn").find("span");
            if(article.hasKeep== 1){ // 已收藏
                $(keepText).removeClass("text-warning");
                $(keepText).addClass("text-light");
                $("#keepBtn").addClass("btn-warning");
            }
            $(keepText).eq(1).html(" "+ article.keep);

            $("#myColor").css("background-color", sessionStorage.getItem("Helen-color")); // 自己的頭像

            // time?
            // 載入留言
            for(var i= 0; i< comments.length; i++){
                let oneRow= "<tr>"+ 
                    "<td rowspan=\"2\" style=\"vertical-align: top;\">"+
                    "<div class= \"head\" style=\"background-color: "+
                    comments[i].color +";\">B"+ 
                    comments[i].floor+ "</div>"+
                    "</td><td style=\"font-size: 15px;\">&nbsp;"+ 
                    comments[i].nickname+ "</td></tr><tr><td><a>"+ 
                    comments[i].content+ "</a></td> </tr>";
                
                $("#commentTable").append(oneRow);
            }
    //     }
    // });
}

$("#reportBtn").click(function(){
    if(hasReport){
        swal({
            title: "檢舉過嘍！",
            type: "error",
            text: "不可再次檢舉"
        })
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

            // $.post( "../index.php", cmd, function( dataDB ){
            //     dataDB = JSON.parse(dataDB);

            //     if(dataDB.status== false ){
            //         swal({
            //             title: "檢舉失敗",
            //             type: "error",
            //             text: dataDB.errorCode
            //         })
            //         // .then((result)=> {}, (dismiss)=> {});
            //     }
            //     else{
                    swal({
                        title: "已成功檢舉此文章",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    // .then((result)=> {}, (dismiss)=> {});
                    hasReport= true;
            //     }
            // });
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
    let cmd = {};
    cmd["act"] = "heart";
    cmd["account"] = sessionStorage.getItem("Helen-account");
    cmd["articleID"] = sessionStorage.getItem("Helen-articleID");
    let heartText= $(this).find("span"); // Text: 愛心 & 數字

    // $.post( "../index.php", cmd, function(dataDB){
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false ){
    //         swal({
    //             title: "錯誤！",
    //             type: "error",
    //             text: "dataDB.errorCode"
    
    //         }).then((result)=> {}, (dismiss)=> {} );
    //     }
    //     else{
            if( $(heartText).hasClass("text-danger")){ // 沒按過愛心
                $(heartText).removeClass("text-danger");
                $(heartText).addClass("text-light");
                $(this).addClass("btn-danger");
                
                var heartCount= parseInt($(heartText).eq(1).text())+ 1; // 愛心數
                $(heartText).eq(1).html(" "+ heartCount);
            }
            else{ // 按過愛心
                $(this).removeClass( "btn-danger" );
                $(heartText).addClass( "text-danger" );
                $(heartText).removeClass( "text-light" );

                var heartCount= parseInt($(heartText).eq(1).text())- 1; // 愛心數
                $(heartText).eq(1).html(" "+ heartCount);
            }
    //     }
    // });
});

$("#keepBtn").click( function(){
    let keepText = $(this).find("span");
    let keepMenu = getKeepMenu();

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

            // $.post( "../index.php", cmd, function(dataDB){
            //     dataDB = JSON.parse(dataDB);

            //     if( dataDB.status == false){
            //         swal({
            //             title: "錯誤！",
            //             type: "error",
            //             text: dataDB.errorCode,
            
            //         }).then((result)=> {}, (dismiss)=> {} );
            //     }
            //     else{
                    swal({
                        title: "收藏成功<br/><small>&lt;" + keepMenu[result] + "&gt;</small>",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
                
                    }).then(( result ) => {}, ( dismiss ) => {
                        $(keepText).removeClass("text-warning");
                        $(keepText).addClass("text-light");
                        $(this).addClass("btn-warning");

                        var keepCount= parseInt($(keepText).eq(1).text())+ 1; // 收藏數
                        $(keepText).eq(1).html(" "+ keepCount);
                    });
            //     }
            // });
        }, ( dismiss ) => {});
    }
    else{ // 已按過收藏
        let cmd = {};
        cmd["act"] = "keep";
        cmd["account"] = sessionStorage.getItem("Helen-account");
        cmd["articleID"] = sessionStorage.getItem("Helen-articleID");
        cmd["dirName"] = "";

        // $.post( "../index.php", cmd, function( dataDB ){
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false ){
        //         swal({
        //             title: "錯誤！",
        //             type: "error",
        //             text: dataDB.errorCode,
        
        //         }).then((result)=> {}, (dismiss)=> {});
        //     }
        //     else{
                $(this).removeClass("btn-warning");
                $(keepText).addClass("text-warning");
                $(keepText).removeClass("text-light");

                var keepCount= parseInt($(keepText).eq(1).text())- 1; // 收藏數
                $(keepText).eq(1).html(" "+ keepCount);
        //     }
        // });
    }
});

function getKeepMenu(){
    return ["最愛", "漫威", "小說"];

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
            return [];
        }
        else{
            return dataDB.data;
        }
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
    let cmd = {};
    cmd["act"] = "newComment";
    cmd["account"] = sessionStorage.getItem("Helen-account");
    cmd["articleID"] = sessionStorage.getItem("Helen-articleID");	
    cmd["content"] = $("#inputComment").val().trim();
    
    // $.post( "../index.php", cmd, function(dataDB){
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false){
    //         swal({
    //             title: "留言失敗",
    //             type: "error",
    //             text: dataDB.errorCode
    //         }).then((result) => {}, ( dismiss ) => {} );
    //     }
    //     else{
            swal({
                title: "留言成功",
                type: "success",
                showConfirmButton: false,
                timer: 1000
            })
    //     }
    // });
}

$("#commentTable").on("click", "a", function(){
    let commentIndex= $(this).parent().parent().prev().children().eq(0).text().trim().substring(1);
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
            // $.post( "../index.php", cmd, function(dataDB){
            //     dataDB = JSON.parse( dataDB );
        
            //     if( dataDB.status == false){
            //         swal({
            //             title: "刪除失敗",
            //             type: "error",
            //             text: dataDB.errorCode
            //         }).then((result) => {}, ( dismiss ) => {} );
            //     }
            //     else{
                    swal({
                        title: "刪除成功",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
                    })
            //     }
            // });
    }, ( dismiss ) => {})
})