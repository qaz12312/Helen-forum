// var articles = [{ "title": "海大附近有甚麼推薦的美食嗎？", "articleID": "123", "like": 1111, "keep": 2222 ,"boardName":"美食版", "hasLike": 1, "hasKeep": 0}, 
//                 { "title": "學餐評價", "articleID": "456", "like": 1000, "keep": 2188 ,"boardName":"詢問版", "hasLike": 1, "hasKeep": 0}];
var articles = [];
var thisAccount = sessionStorage.getItem( "Helen-account" );
var thisSearching = sessionStorage.getItem( "Helen-search" );
var thisSort = sessionStorage.getItem( "Helen-sort" );
var keepMenu;

$(document).ready(async function(){
    barInitial();
    // initial();
    console.log("start")
    await new Promise( ( resolve, reject ) => { initial( resolve, reject ); });

    $( ".topnav a" ).click( function()
    {
        $( ".topnav a" ).removeClass( "active" );
        $( this ).addClass( "active" );
        sessionStorage.setItem( "Helen-sort", $(this).text() );
        location.reload();
    });
  $('.addPost').click(function(){
    console.log("addPost")
    cmd={};
    cmd["account"] = sessionStorage.getItem("Helen-userID");
    window.location.href = "./publishArticle.html";
  });
  
  $( ".articleTitle" ).parent().click( function() 
  {
      let thisArticle = articles.find( (element) => element.title == $( ".articleTitle", this ).text() );
      sessionStorage.setItem( "Helen-articleID", thisArticle.articleID );
      location.href =  "./post.html";
  });

  $( "button" ).has( ".glyphicon-heart" ).click( function()
    {
        if( !thisAccount )
        {
            swal({
                title: "錯誤",
                type: "error",
                text: "您尚未登入，不能按愛心哦",

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
                    text: "dataDB.errorCode"
        
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
                    $( chosen ).eq(1).html( " " +thisArticle.like );
                }
                else
                {
                    $( chosen ).closest( "button" ).removeClass( "btn-danger" );
                    $( chosen ).closest( "button" ).addClass( "btn-secondary" );
                    $( chosen ).addClass( "text-danger" );
                    $( chosen ).removeClass( "text-light" );

                    thisArticle.like = parseInt(thisArticle.like) - 1;
                    $( chosen ).eq(1).html( " " +thisArticle.like );
                }
            }
        });

        // if( $( chosen ).hasClass( "text-danger" ) )
        // {
        //     $( chosen ).removeClass( "text-danger" );
        //     $( chosen ).addClass( "text-light" );
        //     $( this ).addClass( "btn-danger" );
            
        //     thisArticle.like = parseInt(thisArticle.like) + 1;
        //     $( chosen ).eq(1).html( thisArticle.like );
        // }
        // else
        // {
        //     $( this ).removeClass( "btn-danger" );
        //     $( chosen ).addClass( "text-danger" );
        //     $( chosen ).removeClass( "text-light" );

        //     thisArticle.like = parseInt(thisArticle.like) - 1;
        //     $( chosen ).eq(1).html( thisArticle.like );
        // }
    });

    $( "button" ).has( ".glyphicon-star" ).click( async function()
    {
        if( !thisAccount )
        {
            swal({
                title: "錯誤",
                type: "error",
                text: "您尚未登入，不能按收藏哦",

            }).then( ( result ) => {}, ( dismiss ) => {});

            return;
        }
        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );
        // getKeepMenu();
   
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
                            let cmd = {};
                            cmd[ "act" ] = "keep";
                            cmd[ "account" ] = thisAccount;
                            cmd[ "articleID" ] = thisArticle.articleID;
                            cmd[ "dirName" ] = keepMenu[result];
                            
                        }
                    });

                }, ( dismiss ) => {});
                
            }, ( dismiss ) => {} );

            return;
        }

       
        if( $( chosen ).hasClass( "text-warning" ) )
        {
            swal({
                title: "選擇收藏目錄",
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
                            title: "收藏成功<br/><small>&lt;" + keepMenu[result] + "&gt;</small>",
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
                    $( chosen ).closest( "button" ).removeClass( "btn-warning" );
                    $( chosen ).closest( "button" ).addClass( "btn-secondary" );
                    $( chosen ).addClass( "text-warning" );
                    $( chosen ).removeClass( "text-light" );

                    thisArticle.keep = parseInt( thisArticle.keep ) - 1;
                    $( chosen ).eq(1).html(" " + thisArticle.keep );
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

async function initial(res, rej)
{
    console.log("inital");
    
    if( !thisAccount ) thisAccount = "";

    if( !thisSearching )
    {
        await new Promise( (res, rej) => { forNormal(res, rej) });
        // forNormal();
    }
    else
    {
        thisSearching = JSON.parse( thisSearching );
        await new Promise( (res, rej) => { forSearching(res, rej) });
    }
    
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) );

    res(0);

}
function forNormal( res, rej )
{
    
    let cmd = {};
    cmd[ "act" ] = "sortInMenu";
    cmd[ "account"] = thisAccount;
    cmd[ "sort" ] = ( thisSort == "熱門") ? "hot":  (( thisSort == "最新" ) ? "time" : (( thisSort == "留言" ) ? "comment" : "collect" ) );
    $.post( "../index.php", cmd, function( dataDB )
    {
        console.log(dataDB)
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if ( dismiss )
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
        }
        else
        {
        
            articles = dataDB.data;

            $( ".tabContent h2" ).html(  "Home"  +"</br>"+
            "<button class='addPost' id='addPost'>+ 發文</button>"
            
            );
            $( ".tabContent h3" ).html( thisSort );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + thisSort + ")" ).addClass( "active" );
            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                    "<div class='card'>" +
                                        "<div class='card-body row'>" +
                                            "<span class='col-md-2'>" + 
                                                "<h5 style='background-color: orange; display:inline-block'>"+articles[i].boardName+"版</h5>"+
                                            "</span>" +
                                            "<span class='col-md-6'>" +
                                                "<span class='articleTitle'style='cursor:pointer'>" + articles[i].title + "</span>" +
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


        }

        res(0);
    });

    
    
}

function forSearching( res, rej)
{
    let cmd = {};
    cmd[ "act" ] = "searchBoard";
    cmd[ "account"] = thisAccount;
    cmd[ "sort" ] = ( thisSort == "熱門") ? "hot":  (( thisSort == "最新" ) ? "time" : (( thisSort == "留言" ) ? "comment" : "collect" ) );
    cmd[ "content" ] = thisSearching.content;
    cmd[ "hashtag" ] = thisSearching.hashtag;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );
        sessionStorage.setItem( "Helen-search", "" );
        thisSearching = "";

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if ( dismiss )
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
        }
        else
        {
            articles = dataDB.data.articleList;

            $( ".tabContent h2" ).html(  "Home"  +"</br>"+
            "<button class='addPost' id='addPost'>+ 發文</button>"
            
            );
            $( ".tabContent h3" ).html( thisSort );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + thisSort + ")" ).addClass( "active" );
            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                "<div class='card'>" +
                                    "<div class='card-body row'>" +
                                        "<span class='col-md-2'>" + 
                                            "<h5 style='background-color: orange; display:inline-block'>"+articles[i].boardName+"</h5>"+
                                        "</span>" +
                                        "<span class='col-md-6'>" +
                                            "<span class='articleTitle' style='cursor:pointer'>" + articles[i].title + "</span>" +
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


        }
        res(0);
    });
}

function checkPermission(res, rej)
{
    if( !thisAccount )
    {
        $( ".addPost" ).remove();
    }
    else{
        console.log("yes")
    }
    res(0);
}

  


function getKeepMenu(resolve,reject)
{
  // return ["最愛", "漫威", "小說"];

  let cmd = {};
  cmd[ "act" ] = "showDirList";
  cmd[ "account" ] = thisAccount;

  $.post( "../index.php", cmd, function( dataDB )
  {
      dataDB = JSON.parse( dataDB );
      console.log( dataDB );

      if( dataDB.status == false)
      {
          swal({
              title: "取得收藏資分類失敗",
              type: "error",
              text: dataDB.errorCode
          }).then(( result ) => {}, ( dismiss ) => {} );

          reject([]);
      }

    //   let menu = [];
    //   for( let i in dataDB.data )
    //   {
    //       menu.push( dataDB.data[i].DirName );
	// 	  console.log(dataDB.data[i]);
    //   }
	  
    //   resolve(menu);
      resolve(dataDB.data);
  });
  
}
