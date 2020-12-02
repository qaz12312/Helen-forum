var articles = [];

$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        if( $(this).text() != "檢舉文章列表為空" )
        {
            let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
            sessionStorage.setItem( "articleID", articles.articleID[ thisArticle ] );
            location.href =  "../html/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );

        if( $(this).text().trim() == "原因" )
        {
            swal({
                title: "檢舉原因<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
                text: articles.reason[ thisArticle ],
                animation: false
            })
        }
        else if( $(this).text().trim() == "刪除" )
        {
            // let cmd = {};
            // cmd[ "act" ] = "deleteArticle";
            // cmd[ "articleID" ] = articles.articleID[ thisArticle ];

            // $.post( "../index.php", cmd, function( dataDB ){
            //     dataDB = JSON.parse( dataDB );

            //     swal({
            //         title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
            //         showCancelButton: true,
            //         confirmButtonText: "確定",
            //         cancelButtonText: "取消",
            //         animation: false
    
            //         }).then(( result ) => {
            //             if ( result ) 
            //             {
            //                 if( dataDB.status == false )
            //                 {
            //                     swal({
            //                         title: "刪除失敗<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
            //                         type: "error",
            //                         text: dataDB.errorCode,
            //                         animation: false
            //                     })
            //                 }
            //                 else
            //                 {
            //                     swal({
            //                         title: "已成功刪除文章！<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
            //                         type: "success",
            //                     })
            //                     $(this).closest( "tr" ).remove();
            //                     articles.articleID.splice( thisArticle, 1 );
            //                     articles.title.splice( thisArticle, 1 );
            //                     articles.reason.splice( thisArticle, 1 );
            //                 }
            //             }
            //     }, function( dismiss ) {
            //         if ( dismiss === 'cancel' );
            //     });
            // });

            let status = true;
            swal({
                title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
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
                                title: "刪除失敗<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
                                animation: false
                            })
                        }
                        else
                        {
                            swal({
                                title: "已成功刪除文章！<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
                                type: "success",
                            })
                            $(this).closest( "tr" ).remove();
                            articles.articleID.splice( thisArticle, 1 );
                            articles.title.splice( thisArticle, 1 );
                            articles.reason.splice( thisArticle, 1 );
                        }
                    }
            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
            });
        }
        else if( $(this).text().trim() == "取消" )
        {
            swal({
                title: "確定要取消檢舉此篇文章嗎？<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

                }).then(( result ) => {
                    if ( result ) 
                    {
                        swal({
                            title: "已成功取消檢舉文章！<br /><small>&lt;" + articles.title[ thisArticle ] + "&gt;</small>",
                            type: "success",
                        })
                        $(this).closest( "tr" ).remove();
                        articles.articleID.splice( thisArticle, 1 );
                        articles.title.splice( thisArticle, 1 );
                        articles.reason.splice( thisArticle, 1 );
                    }
            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
            });
        }

        console.log( articles );
    });
});

function initial()
{
    let isValid = checkPermission();
    if( !isValid ) return;

    // let cmd = {};
    // cmd[ "act" ] = "reportPage";
    // cmd[ "boardName" ] = sessionStorage.getItem( "boardName" );

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

    //         let empty = true;
    //         for( let i in dataDB.data.title )
    //         {
    //             empty = false;

    //             let oneRow = "<tr>" + 
    //                             "<td>" + dataDB.data.title[i] + "</td>" +
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

    //         if( empty )
    //         {
    //             let emptyMessage = "<tr>" + 
    //                                     "<td colspan='4'>檢舉文章列表為空</td>" +
    //                                 "</tr>";
    //             content.append( emptyMessage );
    //         }
    //     }
    // });

    let content = $( ".tabContent tbody" );
    content.empty();

    let dataDB = {};
    dataDB[ "data" ] = { "articleID": [ "123", "456", "789" ], 
                         "title": [ "紅燈區", "大一妹妹看起來很波霸哦", "看我切開兔子的肚皮" ],
                         "reason": [ "aaa", "bbb", "ccc" ] };
    articles = dataDB.data;

    let empty = true;
    for( let i in dataDB.data.title )
    {
        empty = false;

        let oneRow = "<tr>" + 
                        "<td>" + dataDB.data.title[i] + "</td>" +
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

    if( empty )
    {
        let emptyMessage = "<tr>" + 
                                "<td colspan='4'>檢舉文章列表為空</td>" +
                            "</tr>";
        content.append( emptyMessage );
    }
}

function checkPermission()
{
    // let perm = sessionStorage.getItem( "permission" );
    // console.log( perm );

    // if( perm ) return ( perm.valueOf() >= 2 ); 
    // else return false;

    return true;
}
