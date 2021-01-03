var articles = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );
    $(".tabContent button").on( "click", function(){
        let articleIndex = $(".tabContent tr").index(this.closest("tr"));
        if( $(this).text().trim() == "刪除"){
            let cmd= {};
            cmd["act"] = "clickNotice";
            cmd["account"] = sessionStorage.getItem("Helen-account");
            cmd["articleID"] = articles[articleIndex].articleID;
            cmd["detail"] = articles[articleIndex].content;

            $.post( "../index.php", cmd, function( dataDB ){
                alert(dataDB);
                console.log(dataDB);
                dataDB = JSON.parse( dataDB );

                swal({
                    title: "確定要刪除此通知嗎？<br /><small>&lt;"
                     + articles[ articleIndex ].content
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
                                    
                                      + "&gt;</small>",
                                    type: "error",
                                    
                                    animation: false
                                }, ( dismiss ) => {});
                            }
                            else
                            {
                                swal({
                                    title: "已成功此通知！<br /><small>&lt;"
                                     + articles[ articleIndex ].content
                                      + "&gt;</small>",
                                    type: "success",
                                }).then(( result ) => {}, ( dismiss ) => {});
                                $(this).closest( "tr" ).remove();
                                articles.splice( articleIndex, 1 );
    
                                if( articles.length == 0 )
                                {
                    
                                    let emptyMessage = "<tr>" + 
                                                            "<td colspan='2'>沒有通知喔呦！</td>" +
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

async function initial( res, rej )
{
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch(
    ( error ) =>
    {
        res(1);
    });

    let cmd = {};
    cmd[ "act" ] = "showNotice";
    cmd["account"] = sessionStorage.getItem( 'Helen-account' );
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
            $( ".tabContent h2" ).html( "Helen－通知");
            let content = $( ".tabContent tbody" );
            content.empty();

            articles = dataDB.data;
            console.log(articles)
            if( $.isEmptyObject(articles) )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>沒有通知喔喔喔</td>" +
                                    "</tr>";
                content.append( emptyMessage );

                return;
            }

            for( let i in articles )
            { 
                console.log(articles[i].time)
                
                let oneRow = "<tr>" +
                                "<td>" + articles[i].content  + "</td>" +
                                "<td>" + articles[i].time  + "</td>" +
                                "<button type='button' class='btn btn-default'>" +
                                        "<span class='glyphicon glyphicon-remove'></span> 刪除" +
                                    "</button>" +
                                "</td>" +
                            "</tr>";
                                

                content.append( oneRow );
            }
        }
        res(0);
    });
}

function checkPermission( resolve, reject )
{
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
                $( ".tabContent" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( ".tabContent" ).append( httpStatus );
            }
        }, ( dismiss ) => {});
        resolve(false);
    }
}

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}