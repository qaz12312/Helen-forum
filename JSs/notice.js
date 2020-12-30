//PostingRecord

var thisAccount = sessionStorage.getItem( "Helen-account" );

 $( document ).ready(async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => { initial( resolve, reject ); });
    
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
    