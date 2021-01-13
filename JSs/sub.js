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
        let thisArticleID = articles.find((element)=>element.title == $(this).text()).articleID;
        if(thisArticleID != undefined){
            sessionStorage.setItem( "Helen-articleID", thisArticleID );
            location.href =  "../HTMLs/post.html";
        }
    });
    
    $( document ).on( "click", ".btn-default", function()
    {
        let articleIndex = $(".tabContent tr").index(this.closest("tr"));
        
        swal({
        title: "確定要刪除此篇文章於此收藏嗎？<br /><small>&lt;" + articles[ articleIndex ].title + "&gt;</small>",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        animation: false,

        }).then(( result ) => {
            if ( result ) 
            {
                let cmd= {};
                cmd["act"] = "removeKeepArticle";
                cmd["account"] = sessionStorage.getItem("Helen-account");
                cmd["articleID"] = articles[articleIndex].articleID;
                cmd["dirName"] = sessionStorage.getItem("Helen-keepDir");
                $.post( "../index.php", cmd, function( dataDB ){
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        swal({
                            title: "刪除失敗<br /><small>&lt;" + articles[ articleIndex ].title +"&gt;</small>",
                            type: "error",
                            text: dataDB.errorCode,

                        }).then((result) => {}, ( dismiss ) => {});
                    }
                    else
                    {
                        swal({
                            title: "已成功刪除文章！<br /><small>&lt;" + articles[ articleIndex ].title+ "&gt;</small>",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,
                            
                        }).then((result) => {}, ( dismiss ) => {location.reload();});
                    }
                });
            }
        }, ( dismiss ) => {});
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
    $( ".tabContent tbody" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>LOADING...</h1>";
    $( ".tabContent tbody" ).append( httpStatus );
    var keepDir= sessionStorage.getItem("Helen-keepDir");
    $(".tabContent").find("h2").text(keepDir);
    $(".tabContent").find("p").html("<a href= \"../HTMLs/CollectionCatalog.html\" style= \"text-decoration: none; color: #3c537c;\">收藏目錄</a> > "+ keepDir);
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