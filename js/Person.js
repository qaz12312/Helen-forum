//PersonalProfile
document.querySelector('.PersonEditBtn').addEventListener('click',
function () {
    

    const div = document.createElement('div');
    /*var value = document.getElementById("name").value;    
    var value2 = document.getElementById("edit").value;*/ 
    console.log(document.getElementById('name').disabled)
    if(document.getElementById('name').disabled == true){
        
        document.getElementById('name').disabled = !document.getElementById('name').disabled;
        document.getElementById("edit").value = 'save'
        document.getElementById("name").setAttribute("placeholder",value);
        }
    else{
        let cmd = {};
        cmd[ "act" ] = "changeNickname";
        cmd[ "account" ] =sessionStorage.getItem("UserID");
        cmd[ "nickname" ] =document.getElementById("name").value;
        console.log(document.getElementById("name").value)
        document.getElementById('name').disabled = !document.getElementById('name').disabled;
        document.getElementById("edit").value = 'Edit'
    }

    alert(document.getElementById('name').disabled);



}        


)
document.querySelector('.PasswordEditBtn').addEventListener('click',
function () {
const div = document.createElement('div');
var value = document.getElementById("password").value;  
var value2 = document.getElementById("editPw").value;   

console.log(document.getElementById('password').disabled)
if(document.getElementById('password').disabled == true){
    document.getElementById('password').disabled = !document.getElementById('password').disabled;
    
    document.getElementById('editPw').disabled=true
    document.getElementById("editPw").value = 'save' 
    document.getElementById("password").setAttribute("placeholder",value);
    document.getElementById('InputWrap2').style.display='block'
    
}
else{
    let cmd = {};
        cmd[ "Act" ] = "changePassword";
        cmd[ "account" ] =sessionStorage.getItem("UserID");
        cmd[ "password" ] =document.getElementById("password").value;
        console.log(document.getElementById("password").value)
    document.getElementById('password').disabled = !document.getElementById('password').disabled;
    document.getElementById('InputWrap2').style.display='none'

    document.getElementById("editPw").value = 'Edit'
    $("#checkPw").html("");
    $("#pwMsg").html("");
    
}


alert(document.getElementById('password').disabled);



}  
)      
$("#password").keyup(function(){
    if(passwd()){

        $("#pwMsg").html("<p class='text-success'>Validated</p>");
        
    }
    else{

    $("#pwMsg").html("<p class='text-danger'>Password must be greater than 3</p>");
    }
    
});
$("#validatePW").keyup(function(){
    if(con_passwrd() && passwd()){

        $("#checkPw").html("<p class='text-success'>Validated</p>");
        document.getElementById('editPw').disabled=false

    }
    else{

    $("#checkPw").html("<p class='text-danger'>Password are not Matching</p>");
    }
    
});
function con_passwrd(){
    var conpass = $('#validatePW').val();
    var passwrdstr = $('#password').val();
    if(passwrdstr != conpass){
        return false;
    }else{
        return true;
    } 
}
function passwd(){
    var passwrdstr = $('#password').val();    
    if(passwrdstr.length<3){
        return false;
    }else{
        return true;
    } 
}
function ChangeDisabled(value){
　if(value=='1'){
    
　document.getElementById('name').disabled=false;　// 變更欄位為可用
document.getElementById("email").setAttribute("onClict",value);
    

　}else{
　document.getElementById('name').disabled=true;　// 變更欄位為禁用

　}
}
//CollectionCatalog
var i=0;
var values = [];
document.querySelector('.addRow').addEventListener('click',
  function () {
        // let cmd = {};
        // cmd[ "act" ] = "addKeepDir";
        // cmd[ "account" ] = sessionStorage().getItem("Helen-UserID")
        // //cmd[ "dirID" ] = $('#input2').val();//what
        // cmd[ "dirName" ] = $('#input2').val();
        let status = true;
            if( status == false )
            {
                swal({
                    title: "增加收藏失敗<br /><small>&lt;",
                    type: "error",
                    text: "dataDB.errorCode",
                });
            }
            else
            {
                swal({
                    title: "增加收藏成功<br /><small>&lt;" ,
                    type: "success"

                })
                var value = $('#input2').val();
                console.log(value)
                values.push(value);
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
                if(value!="")
                {
                    document.querySelector('.row').appendChild(div)
                }
                $('#getValues').click(function(){
                    alert(values);
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
                              sessionStorage.setItem("Helen-act", "editArticle");
                              //sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
                              window.location.href = "../html/sub.html";
                          }
                      }
                  )
               });
                  


            }
        
        });

        function funName1(id) {
            $("#chgtxt").text($("#txt1").val());
        }
            
        //i=i+1;
      
//PostingRecord
var articles = [ { "articleID": "123", "reason": "hahaha" }, { "articleID": "456", "reason": "hahaha" }, { "articleID": "789", "reason": "hahaha" } ];

$( document ).ready( function() 
{
    initial();

    $( ".tabContent tr" ).find( "td:first-child" ).on( "click", function()
    {
        console.log( $(this).text() );

        if( $(this).text() != "發文文章列表為空" )
        {
            let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
            sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
            //location.href =  "../html/post.html";
        }
    } );

    $( ".tabContent button" ).on( "click", function()
    {
        // console.log( $( ".tabContent tr" ).index( this.closest( "tr" ) ) );

        let thisArticle = $( ".tabContent tr" ).index( this.closest( "tr" ) );
        if( $(this).text().trim() == "刪除" )
        {
            // let cmd = {};
            // cmd[ "act" ] = "deleteArticle";
            // cmd["account"] = sessionStorage.getItem( "UserID" );
            // cmd["articleID"] =articles[ thisArticle ].articleID;
            // console.log("delete")

            // $.post( ".php", cmd, function( dataDB ){
            //     dataDB = JSON.parse( dataDB );

           

            console.log( "delete" );
            let status = true;
            swal({
                title: "確定要刪除此篇文章嗎？<br /><small>&lt;" 
                //  + articles[ thisArticle ].title
                +"&gt;</small>",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                animation: false

                }).then(( result ) => {
                    if ( result ) 
                    {
                        //console.log( "status " + status );
                        if( status == false )
                        {
                            swal({
                                title: "刪除失敗<br />" + articles[ thisArticle ].title//  + articles[ thisArticle ].title
                                + "&gt;</small>",
                                type: "error",
                                text: dataDB.errorCode,
                                animation: false
                            })
                        }
                        else
                        {
                            swal({
                                title: "已成功刪除文章！<br />" + articles[ thisArticle ].title//  + articles[ thisArticle ].title
                                + "&gt;</small>",
                                type: "success",
                            })
                            $(this).closest( "tr" ).remove();
                            articles.splice( thisArticle, 1 );
                            if( articles.length == 0 )
                                {
                                    console.log( "length==0" );
                                    let emptyMessage = "<tr>" + 
                                                            "<td colspan='2'>沒發文紀錄喔！</td>" +
                                                        "</tr>";
                                    $( ".tabContent tbody" ).append( emptyMessage );
                                }
                        }
                        $(this).closest( "tr" ).remove();
                    }
            }, function( dismiss ) {
                if ( dismiss === 'cancel' );
            });
        }
        else if( $(this).text().trim() == "編輯" )
        {
            // cmd["act"]= "editArticle";
            // cmd["account"]= sessionStorage.getItem("Helen-userID")
            // cmd["articleID"]= articles[ thisArticle ].articleID;
            // cmd["boardName"]= $("#chooseBoard :selected").val();//text()
            // cmd["content"]= contentStr;
            // cmd["hashtag"]= hashtags;
            // console.log(hashtags);
        
            //$.post("../index.php", cmd, function(){
            //var dataDB= JSON.parse(dataDB);
            console.log( "edit" );
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
                        sessionStorage.setItem("Helen-act", "editArticle");
                        sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
                       window.location.href = "../html/publishArticle.html";
                    }
                }
            )
        }
    } );
});

function initial()
{


    let cmd = {};
    cmd[ "act" ] = "home";
    cmd["account"] = sessionStorage.getItem("UserID");

    // $.post( "../php/report.php", cmd, function( dataDB )
    // {
    //     dataDB = JSON.parse( dataDB );

    //     if( dataDB.status == false )
    //     {
    //         alert( dataDB.errorCode );
    //     }
    //     else
    //     {
    //             let content = $( ".tabContent tbody" );
    //             content.empty();
            
    //             let empty = true;
    //             for( let i in dataDB.data )
    //             {
    //                 empty = false;
    //                 articles.push( dataDB.data[i] );
            
    //                 let oneRow = "<tr>" + 
    //                                 "<td>" + dataDB.data[i][ "Title" ] + "</td>" +
    //                                 "<td>" +
    //                                     "<button type='button' class='btn btn-default'>" +
    //                                         "<span class='glyphicon glyphicon-book'></span> 原因" +
    //                                     "</button>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<button type='button' class='btn'>" +
    //                                         "<span class='glyphicon glyphicon-trash'></span> 刪除" +
    //                                     "</button>" +
    //                                 "</td>" +
    //                                 "<td>" +
    //                                     "<button type='button' class='btn'>" +
    //                                         "<span class='glyphicon glyphicon-remove'></span> 取消" +
    //                                     "</button>" +
    //                                 "</td>" +
    //                                 "</tr>";
            
    //                 content.append( oneRow );
    //             }
            
    //             if( empty )
    //             {
    //                 let emptyMessage = "<tr>" + 
    //                                         "<td colspan='4'>檢舉文章列表為空</td>" +
    //                                     "</tr>";
    //                 content.append( emptyMessage );
    //             }
    //     }
    // } );

    let content = $( ".tabContent tbody" );
    content.empty();

    let dataDB = {};
    dataDB[ "reason" ] = "hahaha";
    dataDB[ "data" ] = [ { "Title": "美國隊長好帥!!!" }, { "Title": "求女籃正妹ig" }, { "Title": "#詢問資工課程"} ];
    dataDB[ "cate" ] = [ { "Title": "漫威版" }, { "Title": "告白版" }, { "Title": "課程版"} ];

    let empty = true;
    for( let i in dataDB.data )
    {
        empty = false;
        articles.push( dataDB.data[i] );

        let oneRow = "<tr>" + 
                        "<td>" + dataDB.cate[i][ "Title" ] + "</td>" +
                        "<td>" + dataDB.data[i][ "Title" ] + "</td>" + 
                    "</tr>"+
                    "<tr>" +
                        "<td>" +
                            "<button type='button' class='btn'>" +
                            "<span class='glyphicon glyphicon-remove'></span> 編輯" +
                            "</button>" +
                        "</td>" +
                        "<td>" +
                            "<button type='button' class='btn btn-danger'>" +
                            "<span class='glyphicon glyphicon-trash'></span> 刪除" +
                            "</button>" +
                        "</td>" +
                        "<td>" +
                            "<span class='heartNum'></span> 愛心數" +
                        "</td>" + 
                        "<td>" +
                                "<span class='collectNum'></span> 收藏數" +
                        "</td>" + 
                                
                    "</tr>" ;
                        

        content.append( oneRow );
    }

    if( empty )
    {
        let emptyMessage = "<tr>" + 
                                "<td colspan='4'>發文紀錄為空</td>" +
                            "</tr>";
        content.append( emptyMessage );
    }
}
function checkPermission()
{
    if( !sessionStorage.getItem( "account" ) )
    {
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "您沒有權限瀏覽此頁面"
            
        }).then(( result ) => {
            if ( result ) 
            {
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        });

        return;
    }

    let cmd = {};
    cmd[ "act" ] = "browseAuthority";
    cmd[ "account" ] = sessionStorage.getItem( "account" );

    let permission, color, nickname, boardName = [];
    let thisBoardName = sessionStorage.getItem( "boardName" );

    $.post( "../index.php", cmd, function( dataDB )
    {
        console.log( dataDB );
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode
            }).then(( result ) => {
                if ( result ) 
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
        }
        else
        {
            permission = dataDB.data.permission;
            color = dataDB.data.color;
            nickname = dataDB.data.nickname;
            boardName = dataDB.data.boardName;
            
            if( permission < 2 || boardName.indexOf( thisBoardName ) == -1 )
            {
                swal({
                    title: "載入頁面失敗",
                    type: "error",
                    text: "您沒有權限瀏覽此頁面"
                }).then(( result ) => {
                    if ( result ) 
                    {
                        $( "body" ).empty();
                        let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                        $( "body" ).append( httpStatus );
                    }
                });
            }
        }
    });
}


  