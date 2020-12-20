//PostingRecord
var articles = [];

let dataDB = {};
 dataDB["data"] = [ { "title": "美國隊長好帥!!!", "blockName": "漫威版", "articleID": "123"} ];
$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        console.log( $(this).text() );

        if( $(this).text() != "沒發文紀錄喔！" )
        {
            let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
            sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
            location.href =  "../html/Person.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        // console.log( $( ".tabContent tr" ).index( this.closest( "tr" ) ) );

        let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
        if( $(this).text().trim() == "刪除" )
        {
            console.log( "delete" );
            let status = true;
            console.log( status );
            // let cmd = {};
            // cmd[ "act" ] = "deleteArticle";
            // cmd["account"] = sessionStorage.getItem( "UserID" );
            // cmd["articleID"] =articles[ thisArticle ].articleID;         // console.log("delete")

                // $.post( "../index.php", cmd, function( dataDB ){
                //     dataDB = JSON.parse( dataDB );

            
                    swal({
                        title: "確定要刪除此篇文章嗎？<br /><small>&lt;" 
                        + articles[ thisArticle ].title
                        +"&gt;</small>",
                        showCancelButton: true,
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",
                        animation: false

                        }).then(( result ) => {
                            if ( result ) 
                            {
                                //console.log( "status " + status );
                                if( status == false )
                                {
                                    swal({
                                        title: "刪除失敗<br />" 
                                        + articles[ thisArticle ].title
                                        + "&gt;</small>",
                                        type: "error",
                                        text: dataDB.errorCode,
                                        animation: false
                                    })
                                }
                                else
                                {
                                    swal({
                                        title: "已成功刪除文章！<br />" 
                                        + articles[ thisArticle ]
                                        + "&gt;</small>",
                                        type: "success",
                                    })
                                    location.reload();
                                    $(this).closest( "tr" ).remove();
                
                                    articles.splice( thisArticle, 1 );
                                    if( articles.length == 0 )
                                        {
                                            console.log( "length==0" );
                                            let emptyMessage = "<tr>" + 
                                                                    "<td colspan='2'>沒發文紀錄喔！</td>" +
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
                else if( $(this).text().trim() == "編輯" )
                {
                    // cmd["act"]= "editArticle";
                    // cmd["account"]= sessionStorage.getItem("Helen-userID")
                    // cmd["articleID"]= articles[ thisArticle ].articleID;
                    // $.post("../index.php", cmd, function(){
                    // var dataDB= JSON.parse(dataDB);
                    console.log( "edit" );
                    swal({
                        title: '歡迎',
                        type: 'info',
                        text: '本訊息1秒後自動關閉',
                        width: 400,
                        showConfirmButton: false,
                        timer: 1000,
                    }).then(
                        function () { },
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                sessionStorage.setItem("Helen-act", "editArticle");
                                sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
                            window.location.href = "../html/publishArticle.html";
                            }
                        }
                    )
                //  });
                }
        });

    });

function initial()
{

    //checkPermission();
    let cmd = {};
    cmd[ "act" ] = "showPostRecord";
    cmd["account"] = sessionStorage.getItem("UserID");

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
            let content = $( ".postContent tbody" );
            content.empty();
        
            articles = dataDB.data;
            
            if( articles.length == 0 )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>沒發文紀錄喔</td>" +
                                    "</tr>";
                content.append( emptyMessage );

                return;
            }

            for( let i in dataDB.data )
            {
            
                let oneRow = "<tr>" + 
                                "<td>" + dataDB.data[i].blockName + "</td>" +
                                "<td>" + dataDB.data[i].title + "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn btn-default'>" +
                                        "<span class='glyphicon glyphicon-book'></span> 編輯" +
                                    "</button>" +
                                "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn'>" +
                                        "<span class='glyphicon glyphicon-trash'></span> 刪除" +
                                    "</button>" +
                                "</td>" +
    
                                "</tr>";
        
                content.append( oneRow );
            }     
                
        //}
    //} );


}
    function checkPermission()
    {
        let perm = sessionStorage.getItem( "Helen-permission" );
        console.log( "Permission:　"+ perm );
        if( perm && perm.valueOf() >= 1 ) return true;
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
            });
    
            return false;
        }
    }
    