var articles = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    
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
                
                let oneRow = "<tr>" +
                                "<td>" + articles[i][0].title  + "</td>" 
                                ;

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