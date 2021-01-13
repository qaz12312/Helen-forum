var articles = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );
    $( document ).on( "click", ".articleTitle", function()
    {   
            
            let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
            
            
                  

                  swal({
                    title: "確定要刪除此通知嗎？<br /><small>&lt;" + articles[ thisArticle ].content + "&gt;</small>",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                    animation: false,
    
                }).then(( result ) => {
                    if ( result ) 
                    {
                        let cmd = {};
                        cmd[ "act" ] = "clickNotice";
                        cmd["account"] = sessionStorage.getItem( "Helen-account" );
                        cmd["articleID"] =  articles[ thisArticle ].articleID;
                        cmd["detail"] = articles[thisArticle].content;
                        $.post( "../index.php", cmd, function( dataDB ){
                            dataDB = JSON.parse( dataDB );
    
                            if( dataDB.status == false )
                            {
                                swal({
                                    title: "刪除失敗<br /><small>&lt;" + articles[ thisArticle ].content +"&gt;</small>",
                                    type: "error",
                                    text: dataDB.errorCode,
        
                                }).then((result) => {}, ( dismiss ) => {});
                            }
                            else
                            {
                                swal({
                                    title: "已成功刪除通知！<br /><small>&lt;" + articles[ thisArticle ].content+ "&gt;</small>",
                                    type: "success",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    
                                }).then((result) => {}, ( dismiss ) => {});
        
                                location.reload();
                                delete articles[ thisArticle ];
        
                                if( $.isEmptyObject(articles) )
                                {
                                    let emptyMessage = "<tr>" + 
                                                            "<td colspan='4'>發文紀錄列表為空</td>" +
                                                        "</tr>";
                                    $( ".tabContent tbody" ).append( emptyMessage );
                                }
                            }
                        });
                    }
                }, ( dismiss ) => {});
    });
    
});

async function initial( res, rej )
{
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch(
    ( error ) =>
    {
        res(1);
    });
    $( ".tabContent tbody" ).empty();
    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>LOADING...</h1>";
$( ".tabContent tbody" ).append( httpStatus );
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
                
                
                let oneRow = "<tr>" +
                                "<td>" +"<span class='articleTitle'style='cursor:pointer'>"+ articles[i].content  + "</td>" +
                                "<td>" + articles[i].time  + "</td>" +
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