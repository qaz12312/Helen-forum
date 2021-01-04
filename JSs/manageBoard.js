var thisAccount = sessionStorage.getItem( "Helen-account" );
var boardList = [];

$( document ).ready( async function()
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    $( "button" ).click( function()
    {
        let content = $(this).text().trim();

        if( content == "審核申請" )
        {
            location.href = "../HTMLs/applyForBoard.html";
        }
        else if( content == "刪除" )
        {
            let chosen = $( this ).closest( "tr" );
            let deleteBoardName = chosen.find( "td" ).first().text();
            deleteBoardName = deleteBoardName.split( "版" )[0];

            swal({
                title: "確定要刪除此看板嗎？<br /><small>&lt;" + deleteBoardName + "版&gt;</small>",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F09900",
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => {
                let cmd = {};
                cmd[ "act" ] = "deleteBoard";
                cmd[ "boardName" ] = deleteBoardName;

                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        swal({
                            title: "刪除看板失敗",
                            type: "error",
                            text: data.errorCode,
                            confirmButtonText: "確定",

                        }).then(( result ) => {}, ( dismiss ) => {});
                    }
                    else if( dataDB.status == true )
                    {
                        swal({
                            title: "刪除看板成功<br /><small>&lt;" + cmd.boardName + "版&gt;</small>",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,

                        }).then(( result ) => {}, ( dismiss ) =>
                        {
                            let id = boardList.findIndex((element) => element.boardName == cmd.boardName );
                            boardList.splice( id, 1 );
                            chosen.remove();
                        });
                    }
                });
            }, ( dismiss ) => {});
    }

        else if( content == "新增看板" )
        {
            let addingQueue = [];
            let steps = [1, 2];

            addingQueue.push(
            {
                title: "新增看板<br /><small>&lt;看板名稱&gt;</small>",
                input: "text",
                inputPlaceholder: "請輸入看板名稱(不包含「版」)...",
                showCancelButton: true,
                confirmButtonText: "送出",
                cancelButtonText: "取消",
                animation: false,
            });

            addingQueue.push(
            {
                title: "新增看板<br /><small>&lt;版規&gt;</small>",
                input: "textarea",
                inputPlaceholder: "請輸入版規...",
                showCancelButton: true,
                confirmButtonText: "送出",
                cancelButtonText: "取消",
                animation: false,
            });

            swal.setDefaults( { progressSteps: steps } );

            swal.queue( addingQueue ).then( async ( result ) => 
            {
                swal.setDefaults( { progressSteps: false } );

                let dup = boardList.find((element) => element.boardName == result[0]) !== undefined;

                while( result[0] !== false && ( result[0] === "" || result[0].includes("版") || dup ) )
                {
                    if( result[0] === "" )
                    {
                        result[0] = await swal({
                            title: "看板名稱不得為空",
                            type: "warning",
                            input: "text",
                            inputPlaceholder: "請輸入看板名稱...",
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

                    if( dup )
                    {
                        result[0] = await swal({
                            title: "看板名稱重複，請重新輸入",
                            type: "warning",
                            input: "text",
                            inputPlaceholder: "請輸入看板名稱...",
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

                    if( typeof result[0] == "string" && result[0].includes("版") )
                    {
                        result[0] = await swal({
                            title: "看板名稱不得含有「版」",
                            type: "warning",
                            input: "text",
                            inputPlaceholder: "請輸入看板名稱...",
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

                    dup = boardList.find((element) => element.boardName == result[0]) !== undefined
                }

                if( result[0] === false ) return;

                let cmd = {};
                cmd[ "act" ] = "newBoard";
                cmd[ "boardName" ] = result[0];
                cmd[ "rule" ] = result[1];

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

            }, ( dismiss ) =>
            {
                swal.setDefaults( { progressSteps: false } );
            });
        }
    });
    
    $('body').on('keydown','textarea', function(e)
    {
        if(e.which === 13)
        {
            e.preventDefault();
            var value = e.target.value;
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;

            if(start === end)
            {
                value = value.substring(0, start) + "\n" + value.substring(start, value.length);
            }
            else
            {
                value = value.substring(0, start) + "\n" + value.substring(end, value.length);
            }

            e.target.value = value;
        }

        return e.which !== 13;
    });
});

async function initial( res, rej )
{
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch(
    ( error ) =>
    {
        res(1);
    });
    await new Promise( ( resolve, reject ) => manageBoard( resolve, reject ) );

    res(0);
}

function manageBoard( resolve, reject )
{
    let cmd = {};
    cmd[ "act" ] = "showBoardList";

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "錯誤",
                type: "error",
                text: data.errorCode,
                confirmButtonText: "確定",

            }).then(( result ) => {}, ( dismiss ) => {});
        }
        else
        {
            boardList = dataDB.data;

            $( ".tabContent tbody" ).empty();
            $( ".tabContent tbody" ).append( "<tr><td colspan='4'>" + 
                                                "<button type='button' class='btn btn-success'>" + 
                                                    "<span class='glyphicon glyphicon-plus'></span> 新增看板</span>" +
                                             "</button></td></tr>" );
            let content = "";

            for( let i in boardList )
            {
                let rule = ( boardList[i].rule ) ? boardList[i].rule : '無';
                rule = escapeHtml( rule ).split( "\n" ).join( "<br/>" );

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
        
            if( boardList.length == 0 )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='3'>目前沒有看板</td>" +
                                    "</tr>";
                content.append( emptyMessage );
            }
        }

        resolve(0);
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