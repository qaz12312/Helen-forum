var moderators = [];
var boardNames = [ "資工版", "電機版", "美食版", "企鵝版", "aa版", "bb版", "cc版", "dd版" ];
var boardIDs = [ "1", "2", "3", "4", "5", "6", "7", "8" ];

$( document ).ready( function() 
{
    initial();

    (function () {
        let previous;
    
        $( "select" ).on( "focus", function () 
        {
            previous = $(this).val();

        }).change( function() {

            if( $(this).closest( "td" ).prev().find( "input[type='text']" )[0] != undefined )
            {
                console.log( "adding" );
                return;
            }

            let cmd = {};
            cmd[ "act" ] = "moderatorChangeBoard";
            cmd[ "userID"] = ($(this).closest( "td" ).prev().text()).split( "@" )[0];
            cmd[ "oldBoardID"] = boardIDs[ boardNames.indexOf( previous )];
            cmd[ "newBoardID"] = boardIDs[ boardNames.indexOf( $(this).val() ) ];

            console.log( cmd );

            // $.post( "../index.php", cmd, function( dataDB ) 
            // {
            //     dataDB = JSON.parse( dataDB );

            //     if( dataDB.status == false )
            //     {
            //         swal({
            //             title: "更改看板失敗<br /><small>&lt;" + cmd.userID + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + $(this).val() +"&gt;</small>",
            //             type: "error",
            //             text: dataDB.errorCode,
            //         });
            //         $(this).val( previous );
            //     }
            //     else
            //     {
            //         swal({
            //             title: "更改看板成功<br /><small>&lt;" + cmd.userID + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + $(this).val() +"&gt;</small>",
            //             type: "success"
    
            //         }).then(( result ) => {
            //             if ( result ) 
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
                    title: "更改看板失敗<br /><small>&lt;" + cmd.userID + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + $(this).val() +"&gt;</small>",
                    type: "error",
                    text: "dataDB.errorCode",
                });
                $(this).val( previous );
            }
            else
            {
                swal({
                    title: "更改看板成功<br /><small>&lt;" + cmd.userID + ", " + previous + "<i class='fa fa-long-arrow-right'></i>" + $(this).val() +"&gt;</small>",
                    type: "success"

                }).then(( result ) => {
                    if ( result ) 
                    {
                        location.reload();
                    }
                });
            }
        });
    })();

    $( ".dropdown-menu a" ).click( function()
    {
        let cmd = {};
        cmd[ "act" ] = "moderatorAddBoard";
        cmd[ "userID"] = ($(this).closest( "td" ).prev().prev().text()).split( "@" )[0];
        cmd[ "newBoardID"] = boardIDs[ boardNames.indexOf( $(this).text() ) ];

        console.log( cmd );

        // $.post( "../index.php", cmd, function( dataDB ) 
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "新增看板失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
        //             type: "error",
        //             text: dataDB.errorCode
        //         });
        //     }
        //     else
        //     {
        //         swal({
        //             title: "新增看板成功<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
        //             type: "success"

        //         }).then(( result ) => {
        //             if ( result ) 
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
                title: "新增看板失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
                type: "error",
                text: "dataDB.errorCode"
            });
        }
        else
        {
            swal({
                title: "新增看板成功<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
                type: "success"

            }).then(( result ) => {
                if ( result ) 
                {
                    location.reload();
                }
            });
        }
    });

    $( ".btn-danger" ).click( function()
    {
        let cmd = {};
        cmd[ "act" ] = "moderatorRemoveBoard";
        cmd[ "userID"] = ($(this).closest( "td" ).prev().prev().text()).split( "@" )[0];
        cmd[ "oldBoardID"] = boardIDs[ boardNames.indexOf( $(this).closest( "td" ).prev().find( "div:last-child select" ).val() )];

        console.log( cmd );

        // $.post( "../index.php", cmd, function( dataDB ) 
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "刪除看板失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "div:last-child select" ).val() +"&gt;</small>",
        //             type: "error",
        //             text: dataDB.errorCode
        //         });
        //     }
        //     else
        //     {
        //         swal({
        //             title: "刪除看板成功<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "div:last-child select" ).val() +"&gt;</small>",
        //             type: "success"

        //         }).then(( result ) => {
        //             if ( result ) 
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
                title: "刪除看板失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "div:last-child select" ).val() +"&gt;</small>",
                type: "error",
                text: "dataDB.errorCode"
            });
        }
        else
        {
            swal({
                title: "刪除看板成功<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "div:last-child select" ).val() +"&gt;</small>",
                type: "success"

            }).then(( result ) => {
                if ( result ) 
                {
                    location.reload();
                }
            });
        }
    });

    $( ".btn-success" ).click( function()
    {
        let cmd = {};
        cmd[ "act" ] = "addModerator";
        cmd[ "userID"] = $(this).closest( "td" ).prev().prev().find("input[type='text']").val();
        cmd[ "newBoardID"] = boardIDs[ boardNames.indexOf( $(this).closest( "td" ).prev().find( "select" ).val() )];

        console.log( cmd );

        // $.post( "../index.php", cmd, function( dataDB ) 
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "新增版主失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "select" ).val() +"&gt;</small>",
        //             type: "error",
        //             text: dataDB.errorCode
        //         });
        //     }
        //     else
        //     {
        //         swal({
        //             title: "新增版主成功<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "select" ).val() +"&gt;</small>",
        //             type: "success"

        //         }).then(( result ) => {
        //             if ( result ) 
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
                title: "新增版主失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "select" ).val() +"&gt;</small>",
                type: "error",
                text: "dataDB.errorCode"
            });
        }
        else
        {
            swal({
                title: "新增版主成功<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "select" ).val() +"&gt;</small>",
                type: "success"

            }).then(( result ) => {
                if ( result ) 
                {
                    location.reload();
                }
            });
        }
    });
});

function initial()
{
    let isValid = checkPermission();
    if( !isValid ) return;

    // boardIDs = sessionStorage.getItem( "Helen-boardIDs" );
    // boardIDs = JSON.parse( boardIDs );
    // boardNames = sessionStorage.getItem( "Helen-boardNames" );
    // boardNames = JSON.parse( boardNames );

    // let cmd = {};
    // cmd[ "act" ] = "moderatorManagePage";

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
    //         let content = $( ".tabContent tbody" );
    //         content.empty();

    //         moderators = dataDB.data;

    //         let validBoards = boardNames;
    //         for( let i in dataDB.data )
    //         {
    //             validBoards = arrayRemove( validBoards, dataDB.data[i].boardName );
    //         }

    //         let empty = true;
    //         let oneRow = "";
    //         let selectBlock = "";
    //         let buttonBlock = "";

    //         let validOptions = "";
    //         let validlis = "";
    //         for( let j in validBoards )
    //         {
    //             validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "</option>";
    //             validlis += "<li><a href='#''>" + validBoards[j] + "</a></li>";
    //         }

    //         for( let i in dataDB.data )
    //         {
    //             empty = false;

    //             if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) - 1].userID )
    //             {
    //                 oneRow = "<tr>" + 
    //                             "<td><img class='head' src='" + dataDB.data[i].color + ".png' alt='" + dataDB.data[i].color + "'></td>" +
    //                             "<td>" + dataDB.data[i].userID + "@mail.ntou.edu.tw</td>" +
    //                             "<td>";
    //             }

    //             selectBlock = "<div class='input-group input-group-lg mt-3'>" +
    //                                 "<select class='form-control' style='background-color: brown; color: white;'>" +
    //                                     "<option value='" + dataDB.data[i].boardName + "' selected>" + dataDB.data[i].boardName + "</option>" +
    //                                     validOptions + 
    //                                 "</select>" +
    //                         "</div>";

    //             oneRow += selectBlock;

    //             if( dataDB.data[parseInt(i) + 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) + 1].userID )
    //             {
    //                 oneRow += "</td><td>";

    //                 buttonBlock = "<div class='input-group input-group-lg mt-3'>" +
    //                                 "<div class='dropdown'>" +
    //                                     "<button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown' style='width: 40px !important;'>" +
    //                                         "<i class='fa fa-plus'></i>" +
    //                                     "</button>&nbsp;" +
    //                                     "<button class='btn btn-danger' type='button' style='width: 40px !important;'>" +
    //                                         "<i class='fa fa-minus'></i>" +
    //                                     "</button>" +
    //                                     "<ul class='dropdown-menu'>" +
    //                                         validlis +
    //                                     "</ul>" +
    //                                 "</div>" +
    //                             "</div>";

    //                 oneRow += buttonBlock + "</td></tr>";

    //                 content.append( oneRow );
    //             }
    //         }

    //         if( empty )
    //         {
    //             let emptyMessage = "<tr>" + 
    //                                     "<td colspan='4'>目前沒有版主</td>" +
    //                                 "</tr>";
    //             content.append( emptyMessage );
    //         }

    //         let addNewModerator = "<tr>" +
    //                                 "<td style='text-align: center;'>" +
    //                                     "<span class='glyphicon glyphicon-plus'></span>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<input type='text' id= 'account' class='textInput'>" +
    //                                         "@mail.ntou.edu.tw" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<div class='input-group input-group-lg mt-3'>" +
    //                                         "<select class='form-control rounded-pill' style='background-color: brown; color: white;'>" +
    //                                         validOptions +
    //                                         "</select>" +
    //                                     "</div>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<div class='input-group mt-3'>" +
    //                                         "<button type='button' class='btn btn-success btn-lg'>" + 
    //                                             "<span class='glyphicon glyphicon-ok'></span> 確認" +
    //                                         "</button>" +
    //                                     "</div>" +
    //                                 "</td>" +
    //                             "</tr>";
    //         content.append( addNewModerator );
    //     }
    // });
    

    let content = $( ".tabContent tbody" );
    content.empty();
    content.append(":)")
    console(content)
    let boards = [ "資工版", "電機版", "美食版", "企鵝版", "aa版", "bb版", "cc版", "dd版" ];
    
    let dataDB = {};
    dataDB[ "data" ] = [ { "userID": "00757000", "color": "red", "boardName": "資工版" }, 
                         { "userID": "00757000", "color": "red", "boardName": "電機版" }, 
                         { "userID": "00757001", "color": "blue", "boardName": "美食版" }, 
                         { "userID": "00757002", "color": "green", "boardName": "企鵝版" } ];

    moderators = dataDB.data;

    let validBoards = boards;
    for( let i in dataDB.data )
    {
        validBoards = arrayRemove( validBoards, dataDB.data[i].boardName );
    }

    let empty = true;
    let oneRow = "";
    let selectBlock = "";
    let buttonBlock = "";

    let validOptions = "";
    let validlis = "";
    for( let j in validBoards )
    {
        validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "</option>";
        validlis += "<li><a>" + validBoards[j] + "</a></li>";
    }

    for( let i in dataDB.data )
    {
        empty = false;

        if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) - 1].userID )
        {
            oneRow = "<tr>" + 
                        "<td><img class='head' src='" + dataDB.data[i].color + ".png' alt='" + dataDB.data[i].color + "'></td>" +
                        "<td>" + dataDB.data[i].userID + "@mail.ntou.edu.tw</td>" +
                        "<td>";
        }

        selectBlock = "<div class='input-group input-group-lg mt-3'>" +
                            "<select class='form-control' style='background-color: brown; color: white;'>" +
                                "<option value='" + dataDB.data[i].boardName + "' selected>" + dataDB.data[i].boardName + "</option>" +
                                validOptions + 
                            "</select>" +
                      "</div>";

        oneRow += selectBlock;

        if( dataDB.data[parseInt(i) + 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) + 1].userID )
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

    if( empty )
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

function checkPermission()
{
    // let perm = sessionStorage.getItem( "Helen-permission" );
    // console.log( perm );

    // if( perm ) return ( perm.valueOf() >= 3 ); 
    // else return false;

    return true;
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}