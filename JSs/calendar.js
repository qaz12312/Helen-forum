var activity = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready(async function() 
{
    // barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );
    $('.fc-event-title-container').click(function(){
        swal({
            title: "",
            text: ""
        }, ( dismiss ) => {});
    }
    );
    
});

function initial(resolve, reject)
{
  //await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) ).catch(
    //( error ) =>
    //{
    //    res(1);
    //});

    let cmd = {};
    cmd[ "act" ] = "showCalendar";

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );
    //     if( dataDB.status == false )
    //     {
    //         swal({
    //             title: "載入頁面失敗",
    //             type: "error",
    //             text: dataDB.errorCode,
    //             confirmButtonText: "確定",

    //         }).then((result) => {}, ( dismiss ) => {});
    //     } 
    //     else
          {
            activity=[{"title":"test","startTime":"2020-12-05T12:00:00","endTime":"2020-12-15T15:00:00"},
                    {"title":"test22","startTime":"2020-12-10T14:00:00","endTime":"2020-12-13T16:00:00"}]
                    if( $.isEmptyObject(activity) )
                    {
                        let emptyMessage = "<tr>" + 
                                                "<td colspan='4'>檢舉文章列表為空</td>" +
                                            "</tr>";
                        content.append( emptyMessage );

                        return;
                    }
                    var calendarEl = document.getElementById('calendar');
                    var calendar = new FullCalendar.Calendar(calendarEl, {
                      initialView: 'dayGridMonth',
                      headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                      },
                      events: [
                        {
                          title: activity[0].time,
                          //url: 'http://google.com/',
                          start: '2020-12-12',
                          end: '2020-12-13'
                        },
                      ]
                    });
                    }

                    // let content={};
                     for( let i in activity )
                     {
                      calendar.addEvent({
                          title : activity[i].title, 
                          start : activity[i].startTime ,
                          end :activity[i].endTime
                          }); 
        
                    //     content.append( dict );
                     }


           
  
    calendar.render();
    resolve(0);
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
            
        }).then(( result ) => {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );

        }, ( dismiss ) => {
            $( ".tabContent" ).empty();
            let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
            $( ".tabContent" ).append( httpStatus );
        });

        reject(1);

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "showUncheckCanlenderList";
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
    
            }).then(( result ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
            });
            
            reject(1);
        }
        else if( dataDB.data.boardName == undefined )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: "您沒有權限瀏覽此頁面",
                confirmButtonText: "確定",
                
            }).then(( result ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
    
            }, ( dismiss ) => {
                $( ".tabContent" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( ".tabContent" ).append( httpStatus );
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