//CollectionCatalog
//267 cmd[ "dirIDs"]給什麼
var CollectionCatalog = [];
var values=[];
var dirNames = ["漫威宇宙", "1", "必去", "好好吃", "55", "22", "COOL", "YA" ];
var dirIDss = [ "1", "2", "3", "4", "5", "6", "7", "8" ];
$( document ).ready( function() 
{
    initial();
    
    $("#CollectionCatalog button").on( "click", function(){
        let dirIndex = $("div .Page").index(this.closest(".Page"));
        console.log(dirIndex)
        if( $(this).text().trim() == "edit")
        {
            
            let cmd = {};
            cmd["act"] = "editDir";
            cmd["account"] = sessionStorage.getItem("Helen-userID");
            cmd["articleID"] = CollectionCatalog[dirIndex].dirID;
            cmd["old"] =$(this).parents('.Page').find("span").text();


            console.log($(this));
            
            
            swal({
            title: "修改收藏目錄名稱",
            input: "textarea",
            input: "textarea",
            inputPlaceholder: "請輸入文字...",
            showCancelButton: true,
            confirmButtonText: "確認",
            cancelButtonText: "取消",
            inputPlaceholder:$(this).parents('.Page').find("span").text(),
            animation: false
                
            }).then(( result ) => {
                
                
                if(values.includes(result)==true)
                {
                    alert("收藏目錄已存在");
                    return false
                }
                
                

                // $.post( "../index.php", cmd, function( dataDB )
                // {
                //     dataDB = JSON.parse( dataDB );

                //     if( dataDB.status == false )
                //     {
                //         swal({
                //             title: "修改收藏目錄名稱失敗",
                //             type: "error",
                //             text: dataDB.errorCode
                //         }.then(( result ) => {}, ( dismiss ) => {} );
                //     }
                //     else
                //     {

                //         swal({
                //             title: "已成功修改收藏目錄名稱",
                //             type: "success",
                //             showConfirmButton: false,
                //             timer: 1000,
                
                //         }).then(( result ) => {}, ( dismiss ) => {
                //             if ( result ) 
                //             {
                //                  CollectionCatalog[ dirIndex ].title=result;
                //                  console.log(CollectionCatalog[ dirIndex ].title)   
                //                  cmd["new"] =result;
                //                  location.reload();
                //             }
                //             else
                //             {
                //                 CollectionCatalog[ dirIndex ].title=" ";
                //                
                //                 location.reload();//重整
                //             }
                //         });
                //     }
                // });

                swal({
                    title: "已成功修改收藏目錄名稱",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,
        
                }).then(( result ) => {}, ( dismiss ) => {
                    if ( result ) 
                    {
                        CollectionCatalog[ dirIndex ].title=result;
                        console.log(CollectionCatalog[ dirIndex ].title);
                        $(this).parents('.Page').find("span").text(result);
                        // for( let p in CollectionCatalog )
                        // {
                        //     console.log(CollectionCatalog[p].title)
                        // }
                        cmd["new"] =result;
                        location.reload();
                        
                    }
                    else
                    {
                        location.reload();//重整
                    }
                });
            }, ( dismiss ) => {console.log("cancel")} );
    
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
                        title: "確定要刪除此收藏目錄嗎？<br /><span style='color:#FF0000'>會連同裡面整個刪除喔!!</span><br /><small>&lt;"
                        + CollectionCatalog[ dirIndex ].title
                        + "&gt;</small>",
                        showCancelButton: true,
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",
                        animation: false,
                        type: 'warning'

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
                        //                  sessionStorage.setItem("Helen-act", "showArticleInDir");
                        //                  sessionStorage.setItem("Helen-dirID", CollectionCatalog[dirIndex].dirID);
                        //                  sessionStorage.setItem("Helen-dirName", CollectionCatalog[dirIndex].title);
                        //                  window.location.href = "../HTMLs/sub.html";
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
                                    window.location.href = "../HTMLs/sub.html";
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
                        //我不知道cmd[ "dirIDs"] = dirIDs[dirIndex];
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
                                //                     
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
function initial()
{

    values=[];
    // let isValid = checkPermission();
    // if( !isValid ) return;
    let cmd = {};
	cmd["act"] = "showDirList";
    // dirIDs = sessionStorage.getItem( "Helen-DirIDs" );
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
        console.log(values)

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
    let perm = sessionStorage.getItem( "Helen-permission" );
    console.log( "Permission:　"+ perm );

    if( perm && perm.valueOf() >= 1 ) return true;

    else 
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {
            if ( result ) 
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });

        return false;
    }
    
}





function arrayRemove(arr, value) { 
    
return arr.filter(function(ele){ 
    return ele != value; 
});
}   
function funName1(id) {
$("#chgtxt").text($("#txt1").val());
}