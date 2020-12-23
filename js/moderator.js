var moderatorList = [];
var boardList = [];
var userList = [];
var thisAccount = sessionStorage.getItem( "Helen-account" );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    (function () {
        let previous;
    
        $( "select" ).on( "focus", function () 
        {
            previous = $(this).val();

        }).change( function() {

            if( $(this).closest( "td" ).next().find( ".btn-success")[0] != undefined )
            {
                return;
            }

            let chosen = this;

            let cmd = {};
            cmd[ "act" ] = "editModerator";
            cmd[ "account"] = ($(chosen).closest( "td" ).prev().text()).split( "@" )[0];
            cmd[ "oldBoardName"] = previous.split( "版" )[0];
            cmd[ "newBoardName"] = ($(chosen).val()).split( "版" )[0];

            $(chosen).val( previous );

            $.post( "../index.php", cmd, function( dataDB ) 
            {
                dataDB = JSON.parse( dataDB );

                if( dataDB.status == false )
                {
                    swal({
                        title: "更改看板失敗<br /><small>&lt;" + cmd.account + ", " + previous + "版<i class='fa fa-long-arrow-right'></i>" + cmd.newBoardName +"版&gt;</small>",
                        type: "error",
                        text: dataDB.errorCode,
                        confirmButtonText: "確定",
    
                    }).then(( result ) =>
                    {
                        $(chosen).val( previous );
            
                    }, ( dismiss ) => {
                        $(chosen).val( previous );
                    });
                }
                else
                {
                    swal({
                        title: "更改看板成功<br /><small>&lt;" + cmd.account + ", " + previous + "版<i class='fa fa-long-arrow-right'></i>" + cmd.newBoardName +"版&gt;</small>",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
    
                    }).then(( result ) =>
                    {
                        location.reload();
            
                    }, ( dismiss ) => {
                        location.reload();
                    });
                }
            });
        });
    })();

    $( ".btn-primary" ).click( function()
    {
        $( ".dropdown-menu", $(this).parent() ).show();
    });

    $( ".tabContent td" ).has( ".dropdown" ).mouseleave( function()
    {
        $( ".dropdown-menu", this ).hide();
    });

    $( ".dropdown-menu a" ).click( function(e)
    {
        let cmd = {};
        cmd[ "act" ] = "editModerator";
        cmd[ "account"] = ($(this).closest( "td" ).prev().prev().text()).split( "@" )[0];
        cmd[ "newBoardName"] = ($(this).text()).split( "版" )[0];

        $.post( "../index.php", cmd, function( dataDB ) 
        {
            dataDB = JSON.parse( dataDB );

            if( dataDB.status == false )
            {
                swal({
                    title: "新增看板失敗<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
                    type: "error",
                    text: dataDB.errorCode,
                    confirmButtonText: "確定",
    
                }).then(( result ) => {}, ( dismiss ) => {});
            }
            else
            {
                swal({
                    title: "新增看板成功<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,
    
                }).then(( result ) =>
                {
                    location.reload();
        
                }, ( dismiss ) => {
                    location.reload();
                });
            }
        });
    });

    $( ".btn-danger" ).click( function()
    {
        let chosen = $(this).closest( "td" ).prev().find( "div:last-child select" );

        let cmd = {};
        cmd[ "act" ] = "editModerator";
        cmd[ "account" ] = ($(this).closest( "td" ).prev().prev().text()).split( "@" )[0];
        cmd[ "oldBoardName" ] = (chosen.val()).split( "版" )[0];

        $.post( "../index.php", cmd, function( dataDB ) 
        {
            dataDB = JSON.parse( dataDB );

            if( dataDB.status == false )
            {
                swal({
                    title: "刪除看板失敗<br /><small>&lt;" + cmd.account + ", " + cmd.oldBoardName +"版&gt;</small>",
                    type: "error",
                    text: dataDB.errorCode,
                    confirmButtonText: "確定",
    
                }).then(( result ) => {}, ( dismiss ) => {});
            }
            else
            {
                swal({
                    title: "刪除看板成功<br /><small>&lt;" + cmd.account + ", " + cmd.oldBoardName +"版&gt;</small>",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,
    
                }).then(( result ) =>
                {
                    location.reload();
        
                }, ( dismiss ) => {
                    location.reload();
                });
            }
        });
    });

    $( ".btn-success" ).click( function()
    {
        let chosen = $(this).closest( "td" ).prev().find( "select" );

        let cmd = {};
        cmd[ "act" ] = "editModerator";
        cmd[ "account"] = $(this).closest( "td" ).prev().prev().find("input[list='userList']").val();
        cmd[ "newBoardName"] = chosen.val();

        if( cmd.account === "" )
        {
            let ending = swal({
                title: "請選擇使用者帳號",
                type: "error",
                confirmButtonText: "確定",

            }).then(( result ) =>
            {
                return true;
    
            }, ( dismiss ) => {
                return true;
            });

            if( ending ) return;
        }

        if( cmd.newBoardName === null )
        {
            let ending = swal({
                title: "請選擇看板",
                type: "error",
                confirmButtonText: "確定",

            }).then(( result ) =>
            {
                return true;
    
            }, ( dismiss ) => {
                return true;
            });

            if( ending ) return;
        }
        else
        {
            cmd.newBoardName = cmd.newBoardName.split( "版" )[0];
        }

        $.post( "../index.php", cmd, function( dataDB ) 
        {
            dataDB = JSON.parse( dataDB );

            if( dataDB.status == false )
            {
                swal({
                    title: "新增版主失敗<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
                    type: "error",
                    text: dataDB.errorCode,
                    confirmButtonText: "確定",
    
                }).then(( result ) => {}, ( dismiss ) => {});
            }
            else
            {
                swal({
                    title: "新增版主成功<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,
    
                }).then(( result ) =>
                {
                    location.reload();
        
                }, ( dismiss ) => {
                    location.reload();
                });
            }
        });
    });
});

async function initial( res, rej )
{
    boardList = JSON.parse( sessionStorage.getItem( "Helen-boards" ) );
    userList = await new Promise( ( resolve, reject ) => getUserList( resolve, reject ) ).catch( ( error ) =>
    {
        userList = error;
    });
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch( ( error ) =>
    {
        res(1);
    });
    await new Promise( ( resolve, reject ) => moderatorInitial( resolve, reject ) );

    res(0);
}

function getUserList( resolve, reject )
{
    let cmd = {};
    cmd[ "act" ] = "showAllUser";

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "錯誤",
                type: "error",
                text: dataDB.errorCode,
                confirmButtonText: "確定",

            }).then(( result ) =>
            {
                reject([]);
    
            }, ( dismiss ) => {
                reject([]);
            });
        }
        else
        {
            resolve( dataDB.data );
        }
    });
}

function moderatorInitial( resolve, reject )
{
    let cmd = {};
    cmd[ "act" ] = "showModerator";

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

            }).then(( result ) => {}, ( dismiss ) => {});
        }
        else
        {
            let content = $( ".tabContent tbody" );
            content.empty();

            moderatorList = dataDB.data;
        
            let validBoards = [...boardList];

            for( let i in boardList )
            {
                if( dataDB.data.find( ( element ) => element.boardName == boardList[i] ) !== undefined )
                {
                    validBoards.splice( validBoards.indexOf( boardList[i]), 1 );
                }
            }
        
            let oneRow = "";
            let selectBlock = "";
            let buttonBlock = "";
        
            let validOptions = "";
            let validlis = "";
            let userOptions = "";
        
            for( let j in validBoards )
            {
                validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "版</option>";
                validlis += "<li><a>" + validBoards[j] + "版</a></li>";
            }
        
            for( let j in userList )
            {
                userOptions += "<option value='" + userList[j].userID + "'>" + userList[j].userID + "</option>";
            }
        
            let addNewModerator = "<tr>" +
                                    "<td style='text-align: center;'>" +
                                        "<span class='glyphicon glyphicon-plus'></span>" +
                                    "</td>" +
                                    "<td>" +
                                        "<div class='input-group input-group-lg'>" +
                                            "<input id='users' list='userList' value='' class='textInput'>" +
                                            "<datalist id='userList' class='textInput'>" +
                                                userOptions +
                                            "</datalist>" +
                                            "@mail.ntou.edu.tw" +
                                        "</div>" +
                                    "</td>" +
                                    "<td>" +
                                        "<div class='input-group input-group-lg mt-3'>" +
                                            "<select class='form-control rounded-pill' style='background-color: brown; color: white;'>" +
                                                validOptions +
                                            "</select>" +
                                        "</div>" +
                                    "</td>" +
                                    "<td>" +
                                        "<div class='input-group mt-3'>" +
                                            "<button type='button' class='btn btn-success btn-lg'>" + 
                                                "<span class='glyphicon glyphicon-ok'></span> 新增" +
                                            "</button>" +
                                        "</div>" +
                                    "</td>" +
                                  "</tr>";
        
            content.append( addNewModerator );
        
            for( let i in dataDB.data )
            {
                if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].account != dataDB.data[parseInt(i) - 1].account )
                {
                    oneRow = "<tr>" + 
                                "<td><div class='head' style='background-color: " + dataDB.data[i].userColor + "'></div></td>" +
                                "<td>" + dataDB.data[i].account + "@mail.ntou.edu.tw</td>" +
                                "<td>";
                }
        
                selectBlock = "<div class='input-group input-group-lg mt-3'>" +
                                    "<select class='form-control' style='background-color: brown; color: white;'>" +
                                        "<option value='" + dataDB.data[i].boardName + "' selected>" + dataDB.data[i].boardName + "版</option>" +
                                        validOptions + 
                                    "</select>" +
                              "</div>";
        
                oneRow += selectBlock;
        
                if( dataDB.data[parseInt(i) + 1] === undefined || dataDB.data[i].account != dataDB.data[parseInt(i) + 1].account )
                {
                    oneRow += "</td><td>";
        
                    buttonBlock = "<div class='input-group input-group-lg mt-3'>" +
                                    "<div class='dropdown'>" +
                                        "<button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown' style='width: 40px !important;'>" +
                                            "<i class='fa fa-plus'></i>" +
                                        "</button>&nbsp;" +
                                        "<ul class='dropdown-menu'>" +
                                            validlis +
                                        "</ul>" +
                                        "<button class='btn btn-danger' type='button' style='width: 40px !important;'>" +
                                            "<i class='fa fa-minus'></i>" +
                                        "</button>" +
                                    "</div>" +
                                  "</div>";
        
                    oneRow += buttonBlock + "</td></tr>";
        
                    content.append( oneRow );
                }
            }
        
            if( moderatorList.length == 0 )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>目前沒有版主</td>" +
                                    "</tr>";
                content.append( emptyMessage );
            }
        }

        resolve(0);
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
            
        }).then(( result ) =>
        {
            $( "body" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( "body" ).append( httpStatus );

        }, ( dismiss ) => {
            $( "body" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( "body" ).append( httpStatus );
        });

        reject(1);

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
                confirmButtonText: "確定",
    
            }).then(( result ) =>
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            });
            
            reject(1);
        }
        else if( dataDB.data.permission == undefined || dataDB.data.permission < 3 )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面",
                confirmButtonText: "確定",

            }).then(( result ) =>
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
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