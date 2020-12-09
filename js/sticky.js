var articles = [{ "title": "海大附近有甚麼推薦的美食嗎？", "articleID": "123", "like": 1111, "keep": 2222 }, 
                { "title": "學餐評價", "articleID": "456", "like": 1000, "keep": 2188 }];

var thisBoardName = sessionStorage.getItem( "boardName" );

$( document ).ready( function()
{
    initial();

    $( ".topnav a" ).click( function()
    {
        $( ".topnav a" ).removeClass( "active" );
        $( this ).addClass( "active" );
        $( ".contentArea h3" ).html( $(this).text() );
        // initial();
    });

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
                let topArticleName = $( ".card" ).has( ".glyphicon-pushpin.top" ).find( ".articleTitle" ).eq( 0 ).text();

                let cmd = {};
                cmd[ "act" ] = "editBoard";
                cmd[ "boardID" ] = sessionStorage.getItem( "boardID" );
                cmd[ "boardName" ] = sessionStorage.getItem( "boardName" );
                cmd[ "account" ] = sessionStorage.getItem( "account" );
                cmd[ "rule" ] = result;
                cmd[ "topArticleID" ] = articles.find( oneArticle => oneArticle.title == topArticleName ).articleID;

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
                //             timer: 800,
                //         });

                //         $( "#rule" ).html( "版規：" + result.split("\n").join("<br/>") );
                //     }
                // });

                swal({
                    title: "已成功修改版規",
                    type: "success",
                    timer: 800,
                });

                if ( result ) 
                {
                    $( "#rule" ).html( "版規：" + escapeHtml(result).split("\n").join("<br/>") );
                }
                else
                {
                    $( "#rule" ).html( "版規： 無");
                }

            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
        });
    });

    $( ".glyphicon-pushpin" ).click( function()
    {
        var tempTr = this.closest( "tr" );
        var tempTbody = this.closest( "tbody" );

        let status = true;
        if( status == false )
        {
            swal({
                title: "置頂失敗",
                type: "error",
                text: "dataDB.errorCode"

            }).then(( result ) => {}
            , function( dismiss )
            {
                if( dismiss === "cancel" );
            });
        }
        else
        {
            swal({
                title: "已成功置頂<br/><small>&lt;" + $( ".articleTitle", tempTr ).text() + "&gt;<small>",
                type: "success",
                timer: 800,
    
            }).then((result) => 
            {
                $( ".glyphicon-pushpin" ).removeClass( "top" );
                $( this ).addClass( "top" );

                tempTr.remove();
                tempTbody.prepend( tempTr );
            }
            , function( dismiss )
            {
                if( dismiss === 'cancel' );
            });
        }
        
        // let cmd = {};
        // cmd[ "act" ] = "TopArticleChange";
        // cmd[ "account" ] = sessionStorage.getItem( "account" );
        // cmd[ "articleID" ] = articles.find( (element) => element.title == title ).articleID;
        // cmd[ "boardName" ] = thisBoardName;

        // $.post( "../index.php", cmd, function( dateDB )
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "置頂失敗",
        //             type: "error",
        //             text: dataDB.errorCode

        //         }).then(( result ) => 
        //         {
        //             let tempTr = this.closest( "tr" );
        //             let tempTbody = this.closest( "tbody" );

        //             tempTr.remove();
        //             tempTbody.prepend( tempTr );
        //         }
        //         , function( dismiss )
        //         {
        //             if( dismiss === "cancel" );
        //         });
        //     }
        //     else
        //     {
        //         swal({
        //             title: "已成功置頂<br/><small>&lt;" + $( ".articleTitle", tempTr ).text() + "&gt;<small>",
        //             type: "success",
        //             timer: 800,
        
        //         }).then((result) => {}
        //         , function( dismiss )
        //         {
        //             if( dismiss === 'cancel' );
        //         });
        //     }
        // });
    });

    $( "button" ).has( ".glyphicon-heart" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        // let cmd = {};
        // cmd[ "act" ] = "heart";
        // cmd[ "accout" ] = sessionStorage.getItem( "account" );
        // cmd[ "articleID" ] = thisArticle.articleID;

        // $.post( "../index.php", cmd, function( dataDB )
        // {
        //     dataDB = JSON.parse( dataDB );

        //     if( dataDB.status == false )
        //     {
        //         swal({
        //             title: "錯誤！",
        //             type: "error",
        //             text: "dataDB.errorCode"
        
        //         }).then((result) => {}
        //         , function( dismiss )
        //         {
        //             if( dismiss === 'cancel' );
        //         });
        //     }
        //     else
        //     {
        //         if( $( chosen ).hasClass( "text-danger" ) )
        //         {
        //             $( chosen ).removeClass( "text-danger" );
        //             $( chosen ).addClass( "text-light" );
        //             $( this ).addClass( "btn-danger" );
                    
        //             thisArticle.like = parseInt(thisArticle.like) + 1;
        //         }
        //         else
        //         {
        //             $( this ).removeClass( "btn-danger" );
        //             $( chosen ).addClass( "text-danger" );
        //             $( chosen ).removeClass( "text-light" );

        //             thisArticle.like = parseInt(thisArticle.like) - 1;
        //         }

        //         $( chosen ).eq(1).html( thisArticle.like );
        //     }
        // });

        if( $( chosen ).hasClass( "text-danger" ) )
        {
            $( chosen ).removeClass( "text-danger" );
            $( chosen ).addClass( "text-light" );
            $( this ).addClass( "btn-danger" );
            
            thisArticle.like = parseInt(thisArticle.like) + 1;
        }
        else
        {
            $( this ).removeClass( "btn-danger" );
            $( chosen ).addClass( "text-danger" );
            $( chosen ).removeClass( "text-light" );

            thisArticle.like = parseInt(thisArticle.like) - 1;
        }

        $( chosen ).eq(1).html( thisArticle.like );
    });

    $( "button" ).has( ".glyphicon-star" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        // let keepMenu = getKeepMenu();
        let keepMenu = ["最愛", "漫威", "小說"];
        let chooseKeepMenu = "";

        
        if( $( chosen ).hasClass( "text-warning" ) )
        {
            swal({
                title: "選擇收藏目錄",
                input: 'select',
                inputOptions: keepMenu,
                showCancelButton: true,

            }).then((result) => {

                let cmd = {};
                cmd[ "act" ] = "keep";
                cmd[ "accout" ] = sessionStorage.getItem( "account" );
                cmd[ "articleID" ] = thisArticle.articleID;
                cmd[ "dirName" ] = keepMenu[result];

                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        swal({
                            title: "錯誤！",
                            type: "error",
                            text: "dataDB.errorCode"
                
                        }).then((result) => {}
                        , function( dismiss )
                        {
                            if( dismiss === 'cancel' );
                        });
                    }
                    else
                    {
                        swal({
                            title: "收藏成功<br/><small>&lt;" + keepMenu[result] + "&gt;</small>",
                            type: "success",
                            timer: 800,

                        }).then((result) => {
                        }, function( dismiss )
                        {
                            if ( dismiss === 'cancel' );
                        });
                        
                        if( $( chosen ).hasClass( "text-warning" ) )
                        {
                            $( chosen ).removeClass( "text-warning" );
                            $( chosen ).addClass( "text-light" );
                            $( this ).addClass( "btn-warning" );

                            thisArticle.keep = parseInt(thisArticle.keep) + 1;
                        }
                        else
                        {
                            $( this ).removeClass( "btn-warning" );
                            $( chosen ).addClass( "text-warning" );
                            $( chosen ).removeClass( "text-light" );

                            thisArticle.keep = parseInt(thisArticle.keep) - 1;
                        }

                        $( chosen ).eq(1).html( thisArticle.keep );
                    }
                });

            }, function( dismiss )
            {
                if ( dismiss === 'cancel' );
            });
        }

        
        
        if( $( chosen ).hasClass( "text-warning" ) )
        {
            $( chosen ).removeClass( "text-warning" );
            $( chosen ).addClass( "text-light" );
            $( this ).addClass( "btn-warning" );

            thisArticle.keep = parseInt(thisArticle.keep) + 1;
        }
        else
        {
            $( this ).removeClass( "btn-warning" );
            $( chosen ).addClass( "text-warning" );
            $( chosen ).removeClass( "text-light" );

            thisArticle.keep = parseInt(thisArticle.keep) - 1;
        }

        $( chosen ).eq(1).html( thisArticle.keep );
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
    $( ".tabContent h2" ).html( 
        thisBoardName + "版" + 
            "<button style='float:right' type='button' class='btn btn-default btn-lg'>" +
                "<span class='glyphicon glyphicon-pencil'> 編輯</span>" +
            "</button>" 
    );
    $( ".tabContent h3" ).html( "熱門" );

    let status = true;

    if( status == false )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "dataDB.errorCode"
            
        }).then((result) => {}
        , function( dismiss )
        {
            if( dismiss === 'cancel' );
        });
    }
    else
    {
        let rule = "dataDB.data.rule\n123";
        var topArticleID = "123";

        $( "#rule" ).html( "版規：" + rule.split("\n").join("<br/>") );
        $( ".tabContent tbody" ).empty();

        for( let i in articles )
        {
            let oneRow = "<tr>" +
                            "<td>" +
                                "<div class='card'>" +
                                    "<div class='card-body row'>" +
                                        "<span class='glyphicon glyphicon-pushpin'></span>" +
                                        "<span class='col-md-2'></span>" +
                                        "<span class='col-md-6'>" +
                                            "<span class='articleTitle'>" + articles[i].title + "</span>" +
                                        "</span>" +
                                        "<span class='col-md-4'>" +
                                            "<button type='button' class='btn btn-secondary'>" +
                                                "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'> " 
                                                    + articles[i].like + "</span></button>" +
                                            "<button type='button' class='btn btn-secondary'>" +
                                                "<span class='glyphicon glyphicon-star text-warning'></span><span class='text-warning keep'> " +
                                                    + articles[i].keep + "</span></button>" +
                                        "</span>" +
                                    "</div>" +
                                "</div>" +
                            "</td>" +
                        "</tr>";

            $( ".tabContent tbody" ).append( oneRow );
        }
    }

    if( topArticleID != "" )
    {
        let topArticle = articles.find( (element) => element.articleID == topArticleID );

        if( topArticle !== undefined )
        {
            topArticle = topArticle.title;

            $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" ).find( ".glyphicon-pushpin").addClass( "top" );

            let tempTr = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" );
            let tempTbody = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( ".tabContent tbody" );

            tempTr.remove();
            tempTbody.prepend( tempTr );
        }
    }

    if( articles.length == 0 )
    {
        let isEmpty = "<tr>" +
                        "<td>" +
                            "文章列表為空";
                        "</td>" +
                    "</tr>";
        $( ".tabContent tbody" ).append( isEmpty );
    }

    let cmd = {};
    cmd[ "act" ] = "boardSort";
    cmd[ "boardName" ] = thisBoardName;
    cmd[ "sort" ] = ($( ".contentArea h3" ).text().trim() == "熱門") ? "hot" : "time";

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

        // if( dataDB.status == false )
        // {
        //     swal({
        //         title: "載入頁面失敗",
        //         type: "error",
        //         text: dataDB.errorCode
        //     }).then((result) => {}
        //     , function( dismiss )
        //     {
        //         if( dismiss === 'cancel' );
        //     });
        // }
    //     else
    //     {
    //         let rule = dataDB.data.rule;
    //         var topArticleID = dataDB.data.topArticleID;
    //         articles = dataDB.data.articleList;

    //         $( "#rule" ).html( "版規：" + rule.split("\n").join("<br/>") );

    //         $( ".tabContent tbody" ).empty();

    //         for( let i in articles )
    //         {
    //             let oneRow = "<tr>" +
    //                             "<td>" +
    //                                 "<div class='card'>" +
    //                                     "<div class='card-body row'>" +
    //                                         "<span class='glyphicon glyphicon-pushpin'></span>" +
    //                                         "<span class='col-md-2'></span>" +
    //                                         "<span class='col-md-6'>" +
    //                                             "<span class='articleTitle'>" + articleList[i].title + "</span>" +
    //                                         "</span>"
    //                                         "<span class='col-md-4'>" +
    //                                             "<button type='button' class='btn btn-secondary'>" +
    //                                                 "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'>" 
    //                                                     + articles.like + "</span></button>" +
    //                                             "<button type='button' class='btn btn-secondary'>" +
    //                                                 "<span class='glyphicon glyphicon-star text-warning'></span><span class='text-warning keep'>" +
    //                                                     + articles.keep + "</span></button>" +
    //                                         "</span>" +
    //                                     "</div>" +
    //                                 "</div>" +
    //                             "</td>" +
    //                         "</tr>";

    //             $( ".tabContent tbody" ).append( oneRow );
    //         }
    //     }

    //     if( topArticleID != "" )
    //     {
    //         let topArticle = articles.find( (element) => element.id == topArticleID );

    //         if( topArticle !== undefined )
    //         {
    //             topArticle = topArticle.title;

    //             $( "span.articleTitle:contains('" + topArticle + "')" ).closest( ".glyphicon-pushpin" ).addClass( "top" );
    
    //             let tempTr = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" );
    //             let tempTbody = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( ".tabContent tbody" );
    
    //             tempTr.remove();
    //             tempTbody.prepend( tempTr );
    //         }
    //     }

    //     if( articles.length == 0 )
    //     {
    //         let isEmpty = "<tr>" +
    //                         "<td>" +
    //                             "文章列表為空";
    //                         "</td>" +
    //                     "</tr>";
    //         $( ".tabContent tbody" ).append( isEmpty );
    //     }
    // });

    checkPermission();
}

function checkPermission()
{
    if( !sessionStorage.getItem( "account" ) )
    {
        $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
        $( ".glyphicon-pushpin" ).css( "visibility", "hidden" );
        $( ".glyphicon-pushpin.top" ).css( "visibility", "visible" );
        return;
    }

    let status = true;

    if( status == false )
    {
        $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
        $( ".glyphicon-pushpin" ).css( "visibility", "hidden" );
        $( ".glyphicon-pushpin.top" ).css( "visibility", "visible" );
    }
    else
    {
        permission = "2";
        color = "#000000";
        nickname = "haha";
        boardName = ["美食"];
        
        if( permission < 2 || boardName.indexOf( thisBoardName ) == -1 )
        {
            $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
            $( ".glyphicon-pushpin" ).css( "visibility", "hidden" );
            $( ".glyphicon-pushpin.top" ).css( "visibility", "visible" );
        }
    }

    // let cmd = {};
    // cmd[ "act" ] = "browseAuthority";
    // cmd[ "account" ] = sessionStorage.getItem( "account" );

    // let permission, color, nickname, boardName = [];

    // $.post( "../index.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
    //         $( ".glyphicon-pushpin" ).css( "visibility", "hidden" );
    //         $( ".glyphicon-pushpin.top" ).css( "visibility", "visible" );
    //     }
    //     else
    //     {
    //         permission = dataDB.data.permission;
    //         color = dataDB.data.color;
    //         nickname = dataDB.data.nickname;
    //         boardName = dataDB.data.boardName;
            
    //         if( boardName.indexOf( thisBoardName ) == -1 )
    //         {
    //             $( ".tabContent button" ).has( ".glyphicon-pencil" ).css( "visibility", "hidden" );
    //             $( ".glyphicon-pushpin" ).css( "visibility", "hidden" );
    //             $( ".glyphicon-pushpin.top" ).css( "visibility", "visible" );
    //         }
    //     }
    // });
}

function escapeHtml(str) {
    return $('<div/>').text(str).html();
}