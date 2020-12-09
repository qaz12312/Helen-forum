//CollectionCatalog
var CollectionCatalog = [];
var values=[];
var dirNames = ["漫威宇宙", "衣服買起來", "必去", "好好吃", "55", "22", "COOL", "YA" ];
var dirIDss = [ "1", "2", "3", "4", "5", "6", "7", "8" ];
$( document ).ready( function() 
{
        initial();
        document.querySelector('.addRow').addEventListener('click',
        function () {
                // let cmd = {};
                // cmd[ "act" ] = "addKeepDir";
                // cmd[ "account" ] = sessionStorage().getItem("Helen-UserID")
                // //cmd[ "dirIDs"] = dirIDs[ CollectionCatalog.indexOf( $(this).closest( "td" ).prev().find( "select" ).val() )];
                // cmd[ "dirNames" ] = $('#input2').val();
                // $.post( "../index.php", cmd, function( dataDB ) 
                // {
                //     dataDB = JSON.parse( dataDB );

                //     if( dataDB.status == false )
                //     {
                //         swal({
                //             title: "新增看板失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
                //             type: "error",
                //             text: dataDB.errorCode
                //         });
                //     }
                //     else
                //     {
                //         swal({
                //             title: "新增看板成功<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
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
                            title: "增加收藏失敗",
                            type: "error",
                            text: "dataDB.errorCode",
                        });
                    }
                    else
                    {
                        var value = $('#input2').val();
                        console.log(value)
                        
                        if(value!="")
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
                                </div>
                                <ul class="deals">
                                    <li>:):)</li>
                                    </ul>
                                
                                        <button class="more">more</button>
                                
                                </div>
                                
                                
                        `;
                        
                            document.querySelector('.row').appendChild(div)
                       
                        $('#getValues').click(function(){
                            alert("你擁有的收藏目錄:  "+values);
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
                    });
                }


                    }
                
                });
            });
        function funName1(id) {
            $("#chgtxt").text($("#txt1").val());
        }
        function initial()
        {
            let isValid = checkPermission();
            if( !isValid ) return;
        
            let cmd = {};
            cmd[ "act" ] = "newCollectionCatalog";
            dirIDs = sessionStorage.getItem( "Helen-dirIDs" );
            dirIDs = JSON.parse( boardIDs );
            dirNames = sessionStorage.getItem( "Helen-dirNames" );
            dirNames = JSON.parse( dirNames );

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
                    let content = $( ".tabContent row" );
                    content.empty();

                    //CollectionCatalog = dataDB.data;
                    for( let i in dataDB.data )
                    {
                        validDir = arrayRemove( validBoardsvalidDir, dataDB.data[i].dirName);
                    }

                    let empty = true;
                    if( empty )
                    {
                        let emptyMessage = "<tr>" + 
                                                "<td colspan='4'>目前沒有收藏目錄</td>" +
                                            "</tr>";
                        content.append( emptyMessage );
                    }
                    for( let i in dataDB.data )
                  {
                     const div = document.createElement('div');
                        
                        div.classList.add('Page');
                        
                        div.innerHTML = `
                        <div class="PageName">
                                    <div class="value"> 
                                        
                                    
                                        <span class="currency"><span class="WhichPage" id="cjgtxt">`+dataDB.data[i].DirName+ `</span>
                                
                                        </div>
                                </div>
                                <ul class="deals">
                                    <li>:):)</li>
                                    </ul>
                                
                                        <button class="more">more</button>
                                
                                </div>
                                
                                
                        `;
                        
                            document.querySelector('.row').appendChild(div)
                    }
                }
            });

            let content = $( ".tabContent row" );
            content.empty();

            let dataDB = {};
            dataDB[ "data" ] = [ { "UserID": "00757000", "DirID": "1", "DirName": "最愛" }];

            CollectionCatalog = dataDB.data;
            let empty = true;
            if( empty )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>目前沒有收藏目錄</td>" +
                                    "</tr>";
                content.append( emptyMessage );
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