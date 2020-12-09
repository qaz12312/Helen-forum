$(document).ready(function () {
        
    initial();
    let cmd={}
    $("#SentAlert-inBtn").click(function () {
        var value = $('#who').val();
        console.log(value)
        if(value=="")
        {

        var comment = $.trim($("#comment").val());
            if(comment != ""){
                
                
                console.log( "send" );
                    let status = true;
                    swal({
                        title: "確定要傳送給所有人嗎？<br />" ,
                        showCancelButton: true,
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",
                        animation: false

                        }).then(( result ) => {
                            if ( result ) 
                            {
                                console.log( "status " + status );
                                if( status == false )
                                {
                                    swal({
                                        title: "傳頌失敗<br />" ,
                                        type: "error",
                                        text: dataDB.errorCode,
                                        animation: false
                                    })
                                }
                                else
                                {
                                    let cmd = {};
                                    cmd["act"] = "toAllNotification";
                                    cmd["content"] = comment;
                                    cmd["timer"] = "Times";
                                    swal({
                                        title: "已傳送給每個人！<br />",
                                        type: "success",
                                    })
                                    //$(this).closest( "tr" ).remove();
                                }
                                //$(this).closest( "tr" ).remove();
                            }
                    }, function( dismiss ) {
                        if ( dismiss === 'cancel' );
                    });
            }
        }
        else{

                var comment = $.trim($("#comment").val());
                    if(comment != ""){
                        console.log(comment);
                        console.log( "send" );
                            let status = true;
                            swal({
                                title: "確定要傳送給"+value+"？<br />" ,
                                showCancelButton: true,
                                confirmButtonText: "確定",
                                cancelButtonText: "取消",
                                animation: false

                                }).then(( result ) => {
                                    if ( result ) 
                                    {
                                        console.log( "status " + status );
                                        if( status == false )
                                        {
                                            swal({
                                                title: "傳頌失敗<br />" ,
                                                type: "error",
                                                text: dataDB.errorCode,
                                                animation: false
                                            })
                                        }
                                        else
                                        {
                                            let cmd = {};
                                            cmd["act"] = "sendNotification";
                                            cmd["account"] = value;
                                            cmd["timer"] = "Times";
                                            cmd["content"] = comment;
                                            swal({
                                                title: "已傳送給"+value+"<br />" ,
                                                type: "success",
                                            })
                                            //$(this).closest( "tr" ).remove();
                                        }
                                        //$(this).closest( "tr" ).remove();
                                    }
                            }, function( dismiss ) {
                                if ( dismiss === 'cancel' );
                            });
                    }
                }
            
        });

});
function funName1(id) {
$("#chgtxt").text($("#txt1").val());
}


function checkPermission()
{
    console.log(sessionStorage.getItem( "account" ))

    if( !sessionStorage.getItem( "account" ) )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面"
            
        }).then(( result ) => {
            if ( result ) 
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "browseAuthority";
    cmd[ "account" ] = sessionStorage.getItem( "account" );

    let permission;

    $.post( "../index.php", cmd, function( dataDB )
    {
            console.log( dataDB );
            dataDB = JSON.parse( dataDB );
            
            if( dataDB.status == false )
            {
                swal({
                    title: "載入頁面失敗",
                    type: "error",
                    text: dataDB.errorCode
                }).then(( result ) => {
                    if ( result ) 
                    {
                        $( "body" ).empty();
                        let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                        $( "body" ).append( httpStatus );
                    }
                });
            }
        else
        {
            permission = dataDB.data.permission;
            if( permission != 2 )
            {
                swal({
                    title: "載入頁面失敗",
                    type: "error",
                    text: "您沒有權限瀏覽此頁面"
                }).then(( result ) => {
                    if ( result ) 
                    {
                        $( "body" ).empty();
                        let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                        $( "body" ).append( httpStatus );
                    }
                });
                
            }
            
        }
        
    });
}
function initial(){
    checkPermission();
    
    if(sessionStorage.getItem("Helen-act")== "toAllNotification"){
        $(".tabContent").find("h2").text("Helen－發送通知");
        $(".tabContent").find("p").text("This is Admin only.");
    }
    if(sessionStorage.getItem("Helen-act")== "sendNotification"){
        $(".tabContent").find("h2").text("Helen－發送通知");
        $(".tabContent").find("p").text("This is Admin only.");
        
    }
}

function checkPermission()
{
    // let perm = sessionStorage.getItem( "Helen-permission" );
    // console.log( perm );

    // if( perm ) return ( perm.valueOf() >= 3 ); 
    // else return false;

    return true;
}