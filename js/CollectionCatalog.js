//CollectionCatalog
var CollectionCatalog = [];
var values=[];
var dirNames = ["漫威宇宙", "衣服買起來", "必去", "好好吃", "55", "22", "COOL", "YA" ];
var dirIDss = [ "1", "2", "3", "4", "5", "6", "7", "8" ];
$( document ).ready( function() 
{
    CollectionCataloginitial();
    $("#CollectionCatalog button").on( "click", function(){
        let dirIndex = $("div .Page").index(this.closest(".Page"));
        console.log(dirIndex)
        if( $(this).text().trim() == "edit")
        {
            
            let cmd = {};
            cmd["act"] = "removeKeepArticle";
            cmd["account"] = sessionStorage.getItem("Helen-userID");
            cmd["articleID"] = CollectionCatalog[dirIndex].dirID;
            //console.log(cmd["articleID"])
            cmd["dirName"] = //還沒做;
            console.log($(this));
            

            // $.post( "../index.php", cmd, function( dataDB ){
            //     dataDB = JSON.parse( dataDB );
            console.log("edit")
            swal({
                title: "確定要修改此篇文章嗎？"
                //  + articles[ articleIndex ].title
                ,
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

                }).then(( result ) => {
        

                    if ( result ) 
                    {
                        
                        
                        // if( status == false )
                        // {
                        //     swal({
                        //         title: "移除失敗<br /><small>&lt;"
                        //         //  + CollectionCatalog[ dirIndex ].title
                        //           + "&gt;</small>",
                        //         type: "error",
                        //         // text: dataDB.errorCode,
                        //         animation: false
                        //     });
                        // }
                        // else
                        // {
                            swal({
                                title: "已成功修改收藏文章！<br /><small>&lt;"
                                + CollectionCatalog[ dirIndex ].title
                                + "&gt;</small>",
                                type: "success",
                            })
                            console.log($(this).parents('.Page').find("span").text());
                            

                        // }
                                }
                            }, function( dismiss ) {
                                if ( dismiss === 'cancel' );
                            });
            }
         //});

                if( $(this).text().trim() == "delete")
                {
                    let cmd = {};
                    cmd["act"] = "deleteDir";
                    cmd["account"] = sessionStorage.getItem("Helen-userID");
                    cmd["dirName"] = $(this).parents('.Page').find("span").text();
                    cmd["articleID"] = CollectionCatalog[dirIndex].dirID;

                    //console.log(cmd["dirName"]);
                    
            
                    // $.post( "../index.php", cmd, function( dataDB ){
                    //     dataDB = JSON.parse( dataDB );
                    console.log("delete")
                    swal({
                        title: "確定要刪除此篇文章嗎？<br /><small>&lt;"
                        + CollectionCatalog[ dirIndex ].title
                        + "&gt;</small>",
                        showCancelButton: true,
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",
                        animation: false

                        }).then(( result ) => {
                            if ( result ) 
                            {
                                // if( status == false )
                                // {
                                //     swal({
                                //         title: "移除失敗<br /><small>&lt;"
                                //         //  + CollectionCatalog[ dirIndex ].title
                                //           + "&gt;</small>",
                                //         type: "error",
                                //         // text: dataDB.errorCode,
                                //         animation: false
                                //     });
                                // }
                                // else
                                // {
                                    swal({
                                        title: "已成功移除收藏文章！<br /><small>&lt;"
                                        + CollectionCatalog[ dirIndex ].title
                                        + "&gt;</small>",
                                        type: "success",
                                    }).then(( result ) => {
                                        if ( result ) 
                                        {
                                            $(this).parents('.Page').remove();
                                            location.reload();//重整
                                        }
                                    });

                                // }
                                        }
                                    }, function( dismiss ) {
                                        if ( dismiss === 'cancel' );
                                    });
                    }
                // });
            
                

                if( $(this).text().trim() == "more")
                {
                    console.log("MORE")
            
                    // $.post( "../index.php", cmd, function( dataDB ) 
                    // {
                    //     dataDB = JSON.parse( dataDB );
            
                    //     if( dataDB.status == true )
                    //     {
                    //         swal({
                        //     title: '歡迎',
                        //     type: 'info',
                        //     text: '本訊息1秒後自動關閉',
                        //     width: 400,
                        //     showConfirmButton: false,
                        //     timer: 1000,
                        //     }).then(
                        //         function () { },
                        //         function (dismiss) {
                        //             if (dismiss === 'timer') {
                        //                 sessionStorage.setItem("Helen-act", "newCollectionCatalog");
                        //                 sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
                        //                 window.location.href = "../html/sub.html";
                        //             }
                        //         }
                        //     )
                        // }
                        // else{
                        //     swal({
                        //         title: "傳送失敗<br /><small>&lt;" ,
                        //         type: "error",
                        //         text: "dataDB.errorCode"
                        //     });

                    // }
                    // });
            
                    let status = true;
                    if( status == true )
                    {
                        
                        swal({
                        title: '歡迎',
                        type: 'info',
                        text: '本訊息1秒後自動關閉',
                        width: 400,
                        showConfirmButton: false,
                        timer: 1000,
                        }).then(
                            function () { },
                            function (dismiss) {
                                if (dismiss === 'timer') {
                                    sessionStorage.setItem("Helen-act", "showArticleInDir");
                                    sessionStorage.setItem("Helen-dirID", CollectionCatalog[dirIndex].dirID);
                                    sessionStorage.setItem("Helen-dirName", CollectionCatalog[dirIndex].title);
                                    console.log(dirIndex)
                                    window.location.href = "../html/sub.html";
                                }
                            }
                        )
                    }
                    else{
                        swal({
                            title: "傳送失敗<br /><small>&lt;" ,
                            type: "error",
                            text: "dataDB.errorCode"
                        });

                    }
                }
                if( $(this).text().trim() == "getValues")
                {
                    alert("你擁有的收藏目錄:  "+values);
                }
                if( $(this).text().trim() == "+ Add")
                {
                    
                        
                    
                        // let cmd = {};
                        // cmd[ "act" ] = "newDir";
                        // cmd[ "account" ] = sessionStorage().getItem("Helen-UserID")
                        //等等我想想看 //cmd[ "dirIDs"] = dirIDs[ CollectionCatalog.indexOf( $(this).closest( "td" ).prev().find( "select" ).val() )];
                        // cmd[ "dirNames" ] = $('#input2').val();

                        //console.log( cmd["articleID"] );
                
                        // $.post( "../index.php", cmd, function( dataDB ) 
                        // {
                        //     dataDB = JSON.parse( dataDB );
                
                        //     if( dataDB.status == false )
                                // {
                                //     swal({
                                //         title: "新增收藏目錄失敗<br /><small>&lt;",
                                //         type: "error",
                                //         text: "dataDB.errorCode"
                                //     });
                                // }
                                // else
                                // {
                                //     var value = $('#input2').val();
                                //             console.log(value)
                                //             // if(value==/\s+/g){
                                //             //     alert("465")
                                //             // }
                                //             if(value!="")
                                //             {
                                                
                                //                 if(values.includes(value)==false)
                                //                 {
                                //                     values.push(value); 
                                //                     swal({
                                //                         title: "增加收藏成功" ,
                                //                         type: "success"

                                //                     }).then(( result ) => {
                                //                         if ( result ) 
                                //                         {
                                //                             location.reload();
                                //                         }
                                //                     });
                                                    
                                //                 }
                                //                 else{
                                //                     swal({
                                //                         title: "收藏目錄已存在",
                                //                         type: "error",
                                //                         text: ":)",
                                //                     });
                                //                 }
                                //     }
                                //     else{
                                //         swal({
                                //             title: "請輸入收藏目錄名稱",
                                //             type: "error",
                                //             text: ":)",
                                //         });
                                //     }

                                // }
                        // });
                
                        let status = true;
                        if( status == false )
                        {
                            swal({
                                title: "新增收藏目錄失敗<br /><small>&lt;",
                                type: "error",
                                text: "dataDB.errorCode"
                            });
                        }
                        else
                        {
                            var value = $('#input2').val();
                                    console.log(value)
                                    // if(value==/\s+/g){
                                    //     alert("465")
                                    // }
                                    if(value!="")
                                    {
                                        
                                        if(values.includes(value)==false)
                                        {
                                            values.push(value); 
                                            swal({
                                                title: "增加收藏成功" ,
                                                type: "success"

                                            }).then(( result ) => {
                                                if ( result ) 
                                                {
                                                    location.reload();
                                                }
                                            });
                                            
                                        }
                                        else{
                                            swal({
                                                title: "收藏目錄已存在",
                                                type: "error",
                                                text: ":)",
                                            });
                                        }
                            }
                            else{
                                swal({
                                    title: "請輸入收藏目錄名稱",
                                    type: "error",
                                    text: ":)",
                                });
                            }

                        }
                    
            
                }
            });
            
});
function CollectionCataloginitial()
{
    
    
    // let isValid = checkPermission();
    // if( !isValid ) return;
    let cmd = {};
	cmd["act"] = "showDirList";
    // dirIDs = sessionStorage.getItem( "Helen-boardIDs" );
    // dirIDs = JSON.parse( dirIDs );
    // dirNames = sessionStorage.getItem( "Helen-dirNames" );
    // dirNames = JSON.parse( dirNames );

    // $.post( "../index.php", cmd, function( dataDB )
    // {   
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         swal({
    //             title: "載入頁面失敗",
    //             type: "error",
    //             text: dataDB.errorCode
    //         })
    //     }
    //     else
    //     {
                // CollectionCatalog=dataDB.data;
                // for( let i in dataDB.data )
                // {
                //     values.push(dataDB.data[i].title)
                //     const div = document.createElement('div');
                //     console.log(i)          
                //     div.classList.add('Page');
                    
                //     div.innerHTML = `
                
                //     <div class="PageName">
                //             <button class="edit" >edit</button>
                
                        
                //                 <div class="value"> 
                                
                                    
                                    
                //                     <span class="currency" id="cjgtxt">`+ dataDB.data[i].title+ `</span>
                                        
                //                 </div>
                            
                //             <ul class="deals">
                //                 <li>:):)
                                
                //                 <li><button class="delete">delete</button></li>
                //                 <li><button class="more">more</button></li>
                //                 </ul>
                //             </div>
                        
                        
                // `;
                
                //     document.querySelector('.row').appendChild(div)
                // }
    //     }
    // });

    // let content = $( "#CollectionCatalog dir " );
    // content.empty();
    // content.append(":)")
    // console.log(content)
    
    let dataDB = {};
    dataDB[ "data" ] = [ { "title": "漫威宇宙","dirID":"0"}, 
                            { "title": "衣服買起來","dirID":"02"},
                            { "title": "最愛 : )","dirID":"03"} ];

    
    CollectionCatalog=dataDB.data;
    // if( empty )
    // {
    //     let emptyMessage = "<tr>" + 
    //                             "<td colspan='4'>目前沒有收藏文章</td>" +
    //                         "</tr>";
    //     content.append( emptyMessage );
    // }
    for( let i in dataDB.data )
    {
        values.push(dataDB.data[i].title)
        const div = document.createElement('div');
        console.log(i)          
        div.classList.add('Page');
        
        div.innerHTML = `
      
        <div class="PageName">
                <button class="edit" >edit</button>
       
            
                    <div class="value"> 
                    
                        
                        
                        <span class="currency" id="cjgtxt">`+ dataDB.data[i].title+ `</span>
                            
                    </div>
                
                <ul class="deals">
                    <li>:):)
                    
                    <li><button class="delete">delete</button></li>
                    <li><button class="more">more</button></li>
                    </ul>
                </div>
            
            
    `;
    
        document.querySelector('.row').appendChild(div)
    }
    
    
}

function checkPermission()
{
    // let perm = sessionStorage.getItem( "Helen-permission" );
    // console.log( perm );

    // if( perm ) return ( perm.valueOf() >= 3 ); 
    // else return false;

    return true;
}





function arrayRemove(arr, value) { 
    
return arr.filter(function(ele){ 
    return ele != value; 
});
}   
function funName1(id) {
$("#chgtxt").text($("#txt1").val());
}