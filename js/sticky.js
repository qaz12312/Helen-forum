var articles = [{ "name": "海大附近有甚麼推薦的美食嗎？", "id": "123"}];
var thisBoardName = sessionStorage.getItem( "boardName" );

$( document ).ready( function()
{
    $( ".tabContent button" ).has( ".glyphicon-pencil" ).click( function ()
    {
        swal({
            title: "版規",
            input: "textarea",
            inputPlaceholder: "請輸入文字...",
            showCancelButton: true,
            confirmButtonText: "送出",
            cancelButtonText: "取消",
            animation: false

            }).then(( result ) => {
                if ( result ) 
                {
                    let topArticleName = $( ".card" ).has( ".glyphicon-pushpin.top" ).find( ".articleTitle" ).eq( 0 ).text();

                    let cmd = {};
                    cmd[ "act" ] = "editBoard";
                    cmd[ "boardID" ] = sessionStorage.getItem( "boardID" );
                    cmd[ "boardName" ] = sessionStorage.getItem( "boardName" );
                    cmd[ "account" ] = sessionStorage.getItem( "account" );
                    cmd[ "rule" ] = result;
                    cmd[ "topArticleID" ] = articles.find( oneArticle => oneArticle.name == topArticleName ).id;

                    // $.post( "../index.php", cmd, function( dataDB )
                    // {
                    //     dataDB = JSON.parse( dataDB );

                    //     if( dataDB.status == false )
                    //     {
                    //         swal({
                    //             title: "修改版規失敗",
                    //             type: "error",
                    //             text: dataDB.errorCode
                    //         });
                    //     }
                    //     else
                    //     {
                    //         swal({
                    //             title: "已成功修改版規",
                    //             type: "success",
                    //         });

                    //         $( "#rule" ).html( "版規：" + result.split("\n").join("<br/>") );
                    //     }
                    // });

                    swal({
                        title: "已成功修改版規",
                        type: "success",
                    });

                    $( "#rule" ).html( "版規：" + result.split("\n").join("<br/>") );
                }

            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
        });
    });

    $( ".glyphicon-pushpin" ).click( function()
    {
        $( ".glyphicon-pushpin" ).removeClass( "top" );
        $( this ).addClass( "top" );

        let tempThis = this.closest( "tr" );
        let tempTbody = this.closest( "tbody" );

        tempThis.remove();
        tempTbody.prepend( tempThis );

        swal({
            title: "已成功置頂<br/><small>&lt;" + $( ".articleTitle", tempThis ).text() + "&gt;<small>",
            type: "success",
        });
    });

    $( "button" ).has( ".glyphicon-heart" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        
        if( $( chosen ).hasClass( "text-danger" ) )
        {
            $( chosen ).removeClass( "text-danger" );
            $( chosen ).addClass( "text-light" );
            $( this ).addClass( "btn-danger" );
        }
        else
        {
            $( this ).removeClass( "btn-danger" );
            $( chosen ).addClass( "text-danger" );
            $( chosen ).removeClass( "text-light" );
        }
    });

    $( "button" ).has( ".glyphicon-star" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        
        if( $( chosen ).hasClass( "text-warning" ) )
        {
            $( chosen ).removeClass( "text-warning" );
            $( chosen ).addClass( "text-light" );
            $( this ).addClass( "btn-warning" );
        }
        else
        {
            $( this ).removeClass( "btn-warning" );
            $( chosen ).addClass( "text-warning" );
            $( chosen ).removeClass( "text-light" );
        }
    });

    $('body').on('keydown','textarea', function(e)
    {
        if(e.which === 13)
        {
            e.preventDefault();
            var value = e.target.value;
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;

            if(start === end)
            {
                value = value.substring(0, start) + "\n" + value.substring(start, value.length);
            }
            else
            {
                value = value.substring(0, start) + "\n" + value.substring(end, value.length);
            }

            e.target.value = value;
        }

        return e.which !== 13;
    });
});

function initial()
{
    let cmd = {};
    cmd[ "act" ] = ""

    checkPermission();
}

function checkPermission()
{
    if( !sessionStorage.getItem( "account" ) )
    {
        $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
        return;
    }

    let cmd = {};
    cmd[ "act" ] = "browseAuthority";
    cmd[ "account" ] = sessionStorage.getItem( "account" );

    let permission, color, nickname, boardName = [];

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
        }
        else
        {
            permission = dataDB.data.permission;
            color = dataDB.data.color;
            nickname = dataDB.data.nickname;
            boardName = dataDB.data.boardName;
            
            if( permission < 2 || boardName.indexOf( thisBoardName ) == -1 )
            {
                $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
            }
        }
    });
}