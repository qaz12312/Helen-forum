$( document ).ready( function() 
{
    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        console.log( $(this).text() );

        location.href =  "../html/post.html";
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        if( $(this).text().trim() == "刪除" )
        {
            console.log( "delete" );

            let cmd = {};
            cmd[ "Act" ] = "DeleteArticle";
            cmd[ "ArticleID" ] = "";

            // $.post( ".php", cmd, function( data ){
            //     data = JSON.parse( data );

            //     if( data.Status == false )
            //     {
            //         alert( data.ErrorCode );
            //     }
            //     else
            //     {
            //         alert( "已成功刪除此篇文章[ " + $(this).closest( "td" ).prev().text() + " ]" );
            //     }
            // });

            alert( "已成功刪除[ " + $(this).closest( "td" ).prev().text() + " ]" );
        }
        else if( $(this).text().trim() == "取消" )
        {
            console.log( "cancel" );

            alert( "已取消檢舉此文章[ " + $(this).closest( "td" ).prev().prev().text() + " ]" );
        }

        $(this).closest( "tr" ).remove();
    } );
});

