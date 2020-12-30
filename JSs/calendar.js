var activity = {};
var thisAccount = sessionStorage.getItem( 'Helen-account' );

$( document ).ready(async function() 
{
    barInitial();
    await new Promise( ( resolve, reject ) => initial( resolve, reject ) );
    
     $( "#newActivity" ).click( function()
    {
        window.location.href = "./newCalender.html";
    });

    
});

function initial(resolve, reject)
{

    let cmd = {};
    cmd[ "act" ] = "showCalendar";
    cmd["type"]="calendar";

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
            let activity= dataDB.data;
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
                eventColor: '#378006',
                eventClick: function(info) {
                    let thisActivity = Object.keys( activity ).find( ( key ) => 
                    {
                        return activity[ key ].id == info.event.id;
                    });

                    let startT=info.event.startStr.split(/[\T\+]/);
                    let endT=info.event.startStr.split(/[\T\+]/);

                    swal({
                            title: "<cite>"+info.event.title+ "</cite>",
                            html:   "<table>"+
                                        "<tbody>"+
                                            "<tr>"+
                                                "<th>開始時間</th>"+
                                                "<td>"+startT[0]+
                                                "&emsp;"+startT[1]+"</td>"+
                                            "</tr>"+
                                            "<tr>"+
                                                "<th>結束時間</th>"+
                                                "<td>"+endT[0]+
                                                "&emsp;"+endT[1]+"</td>"+
                                            "</tr>"+
                                            "<tr>"+
                                                "<th colspan='2'>內容</th>"+
                                            "</tr>"+
                                            "<tr>"+
                                                "<td colspan='2'>"+activity[thisActivity].text+"</td>"+
                                            "</tr>"+
                                        "</tbody>"+
                                    "</table>",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonText: "確定",
                            cancelButtonText: "取消",
                            animation: false,
                        }).then(( result ) => {}, (dismiss) => {});  

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
    });
    
}
 

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}