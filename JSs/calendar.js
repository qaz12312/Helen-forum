var activity = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready(async function() 
{
    // barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );
    // $('.fc-event-title-container').click(function(){

    //   let thisArticleTitle = $(this).val();
    //   alert(thisArticleTitle)
    //   let thisActivity = Object.keys( activity ).find( ( key ) => 
    //   {
    //       return activity[ key ].title == thisArticleTitle;
    //   });

    //   swal({
    //     title: thisActivity.title,
    //     text: thisActivity.text,
    //     type: "question",
    //     showCancelButton: true,
    //     confirmButtonText: "確定",
    //     cancelButtonText: "取消",
    //     animation: false,

    // }).then(( result ) => {});  
      

    // });
     $( "#newActivity" ).click( function()
    {
        window.location.href = "./newCalender.html";
    });

    
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
    cmd["type"]="calendar";

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     console.log(dataDB);
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
            //let activity= dataDB.data;
            activity=[{"title":"test","startTime":"2020-02-05T12:00:00","endTime":"2020-04-05T15:00:00","text":"text"},
                     {"title":"test22","startTime":"2020-02-10T14:00:00","endTime":"2020-04-05T16:00:00","text":"text"}];
            if( $.isEmptyObject(activity) ) {
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

                eventClick: function(info) {
                    let thisActivity = Object.keys( activity ).find( ( key ) => 
                    {
                        return activity[ key ].id == info.event.id;
                    });

                    let startT=info.event.startStr.split(/[\T\+]/);
                    let endT=info.event.startStr.split(/[\T\+]/);

                    swal({
                            title: "<cite>"+info.event.title+ "</cite><br />" +
                            "<small>開始時間:"+startT[0]+"&emsp;"+startT[1]+"<br\>"+
                            "結束時間:"+endT[0]+"&emsp;"+endT[1]+"<br\>"+
                            "內容:"+activity[thisActivity].text+"<\small>",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonText: "確定",
                            cancelButtonText: "取消",
                            animation: false,
                        }).then(( result ) => {});  

                    info.el.style.borderColor = 'red';
                }
            });
        

        for( let i in activity ) {
            calendar.addEvent({
                id:activity[i].id,
                title : activity[i].title, 
                start : activity[i].startTime ,
                end :activity[i].endTime,
                eventContent:activity[i].text
            }); 
        }
        calendar.render();
        resolve(0); 
      } 
    //});
    
}
 
// function checkPermission( resolve, reject )
// {
//     if( !thisAccount )
//     {
//         swal({
//             title: "載入頁面失敗",
//             type: "error",
//             text: "您沒有權限瀏覽此頁面",
//             confirmButtonText: "確定",
            
//         }).then(( result ) => {
//             $( ".tabContent" ).empty();
//             let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
//             $( ".tabContent" ).append( httpStatus );

//         }, ( dismiss ) => {
//             $( ".tabContent" ).empty();
//             let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
//             $( ".tabContent" ).append( httpStatus );
//         });

//         reject(1);

//         return;
//     }

//     let cmd = {};
//     cmd[ "act" ] = "showUncheckCanlenderList";
//     cmd[ "account" ] = thisAccount;

//     $.post( "../index.php", cmd, function( dataDB )
//     {
//         dataDB = JSON.parse( dataDB );

//         if( dataDB.status == false )
//         {
//             swal({
//                 title: "載入頁面失敗",
//                 type: "error",
//                 text: dataDB.errorCode,
//                 confirmButtonText: "確定",
    
//             }).then(( result ) => {
//                 $( ".tabContent" ).empty();
//                 let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
//                 $( ".tabContent" ).append( httpStatus );
    
//             }, ( dismiss ) => {
//                 $( ".tabContent" ).empty();
//                 let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
//                 $( ".tabContent" ).append( httpStatus );
//             });
            
//             reject(1);
//         }
//         else if( dataDB.data.boardName == undefined )
//         {
//             swal({
//                 title: "載入頁面失敗",
//                 type: "error",
//                 text: "您沒有權限瀏覽此頁面",
//                 confirmButtonText: "確定",
                
//             }).then(( result ) => {
//                 $( ".tabContent" ).empty();
//                 let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
//                 $( ".tabContent" ).append( httpStatus );
    
//             }, ( dismiss ) => {
//                 $( ".tabContent" ).empty();
//                 let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
//                 $( ".tabContent" ).append( httpStatus );
//             });
    
//             reject(1);
//         }
    
//         resolve(0);
//     });
// }

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}