//PostingRecord

var thisAccount = sessionStorage.getItem( "Helen-account" );

 $( document ).ready(async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => { initial( resolve, reject ); });

    $( document ).on( "click", ".btn-danger", function()
    {
            let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
            
            

                  swal({
                    title: "確定要刪除此篇文章嗎？<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                    animation: false,
    
                }).then(( result ) => {
                    if ( result ) 
                    {
                        let cmd = {};
                        cmd[ "act" ] = "deleteArticle";
                        cmd["account"] = sessionStorage.getItem( "Helen-account" );
                        cmd["articleID"] =  articles[ thisArticle ].articleID;
                        $.post( "../index.php", cmd, function( dataDB ){
                            dataDB = JSON.parse( dataDB );
    
                            if( dataDB.status == false )
                            {
                                swal({
                                    title: "刪除失敗<br /><small>&lt;" + articles[ thisArticle ].title +"&gt;</small>",
                                    type: "error",
                                    text: dataDB.errorCode,
        
                                }).then((result) => {}, ( dismiss ) => {});
                            }
                            else
                            {
                                swal({
                                    title: "已成功刪除文章！<br /><small>&lt;" + articles[ thisArticle ].title+ "&gt;</small>",
                                    type: "success",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    
                                }).then((result) => {}, ( dismiss ) => {location.reload();});
        
                                
                                // delete articles[ thisArticle ];
        
                                // if( $.isEmptyObject(articles) )
                                // {
                                //     let emptyMessage = "<tr>" + 
                                //                             "<td colspan='4'>發文紀錄列表為空</td>" +
                                //                         "</tr>";
                                //     $( ".tabContent tbody" ).append( emptyMessage );
                                // }
                            }
                        });
                    }
                }, ( dismiss ) => {});
    });
    $( document ).on( "click", ".btn-default", function()
    {
        let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );     
        sessionStorage.setItem("Helen-act", "editArticle");
        sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
        window.location.href = "../HTMLs/publishArticle.html";
        
    });
    
    $( document ).on( "click", ".articleTitle", function()
    { 
        let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );     
      sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
      location.href =  "../HTMLs/post.html";
  });
    
   
   
    
});

async function initial(res, rej)
{

    
    let cmd = {};
    cmd[ "act" ] = "showPostRecord";
    cmd["account"] = sessionStorage.getItem("Helen-account");

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );
        
        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode
            }).then(( result ) => {}, ( dismiss ) => {});
        }
        else
        {
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
                console.log(dataDB.data)
                let oneRow = "<tr>" + 
                                "<td>" + dataDB.data[i].blockName + "版"+"</td>" +
                                "<td>" +"<span class='articleTitle'>"+ dataDB.data[i].title +"</span>"+ "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn btn-default'>" +
                                        "<span class='glyphicon glyphicon-book'></span> 編輯" +
                                    "</button>" +
                                "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn btn-danger'>" +
                                        "<span class='glyphicon glyphicon-trash'></span> 刪除" +
                                    "</button>" +
                                "</td>" +
    
                                "</tr>";
        
                content.append( oneRow );
            }     
                
        }
    } );
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) );

    res(0);


}
function checkPermission(resolve, reject)
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
    