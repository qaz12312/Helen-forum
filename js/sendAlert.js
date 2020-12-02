$(document).ready(function () {
    
    $("#SentAlert-inBtn").click(function () {
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
        });
        

});

function initial() {
    sessionStorage.clear();
    $("#account").val("");
    $("#password").val("");
}


function leaveUserDetails(id, name, seat, overr, alarmm) {
    sessionStorage.setItem("LM-UserId", id);

    sessionStorage.setItem("LM-showSeat", seat);
    sessionStorage.setItem("LM-over", overr);
    sessionStorage.setItem("LM-alarm", alarmm);
}
