$( document ).ready( function() 
{
    $( ".tabContent button.dropbtn" ).on( "click", function()
    {
        console.log( $( this ).text().trim() );
        console.log( $( this ).next()[0] );
        $( this ).next().toggle();
    });
});