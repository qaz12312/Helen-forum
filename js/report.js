var articles = [];

$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        if( $(this).text() != "檢舉文章列表為空" )
        {
            let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
            sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
            location.href =  "../html/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );

        if( $(this).text().trim() == "原因" )
        {
            swal({
                title: "檢舉原因<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
                text: articles[ thisArticle ].reason,
                animation: false
            })
        }
        else if( $(this).text().trim() == "刪除" )
        {
            let cmd = {};
            cmd[ "act" ] = "deleteArticle";
            cmd[ "articleID" ] = articles[ thisArticle ].articleID;

            // $.post( "../index.php", cmd, function( dataDB ){
            //     dataDB = JSON.parse( dataDB );

            //     swal({
            //         title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
            //         showCancelButton: true,
            //         confirmButtonText: "確定",
            //         cancelButtonText: "取消",
            //         animation: false

            //         }).then(( result ) => {
            //             if ( result ) 
            //             {
            //                 if( status == false )
            //                 {
            //                     swal({
            //                         title: "刪除失敗<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
            //                         type: "error",
            //                         text: dataDB.errorCode,
            //                         animation: false
            //                     });
            //                 }
            //                 else
            //                 {
            //                     swal({
            //                         title: "已成功刪除文章！<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
            //                         type: "success",
            //                     })
            //                    $(this).closest( "tr" ).remove();
            //                     articles.splice( thisArticle, 1 );
    
            //                     if( articles.length == 0 )
            //                     {
            //                         console.log( "a" );
            //                         let emptyMessage = "<tr>" + 
            //                                                 "<td colspan='4'>檢舉文章列表為空</td>" +
            //                                             "</tr>";
            //                         $( ".tabContent tbody" ).append( emptyMessage );
            //                     }
            //                 }
            //             }
            //     }, function( dismiss ) {
            //         if ( dismiss === 'cancel' );
            //     });
            // });
        }
        else if( $(this).text().trim() == "取消" )
        {
            swal({
                title: "確定要取消檢舉此篇文章嗎？<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

                }).then(( result ) => {
                    if ( result ) 
                    {
                        swal({
                            title: "已成功取消檢舉文章！<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
                            type: "success",
                        })
                        $(this).closest( "tr" ).remove();
                        articles.splice( thisArticle, 1 );

                        if( articles.length == 0 )
                        {
                            console.log( "a" );
                            let emptyMessage = "<tr>" + 
                                                    "<td colspan='4'>檢舉文章列表為空</td>" +
                                                "</tr>";
                            $( ".tabContent tbody" ).append( emptyMessage );
                        }
                    }
            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
            });
        }
    });
});

function initial()
{
    checkPermission();

    let cmd = {};
    cmd[ "act" ] = "reportPage";
    cmd[ "boardName" ] = sessionStorage.getItem( "Helen-boardName" );

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         swal({
    //             title: "載入頁面失敗",
    //             type: "error",
    //             text: dataDB.errorCode
    //         })
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

    // let dataDB = {};
    // dataDB[ "data" ] = [ { "articleID": "123", "title": "紅燈區", "reason": "aaa" }, 
    //                      { "articleID": "456", "title": "大一妹妹看起來很波霸哦", "reason": "bbb" }, 
    //                      { "articleID": "789", "title": "看我切開兔子的肚皮", "reason": "ccc" } ];
}

function checkPermission()
{
    console.log(sessionStorage.getItem( "account" ))

    if( !sessionStorage.getItem( "account" ) )
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
        });

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "browseAuthority";
    cmd[ "account" ] = sessionStorage.getItem( "account" );

    let permission, color, nickname, boardName = [];
    let thisBoardName = sessionStorage.getItem( "boardName" );

    $.post( "../index.php", cmd, function( dataDB )
    {
        console.log( dataDB );
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode
            }).then(( result ) => {
                if ( result ) 
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
        }
        else
        {
            permission = dataDB.data.permission;
            color = dataDB.data.color;
            nickname = dataDB.data.nickname;
            boardName = dataDB.data.boardName;
            
            if( permission < 2 || boardName.indexOf( thisBoardName ) == -1 )
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
                });
            }
        }
    });
}
