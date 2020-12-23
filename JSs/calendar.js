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
          title: 'Meeting',
          //url: 'http://google.com/',
          start: '2020-12-12',
          end: '2020-12-13'
        },
      ]
    });
  
    calendar.render();
    resolve(0);
}
 