$(document).ready(function () {
        

    let cmd={}
    $("#SentAlert-inBtn").click(function () {
        var value = $('#who').val();
        console.log(value)
        if(value=="")
        {

        var comment = $.trim($("#comment").val());
            if(comment != ""){
            
                
                
                console.log(comment);
                cmd[ "password" ] = comment
                
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
                                        cmd["act"] = "sendReport";
                                        cmd["reason"] = "Reason"
                                        cmd["timer"] = "Times"
                                        cmd["content"] = "Content"
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
                        cmd[ "password" ] = comment
                        
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
                                                cmd["act"] = "sendReport";
                                                cmd["reason"] = "Reason"
                                                cmd["timer"] = "Times"
                                                cmd["content"] = "Content"
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

function initial() {
sessionStorage.clear();
let cmd = {};
cmd["act"]="SentNotice";
cmd[ "Content" ] = $.trim($("#comment").val());
$.trim($("#comment").val())="";
}


function leaveUserDetails(UserID, Password, Permissions, Color, Nickname) {
sessionStorage.setItem("Helen-UserID", UserID);
sessionStorage.setItem("Helen-Password", Password);
sessionStorage.setItem("Helen-Permissions", Permissions);
sessionStorage.setItem("Helen-Color", Color);
sessionStorage.setItem("Helen-Nickname", Nickname);
}
