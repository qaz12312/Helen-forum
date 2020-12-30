var articles = [];

/* no php test */
// let dataDB= {};
//     dataDB["data"]= [{"articleID": "123", "title": "美國隊長也太帥了吧!"}, 
//                     {"articleID": "456", "title": "求校隊女籃ig"}, 
//                     {"articleID": "789", "title": "#詢問 大一資工課程"}];
// test End

$(document).ready(async function(){
    barInitial();
    await new Promise((resolve, reject) => initial(resolve, reject));

    $(".tabContent tr").find("td:first-child").on("click", function(){
        let thisArticleID = Object.keys(articles).find((key) => articles[key].title == $(this).text() );
        console.log(thisArticleID);
        if(thisArticleID != undefined){
            sessionStorage.setItem( "Helen-articleID", thisArticleID );
            location.href =  "../HTMLs/post.html";
        }
    });

    $(".tabContent button").on( "click", function(){
        let articleIndex = $(".tabContent tr").index(this.closest("tr"));
        if( $(this).text().trim() == "刪除"){
            let cmd= {};
            cmd["act"] = "removeKeepArticle";
            cmd["account"] = sessionStorage.getItem("Helen-userID");
            cmd["articleID"] = articles[articleIndex].articleID;
            cmd["dirName"] = sessionStorage.getItem("Helen-keepDir");

            $.post( "../index.php", cmd, function( dataDB ){
                dataDB = JSON.parse( dataDB );

                swal({
                    title: "確定要刪除此篇文章嗎？<br /><small>&lt;"
                     + articles[ articleIndex ].title
                      + "&gt;</small>",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                    animation: false
    
                    }).then(( result ) => {
                        if ( result ) 
                        {
                            if( status == false )
                            {
                                swal({
                                    title: "移除失敗<br /><small>&lt;"
                                    //  + articles[ articleIndex ].title
                                      + "&gt;</small>",
                                    type: "error",
                                    // text: dataDB.errorCode,
                                    animation: false
                                }, ( dismiss ) => {});
                            }
                            else
                            {
                                swal({
                                    title: "已成功移除收藏文章！<br /><small>&lt;"
                                     + articles[ articleIndex ].title
                                      + "&gt;</small>",
                                    type: "success",
                                }).then(( result ) => {}, ( dismiss ) => {});
                                $(this).closest( "tr" ).remove();
                                articles.splice( articleIndex, 1 );
    
                                if( articles.length == 0 )
                                {
                                    console.log( "這個收藏目錄沒有收藏任何文章" );
                                    let emptyMessage = "<tr>" + 
                                                            "<td colspan='2'>還沒有收藏文章呦！</td>" +
                                                        "</tr>";
                                    $( ".tabContent tbody" ).append( emptyMessage );
                                }
                            }
                        }
                    }, function( dismiss ) {
                        if ( dismiss === 'cancel' );
                });
            });
        }
    });
});

async function initial(res, rej){
    // if(!checkPermission()) return; // 未登入
    let r = await new Promise((resolve, reject) => checkPermission(resolve, reject)
         // 未登入
    );

    if(!r) return;
    // no Front Text
    // sessionStorage.setItem("Helen-keepDir", "尬意");
    // test End
    
    var keepDir= sessionStorage.getItem("Helen-keepDir");
    $(".tabContent").find("h2").text(keepDir);
    $(".tabContent").find("p").text("收藏目錄 > "+ keepDir);
    let cmd = {};
    cmd["act"] = "showArticleInDir";
    cmd["account"] = sessionStorage.getItem("Helen-account");
    cmd["dirName"] = keepDir;

    $.post( "../index.php", cmd, function(dataDB){
        dataDB= JSON.parse(dataDB);

        if(dataDB.status== false){
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode
            }).then(( result ) => {}, ( dismiss ) => {});
        }
        else{
            let content = $( ".tabContent tbody" );
            content.empty();
        
            articles = dataDB.data;
            if( articles.length == 0 ){
                let emptyMessage = "<tr>" + 
                                        "<td colspan='2'>還沒有收藏文章呦！</td>" +
                                    "</tr>";
                content.append( emptyMessage );
                return;
            }

            for( let i in articles ){
                let oneRow = "<tr>" + 
                                "<td>" + articles[i].title + "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn btn-default'>" +
                                        "<span class='glyphicon glyphicon-remove'></span> 刪除" +
                                    "</button>" +
                                "</td>" +
                            "</tr>";

                content.append(oneRow);
            }
        }
        res(0);
    });
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
        }, ( dismiss ) => {});
        resolve(false);
    }
}