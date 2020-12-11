//CollectionCatalog
var CollectionCatalog = [];
var values=[];
var dirNames = ["漫威宇宙", "衣服買起來", "必去", "好好吃", "55", "22", "COOL", "YA" ];
var dirIDss = [ "1", "2", "3", "4", "5", "6", "7", "8" ];
$( document ).ready( function() 
{
    CollectionCataloginitial();
    
    $( ".edit" ).click( function()
    {
     
        swal({
            title: "An input!",
            text: "Write something interesting:",
            input: 'text',
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            
        
            animation: false     
            }).then((result) => {
                if (result.value) {
                    console.log("Result: " + result.value);
            
        
                        // if( status == false )
                        // {
                        //     swal({
                        //         title: "移除失敗<br /><small>&lt;"
                        //         //  + articles[ articleIndex ].title
                        //         + "&gt;</small>",
                        //         type: "error",
                        //         // text: dataDB.errorCode,
                        //         animation: false
                        //     });
                        // }
                        // else
                        // {
                            swal({
                                title: "已成功移除收藏文章！<br /><small>&lt;"
                                //  + articles[ articleIndex ].title
                                + "&gt;</small>",
                                type: "success",
                            })
                        

                         }
                        // }
                }, function( dismiss ) {
                        if ( dismiss === 'cancel' );
                        });
                
        
        // let cmd = {};
        // cmd["act"] = "removeKeepArticle";
        // cmd["account"] = sessionStorage.getItem("Helen-userID");
        // cmd["articleID"] = articles[articleIndex].articleID;
        // cmd["dirName"] = sessionStorage.getItem("Helen-keepDir");
        // console.log($(this));
        

        // $.post( "../index.php", cmd, function( dataDB ){
        //     dataDB = JSON.parse( dataDB );
        console.log("edit")
        // swal({
        //     title: "確定要修改此篇文章嗎？"
        //     //  + articles[ articleIndex ].title
        //     ,
        //     showCancelButton: true,
        //     confirmButtonText: "確定",
        //     cancelButtonText: "取消",
             
            
        //     animation: false

        //     }).then(( result ) => {
      

        //         if ( result ) 
        //         { 
                   
                    
        //             // if( status == false )
        //             // {
        //             //     swal({
        //             //         title: "移除失敗<br /><small>&lt;"
        //             //         //  + articles[ articleIndex ].title
        //             //           + "&gt;</small>",
        //             //         type: "error",
        //             //         // text: dataDB.errorCode,
        //             //         animation: false
        //             //     });
        //             // }
        //             // else
        //             // {
        //                 swal({
        //                     title: "已成功修改收藏文章！<br /><small>&lt;"
        //                     //  + articles[ articleIndex ].title
        //                     + "&gt;</small>",
        //                     type: "success",
        //                 })
        //                 console.log($(this).parents('.Page').find("span").text());
        //                 $(this).parents('.Page').find("span").text()

        //             // }
        //                     }
        //                 }, function( dismiss ) {
        //                     if ( dismiss === 'cancel' );
        //                 });
    
    });
    // });

            $( ".delete" ).click( function()
            {
                // let cmd = {};
                // cmd["act"] = "removeKeepArticle";
                // cmd["account"] = sessionStorage.getItem("Helen-userID");
                // cmd["articleID"] = articles[articleIndex].articleID;
                // cmd["dirName"] = sessionStorage.getItem("Helen-keepDir");
                // console.log($(this));
                
        
                // $.post( "../index.php", cmd, function( dataDB ){
                //     dataDB = JSON.parse( dataDB );
                console.log("delete")
                swal({
                    title: "確定要刪除此篇文章嗎？<br /><small>&lt;"
                    //  + articles[ articleIndex ].title
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
                            //         //  + articles[ articleIndex ].title
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
                                    //  + articles[ articleIndex ].title
                                    + "&gt;</small>",
                                    type: "success",
                                })
                                $(this).parents('.Page').remove();
                                values.pop($(this));

                            // }
                                    }
                                }, function( dismiss ) {
                                    if ( dismiss === 'cancel' );
                                });
            });
        // });
        
            

            $( ".more" ).click( function()
            {
                console.log("45")
        
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
                    //                 //我不會//sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
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
                    console.log("more")
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
                                sessionStorage.setItem("Helen-act", "newCollectionCatalog");
                                //我不會//sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
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
            });
            $( ".getValues" ).click( function()
            {
                alert("你擁有的收藏目錄:  "+values);
            });
            $( ".addRow" ).click( function()
            {
                
                    
                
                    // let cmd = {};
                    // cmd[ "act" ] = "addKeepDir";
                    // cmd[ "account" ] = sessionStorage().getItem("Helen-UserID")
                    // //cmd[ "dirIDs"] = dirIDs[ CollectionCatalog.indexOf( $(this).closest( "td" ).prev().find( "select" ).val() )];
                    // cmd[ "dirNames" ] = $('#input2').val();
            
                    //console.log( cmd );
            
                    // $.post( "../index.php", cmd, function( dataDB ) 
                    // {
                    //     dataDB = JSON.parse( dataDB );
            
                    //     if( dataDB.status == false )
                    //     {
                    //         swal({
                    //             title: "新增版主失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "select" ).val() +"&gt;</small>",
                    //             type: "error",
                    //             text: dataDB.errorCode
                    //         });
                    //     }
                    //     else
                    //     {
                    //         swal({
                    //             title: "新增版主成功<br /><small>&lt;" + cmd.userID + ", " + $(this).closest( "td" ).prev().find( "select" ).val() +"&gt;</small>",
                    //             type: "success"
            
                    //         }).then(( result ) => {
                    //             if ( result ) 
                    //             {
                    //                 location.reload();
                    //             }
                    //         });
                    //     }
                    // });
            
                    let status = true;
                    if( status == false )
                    {
                        swal({
                            title: "新增版主失敗<br /><small>&lt;",
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

                                        })
                                        
                                        const div = document.createElement('div');
                                        
                                        div.classList.add('Page');
                                        
                                        div.innerHTML = `
                                        <div class="PageName">
                                                    <div class="value"> 

                                                        <span class="currency"><span class="WhichPage" id="cjgtxt">`+ document.getElementById('input2').value+ `</span>
                                                
                                                        </div>
                                                
                                                <ul class="deals">
                                                    <li>:):)
                                                    
                                                    <li><button class="delete">delete</button></li>
                                                    <li><button class="more">more</button></li>
                                                    </ul>
                                                </div>
                                                
                                                
                                        `;
                                        
                                            document.querySelector('.row').appendChild(div)
                                    
                                        /*
                                        $(document).on('click', '.delete', function() {
                                            
                                        
                                        });
                                        $(document).on('click','.more',function(){
                                            console.log("more2")
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
                                                    sessionStorage.setItem("Helen-act", "newCollectionCatalog");
                                                    //我不會//sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
                                                    window.location.href = "../html/sub.html";
                                                }
                                            }
                                        )
                                        });*/
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
                
           
            });
            
});
function CollectionCataloginitial()
{
    
    
    // let isValid = checkPermission();
    // if( !isValid ) return;

    // boardIDs = sessionStorage.getItem( "Helen-boardIDs" );
    // boardIDs = JSON.parse( boardIDs );
    // boardNames = sessionStorage.getItem( "Helen-boardNames" );
    // boardNames = JSON.parse( boardNames );

    // let cmd = {};
    // cmd[ "act" ] = "moderatorManagePage";

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
    //         let content = $( ".tabContent row" );
    //         content.empty();

    //         moderators = dataDB.data;

    //         let validBoards = boardNames;
    //         for( let i in dataDB.data )
    //         {
    //             validBoards = arrayRemove( validBoards, dataDB.data[i].boardName );
    //         }

    //         let empty = true;
    //         let oneRow = "";
    //         let selectBlock = "";
    //         let buttonBlock = "";

    //         let validOptions = "";
    //         let validlis = "";
    //         for( let j in validBoards )
    //         {
    //             validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "</option>";
    //             validlis += "<li><a href='#''>" + validBoards[j] + "</a></li>";
    //         }

    //         for( let i in dataDB.data )
    //         {
    //             empty = false;

    //             if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) - 1].userID )
    //             {
    //                 oneRow = "<tr>" + 
    //                             "<td><img class='head' src='" + dataDB.data[i].color + ".png' alt='" + dataDB.data[i].color + "'></td>" +
    //                             "<td>" + dataDB.data[i].userID + "@mail.ntou.edu.tw</td>" +
    //                             "<td>";
    //             }

    //             selectBlock = "<div class='input-group input-group-lg mt-3'>" +
    //                                 "<select class='form-control' style='background-color: brown; color: white;'>" +
    //                                     "<option value='" + dataDB.data[i].boardName + "' selected>" + dataDB.data[i].boardName + "</option>" +
    //                                     validOptions + 
    //                                 "</select>" +
    //                         "</div>";

    //             oneRow += selectBlock;

    //             if( dataDB.data[parseInt(i) + 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) + 1].userID )
    //             {
    //                 oneRow += "</td><td>";

    //                 buttonBlock = "<div class='input-group input-group-lg mt-3'>" +
    //                                 "<div class='dropdown'>" +
    //                                     "<button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown' style='width: 40px !important;'>" +
    //                                         "<i class='fa fa-plus'></i>" +
    //                                     "</button>&nbsp;" +
    //                                     "<button class='btn btn-danger' type='button' style='width: 40px !important;'>" +
    //                                         "<i class='fa fa-minus'></i>" +
    //                                     "</button>" +
    //                                     "<ul class='dropdown-menu'>" +
    //                                         validlis +
    //                                     "</ul>" +
    //                                 "</div>" +
    //                             "</div>";

    //                 oneRow += buttonBlock + "</td></tr>";

    //                 content.append( oneRow );
    //             }
    //         }

    //         if( empty )
    //         {
    //             let emptyMessage = "<tr>" + 
    //                                     "<td colspan='4'>目前沒有版主</td>" +
    //                                 "</tr>";
    //             content.append( emptyMessage );
    //         }

    //         let addNewModerator = "<tr>" +
    //                                 "<td style='text-align: center;'>" +
    //                                     "<span class='glyphicon glyphicon-plus'></span>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<input type='text' id= 'account' class='textInput'>" +
    //                                         "@mail.ntou.edu.tw" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<div class='input-group input-group-lg mt-3'>" +
    //                                         "<select class='form-control rounded-pill' style='background-color: brown; color: white;'>" +
    //                                         validOptions +
    //                                         "</select>" +
    //                                     "</div>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<div class='input-group mt-3'>" +
    //                                         "<button type='button' class='btn btn-success btn-lg'>" + 
    //                                             "<span class='glyphicon glyphicon-ok'></span> 確認" +
    //                                         "</button>" +
    //                                     "</div>" +
    //                                 "</td>" +
    //                             "</tr>";
    //         content.append( addNewModerator );
    //     }
    // });

    // let content = $( "#CollectionCatalog dir " );
    // content.empty();
    // content.append(":)")
    // console.log(content)
    
    let dataDB = {};
    dataDB[ "data" ] = [ { "title": "漫威宇宙"}, 
                            { "title": "衣服買起來"} ];

    

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