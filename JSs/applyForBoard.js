var applications = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    $( ".tabContent button" ).on( "click", function()
    {
        let thisTr = $(this).closest( "tr" );
        let thisApplicant = thisTr.find( "td:first-child" ).text();
        let thisApplcationID = thisTr[0].rowIndex;
        let thisBoardName = applications[ thisApplcationID ].boardName;
        let thisTime = applications[ thisApplcationID ].times;
        let thisContent = applications[ thisApplcationID ].content;

        if( $(this).text().trim() == "申請原因" )
        {
            swal({ 
                title: "申請原因&emsp;<cite>" + thisTime + "</cite><br />" +
                        "<small>&lt;" + thisApplicant + ", " + thisBoardName + "&gt;</small>",
                html: escapeHtml( (!thisContent) ? "無" : thisContent ).split( "\n" ).join( "<br/>" ),
                confirmButtonText: "&plus; 看板",
                showCancelButton: true,
                cancelButtonText: "取消",
                animation: false,

            }).then((result) =>
            {
                if( result )
                {
                    swal({
                        title: "新增看板&emsp;" + thisBoardName + "<br /><small>&lt;版規&gt;</small>",
                        input: "textarea",
                        inputPlaceholder: "請輸入版規...",
                        showCancelButton: true,
                        confirmButtonText: "送出",
                        cancelButtonText: "取消",
                        animation: false,
                    }).then((result) =>
                    {
                        if( result )
                        {
                            let cmd = {};
                            cmd[ "act" ] = "newBoard";
                            cmd[ "boardName" ] = thisBoardName.split("版")[0];
                            cmd[ "rule" ] = result;
                            console.log(cmd);
        
                            $.post( "../index.php", cmd, function( dataDB )
                            {
                                dataDB = JSON.parse( dataDB );
        
                                if( dataDB.status == false )
                                {
                                    swal({
                                        title: "新增看版失敗<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
                                        type: "error",
                                        text: data.errorCode,
                                        confirmButtonText: "確定",
                                        
                                    }).then(( result ) => {}, ( dismiss ) => {});
                                }
                                else
                                {
                                    swal({
                                        title: "新增看版成功<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
                                        type: "success",
                                        showConfirmButton: false,
                                        timer: 1000,
        
                                    }).then(( result ) => {}, ( dismiss ) =>
                                    {
                                        if( dismiss )
                                        {
                                            location.reload();
                                        }
                                    });
                                }
                            });
                        }
                    }, ( dismiss ) => {});
                }
            }, ( dismiss ) => {});

        }
        else if( $(this).text().trim() == "移除" )
        {
            let chosen = this;

            swal({
                title: "確定要移除此使用者的申請嗎？<br /><small>&lt;" + thisApplicant + ", " + thisBoardName + "&gt;</small>",
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
                    cmd[ "act" ] = "deleteApplyBoard";
                    cmd[ "account" ] = thisApplicant;
                    cmd[ "content" ] = "看板" + thisBoardName + " " + thisContent;
                    cmd["type"]="board";//申請勘版

                    $.post( "../index.php", cmd, function( dataDB )
                    {
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "移除失敗<br /><small>&lt;" + thisApplicant + ", " + thisBoardName + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
                                confirmButtonText: "確定",
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功移除此申請！<br /><small>&lt;" + thisApplicant + ", " + thisBoardName + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
                                
                            }).then((result) => {}, ( dismiss ) =>
                            {
                                applications.splice( thisApplcationID, 1 );
                                thisTr.remove();
        
                                if( applications.length == 0 )
                                {
                                    let emptyMessage = "<tr>" + 
                                                            "<td colspan='4'>申請看板列表為空</td>" +
                                                        "</tr>";
                                                        
                                    $( ".tabContent tbody" ).append( emptyMessage );
                                }
                            });
                        }
                    });
                }
            }, ( dismiss ) => {});
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
    cmd[ "act" ] = "showApplyBoard";
    cmd[ "type" ] = "board";

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
            let content = $( ".tabContent tbody" );
            content.empty();

            applications = dataDB.data;

            if( applications.length == 0 )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>申請看板列表為空</td>" +
                                    "</tr>";
                content.append( emptyMessage );

                return;
            }

            for( let i in applications )
            {
                applications[i].boardName = applications[i].content.split( "版 " )[0] + "版";
                applications[i].content = applications[i].content.replace( applications[i].boardName + " ", "" );
                applications[i].boardName = applications[i].boardName.substring( 2, applications[i].boardName.length )

                let oneRow = "<tr class='row'>" + 
                                    "<td class='col-md-3'>" + applications[i].account + "</td>" +
                                    "<td class='col-md-3'>" + applications[i].boardName + "</td>" +
                                    "<td class='col-md-3'>" +
                                        "<button type='button' class='btn btn-default btn-warning'>" +
                                            "<span class='glyphicon glyphicon-book'></span> 申請原因" +
                                        "</button>" +
                                    "</td>" +
                                    "<td class='col-md-3'>" +
                                        "<button type='button' class='btn btn-info'>" +
                                            "<span class='glyphicon glyphicon-trash'></span> 移除" +
                                        "</button>" +
                                    "</td>" +
                                "</tr>";

                content.append( oneRow );
            }
        }
        res(0);
    });
}

async function checkPermission( resolve, reject )
{
    if( !thisAccount )
    {
        await swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面",
            confirmButtonText: "確定",
            
        }).then(( result ) =>
        {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );

        }, ( dismiss ) => {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );
        });

        reject(0);

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "showAuthority";
    cmd[ "account" ] = thisAccount;

    $.post( "../index.php", cmd, async function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            await swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,
                confirmButtonText: "確定",
    
            }).then(( result ) =>
            {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            });
            
            reject(0);
        }
        else if( dataDB.data.permission == undefined || dataDB.data.permission < 3 )
        {
            await swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面",
                confirmButtonText: "確定",

            }).then(( result ) =>
            {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            });
    
            reject(0);
        }
    
        resolve(0);
    });
}

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}