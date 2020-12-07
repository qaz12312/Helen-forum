$( document ).ready( function()
{
    $( ".tabContent button" ).has( ".glyphicon-pencil" ).click( function ()
    {
        console.log( this );

        swal({
            title: "確定要取消檢舉此篇文章嗎？<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            animation: false

            }).then(( result ) => {
                if ( result ) 
                {
                    swal({
                        title: "已成功取消檢舉文章！<br /><small>&lt;" + articles[ thisArticle ].title + "&gt;</small>",
                        type: "success",
                    })
                    $(this).closest( "tr" ).remove();
                    articles.splice( thisArticle, 1 );

                    if( articles.length == 0 )
                    {
                        console.log( "a" );
                        let emptyMessage = "<tr>" + 
                                                "<td colspan='4'>檢舉文章列表為空</td>" +
                                            "</tr>";
                        $( ".tabContent tbody" ).append( emptyMessage );
                    }
                }
        }, function( dismiss ) {
            if ( dismiss === 'cancel' );
        });
    });
});