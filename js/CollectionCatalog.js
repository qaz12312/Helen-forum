
var CollectionCatalog = [];
var thisAccount = sessionStorage.getItem( "Helen-account" );
$( document ).ready(async function() 
{
    //barInitial();
    
    await new Promise( ( resolve, reject ) => { initial( resolve, reject ); });
    //initial()
    console.log("start");
    
    $( document ).on( "click", ".edit", function()
    {
            let dirIndex = $("div .Page").index(this.closest(".Page"));
             let cmd = {};
            cmd["act"] = "editDir";
            cmd["account"] = sessionStorage.getItem("Helen-account");
            cmd["old"] =$(this).parents('.Page').find("span").text();
            console.log($(this));
            $.post( "../index.php", cmd, function( dataDB ){
                dataDB = JSON.parse( dataDB );
            
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
                
                
                else
                {
                    if ( result ) 
                            {
                                console.log(result)
                                if( result == false )
                                {
                                    swal({
                                        title: "修改失敗<br /><small>&lt;"
                                        //  + CollectionCatalog[ dirIndex ].title
                                          + "&gt;</small>",
                                        type: "error",
                                        // text: dataDB.errorCode,
                                        animation: false
                                    });
                                }
                                else
                                {
                                        
                                    swal({
                                        title: "已成功修改收藏文章！<br /><small>&lt;"
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

                                 }
                             }
                            }
                        }, function( dismiss ) {
                            console.log("cancel")
                            if ( dismiss === 'cancel' );
                            
                        });
                        
            });
    });
    $( document ).on( "click", ".more", function()
    {
        let dirIndex = $("div .Page").index(this.closest(".Page"));
            swal({
            title: '歡迎',
            type: 'info',
            text: '本訊息1秒後自動關閉',
            width: 400,
            showConfirmButton: false,
            timer: 1000,
            })
            sessionStorage.setItem("Helen-act", "showArticleInDir");
            sessionStorage.setItem("Helen-dirID", CollectionCatalog.dirIndex);
            sessionStorage.setItem("Helen-DirName", CollectionCatalog[dirIndex].DirName);
            location.href = "../html/sub.html";
    });
    $( document ).on( "click", ".delete", function()
    {
        let dirIndex = $("div .Page").index(this.closest(".Page"));
          
            
            
            swal({
                title: "確定要刪除此收藏目錄嗎？<br /><span style='color:#FF0000'>會連同裡面整個刪除喔!!</span><br /><small>&lt;"
                + CollectionCatalog[ dirIndex ].DirName
                + "&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false,
                type: 'warning'

            }).then(( result ) => 
            {
                if ( result ) 
                {
                    let cmd = {};
                    cmd["act"] = "deleteDir";
                    cmd["account"] = sessionStorage.getItem("Helen-account");
                    cmd["dirName"] = $(this).parents('.Page').find("span").text();
                    $.post( "../index.php", cmd, function( dataDB )
                    {
                        dataDB = JSON.parse( dataDB );

                        if( dataDB.status == false )
                        {
                            swal({
                                title: "移除失敗<br /><small>&lt;" + CollectionCatalog[ dirIndex ].DirName + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
    
                            }).then((result) => {}, ( dismiss ) => {});
                        }
                        else
                        {
                            swal({
                                title: "已成功移除收藏文章！<br /><small>&lt;" + CollectionCatalog[ dirIndex ].DirName + "&gt;</small>",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1000,
    
                            }).then((result) => {}, ( dismiss ) => {});
    
                            $(this).parents('.Page').remove();
                            location.reload();//重整
    
                            if( $.isEmptyObject(articles) )
                            {
                                let emptyMessage = "<tr>" + 
                                                        "<td colspan='4'>收藏文章列表為空</td>" +
                                                    "</tr>";
                                $( ".tabContent tbody" ).append( emptyMessage );
                            }
                        }
                    });
                }
            }, ( dismiss ) => {});
            
    });
    
    $("#CollectionCatalog button").on( "click",  function(){
    
        
        if( $(this).text().trim() == "getValues")
        {
            alert("你擁有的收藏目錄:  "+values);
        }
        if( $(this).text().trim() == "+ Add")
        {
            
            
                var value = $('#input2').val();
            
                let cmd = {};
                cmd[ "act" ] = "newDir";
                cmd["account"] = sessionStorage.getItem( "Helen-account" );
                cmd[ "dirName" ] = $('#input2').val();

                $.post( "../index.php", cmd, function( dataDB ) 
                {
                    dataDB = JSON.parse( dataDB );
        
                    if( dataDB.status == false  )
                        {
                            swal({
                                title: "新增收藏目錄失敗<br /><small>&lt;",
                                type: "error",
                                text: "dataDB.errorCode"
                            });
                        }
                        else
                        {
                            
                            console.log(value)
                            
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
                });

            }
        });
            
});
async function initial(res, rej)
{

    values=[];
    console.log("initial")
     
    let cmd = {};
    cmd["act"] = "showDirList";
    cmd["account"] = sessionStorage.getItem( "Helen-account" );

    $.post( "../index.php", cmd, function( dataDB )
    {   
        dataDB = JSON.parse( dataDB );
        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode
            })
        }
        else
        {
            
                $(".row").empty()
                CollectionCatalog=dataDB.data;

                for( let i in CollectionCatalog )
                {
                    values.push(CollectionCatalog[i].DirName)
                    const div = document.createElement('div');          
                    div.classList.add('Page');
                    
                    div.innerHTML = `
                
                    <div class="PageName">`+`
                            <button class="edit" >edit</button>`+`
                
                        
                                <div class="value"> `+`
                                
                                    
                                    
                                    <span class="currency" id="cjgtxt">`+ dataDB.data[i].DirName+ `</span>`+`
                                        
                                </div>`+`
                            
                            <ul class="deals">`+`
                                <li>:):)`+`
                                
                                <li><button class="delete">delete</button></li>`+`
                                <li><button class="more">more</button></li>`+`
                                </ul>`+`
                            </div>
                        
                        
                `;
                
                    $('.row').append(div)
                }
        }

        
    });
    await new Promise( ( resolve, reject ) => checkPermission( resolve, reject ) );

    res(0);
    
}

function checkPermission(res, rej)
{

    if( !thisAccount )
    {
        return false;
    }
    
    res(0);
    
    
}





function arrayRemove(arr, value) { 
    
return arr.filter(function(ele){ 
    return ele != value; 
});
}   
function funName1(id) {
$("#chgtxt").text($("#txt1").val());
}