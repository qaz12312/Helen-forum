var moderatorList = [];
var boardList = [];

$( document ).ready( async function() 
{
    barInitial();
    boardList = JSON.parse( sessionStorage.getItem( "Helen-boards" ) );
    console.log( boardList );
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    (function () {
        let previous;
    
        $( "select" ).on( "focus", function () 
        {
            previous = $(this).val();

        }).change( function() {

            if( $(this).closest( "td" ).prev().find( "input[type='text']" )[0] != undefined )
            {
                return;
            }

            let chosen = this;

            let cmd = {};
            cmd[ "act" ] = "editModerator";
            cmd[ "account"] = ($(this).closest( "td" ).prev().text()).split( "@" )[0];
            cmd[ "oldBoardName"] = previous.split( "版" )[0];
            cmd[ "newBoardName"] = ($(this).val()).split( "版" )[0];

            // console.log( cmd );

            // $.post( "../index.php", cmd, function( dataDB ) 
            // {
            //     dataDB = JSON.parse( dataDB );

            //     if( dataDB.status == false )
            //     {
            //         swal({
            //             title: "更改看板失敗<br /><small>&lt;" + cmd.account + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + cmd.newBoardName +"版&gt;</small>",
            //             type: "error",
            //             text: dataDB.errorCode,
            //             confirmButtonText: "確定",

            //         }).then((result ) => {}, ( dismiss ) => 
            //         {
            //             if ( dismiss )
            //             {
            //                 $(chosen).val( previous );
            //             }
            //         });
            //     }
            //     else
            //     {
            //         swal({
            //             title: "更改看板成功<br /><small>&lt;" + cmd.account + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + cmd.newBoardName +"版&gt;</small>",
            //             type: "success",
            //             showConfirmButton: false,
            //             timer: 1000,

            //         }).then(( result ) => {}, ( dismiss ) =>
            //         {
            //             if ( dismiss )
            //             {
            //                 if ( result ) 
            //                 {
            //                     location.reload();
            //                 }
            //             }
            //         });
            //     }
            // });

            let status = true;
            if( status == false )
            {
                swal({
                    title: "更改看板失敗<br /><small>&lt;" + cmd.account + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + $(this).val() +"&gt;</small>",
                    type: "error",
                    text: "dataDB.errorCode",
                    confirmButtonText: "確定",

                }).then((result ) => {}, ( dismiss ) => 
                {
                    if ( dismiss )
                    {
                        $(this).val( previous );
                    }
                });
            }
            else
            {
                swal({
                    title: "更改看板成功<br /><small>&lt;" + cmd.account + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + $(this).val() +"&gt;</small>",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,

                }).then(( result ) => {}, ( dismiss ) =>
                {
                    if ( dismiss )
                    {
                        if ( result ) 
                        {
                            location.reload();
                        }
                    }
                });
            }
        });
    })();

    $( ".dropdown-menu a" ).click( function()
    {
        let cmd = {};
        cmd[ "act" ] = "editModerator";
        cmd[ "account"] = ($(this).closest( "td" ).prev().prev().text()).split( "@" )[0];
        cmd[ "newBoardName"] = ($(this).text()).split( "版" )[0];

        console.log( cmd );

        // $.post( "../index.php", cmd, function( dataDB ) 
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "新增看板失敗<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
        //             type: "error",
        //             text: dataDB.errorCode,
        //             confirmButtonText: "確定",
    
        //         }).then(( result ) => {}, ( dismiss ) => {});
        //     }
        //     else
        //     {
        //         swal({
        //             title: "新增看板成功<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
        //             type: "success",
        //             showConfirmButton: false,
        //             timer: 1000,
    
        //         }).then(( result ) => {}, ( dismiss ) => 
        //         {
        //             if ( dismiss ) 
        //             {
        //                 location.reload();
        //             }
        //         });
        //     }
        // });

        let status = true;
        if( status == false )
        {
            swal({
                title: "新增看板失敗<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
                type: "error",
                text: "dataDB.errorCode",
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

            }).then(( result ) => {}, ( dismiss ) => 
            {
                if ( dismiss ) 
                {
                    location.reload();
                }
            });
        }
    });

    $( ".btn-danger" ).click( function()
    {
        let chosen = $(this).closest( "td" ).prev().find( "div:last-child select" );

        let cmd = {};
        cmd[ "act" ] = "editModerator";
        cmd[ "account" ] = ($(this).closest( "td" ).prev().prev().text()).split( "@" )[0];
        cmd[ "oldBoardName" ] = (chosen.val()).split( "版" )[0];

        // console.log( cmd );

        // $.post( "../index.php", cmd, function( dataDB ) 
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "刪除看板失敗<br /><small>&lt;" + cmd.account + ", " + cmd.oldBoardName +"版&gt;</small>",
        //             type: "error",
        //             text: dataDB.errorCode,
        //             confirmButtonText: "確定",
    
        //         }).then(( result ) => {}, ( dismiss ) => {});
            // }
            // else
            // {
            //     swal({
            //         title: "刪除看板成功<br /><small>&lt;" + cmd.account + ", " + cmd.oldBoardName +"版&gt;</small>",
            //         type: "success",
            //         showConfirmButton: false,
            //         timer: 1000,
    
            //     }).then(( result ) => {}, ( dismiss ) =>
            //     {
            //         if( dismiss )
            //         {
            //             if ( result ) 
            //             {
            //                 location.reload();
            //             }
            //         }
            //     });
            // }
        // });

        let status = true;
        if( status == false )
        {
            swal({
                title: "刪除看板失敗<br /><small>&lt;" + cmd.account + ", " + cmd.oldBoardName +"版&gt;</small>",
                type: "error",
                text: "dataDB.errorCode",
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

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if( dismiss )
                {
                    if ( result ) 
                    {
                        location.reload();
                    }
                }
            });
        }
    });

    $( ".btn-success" ).click( function()
    {
        let chosen = $(this).closest( "td" ).prev().find( "select" );

        let cmd = {};
        cmd[ "act" ] = "editModerator";
        cmd[ "account"] = $(this).closest( "td" ).prev().prev().find("input[type='text']").val();
        cmd[ "newBoardName"] = (chosen.val()).split( "版" )[0];

        console.log( cmd );

        // $.post( "../index.php", cmd, function( dataDB ) 
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "新增版主失敗<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
        //             type: "error",
        //             text: dataDB.errorCode,
        //             confirmButtonText: "確定",
    
        //         }).then(( result ) => {}, ( dismiss ) => {});
        //     }
        //     else
        //     {
        //         swal({
        //             title: "新增版主成功<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
        //             type: "success",
        //             showConfirmButton: false,
        //             timer: 1000,
    
        //         }).then(( result ) => {}, ( dismiss ) =>
        //         {
        //             if( dismiss )
        //             {
        //                 if ( result ) 
        //                 {
        //                     location.reload();
        //                 }
        //             }
        //         });
        //     }
        // });

        let status = true;
        if( status == false )
        {
            swal({
                title: "新增版主失敗<br /><small>&lt;" + cmd.account + ", " + cmd.newBoardName +"版&gt;</small>",
                type: "error",
                text: "dataDB.errorCode",
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

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if( dismiss )
                {
                    if ( result ) 
                    {
                        location.reload();
                    }
                }
            });
        }
    });
});

async function initial( res, rej )
{
    // await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) );
    // await new Promise( ( resolve, reject ) => moderatorInitial( resolve, reject ) );
    
    let content = $( ".tabContent tbody" );
    content.empty();
    
    let dataDB = {};
    dataDB[ "data" ] = [ { "account": "00757000", "userColor": "red", "boardName": "資工" }, 
                         { "account": "00757000", "userColor": "red", "boardName": "電機" }, 
                         { "account": "00757001", "userColor": "blue", "boardName": "美食" }, 
                         { "account": "00757002", "userColor": "green", "boardName": "企鵝" } ];

    moderatorList = dataDB.data;

    let validBoards = boardList;

    for( let i in validBoards )
    {
        if( dataDB.data.find( ( element ) => element.boardName == validBoards[i] ) !== undefined )
        {
            validBoards.splice( i, 1 );
        }
    }

    let oneRow = "";
    let selectBlock = "";
    let buttonBlock = "";

    let validOptions = "";
    let validlis = "";

    for( let j in validBoards )
    {
        validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "版</option>";
        validlis += "<li><a>" + validBoards[j] + "版</a></li>";
    }

    for( let i in dataDB.data )
    {
        if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].account != dataDB.data[parseInt(i) - 1].account )
        {
            oneRow = "<tr>" + 
                        "<td><img class='head' src='" + dataDB.data[i].userColor + ".png' alt='" + dataDB.data[i].userColor + "'></td>" +
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
                                "<button class='btn btn-danger' type='button' style='width: 40px !important;'>" +
                                    "<i class='fa fa-minus'></i>" +
                                "</button>" +
                                "<ul class='dropdown-menu'>" +
                                    validlis +
                                "</ul>" +
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

    let addNewModerator = "<tr>" +
                            "<td style='text-align: center;'>" +
                                "<span class='glyphicon glyphicon-plus'></span>" +
                            "</td>" +
                            "<td>" +
                                "<input type='text' id= 'account' class='textInput'>" +
                                    "@mail.ntou.edu.tw" +
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
                                        "<span class='glyphicon glyphicon-ok'></span> 確認" +
                                    "</button>" +
                                "</div>" +
                            "</td>" +
                          "</tr>";

    content.append( addNewModerator );

    res(0);
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
                text: dataDB.errorCode
            })
        }
        else
        {
            let content = $( ".tabContent tbody" );
            content.empty();
            
            let dataDB = {};
            dataDB[ "data" ] = [ { "account": "00757000", "userColor": "red", "boardName": "資工" }, 
                                 { "account": "00757000", "userColor": "red", "boardName": "電機" }, 
                                 { "account": "00757001", "userColor": "blue", "boardName": "美食" }, 
                                 { "account": "00757002", "userColor": "green", "boardName": "企鵝" } ];
        
            moderatorList = dataDB.data;
        
            let validBoards = boardList;
        
            for( let i in validBoards )
            {
                if( dataDB.data.find( ( element ) => element.boardName == validBoards[i] ) !== undefined )
                {
                    validBoards.splice( i, 1 );
                }
            }
        
            let oneRow = "";
            let selectBlock = "";
            let buttonBlock = "";
        
            let validOptions = "";
            let validlis = "";
        
            for( let j in validBoards )
            {
                validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "版</option>";
                validlis += "<li><a>" + validBoards[j] + "版</a></li>";
            }
        
            for( let i in dataDB.data )
            {
                if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].account != dataDB.data[parseInt(i) - 1].account )
                {
                    oneRow = "<tr>" + 
                                "<td><img class='head' src='" + dataDB.data[i].userColor + ".png' alt='" + dataDB.data[i].userColor + "'></td>" +
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
                                        "<button class='btn btn-danger' type='button' style='width: 40px !important;'>" +
                                            "<i class='fa fa-minus'></i>" +
                                        "</button>" +
                                        "<ul class='dropdown-menu'>" +
                                            validlis +
                                        "</ul>" +
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
        
            let addNewModerator = "<tr>" +
                                    "<td style='text-align: center;'>" +
                                        "<span class='glyphicon glyphicon-plus'></span>" +
                                    "</td>" +
                                    "<td>" +
                                        "<input type='text' id= 'account' class='textInput'>" +
                                            "@mail.ntou.edu.tw" +
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
                                                "<span class='glyphicon glyphicon-ok'></span> 確認" +
                                            "</button>" +
                                        "</div>" +
                                    "</td>" +
                                  "</tr>";
        
            content.append( addNewModerator );
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

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}