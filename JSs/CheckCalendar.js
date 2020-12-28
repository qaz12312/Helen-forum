var activity = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        let thisArticleID = Object.keys( activity ).find( ( key ) => activity[ key ][0].title == $(this).text() );

        if( thisArticleID != undefined )
        {
            sessionStorage.setItem( "Helen-articleID", thisArticleID );
            location.href =  "../HTMLs/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        let thisActivity = thisTr.find( "td:first-child" ).text();
        let thisStartTime = activity[ thisActivity ].startTime;
        let thisEndTime = activity[ thisActivity ].endTime;
        let thisText = activity[ thisActivity ].text;
        let thisTitle = activity[ thisActivity ].title;
        if( $(this).text().trim() == "原因" )
        {
            let reasonsQueue = [];
            let steps = [];
            
            for( let i in activity[ thisActivity ] )
            {
                reasonsQueue.push(
                { 
                    title: "申請原因&emsp;<cite>" + thisTitle + "</cite><br />" +
                    "<small>&lt;時間:" + thisStartTime + "~ " + thisEndTime + "&gt;</small>"+
                    "內容: " +thisText,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                    animation: false,
                });

                steps.push( parseInt(i) + 1 );
            }

            swal.setDefaults( { progressSteps: steps } );

            swal.queue( reasonsQueue ).then( ( result ) => 
            {
                swal.setDefaults( { progressSteps: false } );

            }, ( dismiss ) =>
            {
                swal.setDefaults( { progressSteps: false } );
            });

        }
        else if( $(this).text().trim() == "新增活動" )
        {
            let chosen = this;

            swal({
                title: "確定要允許這個活動嗎？<br /><small>&lt;" + activity[ thisActivity ][0].title + "&gt;</small>",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F09900",
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => {
                if ( result ) 
                {
                    let cmd = {};
                    cmd[ "act" ] = "checkInCanlendarList";
                    cmd[ "title" ] = thisActivity;
                    cmd["startTime"] = thisStartTime;
                    cmd["endTime"] = thisEndTime;
                    cmd[ "isPass" ] = "true";
                    
                    $.post( "../index.php", cmd, function( dataDB ){
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "刪除失敗<br /><small>&lt;" + activity[ thisActivity ][0].title + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功新增活動！<br /><small>&lt;" + activity[ thisActivity ][0].title + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
                                
                            }).then((result) => {}, ( dismiss ) => {});
    
                            $(chosen).closest( "tr" ).remove();
                            delete activity[ thisActivity ];
    
                            if( $.isEmptyObject(activity) )
                            {
                                let emptyMessage = "<tr>" + 
                                                        "<td colspan='4'>檢舉文章列表為空</td>" +
                                                    "</tr>";
                                $( ".tabContent tbody" ).append( emptyMessage );
                            }
                        }
                    });
                }
            }, ( dismiss ) => {});
        }
        else if( $(this).text().trim() == "審核失敗" )
        {
            let chosen = this;

            swal({
                title: "確定要否決此活動嗎？<br /><small>&lt;" + activity[ thisActivity ][0].title + "&gt;</small>",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F09900",
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => 
            {
                if ( result ) 
                {
                    let cmd = {};
                    cmd[ "act" ] = "checkInCanlendarList";
                    cmd[ "title" ] = thisActivity;
                    cmd["startTime"] = thisStartTime;
                    cmd["endTime"] = thisEndTime;
                    cmd[ "isPass" ] = "false";

                    $.post( "../index.php", cmd, function( dataDB )
                    {
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "取消否決活動<br /><small>&lt;" + activity[ thisActivity ][0].title + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功取消活動！<br /><small>&lt;" + activity[ thisActivity ][0].title + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
    
                            }).then((result) => {}, ( dismiss ) => {});
    
                            $(chosen).closest( "tr" ).remove();
                            delete activity[ thisActivity ];
    
                            if( $.isEmptyObject(activity) )
                            {
                                let emptyMessage = "<tr>" + 
                                                        "<td colspan='4'>活動列表為空</td>" +
                                                    "</tr>";
                                $( ".tabContent tbody" ).append( emptyMessage );
                            }
                        }
                    });
                }
            }, ( dismiss ) => {});
        }
    });
});

async function initial( res, rej )
{
    //await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch(
    //( error ) =>
    //{
    //    res(1);
    //});

    let cmd = {};
    cmd[ "act" ] = "showReport";

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
            $( ".tabContent h2" ).html(  "審核活動列表" );
            let content = $( ".tabContent tbody" );
            content.empty();

            activity = dataDB.data;

            if( $.isEmptyObject(activity) )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>活動列表為空</td>" +
                                    "</tr>";
                content.append( emptyMessage );

                return;
            }

            for( let i in activity )
            {
                let oneRow = "<tr>" + 
                                    "<td class='col-md-3'>" + activity[i].title + "</td>" +
                                    "<td class='col-md-3'>" + activity[i].time + "</td>" +
                                    "<td class='col-md-3'>" +
                                    "<button type='button' class='btn btn-danger'>" +
                                        "<span class='glyphicon glyphicon-trash'></span> 新增活動" +
                                    "</button>" +
                                "</td>" +
                                "<td class='col-md-3'>" +
                                    "<button type='button' class='btn'>" +
                                        "<span class='glyphicon glyphicon-remove'></span> 審核失敗" +
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
    if( !thisAccount )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面",
            confirmButtonText: "確定",
            
        }).then(( result ) => {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );

        }, ( dismiss ) => {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );
        });

        reject(1);

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "showUncheckCanlenderList";
    cmd[ "account" ] = thisAccount;

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
    
            }).then(( result ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            });
            
            reject(1);
        }
        else if( dataDB.data.boardName == undefined )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面",
                confirmButtonText: "確定",
                
            }).then(( result ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            });
    
            reject(1);
        }
    
        resolve(0);
    });
}

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}