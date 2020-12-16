var articles = [{ "title": "海大附近有甚麼推薦的美食嗎？", "articleID": "123", "like": 1111, "keep": 2222 ,"blockName":"美食版", "hasLike": 1, "hasKeep": 0}, 
                { "title": "學餐評價", "articleID": "456", "like": 1000, "keep": 2188 ,"blockName":"詢問版", "hasLike": 1, "hasKeep": 0}];
// var articles = [];
var thisAccount = sessionStorage.getItem( "Helen-account" );
var thisSearching = sessionStorage.getItem( "Helen-search" );
var thisBoardName = sessionStorage.getItem( "Helen-boardName" );
var keepMenu;
$(document).ready(function(){
    // barInitial();
  initial();
  
  $('.addPost').click(function(){
    console.log("addPost")
    cmd={};
    cmd["account"] = sessionStorage.getItem("Helen-userID");
    window.location.href = "../html/publishArticle.html";
  });
  $( ".topnav a" ).click( function()
  {
      $( ".topnav a" ).removeClass( "active" );
      $( this ).addClass( "active" );
      sessionStorage.setItem( "Helen-sort", $(this).text() );
      location.reload();
  });
  $( ".articleTitle" ).parent().click( function() 
  {
      let thisArticle = articles.find( (element) => element.title == $( ".articleTitle", this ).text() );
      sessionStorage.setItem( "Helen-articleID", thisArticle.articleID );
      location.href =  "../html/post.html";
  });

  $( "button" ).has( ".glyphicon-heart" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        let cmd = {};
        cmd[ "act" ] = "heart";
        cmd[ "accout" ] = thisAccount;
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
                    $( this ).addClass( "btn-danger" );
                    
                    thisArticle.like = parseInt(thisArticle.like) + 1;
                    $( chosen ).eq(1).html( thisArticle.like );
                }
                else
                {
                    $( this ).removeClass( "btn-danger" );
                    $( chosen ).addClass( "text-danger" );
                    $( chosen ).removeClass( "text-light" );

                    thisArticle.like = parseInt(thisArticle.like) - 1;
                    $( chosen ).eq(1).html( thisArticle.like );
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

    $( "button" ).has( ".glyphicon-star" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        if( keepMenu === undefined ) keepMenu = getKeepMenu();
        if( keepMenu.length == 0 )
        {
            swal({
                title: "錯誤",
                type: "error",
                text: "沒有可用的收藏分類哦",

            }).then(( result ) => {}, ( dismiss ) => {} );
        }

        // if( $( chosen ).hasClass( "text-warning" ) )
        // {
        //     swal({
        //         title: "選擇收藏目錄",
        //         input: 'select',
        //         inputOptions: keepMenu,
        //         showCancelButton: true,
        //         confirmButtonText: "確定",
        //         cancelButtonText: "取消",

        //     }).then((result) => {
        //         //
        //         let status = true;
        //         //
        //         if( status == false )
        //         {
        //             swal({
        //                 title: "錯誤！",
        //                 type: "error",
        //                 text: "dataDB.errorCode"
            
        //             }).then(( result ) => {}, ( dismiss ) => {} );
        //         }
        //         else
        //         {
        //             swal({
        //                 title: "收藏成功<br/><small>&lt;" + keepMenu[result] + "&gt;</small>",
        //                 type: "success",
        //                 showConfirmButton: false,
        //                 timer: 1000,
                
        //             }).then(( result ) => {}, ( dismiss ) => {
        //                 $( chosen ).removeClass( "text-warning" );
        //                 $( chosen ).addClass( "text-light" );
        //                 $( this ).addClass( "btn-warning" );

        //                 thisArticle.keep = parseInt( thisArticle.keep ) + 1;
        //                 $( chosen ).eq(1).html( thisArticle.keep );
        //             });
        //         }

        //     }, ( dismiss ) => {} );
        // }
        // else
        // {
        //     //
        //     let status = true;
        //     //
        //     if( status == false )
        //     {
        //         swal({
        //             title: "錯誤！",
        //             type: "error",
        //             text: "dataDB.errorCode",
        
        //         }).then(( result ) => {}, ( dismiss ) => {} );
        //     }
        //     else
        //     {
        //         $( this ).removeClass( "btn-warning" );
        //         $( chosen ).addClass( "text-warning" );
        //         $( chosen ).removeClass( "text-light" );

        //         thisArticle.keep = parseInt( thisArticle.keep ) - 1;
        //         $( chosen ).eq(1).html( thisArticle.keep );
        //     }
        // }
        
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
                cmd[ "accout" ] = thisAccount;
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
                            $( this ).addClass( "btn-warning" );
    
                            thisArticle.keep = parseInt( thisArticle.keep ) + 1;
                            $( chosen ).eq(1).html( thisArticle.keep );
                        });
                    }
                });

            }, ( dismiss ) => {});
        }
        else
        {
            let cmd = {};
            cmd[ "act" ] = "keep";
            cmd[ "accout" ] = thisAccount;
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
                    $( this ).removeClass( "btn-warning" );
                    $( chosen ).addClass( "text-warning" );
                    $( chosen ).removeClass( "text-light" );

                    thisArticle.keep = parseInt( thisArticle.keep ) - 1;
                    $( chosen ).eq(1).html( thisArticle.keep );
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

async function initial()
{
    console.log("inital")
    
    if( !thisAccount ) thisAccount = "";

    if( !thisSearching )
    {
        await new Promise( (res, rej) => { forNormal(res, rej) });
    }
    else
    {
        thisSearching = JSON.parse( thisSearching );
        await new Promise( (res, rej) => { forSearching(res, rej) });
    }
    console.log("inital")
    checkPermission();
    console.log("inital")
}
function forNormal(res, rej)
{
    let cmd = {};
    cmd[ "act" ] = "sortInMenu";
    cmd[ "account"] = thisAccount;
    cmd[ "boardName" ] = thisBoardName;
    cmd[ "sort" ] = ($( ".contentArea h3" ).text().trim() == "熱門") ? "hot" : "time";

    $.post( "../index.php", cmd, function( dataDB )
    {
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
        
            articles = dataDB.data.articleList;

            $( ".tabContent h2" ).html(  "Home"  +"</br>"+
            "<button class='addPost' id='addPost'>+ 發文</button>"
            
            );
            $( ".tabContent h3" ).html( sessionStorage.getItem( "Helen-sort" ) );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + sessionStorage.getItem( "Helen-sort" ) + ")" ).addClass( "active" );
            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                    "<div class='card'>" +
                                        "<div class='card-body row'>" +
                                            "<span class='col-md-2'>" + 
                                                "<h5 style='background-color: orange; display:inline-block'>"+articles[i].blockName+"</h5>"+
                                            "</span>" +
                                            "<span class='col-md-6'>" +
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
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-warning'></span><span class='text-warning heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                                                
                oneRow += "</span></div></div></td></tr>";

                $( ".tabContent tbody" ).append( oneRow );
            }


        }

        res(0);
    });

    // let status = true;
    // if( status == false )
    // {
    //     swal({
    //         title: "載入頁面失敗",
    //         type: "error",
    //         text: "dataDB.errorCode",

    //     }).then(( result ) => {}, ( dismiss ) =>
    //     {
    //         if ( dismiss )
    //         {
    //             $( "body" ).empty();
    //             let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
    //             $( "body" ).append( httpStatus );
    //         }
    //     });
    // }
    // else
    // {


        // $( ".tabContent h2" ).html(  "Home"  +"</br>"+
        // "<button class='addPost' id='addPost'>+ 發文</button>"
        
        // );
        // $( ".tabContent h3" ).html( sessionStorage.getItem( "Helen-sort" ) );
        // $( ".topnav a" ).removeClass( "active" );
        // $( ".topnav a:contains(" + sessionStorage.getItem( "Helen-sort" ) + ")" ).addClass( "active" );
        // $( ".tabContent tbody" ).empty();


    //     for( let i in articles )
    //     {
    //         let oneRow = "<tr>" +
                                // "<td>" +
                                // "<div class='card'>" +
                                //     "<div class='card-body row'>" +
                                //         "<span class='col-md-2'>" + 
                                //             "<h5 style='background-color: orange; display:inline-block'>"+articles[i].blockName+"</h5>"+
                                //         "</span>" +
                                //         "<span class='col-md-6'>" +
                                //             "<span class='articleTitle'>" + articles[i].title + "</span>" +
                                //         "</span>" +
    //                                     "<span class='col-md-4'>";

    //         if( articles[i].hasLike == 1 )
    //         {
    //             oneRow += "<button type='button' class='btn btn-danger'>" +
    //                             "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
    //                                 + articles[i].like + "</span></button>";
    //         }
    //         else
    //         {
    //             oneRow += "<button type='button' class='btn btn-secondary'>" +
    //                             "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'> " 
    //                                 + articles[i].like + "</span></button>";
    //         }

    //         if( articles[i].hasKeep == 1 )
    //         {
    //             oneRow += "<button type='button' class='btn btn-warning'>" +
    //                             "<span class='glyphicon glyphicon-star text-light'></span><span class='text-light heartaa'> " 
    //                                 + articles[i].like + "</span></button>";
    //         }
    //         else
    //         {
    //             oneRow += "<button type='button' class='btn btn-secondary'>" +
    //                             "<span class='glyphicon glyphicon-star text-warning'></span><span class='text-warning heartaa'> " 
    //                                 + articles[i].keep + "</span></button>";
    //         }
                                            
    //         oneRow += "</span></div></div></td></tr>";

    //         $( ".tabContent tbody" ).append( oneRow );
    //     }

    
}
function forSearching( res, rej)
{
    let cmd = {};
    cmd[ "act" ] = "searchBoard";
    cmd[ "account"] = thisAccount;
    cmd[ "searchBoard" ] = thisBoardName;
    cmd[ "sort" ] = ($( ".contentArea h3" ).text().trim() == "熱門") ? "hot" : "time";
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
            $( ".tabContent h3" ).html( sessionStorage.getItem( "Helen-sort" ) );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + sessionStorage.getItem( "Helen-sort" ) + ")" ).addClass( "active" );
            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                "<div class='card'>" +
                                    "<div class='card-body row'>" +
                                        "<span class='col-md-2'>" + 
                                            "<h5 style='background-color: orange; display:inline-block'>"+articles[i].blockName+"</h5>"+
                                        "</span>" +
                                        "<span class='col-md-6'>" +
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
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-warning'></span><span class='text-warning heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                                                
                oneRow += "</span></div></div></td></tr>";

                $( ".tabContent tbody" ).append( oneRow );
            }


        }
        res(0);
    });
}

function checkPermission()
{
    if( !thisAccount )
    {
        $( ".addPost" ).remove();;
        return ;
    }
    else{
        console.log("yes")
    }
        return ;
    


}

  


function getKeepMenu()
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
              text: dataDB.errorCode
          }).then(( result ) => {}, ( dismiss ) => {} );

          return [];
      }
      else
      {
          return dataDB.data;
      }
  });
}
