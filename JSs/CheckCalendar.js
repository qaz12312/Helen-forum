var activity = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready( async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );

    $( ".tabContent button" ).on( "click", function(){
        let thisActivityTitle = $(this).closest( "tr" ).find( "td:first-child" ).text();

        let thisActivity = Object.keys( activity ).find( ( key ) =>{
            return activity[ key ].title == thisActivityTitle;
        });
        let thisStartTime = activity[ thisActivity ].startTime.split("T");
        let thisEndTime = activity[ thisActivity ].endTime.split("T");
        let thisText = activity[ thisActivity ].text;
        let thisTitle = activity[ thisActivity ].title;
        let thisID = activity[ thisActivity ].id;
        if( $(this).text().trim() == "原因" )
        {
            $("#"+$(this).attr('id')+"0").attr('disabled',false);
            $("#"+$(this).attr('id')+"1").attr('disabled',false);
            swal({
                title: "<cite>" + thisTitle + "</cite><br />" +
                "<small>&emsp;開始日期:" + thisStartTime[0]+"&emsp;時間:" + thisStartTime[1]+ 
                "<br />&emsp;結束日期:" + thisEndTime[0]+"&emsp;時間:" + thisEndTime[1]+ "<br />"+
                "內容: " +thisText+"</small><br />",
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then((result) => {}, ( dismiss ) => {});

        }
        else if( $(this).text().trim() == "新增活動" )
        {
            let chosen = this;
            swal({
                title: "確定要允許這個活動嗎？<br /><small>" + activity[ thisActivity ].title + "</small>",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => {
                if ( result ) 
                {
                    let cmd = {};
                    cmd[ "act" ] = "checkInCanlendarList";
                    cmd[ "id" ] = parseInt(thisID);
                    cmd[ "isPass" ] = 1;
                    
                    $.post( "../index.php", cmd, function( dataDB ){
                        console.log(dataDB)
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "刪除失敗<br /><small>&lt;" + activity[ thisActivity ].title + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功新增活動！<br /><small>&lt;" + activity[ thisActivity ].title + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
                                
                            }).then((result) => {}, ( dismiss ) => {});
    
                            $(chosen).closest( "tr" ).remove();
                            delete activity[ thisID ];
    
                            if( $.isEmptyObject(activity) )
                            {
                                let emptyMessage = "<tr>" + 
                                                        "<td colspan='4'>活動列表為空</td>" +
                                                    "</tr>";
                                $( ".tabContent tbody" ).append( emptyMessage );
                            }
                        }
                    });
                }
            }, ( dismiss ) => {});
        }
        else if( $(this).text().trim() == "否決申請")
        {
            let chosen = this;

            swal({
                title: "確定要否決此活動嗎？<br /><small>" + activity[thisActivity].title + "</small>",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) => 
            {
                if ( result ) 
                {
                    let cmd = {};
                    cmd[ "act" ] = "checkInCanlendarList";
                    cmd[ "id" ] = parseInt(thisID);
                    cmd[ "isPass" ] = 0;

                    $.post( "../index.php", cmd, function( dataDB )
                    {
                        console.log(dataDB);
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "取消否決活動<br /><small>&lt;" + activity[ thisActivity ].title + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功取消活動！<br /><small>&lt;" + activity[ thisActivity ].title + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
    
                            }).then((result) => {}, ( dismiss ) => {});
    
                            $(chosen).closest( "tr" ).remove();
                            delete activity[ thisActivity ];
    
                            if( $.isEmptyObject(activity) )
                            {
                                let emptyMessage = "<tr>" + 
                                                        "<td colspan='4'>活動列表為空</td>" +
                                                    "</tr>";
                                $( ".tabContent tbody" ).append( emptyMessage );
                            }
                        }
                    });
                }
            }, ( dismiss ) => {});
        }
    });
});

async function initial( res, rej )
{
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch(
    ( error ) =>
    {
       res(1);
    });

    let cmd = {};
    cmd[ "act" ] = "showCalendar";
    cmd["type"]="list";

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

            }).then((result) => {}, ( dismiss ) => {});
        } 
        else
         {
             //activity=[{"title":"test","startTime":"2020/02/05T12:00:00","endTime":"2020/04/05T15:00:00","text":"text"},
        //             {"title":"test22","startTime":"2020/02/10T14:00:00","endTime":"2020/04/05T16:00:00","text":"text"}]
            activity = dataDB.data;
            let content = $( "#checklist tbody" );
            content.empty();
            if( $.isEmptyObject(activity) )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>活動列表為空</td>" +
                                    "</tr>";
                content.append( emptyMessage );

                return;
            }
            
            for( let i in activity )
            {
                let oneRow = "<tr id="+i+">" + 
                    "<td>" + activity[i].title + "</td>" +
                    "<td>" +
                    "<button type='button' class='btn btn-info' id="+i+">" +
                        "<span class='glyphicon glyphicon-book' ></span>原因" +
                    "</button>" +
                "</td>" +
                "<td>" +
                    "<button type='button' class='btn btn-success'disabled=false id="+i+0+">" +
                        "<span class='glyphicon glyphicon-send'></span>新增活動" +
                    "</button>" +
                "</td>" +
                "<td>" +
                    "<button type='button' class='btn btn-danger'disabled=false id="+i+1+">" +
                        "<span class='glyphicon glyphicon-remove'></span>否決申請" +
                    "</button>" +
                "</td>" +
                "</tr>";
                content.append( oneRow );
            }
        }
        res(0);
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
            swal({
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