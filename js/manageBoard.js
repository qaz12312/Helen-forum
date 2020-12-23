var thisAccount = sessionStorage.getItem( "Helen-account" );
var boardList = [];

$( document ).ready( async function()
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    $( "button" ).click( function()
    {
        let content = $(this).text().trim();

        if( content == "刪除" )
        {
            let chosen = $( this ).closest( "tr" );
            let deleteBoardName = chosen.find( "td" ).first().text();
            deleteBoardName = deleteBoardName.split( "版" )[0];

            let cmd = {};
            cmd[ "act" ] = "deleteBoard";
            cmd[ "boardName" ] = deleteBoardName;

            // $.post( "../index.php", cmd, function( dataDB )
            // {
            //     dataDB = JSON.parse( dataDB );

            //     if( dataDB.status == false )
            //     {
            //         swal({
            //             title: "刪除看板失敗",
            //             type: "error",
            //             text: data.errorCode,
            //             confirmButtonText: "確定",

            //         }).then(( result ) => {}, ( dismiss ) => {});
            //     }
            //     else if( dataDB.status == true )
            //     {
            //         swal({
            //             title: "刪除看板成功<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
            //             type: "success",
            //             showConfirmButton: false,
            //             timer: 1000,

            //         }).then(( result ) => {}, ( dismiss ) =>
            //         {
            //             chosen.remove();
            //         });
            //     }
            // });

            let status = true;
            if( status == false )
            {
                swal({
                    title: "刪除看板失敗",
                    type: "error",
                    text: "data.errorCode",
                    confirmButtonText: "確定",

                }).then(( result ) => {}, ( dismiss ) => {});
            }
            else if( status == true )
            {
                swal({
                    title: "刪除看板成功<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,

                }).then(( result ) => {}, ( dismiss ) =>
                {
                    chosen.remove();
                });
            }
        }
        else if( content == "新增看板" )
        {
            let addingQueue = [];
            let steps = [1, 2];

            addingQueue.push(
            {
                title: "新增看板<br /><small>&lt;看板名稱&gt;</small>",
                input: "text",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",

            });

            addingQueue.push(
            {
                title: "新增看板<br /><small>&lt;版規&gt;</small>",
                input: "textarea",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
            });

            swal.setDefaults( { progressSteps: steps } );

            swal.queue( addingQueue ).then( async ( result ) => 
            {
                swal.setDefaults( { progressSteps: false } );

                while( result[0] === "" && result[0] !== false )
                {
                    result[0] = await swal({
                        title: "看板名稱不得為空",
                        type: "warning",
                        input: "text",
                        showCancelButton: true,
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",

                    }).then(( result ) =>
                    {
                        return result;

                    }, ( dismiss ) =>
                    {
                        return false;
                    });
                }

                if( result[0] === false ) return;

                // let cmd = {};
                // cmd[ "act" ] = "newBoard";
                // cmd[ "boardName" ] = result[0];
                // cmd[ "rule" ] = result[1];

                // $.post( "../index.php", cmd, function( dataDB )
                // {
                //     dataDB = JSON.parse( dataDB );

                //     if( dataDB.status == false )
                //     {
                //         swal({
                //             title: "新增看版失敗<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
                //             type: "error",
                //             text: data.errorCode,
                //             confirmButtonText: "確定",
                            
                //         }).then(( result ) => {}, ( dismiss ) => {});
                //     }
                //     else
                //     {
                //         swal({
                //             title: "新增看版成功<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
                //             type: "success",
                //             showConfirmButton: false,
                //             timer: 1000,

                //         }).then(( result ) => {}, ( dismiss ) =>
                //         {
                //             if( dismiss )
                //             {
                //                 location.reload();
                //             }
                //         });
                //     }
                // });
                let cmd = {};
                cmd[ "act" ] = "newBoard";
                cmd[ "boardName" ] = result[0];
                cmd[ "rule" ] = result[1];
                
                let status = true;
                if( status == false )
                {
                    swal({
                        title: "新增看版失敗<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
                        type: "error",
                        text: "data.errorCode",
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

            }, ( dismiss ) =>
            {
                swal.setDefaults( { progressSteps: false } );
            });
        }
    });
});

async function initial( res, rej )
{
    // await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) );
    await new Promise( ( resolve, reject ) => manageBoard( resolve, reject ) );

    res(0);
}

function manageBoard( resolve, reject )
{
    // let cmd = {};
    // cmd[ "act" ] = "showBoardList";

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         swal({
    //             title: "錯誤",
    //             type: "error",
    //             text: data.errorCode,
    //             confirmButtonText: "確定",

    //         }).then(( result ) => {}, ( dismiss ) => {});
    //     }
    //     else
    //     {
    //         boardList = dataDB.data;

    //         $( ".tabContent tbody" ).empty();
    //         $( ".tabContent tbody" ).append( "<tr><td colspan='4'>" + 
    //                                             "<button type='button' class='btn btn-success'>" + 
    //                                                 "<span class='glyphicon glyphicon-plus'></span> 新增看板</span>" +
    //                                          "</button></td></tr>" );
    //         let content = "";

    //         for( let i in boardList )
    //         {
    //             let rule = ( boardList[i].rule ) ? boardList[i].rule : '無';

    //             content += "<tr class='row'>" + 
    //                             "<td class='col-md-3'>" + boardList[i].boardName + "版</td>" + 
    //                             "<td class='col-md-6'><h6>" + rule + "</h6></td>" +
    //                             "<td class='col-md-3'>" +
    //                                 "<button type='button' class='btn btn-success'>" + 
    //                                     "<span class='glyphicon glyphicon-plus'> 刪除</span>" + 
    //                                 "</button>" +
    //                             "</td>" +
    //                        "</tr>";
    //         }

    //         $( ".tabContent tbody" ).append( content );
    //     }

    //     resolve(0);
    // });

    let status = true;

    if( status == false )
    {
        swal({
            title: "錯誤",
            type: "error",
            text: "data.errorCode",
            confirmButtonText: "確定",

        }).then(( result ) => {}, ( dismiss ) => {});
    }
    else
    {
        boardList = [{ "boardName": "美食", "rule": "吃吃喝喝" },
                     { "boardName": "穿搭", "rule": "每天都要每每ㄉ" },
                     { "boardName": "廢文", "rule": "我愛講廢話" },
                     { "boardName": "八卦", "rule": "長舌聚集地"},
                     { "boardName": "132", "rule": ""}];

        $( ".tabContent tbody" ).empty();
        $( ".tabContent tbody" ).append( "<tr><td colspan='4'>" + 
                                            "<button type='button' class='btn btn-success'>" + 
                                                "<span class='glyphicon glyphicon-plus'></span> 新增看板</span>" +
                                            "</button></td></tr>" );
        let content = "";

        for( let i in boardList )
        {
            let rule = ( boardList[i].rule ) ? boardList[i].rule : '無';

            content += "<tr class='row'>" + 
                            "<td class='col-md-3'>" + boardList[i].boardName + "版</td>" + 
                            "<td class='col-md-6'><h6>" + rule + "</h6></td>" +
                            "<td class='col-md-3'>" +
                                "<button type='button' class='btn btn-danger'>" + 
                                    "<span class='glyphicon glyphicon-trash'> 刪除</span>" + 
                                "</button>" +
                            "</td>" +
                        "</tr>";
        }

        $( ".tabContent tbody" ).append( content );
    }

    resolve(0);
}

function checkPermission( resolve, reject )
{
    if( !thisAccount )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面",
            
        }).then(( result ) => {}, ( dismiss ) => {
            if ( dismiss )
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });

        resolve(0);

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "showAuthority";
    cmd[ "account" ] = thisAccount;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: "dataDB.errorCode",
    
            }).then(( result ) => {}, ( dismiss ) => {
                if ( dismiss )
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
            
            resolve(0);
        }
        else if( dataDB.data.permission == undefined || dataDB.data.permission < 3 )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面",

            }).then(( result ) => {}, ( dismiss ) => {
                if ( dismiss )
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
    
            resolve(0);
        }
    
        resolve(0);
    });
}