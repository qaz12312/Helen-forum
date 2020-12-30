thisAccount=sessionStorage.getItem( "Helen-account" );
$(document).ready(async function () {
    barInitial();
    await new Promise( ( resolve, reject ) => { initial( resolve, reject ); });
    $("#SentAlert-inBtn").click(function () {
        

        var comment = $.trim($(".comment").val());
        if(comment != ""){
            swal({
                title: "確定要傳送給所有人嗎？<br />" ,
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

                }).then(( result ) => 
                {
                if ( result ) 
                {
                    
                    let cmd = {};
                        cmd["act"] = "toAllNotification";
                        cmd["content"] = comment;
                        
                        var currentdate = new Date(); 
                        var datetime =currentdate.getFullYear() + "-"  
                                    + (currentdate.getMonth()+1) + "-"
                                    + currentdate.getDate()  + " " 
                                    + currentdate.getHours() + ":"  
                                    + currentdate.getMinutes() + ":" 
                                    + currentdate.getSeconds();
                        //cmd["timer"] = datetime;
                        $.post( "../index.php", cmd, function( dataDB )
                        {
                            
                            dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            
                            swal({
                                title: "傳頌失敗" ,
                                type: "error",
                                //text: dataDB.errorCode,
                                timer: 2000,

                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            
                            swal({
                                title: "已傳送給每個人！" ,
                                type: "success",
                                showConfirmButton: false,
                                timer: 2000,

                            }).then((result) => {}, ( dismiss ) => {});

                            
                            //location.reload();//重整

        
                        }
                    });
                }
            }, ( dismiss ) => {});
        }
        


    });
});
async function initial(res, rej){
    //checkPermission();
    
    if(sessionStorage.getItem("Helen-act")== "toAllNotification"){
        $(".tabContent").find("h2").text("Helen－發送通知");
        $(".tabContent").find("p").text("This is Admin only.");
    }
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) );

    res(0);
}
function checkPermission(resolve, reject)
{
    if( !thisAccount )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面",
            
        }).then(( result ) => {
                
            $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus ); 
        }, ( dismiss ) => {});;

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
    
            }).then(( result ) => {
                
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            
            }, ( dismiss ) => {});
            
            resolve(0);
        }
        else if( dataDB.data.permission == undefined || dataDB.data.permission < 3 )
        {
            
            
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面",

            }).then(( result ) => {
                
                    $( ".tabContent" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( ".tabContent" ).append( httpStatus );
                
            }, ( dismiss ) => {});
    
            resolve(0);
        }
        
    
        resolve(0);
    });
}