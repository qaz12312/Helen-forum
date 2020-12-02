var moderators = [];

$( document ).ready( function() 
{
    $( "select" ).change( function()
    {
        console.log( $(this).val() );
    });

    $( ".dropdown-menu a" ).click( function()
    {
        console.log( $(this).text() );
    });

    $( ".btn-danger" ).click( function()
    {
        console.log( $("i", this)[0] );
    });
});

function initial()
{
    let isValid = checkPermission();
    if( !isValid ) return;

    let cmd = {};
    cmd[ "act" ] = "moderatorManagePage";

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

            let empty = true;
            for( let i in dataDB.data )
            {
                empty = false;
                moderators.push( dataDB.data[i] );

                let oneRow = "<tr>" + 
                                "<td><img class='head' src='" + dataDB.data[i][ "color" ] + ".png' alt='" + dataDB.data[i][ "color" ] + "'></td>" +
                                "<td>" + dataDB.data[i][ "userID" ] + "@mail.ntou.edu.tw</td>" +
                                "<td>";
                                
                let selectBlock = "<div class='input-group input-group-lg mt-3'>" +
                                        "<select class='form-control' style='background-color: brown; color: white;'>";

                for( let j in dataDB.data[i].board )
                {
                    selectBlock += "<option value='" +  dataDB.data[i].options[i] + "'>" + dataDB.data[i].options[i] + "</option>";
                }

                                    
                                            "<option value='資工版'>資工版</option>" +
                                            "<option value='電機版'>電機版</option>" +
                                            "<option value='美食版'>美食版</option>" +
                                            "<option value='企鵝版'>企鵝版</option>" +
                                        "</select>" +
                                    "</div>" +
                                "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn btn-danger'>" +
                                        "<span class='glyphicon glyphicon-trash'></span> 刪除" +
                                    "</button>" +
                                "</td>" +
                                "<td>" +
                                    "<button type='button' class='btn'>" +
                                        "<span class='glyphicon glyphicon-remove'></span> 取消" +
                                    "</button>" +
                                "</td>" +
                                "</tr>";

                content.append( oneRow );
            }

            if( empty )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>檢舉文章列表為空</td>" +
                                    "</tr>";
                content.append( emptyMessage );
            }
        }
    });
}

function checkPermission()
{
    // let perm = sessionStorage.getItem( "permission" );
    // console.log( perm );

    // if( perm ) return ( perm.valueOf() >= 3 ); 
    // else return false;

    return true;
}