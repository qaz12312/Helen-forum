var articles = [ { "articleID": "123", "reason": "hahaha" }, { "articleID": "456", "reason": "hahaha" }, { "articleID": "789", "reason": "hahaha" } ];

$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        console.log( $(this).text() );

        if( $(this).text() != "檢舉文章列表為空" )
        {
            sessionStorage.setItem( "articleID", articles[ $( ".tabContent tr" ).index( this.closest( "tr" ) ) ][ "articleID" ] );
            location.href =  "../html/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        // console.log( $( ".tabContent tr" ).index( this.closest( "tr" ) ) );

        if( $(this).text().trim() == "原因" )
        {
            console.log( "reason" );
            // alert( articles[ $( ".tabContent tr" ).index( this.closest( "tr" ) ) ][ "reason" ] );
            
            swal({
                title: "檢舉原因<br /><small>&lt;" + $(this).closest( "td" ).prev().text() + "&gt;</small>",
                text: articles[ $( ".tabContent tr" ).index( this.closest( "tr" ) ) ][ "reason" ],
                animation: false
            })
        }
        else if( $(this).text().trim() == "刪除" )
        {
            // let cmd = {};
            // cmd[ "act" ] = "deleteArticle";
            // cmd[ "articleID" ] = articles[ $( ".tabContent tr" ).index( this.closest( "tr" ) ) ][ "articleID" ];

            // $.post( ".php", cmd, function( dataDB ){
            //     dataDB = JSON.parse( dataDB );

            //     swal({
            //         title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().text() + "&gt;</small>",
            //         showCancelButton: true,
            //         confirmButtonText: "確定",
            //         cancelButtonText: "取消",
            //         animation: false
    
            //         }).then(( result ) => {
            //             if ( result ) 
            //             {
            //                 console.log( "status " + status );
            //                 if( dataDB.status == false )
            //                 {
            //                     swal({
            //                         title: "刪除失敗<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().text() + "&gt;</small>",
            //                         type: "error",
            //                         text: dataDB.errorCode,
            //                         animation: false
            //                     })
            //                 }
            //                 else
            //                 {
            //                     swal({
            //                         title: "已成功刪除文章！<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().text() + "&gt;</small>",
            //                         type: "success",
            //                     })
            //                     $(this).closest( "tr" ).remove();
            //                 }
            //                 $(this).closest( "tr" ).remove();
            //             }
            //     }, function( dismiss ) {
            //         if ( dismiss === 'cancel' );
            //     });
            // });

            console.log( "delete" );
            let status = true;
            swal({
                title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().text() + "&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

                }).then(( result ) => {
                    if ( result ) 
                    {
                        console.log( "status " + status );
                        if( status == false )
                        {
                            swal({
                                title: "刪除失敗<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().text() + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
                                animation: false
                            })
                        }
                        else
                        {
                            swal({
                                title: "已成功刪除文章！<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().text() + "&gt;</small>",
                                type: "success",
                            })
                            $(this).closest( "tr" ).remove();
                        }
                        $(this).closest( "tr" ).remove();
                    }
            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
            });
        }
        else if( $(this).text().trim() == "取消" )
        {
            console.log( "cancel" );
            swal({
                title: "確定要取消檢舉此篇文章嗎？<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().prev().text() + "&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

                }).then(( result ) => {
                    if ( result ) 
                    {
                        swal({
                            title: "已成功取消檢舉文章！<br /><small>&lt;" + $(this).closest( "td" ).prev().prev().prev().text() + "&gt;</small>",
                            type: "success",
                        })
                        $(this).closest( "tr" ).remove();
                    }
            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
            });
        }
    } );
});

function initial()
{
    let isValid = checkPermission();
    if( !isValid ) return;

    let cmd = {};
    cmd[ "act" ] = "reportPage";
    cmd[ "boardName" ] = sessionStorage.getItem( "boardName" );

    // $.post( "../php/report.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         alert( dataDB.errorCode );
    //     }
    //     else
    //     {
    //             let content = $( ".tabContent tbody" );
    //             content.empty();
            
    //             let empty = true;
    //             for( let i in dataDB.data )
    //             {
    //                 empty = false;
    //                 articles.push( dataDB.data[i] );
            
    //                 let oneRow = "<tr>" + 
    //                                 "<td>" + dataDB.data[i][ "Title" ] + "</td>" +
    //                                 "<td>" +
    //                                     "<button type='button' class='btn btn-default'>" +
    //                                         "<span class='glyphicon glyphicon-book'></span> 原因" +
    //                                     "</button>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<button type='button' class='btn'>" +
    //                                         "<span class='glyphicon glyphicon-trash'></span> 刪除" +
    //                                     "</button>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<button type='button' class='btn'>" +
    //                                         "<span class='glyphicon glyphicon-remove'></span> 取消" +
    //                                     "</button>" +
    //                                 "</td>" +
    //                                 "</tr>";
            
    //                 content.append( oneRow );
    //             }
            
    //             if( empty )
    //             {
    //                 let emptyMessage = "<tr>" + 
    //                                         "<td colspan='4'>檢舉文章列表為空</td>" +
    //                                     "</tr>";
    //                 content.append( emptyMessage );
    //             }
    //     }
    // } );

    let content = $( ".tabContent tbody" );
    content.empty();

    let dataDB = {};
    dataDB[ "reason" ] = "hahaha";
    dataDB[ "data" ] = [ { "Title": "紅燈區" }, { "Title": "大一妹妹看起來很波霸哦" }, { "Title": "看我切開兔子的肚皮"} ];

    let empty = true;
    for( let i in dataDB.data )
    {
        empty = false;
        articles.push( dataDB.data[i] );

        let oneRow = "<tr>" + 
                        "<td>" + dataDB.data[i][ "Title" ] + "</td>" +
                        "<td>" +
                            "<button type='button' class='btn btn-default'>" +
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
