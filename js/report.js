var articles = [];
var thisBoardName = sessionStorage.getItem( 'Helen-boardName' );
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        if( $(this).text() != "檢舉文章列表為空" )
        {
            let thisArticle = articles.find( (element) => element.title == $( this ).text() );
            sessionStorage.setItem( "Helen-articleID", articles.findIndex( thisArticle ) );
            location.href =  "../html/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        let thisArticleTitle = $(this).closest( "tr" ).find( "td:first-child" ).text();
        let thisArticle = articles.find(
            (element) => {
                for( let i in element)
                    element[i].title == thisArticleTitle; 
        });
        let thisArticleID =  articles.findIndex( thisArticle );

        if( $(this).text().trim() == "原因" )
        {
            let reasonsQueue = [];
            let steps = [];
            
            for( let i in articles[thisArticleID] )
            {
                reasonsQueue.push(
                { 
                    title: "檢舉原因<br /><small>&lt;" + articles[ thisArticleID ][i].title + "&gt;</small>",
                    html: escapeHtml(articles[ thisArticleID ][i].reason).split( "\n" ).join( "<br/>" ),
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
            swal({
                title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => {
                if ( result ) 
                {
                    let status = true;

                    if( status == false )
                    {
                        swal({
                            title: "刪除失敗<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                            type: "error",
                            text: "dataDB.errorCode",

                        }).then((result) => {}, ( dismiss ) => {});
                    }
                    else
                    {
                        swal({
                            title: "已成功刪除文章！<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                            type: "success",
                            
                        }).then((result) => {}, ( dismiss ) => {});

                        $(this).closest( "tr" ).remove();
                        articles.splice( thisArticleID, 1 );

                        if( articles.length == 0 )
                        {
                            let emptyMessage = "<tr>" + 
                                                    "<td colspan='4'>檢舉文章列表為空</td>" +
                                                "</tr>";
                            $( ".tabContent tbody" ).append( emptyMessage );
                        }
                    }

                    // let cmd = {};
                    // cmd[ "act" ] = "deleteReport";
                    // cmd[ "articleID" ] = thisArticleID;
                    // cmd[ "isPass" ] = "true";
                    
                    // $.post( "../index.php", cmd, function( dataDB ){
                    //     dataDB = JSON.parse( dataDB );

                    //     if( dataDB.status == false )
                    //     {
                    //         swal({
                    //             title: "刪除失敗<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                    //             type: "error",
                    //             text: dataDB.errorCode,
    
                    //         }).then((result) => {}, ( dismiss ) => {});
                    //     }
                    //     else
                    //     {
                    //         swal({
                    //             title: "已成功刪除文章！<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                    //             type: "success",
                                
                    //         }).then((result) => {}, ( dismiss ) => {});
    
                    //         $(this).closest( "tr" ).remove();
                    //         articles.splice( thisArticleID, 1 );
    
                    //         if( articles.length == 0 )
                    //         {
                    //             let emptyMessage = "<tr>" + 
                    //                                     "<td colspan='4'>檢舉文章列表為空</td>" +
                    //                                 "</tr>";
                    //             $( ".tabContent tbody" ).append( emptyMessage );
                    //         }
                    //     }
                    // });
                }
            }, ( dismiss ) => {});
        }
        else if( $(this).text().trim() == "取消" )
        {
            swal({
                title: "確定要取消檢舉此篇文章嗎？<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

            }).then(( result ) => 
            {
                if ( result ) 
                {
                    let status = true;
                    if( status == false )
                    {
                        swal({
                            title: "取消檢舉失敗<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                            type: "error",
                            text: "dataDB.errorCode",

                        }).then((result) => {}, ( dismiss ) => {});
                    }
                    else
                    {
                        swal({
                            title: "已成功取消檢舉文章！<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                            type: "success"

                        }).then((result) => {}, ( dismiss ) => {});

                        $(this).closest( "tr" ).remove();
                        articles.splice( thisArticleID, 1 );

                        if( articles.length == 0 )
                        {
                            let emptyMessage = "<tr>" + 
                                                    "<td colspan='4'>檢舉文章列表為空</td>" +
                                                "</tr>";
                            $( ".tabContent tbody" ).append( emptyMessage );
                        }
                    }

                    // let cmd = {};
                    // cmd[ "act" ] = "deleteReport";
                    // cmd[ "isPass" ] = "false";
                    // cmd[ "articleID" ] = thisArticleID;

                    // $.post( "../index.php", cmd, function( dataDB )
                    // {
                    //     dataDB = JSON.parse( dataDB );

                    //     if( dataDB.status == false )
                    //     {
                    //         swal({
                    //             title: "取消檢舉失敗<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                    //             type: "error",
                    //             text: dataDB.errorCode,
    
                    //         }).then((result) => {}, ( dismiss ) => {});
                    //     }
                    //     else
                    //     {
                    //         swal({
                    //             title: "已成功取消檢舉文章！<br /><small>&lt;" + articles[ thisArticleID ][0].title + "&gt;</small>",
                    //             type: "success"
    
                    //         }).then((result) => {}, ( dismiss ) => {});
    
                    //         $(this).closest( "tr" ).remove();
                    //         articles.splice( thisArticleID, 1 );
    
                    //         if( articles.length == 0 )
                    //         {
                    //             let emptyMessage = "<tr>" + 
                    //                                     "<td colspan='4'>檢舉文章列表為空</td>" +
                    //                                 "</tr>";
                    //             $( ".tabContent tbody" ).append( emptyMessage );
                    //         }
                    //     }
                    // });
                }
            }, ( dismiss ) => {});
        }
    });
});

function initial()
{
    checkPermission();

    // let cmd = {};
    // cmd[ "act" ] = "showReport";
    // cmd[ "boardName" ] = thisBoardName;

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         swal({
    //             title: "載入頁面失敗",
    //             type: "error",
    //             text: "dataDB.errorCode"

    //         }).then((result) => {}
    //         , function( dismiss )
    //         {
    //             if ( dismiss === 'cancel' );
    //         });
    //     }
    //     else
    //     {
    //         let content = $( ".tabContent tbody" );
    //         content.empty();
        
    //         articles = dataDB.data;

    //         if( articles.length == 0 )
    //         {
    //             let emptyMessage = "<tr>" + 
    //                                     "<td colspan='4'>檢舉文章列表為空</td>" +
    //                                 "</tr>";
    //             content.append( emptyMessage );

    //             return;
    //         }

    //         for( let i in dataDB.data )
    //         {
    //             let oneRow = "<tr>" + 
    //                             "<td>" + dataDB.data[i].title + "</td>" +
    //                             "<td>" +
    //                                 "<button type='button' class='btn btn-default btn-warning'>" +
    //                                     "<span class='glyphicon glyphicon-book'></span> 原因" +
    //                                 "</button>" +
    //                             "</td>" +
    //                             "<td>" +
    //                                 "<button type='button' class='btn btn-danger'>" +
    //                                     "<span class='glyphicon glyphicon-trash'></span> 刪除" +
    //                                 "</button>" +
    //                             "</td>" +
    //                             "<td>" +
    //                                 "<button type='button' class='btn'>" +
    //                                     "<span class='glyphicon glyphicon-remove'></span> 取消" +
    //                                 "</button>" +
    //                             "</td>" +
    //                             "</tr>";

    //             content.append( oneRow );
    //         }
    //     }
    // });

    let dataDB = {};
    dataDB["data"] = [];       
    dataDB["data"]["123"] = [{ "title": "紅燈區", "reason": "aaa", "time": "2000-02-20"},
                             { "title": "紅燈區", "reason": "aa1", "time": "2010-02-20"},
                             { "title": "紅燈區", "reason": "aa2", "time": "2020-02-20"}];

    dataDB["data"]["456"] = { "title": "大一妹妹看起來很波霸哦", "reason": "bbb" };
    dataDB["data"]["789"] = {"title": "看我切開兔子的肚皮", "reason": "ccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\nccc\n" };

    $( ".tabContent h2" ).html( thisBoardName + "版－檢舉區" );
    let content = $( ".tabContent tbody" );
    content.empty();

    articles = dataDB.data;

    if( articles.length == 0 )
    {
        let emptyMessage = "<tr>" + 
                                "<td colspan='4'>檢舉文章列表為空</td>" +
                            "</tr>";
        content.append( emptyMessage );

        return;
    }

    for( let i in dataDB.data )
    {
        let oneRow = "<tr>" + 
                        "<td>" + dataDB.data[i].title + "</td>" +
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

function checkPermission()
{
    if( !thisAccount )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面"
            
        }).then(( result ) => {
            if ( result ) 
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        }, function( dismiss ) {
            if ( dismiss )
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });

        return;
    }

    let status = true;
    if( status == false )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "dataDB.errorCode"

        }).then(( result ) => {
            if ( result ) 
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        }, function( dismiss ) {
            if ( dismiss )
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });
    }
    else
    {
        permission = "2";
        boardName = ["美食"];
        
        if( boardName.indexOf( thisBoardName ) == -1 )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面"
            }).then(( result ) => {
                if ( result ) 
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( "body" ).append( httpStatus );
                }
            }, function( dismiss ) {
                if ( dismiss )
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
        }
    }

    // let cmd = {};
    // cmd[ "act" ] = "browseAuthority";
    // cmd[ "account" ] = thisAccount;

    // let permission, color, nickname, boardName = [];
    // let thisBoardName = thisBoardName;

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         swal({
    //             title: "載入頁面失敗",
    //             type: "error",
    //             text: "dataDB.errorCode"
    
    //         }).then(( result ) => {
    //             if ( result ) 
    //             {
    //                 $( "body" ).empty();
    //                 let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
    //                 $( "body" ).append( httpStatus );
    //             }
    //         }, function( dismiss ) {
    //             if ( dismiss )
    //             {
    //                 $( "body" ).empty();
    //                 let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
    //                 $( "body" ).append( httpStatus );
    //             }
    //         });
    //     }
    //     else
    //     {
    //         permission = dataDB.data.permission;
    //         color = dataDB.data.color;
    //         nickname = dataDB.data.nickname;
    //         boardName = dataDB.data.boardName;
            
    //         if( permission < 2 || boardName.indexOf( thisBoardName ) == -1 )
    //         {
    //             swal({
    //                 title: "載入頁面失敗",
    //                 type: "error",
    //                 text: "dataDB.errorCode"
        
    //             }).then(( result ) => {
    //                 if ( result ) 
    //                 {
    //                     $( "body" ).empty();
    //                     let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
    //                     $( "body" ).append( httpStatus );
    //                 }
    //             }, function( dismiss ) {
    //                 if ( dismiss )
    //                 {
    //                     $( "body" ).empty();
    //                     let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
    //                     $( "body" ).append( httpStatus );
    //                 }
    //             });
    //         }
    //     }
    // });
}

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}