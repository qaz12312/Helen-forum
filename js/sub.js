var articles = [];

$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        if( $(this).text() != "還沒有收藏文章呦！" )
        {
            let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
            sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
            location.href =  "../html/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );

        if( $(this).text().trim() == "刪除" )
        {
            // let cmd = {};
            // cmd[ "act" ] = "deleteKeepArticle";
            // cmd[ "articleID" ] = articles[ thisArticle ].articleID;

            // $.post( "../index.php", cmd, function( dataDB ){
            //     dataDB = JSON.parse( dataDB );

                swal({
                    title: "確定要刪除此篇文章嗎？<br /><small>&lt;"
                    //  + articles[ thisArticle ].title
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
                                    //  + articles[ thisArticle ].title
                                      + "&gt;</small>",
                                    type: "error",
                                    // text: dataDB.errorCode,
                                    animation: false
                                });
                            }
                            else
                            {
                                swal({
                                    title: "已成功移除收藏文章！<br /><small>&lt;"
                                    //  + articles[ thisArticle ].title
                                      + "&gt;</small>",
                                    type: "success",
                                })
                                $(this).closest( "tr" ).remove();
                                articles.splice( thisArticle, 1 );
    
                                if( articles.length == 0 )
                                {
                                    console.log( "a" );
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
            // });
        }
    });
});

function initial()
{
    // let isValid = checkPermission();
    // if( !isValid ) return;

    let cmd = {};
    cmd[ "act" ] = "KeepPage";
    cmd[ "keepClassification" ] = sessionStorage.getItem( "Helen-keepClassification" );

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
    //                                     "<td colspan='2'>還沒有收藏文章呦！</td>" +
    //                                 "</tr>";
    //             content.append( emptyMessage );
    //             return;
    //         }

    //         for( let i in dataDB.data )
    //         {
    //             let oneRow = "<tr>" + 
    //                             "<td>" + dataDB.data[i].title + "</td>" +
    //                             "<td>" +
    //                                 "<button type='button' class='btn btn-default'>" +
    //                                     "<span class='glyphicon glyphicon-remove'></span> 刪除" +
    //                                 "</button>" +
    //                             "</td>" +
    //                         "</tr>";

    //             content.append( oneRow );
    //         }
    //     }
    // });

    let dataDB= {};
    dataDB["data"]= [{"articleID": "123", "title": "美國隊長也太帥了吧!"}, 
                         {"articleID": "456", "title": ">求校隊女籃ig"}, 
                         {"articleID": "789", "title": "#詢問 大一資工課程"}];
}

function checkPermission()
{
    let perm = sessionStorage.getItem( "Helen-permission" );
    console.log( "Permission:　"+ perm );

    if( perm && perm.valueOf() >= 1 ) return true;

    else 
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {
            if ( result ) 
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });

        return false;
    }
}
