var articles = {};
var thisBoardName = sessionStorage.getItem( 'Helen-boardName' );
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        let thisArticleID = Object.keys( articles ).find( ( key ) => articles[ key ][0].title == $(this).text() );

        if( thisArticleID != undefined )
        {
            sessionStorage.setItem( "Helen-articleID", thisArticleID );
            location.href =  "../HTMLs/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        let thisArticleTitle = $(this).closest( "tr" ).find( "td:first-child" ).text();
        let thisArticle = Object.keys( articles ).find( ( key ) => 
        {
            return articles[ key ][0].title == thisArticleTitle;
        });

        if( $(this).text().trim() == "原因" )
        {
            let reasonsQueue = [];
            let steps = [];
            
            for( let i in articles[ thisArticle ] )
            {
                reasonsQueue.push(
                { 
                    title: "檢舉原因&emsp;<cite>" + articles[ thisArticle ][i].time + "</cite><br />" +
                           "<small>&lt;" + articles[ thisArticle ][i].title + "&gt;</small>",
                    html: escapeHtml( articles[ thisArticle ][i].reason ).split( "\n" ).join( "<br/>" ),
                    showCancelButton: true,
                    confirmButtonText: "Next &rarr;",
                    cancelButtonText: "取消",
                    animation: false,
                });

                steps.push( parseInt(i) + 1 );
            }

            swal.setDefaults( { progressSteps: steps } );

            swal.queue( reasonsQueue ).then( ( result ) => 
            {
                swal.setDefaults( { progressSteps: false } );

            }, ( dismiss ) =>
            {
                swal.setDefaults( { progressSteps: false } );
            });

        }
        else if( $(this).text().trim() == "刪除" )
        {
            let chosen = this;

            swal({
                title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + articles[ thisArticle ][0].title + "&gt;</small>",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F09900",
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => {
                if ( result ) 
                {
                    let cmd = {};
                    cmd[ "act" ] = "deleteReport";
                    cmd[ "articleID" ] = thisArticle;
                    cmd[ "isPass" ] = 1;
                    
                    $.post( "../index.php", cmd, function( dataDB ){
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "刪除失敗<br /><small>&lt;" + articles[ thisArticle ][0].title + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功刪除文章！<br /><small>&lt;" + articles[ thisArticle ][0].title + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
                                
                            }).then((result) => {}, ( dismiss ) => {});
    
                            $(chosen).closest( "tr" ).remove();
                            delete articles[ thisArticle ];
    
                            if( $.isEmptyObject(articles) )
                            {
                                let emptyMessage = "<tr>" + 
                                                        "<td colspan='4'>檢舉文章列表為空</td>" +
                                                    "</tr>";
                                $( ".tabContent tbody" ).append( emptyMessage );
                            }
                        }
                    });
                }
            }, ( dismiss ) => {});
        }
        else if( $(this).text().trim() == "取消" )
        {
            let chosen = this;

            swal({
                title: "確定要取消檢舉此篇文章嗎？<br /><small>&lt;" + articles[ thisArticle ][0].title + "&gt;</small>",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F09900",
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => 
            {
                if ( result ) 
                {
                    let cmd = {};
                    cmd[ "act" ] = "deleteReport";
                    cmd[ "isPass" ] = 0;
                    cmd[ "articleID" ] = thisArticle;

                    $.post( "../index.php", cmd, function( dataDB )
                    {
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "取消檢舉失敗<br /><small>&lt;" + articles[ thisArticle ][0].title + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功取消檢舉文章！<br /><small>&lt;" + articles[ thisArticle ][0].title + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
    
                            }).then((result) => {}, ( dismiss ) => {});
    
                            $(chosen).closest( "tr" ).remove();
                            delete articles[ thisArticle ];
    
                            if( $.isEmptyObject(articles) )
                            {
                                let emptyMessage = "<tr>" + 
                                                        "<td colspan='4'>檢舉文章列表為空</td>" +
                                                    "</tr>";
                                $( ".tabContent tbody" ).append( emptyMessage );
                            }
                        }
                    });
                }
            }, ( dismiss ) => {});
        }
    });
});

async function initial( res, rej )
{
    $( ".tabContent tbody" ).empty();
    //                 let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>LOADING...</h1>";
    // $( ".tabContent tbody" ).append( httpStatus );
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch(
    ( error ) =>
    {
        res(1);
    });

    let cmd = {};
    cmd[ "act" ] = "showReport";
    cmd[ "boardName" ] = thisBoardName;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,
                confirmButtonText: "確定",

            }).then((result) => {}, ( dismiss ) => {});
        }
        else
        {
            $( ".tabContent h2" ).html( thisBoardName + "版－檢舉區" );
            let content = $( ".tabContent tbody" );
            content.empty();

            articles = dataDB.data;

            if( $.isEmptyObject(articles) )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>檢舉文章列表為空</td>" +
                                    "</tr>";
                content.append( emptyMessage );

                return;
            }

            for( let i in articles )
            {
                let oneRow = "<tr>" + 
                                "<td style='cursor: pointer;'>" + articles[i][0].title + "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn btn-default btn-warning'>" +
                                        "<span class='glyphicon glyphicon-book'></span> 原因" +
                                    "</button>" +
                                "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn btn-danger'>" +
                                        "<span class='glyphicon glyphicon-trash'></span> 刪除" +
                                    "</button>" +
                                "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn'>" +
                                        "<span class='glyphicon glyphicon-remove'></span> 取消" +
                                    "</button>" +
                                "</td>" +
                                "</tr>";

                content.append( oneRow );
            }
        }
        res(0);
    });
}

async function checkPermission( resolve, reject )
{
    if( !thisAccount )
    {
        await swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面",
            confirmButtonText: "確定",
            
        }).then(( result ) => {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );

        }, ( dismiss ) => {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );
        });

        reject(1);

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "showAuthority";
    cmd[ "account" ] = thisAccount;

    $.post( "../index.php", cmd, async function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            await swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,
                confirmButtonText: "確定",
    
            }).then(( result ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            });
            
            reject(1);
        }
        else if( dataDB.data.boardName == undefined || dataDB.data.boardName.find( (element) => element.BoardName == thisBoardName ) == undefined )
        {
            await swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面",
                confirmButtonText: "確定",
                
            }).then(( result ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            });
    
            reject(1);
        }
    
        resolve(0);
    });
}

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}