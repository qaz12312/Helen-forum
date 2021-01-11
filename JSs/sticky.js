var articles = [];
var thisAccount = sessionStorage.getItem( "Helen-account" );
var thisBoardName = sessionStorage.getItem( "Helen-boardName" );
var thisSearching = sessionStorage.getItem( "Helen-search" );
var thisSort = sessionStorage.getItem( "Helen-sort" );
var rule;
var topArticleID;
var keepMenu;
var isModerator;

$( document ).ready( async function()
{
    barInitial();
    await new Promise( ( resolve, reject ) => { initial( resolve, reject ); });

    $( ".topnav a" ).click( function()
    {
        $( ".topnav a" ).removeClass( "active" );
        $( this ).addClass( "active" );
        sessionStorage.setItem( "Helen-sort", $(this).text() );
        location.reload();
    });

    $( ".tabContent button" ).has( ".glyphicon-pencil" ).click( function ()
    {
        swal({
            title: "版規",
            input: "textarea",
            inputValue: rule,
            showCancelButton: true,
            confirmButtonText: "送出",
            cancelButtonText: "取消",
            animation: false

            }).then(( result ) => {
                let cmd = {};
                cmd[ "act" ] = "editBoard";
                cmd[ "account" ] = thisAccount;
                cmd[ "boardName" ] = thisBoardName;
                cmd[ "rule" ] = result;

                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        swal({
                            title: "修改版規失敗",
                            type: "error",
                            text: dataDB.errorCode,
                            confirmButtonText: "確定",
                            
                        }).then(( result ) => {}, ( dismiss ) => {} );
                    }
                    else
                    {
                        swal({
                            title: "已成功修改版規",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,
                
                        }).then(( result ) => {}, ( dismiss ) => {
                            if ( result ) 
                            {
                                rule = escapeHtml(result).split("\n").join("<br/>");
                                $( "#rule" ).html( "版規：" + rule );
                            }
                            else
                            {
                                rule = "無";
                                $( "#rule" ).html( "版規：" + rule );
                            }
                        });
                    }
                });

            }, ( dismiss ) => {} );
    });

    $( ".pushpinBtn" ).click( function()
    {
        if( !isModerator ) return;
        
        var tempTr = this.closest( "tr" );
        var tempTbody = this.closest( "tbody" );
        
        if( $( this ).hasClass( "top" ) )
        {
            swal({
                title: "確定要取消置頂這篇文章嗎?<br/><small>&lt;" + $( ".articleTitle", tempTr ).text() + "&gt;<small>",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,

            }).then(( result ) =>
            {
                let cmd = {};
                cmd[ "act" ] = "removeTopArticle";
                cmd[ "boardName" ] = thisBoardName;
    
                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );
        
                    if( dataDB.status == false )
                    {
                        swal({
                            title: "取消置頂失敗",
                            type: "error",
                            text: dataDB.errorCode,
                            confirmButtonText: "確定",
        
                        }).then(( result ) => {}, ( dismiss ) => {} );
                    }
                    else
                    {
                        swal({
                            title: "已取消置頂<br/><small>&lt;" + $( ".articleTitle", tempTr ).text() + "&gt;<small>",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,
                
                        }).then(( result ) => {}, ( dismiss ) =>
                        {
                            if( dismiss )
                            {
                                $( ".pushpinBtn" ).removeClass( "top" );
                            }
                        });
                    }
                });
            }, ( dismiss ) => {});
        }
        else
        {
            let cmd = {};
            cmd[ "act" ] = "editTopArticle";
            cmd[ "account" ] = thisAccount;
            cmd[ "articleID" ] = articles.find( (element) => element.title == $( ".articleTitle", tempTr ).text() ).articleID;
            cmd[ "boardName" ] = thisBoardName;
    
            $.post( "../index.php", cmd, function( dataDB )
            {
                dataDB = JSON.parse( dataDB );
    
                if( dataDB.status == false )
                {
                    swal({
                        title: "置頂失敗",
                        type: "error",
                        text: dataDB.errorCode,
                        confirmButtonText: "確定",
    
                    }).then(( result ) => {}, ( dismiss ) => {} );
                }
                else
                {
                    swal({
                        title: "已成功置頂<br/><small>&lt;" + $( ".articleTitle", tempTr ).text() + "&gt;<small>",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,
            
                    }).then(( result ) => {}, ( dismiss ) =>
                    {
                        if( dismiss )
                        {
                            $( ".pushpinBtn" ).removeClass( "top" );
                            $( ".pushpinBtn" , tempTr ).addClass( "top" );
    
                            tempTr.remove();
                            tempTbody.prepend( tempTr );
                        }
                    });
                }
            });
        }
    });

    $( ".articleTitle" ).parent().click( function() 
    {
        let thisArticleID = articles.find( (element) => element.title == $( ".articleTitle", this ).text() ).articleID;
        sessionStorage.setItem( "Helen-articleID", thisArticleID );
        sessionStorage.setItem( "Helen-sort", "熱門" );
        location.href =  "../HTMLs/post.html";
    });

    $( "button" ).has( ".glyphicon-heart" ).click( async function()
    {
        if( !thisAccount )
        {
            await swal({
                title: "錯誤",
                type: "error",
                text: "您尚未登入，不能按愛心哦",
                confirmButtonText: "確定",

            }).then( ( result ) => {}, ( dismiss ) => {});

            return;
        }

        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        let cmd = {};
        cmd[ "act" ] = "heart";
        cmd[ "account" ] = thisAccount;
        cmd[ "articleID" ] = thisArticle.articleID;

        $.post( "../index.php", cmd, function( dataDB )
        {
            dataDB = JSON.parse( dataDB );

            if( dataDB.status == false )
            {
                swal({
                    title: "錯誤！",
                    type: "error",
                    text: dataDB.errorCode,
        
                }).then(( result ) => {}, ( dismiss ) => {} );
            }
            else
            {
                if( $( chosen ).hasClass( "text-danger" ) )
                {
                    $( chosen ).removeClass( "text-danger" );
                    $( chosen ).addClass( "text-light" );
                    $( chosen ).closest( "button" ).removeClass( "btn-secondary" );
                    $( chosen ).closest( "button" ).addClass( "btn-danger" );
                    
                    thisArticle.like = parseInt(thisArticle.like) + 1;
                    $( chosen ).eq(1).html( " " + thisArticle.like );
                }
                else
                {
                    $( chosen ).removeClass( "text-light" );
                    $( chosen ).addClass( "text-danger" );
                    $( chosen ).closest( "button" ).removeClass( "btn-danger" );
                    $( chosen ).closest( "button" ).addClass( "btn-secondary" );

                    thisArticle.like = parseInt(thisArticle.like) - 1;
                    $( chosen ).eq(1).html( " " + thisArticle.like );
                }
            }
        });
    });

    $( "button" ).has( ".glyphicon-star" ).click( async function()
    {
        if( !thisAccount )
        {
            await swal({
                title: "錯誤",
                type: "error",
                text: "您尚未登入，不能按收藏哦",
                confirmButtonText: "確定",

            }).then( ( result ) => {}, ( dismiss ) => {});

            return;
        }

        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        if( keepMenu === undefined ) 
        {
            let result = await new Promise( (resolve, reject) => { getKeepMenu( resolve, reject ); });

            if( result === undefined )
                return;
            else
                keepMenu = result;
        }

        if( keepMenu.length == 0 )
        {
            swal({
                title: "警告",
                type: "warning",
                text: "沒有可用的收藏分類哦",
                showCancelButton: true,
                confirmButtonText: "\u002b 分類",
                cancelButtonText: "取消",

            }).then(( result ) => 
            {
                swal({
                    title: "新增收藏分類",
                    input: "text",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                    
                }).then( async ( result ) =>
                {
                    let dirName = result;

                    while( dirName == "" )
                    {
                        let dismissing = await swal({

                            title: "請輸入收藏分類名稱",
                            type: "warning",
                            input: "text",
                            showCancelButton: true,
                            confirmButtonText: "確定",
                            cancelButtonText: "取消",

                        }).then((result) =>
                        {
                            dirName = result;
                            return false

                        }, ( dismiss ) =>
                        {
                            return true;
                        });

                        if( dismissing ) break;
                    }

                    let cmd = {};
                    cmd[ "act" ] = "newDir";
                    cmd[ "account" ] = thisAccount;
                    cmd[ "dirName" ] = dirName;

                    $.post( "../index.php", cmd, function( dataDB )
                    {
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "新增收藏分類失敗",
                                type: "error",
                                text: dataDB.errorCode,
                                confirmButtonText: "確定",

                            }).then(( result ) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            keepMenu.push( dirName );
                        }
                    });

                }, ( dismiss ) => {});
                
            }, ( dismiss ) => {} );

            return;
        }

        if( $( chosen ).hasClass( "text-warning" ) )
        {
            swal({
                title: "選擇收藏分類",
                input: 'select',
                inputOptions: keepMenu,
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",

            }).then((result) => {

                let cmd = {};
                cmd[ "act" ] = "keep";
                cmd[ "account" ] = thisAccount;
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
                            text: dataDB.errorCode,
                
                        }).then(( result ) => {}, ( dismiss ) => {} );
                    }
                    else
                    {
                        swal({
                            title: "收藏成功<br/><small>&lt;" + keepMenu[result] + " &larr; " + thisArticle.title + "&gt;</small>",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,
                    
                        }).then(( result ) => {}, ( dismiss ) => {
                            $( chosen ).removeClass( "text-warning" );
                            $( chosen ).addClass( "text-light" );
                            $( chosen ).closest( "button" ).removeClass( "btn-secondary" );
                            $( chosen ).closest( "button" ).addClass( "btn-warning" );
    
                            thisArticle.keep = parseInt( thisArticle.keep ) + 1;
                            $( chosen ).eq(1).html( " " + thisArticle.keep );
                        });
                    }
                });

            }, ( dismiss ) => {});
        }
        else
        {
            let cmd = {};
            cmd[ "act" ] = "keep";
            cmd[ "account" ] = thisAccount;
            cmd[ "articleID" ] = thisArticle.articleID;
            cmd[ "dirName" ] = "";

            $.post( "../index.php", cmd, function( dataDB )
            {
                dataDB = JSON.parse( dataDB );

                if( dataDB.status == false )
                {
                    swal({
                        title: "錯誤！",
                        type: "error",
                        text: dataDB.errorCode,
            
                    }).then(( result ) => {}, ( dismiss ) => {} );
                }
                else
                {
                    $( chosen ).addClass( "text-warning" );
                    $( chosen ).removeClass( "text-light" );
                    $( chosen ).closest( "button" ).removeClass( "btn-warning" );
                    $( chosen ).closest( "button" ).addClass( "btn-secondary" );

                    thisArticle.keep = parseInt( thisArticle.keep ) - 1;
                    $( chosen ).eq(1).html( " " + thisArticle.keep );
                }
            });
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

async function initial( res, rej )
{
    if( !thisAccount ) thisAccount = "";
    if( !thisBoardName ) thisBoardName = "";

    if( thisSearching != null )
    {
        thisSearching = JSON.parse( thisSearching );
    }

    if( !thisSearching || (thisSearching.content.length == 0 && thisSearching.hashtag.length == 0) )
    {
        await new Promise( ( resolve, reject ) => forNormal( resolve, reject ) );
    }
    else
    {
        await new Promise( ( resolve, reject ) => forSearching( resolve, reject ) );
        sessionStorage.removeItem( "Helen-search" );
    }

    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) );

    res(0);
}

function forNormal( resolve, reject )
{
    let cmd = {};
    cmd[ "act" ] = "sortInBoard";
    cmd[ "account"] = thisAccount;
    cmd[ "boardName" ] = thisBoardName;
    cmd[ "sort" ] = ( thisSort == "熱門") ? "hot":  (( thisSort == "最新" ) ? "time" : (( thisSort == "留言" ) ? "comment" : "collect" ) );

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

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if ( dismiss )
                {
                    $( ".tabContent" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
                    $( ".tabContent" ).append( httpStatus );
                }
            });
        }
        else
        {
            rule = dataDB.data.rule;
            topArticleID = dataDB.data.topArticleID;
            articles = dataDB.data.articleList;

            $( ".tabContent h2" ).html( thisBoardName + "版" );
            $( ".tabContent h3" ).html( thisSort );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + thisSort + ")" ).addClass( "active" );

            if( !rule ) rule = "無";
            else rule = escapeHtml(rule).split("\n").join("<br/>");

            $( "#rule" ).html( "版規：" + rule );

            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                    "<div class='card'>" +
                                        "<div class='card-body row'>" +
                                            "<span class='col-md-2'></span>" + 
                                            "<span class='col-md-6' style='cursor: pointer;'>" +
                                                "<span class='articleTitle'>" + articles[i].title + "</span>" +
                                            "</span>" +
                                            "<span class='col-md-4'>";

                if( articles[i].hasLike == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-danger'>" +
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }

                if( articles[i].hasKeep == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-warning'>" +
                                    "<span class='glyphicon glyphicon-star text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-star text-warning'></span><span class='text-warning heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                                                
                oneRow += "</span></div></div></td></tr>";

                $( ".tabContent tbody" ).append( oneRow );
            }

            let topArticle = articles.find( (element) => element.articleID === topArticleID );

            if( topArticleID && topArticle !== undefined )
            {
                let tempTr = $( "span.articleTitle:contains('" + topArticle.title + "')" ).closest( "tr" );
                let tempTbody = $( "span.articleTitle:contains('" + topArticle.title + "')" ).closest( ".tabContent tbody" );

                tempTr.remove();
                tempTbody.prepend( tempTr );
            }
            else
            {
                topArticleID = null;
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
        }

        resolve(0);
    });
}

function forSearching( resolve, reject )
{
    let cmd = {};
    cmd[ "act" ] = "search";
    cmd[ "account"] = thisAccount;
    cmd[ "where" ] = ["board", thisBoardName];
    cmd[ "sort" ] = ( thisSort == "熱門") ? "hot":  (( thisSort == "最新" ) ? "time" : (( thisSort == "留言" ) ? "comment" : "collect" ) );
    if( thisSearching.content.length != 0 )
    {
        cmd[ "searchWord" ] = thisSearching.content;
        cmd[ "option" ] = "normal";
    }
    else
    {
        cmd[ "searchWord" ] = thisSearching.hashtag;
        cmd[ "option" ] = "hashTag";
    }

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );
        sessionStorage.removeItem( "Helen-search" );
        thisSearching = "";

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,
                confirmButtonText: "確定",

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if ( dismiss )
                {
                    $( ".tabContent" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
                    $( ".tabContent" ).append( httpStatus );
                }
            });
        }
        else
        {
            rule = dataDB.data.rule;
            topArticleID = dataDB.data.topArticleID;
            articles = dataDB.data.articleList;

            $( ".tabContent h2" ).html( thisBoardName + "版" );
            $( ".tabContent h3" ).html( thisSort );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + thisSort + ")" ).addClass( "active" );

            if( !rule ) rule = "無";
            else rule = escapeHtml(rule).split("\n").join("<br/>");

            $( "#rule" ).html( "版規：" + rule );

            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                    "<div class='card'>" +
                                        "<div class='card-body row'>" +
                                            "<span class='col-md-2'></span>" + 
                                            "<span class='col-md-6' style='cursor: pointer;'>" +
                                                "<span class='articleTitle'>" + articles[i].title + "</span>" +
                                            "</span>" +
                                            "<span class='col-md-4'>";

                if( articles[i].hasLike == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-danger'>" +
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }

                if( articles[i].hasKeep == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-warning'>" +
                                    "<span class='glyphicon glyphicon-star text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-star text-warning'></span><span class='text-warning heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                                                
                oneRow += "</span></div></div></td></tr>";

                $( ".tabContent tbody" ).append( oneRow );
            }

            let topArticle = articles.find( (element) => element.articleID === topArticleID );

            if( topArticleID && topArticle !== undefined )
            {
                let tempTr = $( "span.articleTitle:contains('" + topArticle.title + "')" ).closest( "tr" );
                let tempTbody = $( "span.articleTitle:contains('" + topArticle.title + "')" ).closest( ".tabContent tbody" );

                tempTr.remove();
                tempTbody.prepend( tempTr );
            }
            else
            {
                topArticleID = null;
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
        }

        resolve(0);
    });
}

function checkPermission( resolve, reject )
{
    isModerator = false;

    if( !thisAccount && topArticleID !== null && topArticleID !== undefined )
    {
        $( ".tabContent tbody tr" ).first().find( "td span" ).first().append( 
            "<button type='button' class='btn pushpinBtn top' style='cursor: default;'>" +
                "<span class='glyphicon glyphicon-pushpin'></span>" +
            "</button>"
        );

        resolve(0);
        return;
    }

    let cmd = {};
    cmd[ "act" ] = "showAuthority";
    cmd[ "account" ] = thisAccount;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == true && dataDB.data.boardName != undefined )
        {
            let boardName = dataDB.data.boardName;
            
            if( boardName.find( (element) => element.BoardName == thisBoardName ) != undefined )
            {
                $( ".tabContent h2" ).append( 
                    "<button style='float:right' type='button' class='btn btn-default btn-lg'>" +
                        "<span class='glyphicon glyphicon-pencil'> 編輯</span>" +
                    "</button>"
                );

                $( ".tabContent h2" ).prepend("&emsp;&emsp;");
    
                let Trs = $( ".tabContent tbody tr" ).find( "td span:first" ).append(
                    "<button type='button' class='btn pushpinBtn'>" +
                        "<span class='glyphicon glyphicon-pushpin'></span>" +
                    "</button>"
                );
    
                if( topArticleID !== null && topArticleID !== undefined )
                {
                    $( ".tabContent tbody tr" ).first().find( "button" ).first().replaceWith( 
                        "<button type='button' class='btn pushpinBtn top'>" +
                            "<span class='glyphicon glyphicon-pushpin'></span>" +
                        "</button>"
                    );
                }

                isModerator = true;
            }
            else if( topArticleID !== null && topArticleID !== undefined )
            {
                $( ".tabContent tbody tr" ).first().find( "td span" ).first().append( 
                    "<button type='button' class='btn pushpinBtn top' style='cursor: default;'>" +
                        "<span class='glyphicon glyphicon-pushpin'></span>" +
                    "</button>"
                );
            }
        }
        else if( topArticleID !== null && topArticleID !== undefined )
        {
            $( ".tabContent tbody tr" ).first().find( "td span" ).first().append( 
                "<button type='button' class='btn pushpinBtn top' style='cursor: default;'>" +
                    "<span class='glyphicon glyphicon-pushpin'></span>" +
                "</button>"
            );
        }

        resolve(0);
    });
}

function getKeepMenu( resolve, reject )
{
    // return ["最愛", "漫威", "小說"];

    let cmd = {};
    cmd[ "act" ] = "showDirList";
    cmd[ "account" ] = thisAccount;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false)
        {
            swal({
                title: "取得收藏資分類失敗",
                type: "error",
                text: dataDB.errorCode,
                confirmButtonText: "確定",

            }).then(( result ) => {
                if( result )
                    reject([]);

            }, ( dismiss ) => {
                if( dismiss )
                    reject([]);

            });
        }
        
        resolve(dataDB.data);
    });
}

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}