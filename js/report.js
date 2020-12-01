var articles = [];

$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        console.log( $(this).text() );

        location.href =  "../html/post.html" + "?id=" + articles[ $( ".tabContent tr" ).index( this.closest( "tr" ) ) ][ "ArticleID" ];
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        // console.log( $( ".tabContent tr" ).index( this.closest( "tr" ) ) );

        if( $(this).text().trim() == "刪除" )
        {
            console.log( "delete" );

            let cmd = {};
            cmd[ "Act" ] = "DeleteArticle";
            cmd[ "ArticleID" ] = articles[ $( ".tabContent tr" ).index( this.closest( "tr" ) ) ][ "ArticleID" ];

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

function initial()
{
    let cmd = {};
    cmd[ "Act" ] = "ReportPage";
    cmd[ "BoardName" ] = getUrlParameter( "BoardName" );

    // $.post( ".php", cmd, function( data )
    // {
    //     data = JSON.parse( data );

    //     if( data.status == false )
    //     {
    //         alert( data.ErrorCode );
    //     }
    //     else
    //     {
    //         let content = $( ".tabContent tbody" );
    //         content.empty();

    //         for( let i in data.data )
    //         {
    //             articles.push( data.data[i] );

    //             let oneRow = "<tr>" + 
    //                             "<td>" + data.data[i][ "Title" ] + "</td>" +
    //                             "<td>" +
    //                                 "<button type='button' class='btn'>" +
    //                                     "<span class='glyphicon glyphicon-trash'></span> 刪除" +
    //                                 "</button>" +
    //                             "</td>" +
    //                             "<td>" +
    //                                 "<button type='button' class='btn btn-default'>" +
    //                                     "<span class='glyphicon glyphicon-remove'></span> 取消" +
    //                                 "</button>" +
    //                             "</td>" +
    //                          "</tr>";

    //             content.append( oneRow );
    //         }
    //     }
    // } );

    let content = $( ".tabContent tbody" );
    content.empty();

    let data = {};
    data[ "data" ] = [ { "Title": "紅燈區" }, { "Title": "大一妹妹看起來很波霸哦"}, { "Title": "看我切開兔子的肚皮" } ];

    for( let i in data.data )
    {
        console.log( data.data[ i ] );
        articles.push( data.data[i] );

        let oneRow = "<tr>" + 
                        "<td>" + data.data[i][ "Title" ] + "</td>" +
                        "<td>" +
                            "<button type='button' class='btn'>" +
                                "<span class='glyphicon glyphicon-trash'></span> 刪除" +
                            "</button>" +
                        "</td>" +
                        "<td>" +
                            "<button type='button' class='btn btn-default'>" +
                                "<span class='glyphicon glyphicon-remove'></span> 取消" +
                            "</button>" +
                        "</td>" +
                     "</tr>";

        content.append( oneRow );
    }
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};