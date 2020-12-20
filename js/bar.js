var userPermission= 0; // 0(訪客) 1(一般使用者) 2(版主) 3(admin)

function barInitial(){
    if(sessionStorage.getItem("Helen-sort")== null){
        sessionStorage.setItem("Helen-sort", "熱門");
    }

    getUserInfo();
    getBoards();

    // 最左邊的 ham menu 初始化
    $("#menu").empty();
    let boards= sessionStorage.getItem("Helen-boards");
    boards= JSON.parse(boards);

    for(var i= 0; i< boards.length; i++){
        var oneBoard= boards[i];
        $("#menu").append("<a href=\"../html/sticky.html\"><li>"+
                            oneBoard+ 
                            "版</li></a>");
    }
    
    if(userPermission>= 3) // admin 可新增看版
        $("#menu").append("<a href=\"../html/manageBoard.html\">"+
                        "<li><h3 class=\"glyphicon glyphicon-plus\">"+
                        " A D D</h3></li></a>");

    // 登入/登出按紐顯示
    if(userPermission== 0){ // 訪客(登入)
        $("#logInBtn").attr("disable", false);
        $("#logOutBtn").attr("disable", true);
        $("#logInBtn").show();
        $("#logOutBtn").hide();
    }else{ // 已登入(登出)
        $("#logInBtn").attr("disable", true);
        $("#logOutBtn").attr("disable", false);
        $("#logInBtn").hide();
        $("#logOutBtn").show();
    }

    // 頭像(登入改顏色)
    if(userPermission== 0){
        $("#head").css("background-color", "#9da9be");
    }else{
        var userColor= sessionStorage.getItem("Helen-color")
        $("#head").css("background-color", userColor);
    }

    // 最右下拉選單: user info 
    $("#userDD").empty();
    if(userPermission== 0){ // 訪客(未登入)
        $("#userDD").append("<li class= \"glyphicon glyphicon-user\"><span>"+
                            " 未登入"+
                            "</span></li>")
    }else{ // 一般使用者(已登入)
        $("#userDD").append("<li class= \"glyphicon glyphicon-user\"><span> "+
                            sessionStorage.getItem("Helen-nickname")+
                            "</span></li>")
        $("#userDD").append("<li class= \"divider\"></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-edit\">"+
                            "<a href=\"../html/PersonalProfile.html\"> 個人資料</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-pencil\">"+
                            "<a href=\"../html/publishArticle.html\"> 發佈新文章</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-star-empty\">"+
                            "<a href=\"../html/CollectionCatalog.html\"> 我的收藏</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-time\">"+
                            "<a href=\"../html/PostingRecord.html\"> 發文紀錄</a></li>")

        if(userPermission>= 2){ // 版主
            $("#userDD").append("<li class= \"glyphicon glyphicon-alert\">"+
                                "<a href=\"../html/report.html\"> 檢舉區</a></li>")
        }
        if(userPermission>= 3){
            $("#userDD").append("<li class= \"glyphicon glyphicon-th-list\">"+
                                "<a href=\"../html/manageBoard.html\"> 管理看版</a></li>")
            $("#userDD").append("<li class= \"glyphicon glyphicon-king\">"+
                                "<a href=\"../html/moderator.html\"> 管理版主</a></li>")
            $("#userDD").append("<li class= \"glyphicon glyphicon-bullhorn\">"+
                                "<a href=\"../html/sendAlert.html\"> 發送通知</a></li>")
        }
    }
}

// 點選最左邊的 ham menu(看版) -> 跳轉到特定看版
$("#menu").on("click", "li", function(){
    let boardIndex= $("li").index($(this)); // this= <li>某某版</li>
    let boards= sessionStorage.getItem("Helen-boards");
    boards= JSON.parse(boards);
    sessionStorage.setItem("Helen-boardName", boards[boardIndex- 1]);
});

// 按搜尋或 'Enter Key' 搜尋頁面
$("#searchBtn").click(function(){
    setSearchData();
});
$("#searchInputText").keypress(function(event){
    if(event.keyCode== 13){ // 按下 ENTER
        setSearchData();
    }
});
function setSearchData(){
    let searchStr= $("#searchInputText").val().trim();
    let searchArr= searchStr.split(" ");
    var contents= [];
    var hashtags= [];
    for(var i= 0; i< searchArr.length; i++){
        if(searchArr[i].length> 0){
            if(searchArr[i][0]!= "#"){
                contents.push(searchArr[i]);
            }else{
                if(searchArr[i].length> 1){
                    hashtags.push(searchArr[i].substring(1, searchArr[i].length));
                }
            }
        }
    }
    let searchData= {};
    searchData["content"]= contents;
    searchData["hashtag"]= hashtags;
    sessionStorage.setItem("Helen-search", JSON.stringify(searchData));

    if(sessionStorage.getItem("Helen-boardName")== null){
        location.href= "../html/home.html";
    }else{
        location.href= "../html/sticky.html";
    }
}

// 登入/登出按紐
$("#logInBtn").click(function(){
    location.href=  "../html/login.html";
});
$("#logOutBtn").click(function(){
    let cmd= {};
	cmd["act"]= "logOut";
    cmd["account"]= sessionStorage.getItem("Helen-account");
    
    // $.post("../index.php", cmd, function(dataDB){
    //     dataDB= JSON.parse(dataDB);
    //     if(dataDB.status == false){
    //         swal({
    //             title: "登出失敗",
    //             type: "error",
    //             // text: dataDB.errorCode
    //         });
    //     }
    //     else{ // 登出成功
            swal({
                title: 'Bye Bye~',
                type: 'success',
                text: '本訊息1秒後自動關閉',
                showConfirmButton: false,
                timer: 1000,
            }).then(
                function () { },
                function (dismiss) {
                    if (dismiss === 'timer') {
                        userPermission= 0;
                        sessionStorage.clear();
                        location.href=  "../html/home.html";
                    }
                }
            )
    //     }
    // });
});

function getUserInfo(){
    if(sessionStorage.getItem("Helen-account")== null){
        userPermission= 0;
    }
    else{
        let cmd= {};
        cmd["act"]= "showAuthority";
        cmd["account"]= sessionStorage.getItem("Helen-account");
        // $.post("../index.php", cmd, function(dataDB){
        //     dataDB= JSON.parse(dataDB);
        //     if(dataDB.status == false){
        //         swal({
        //             title: "獲取使用者權限失敗",
        //             type: "error",
        //             // text: dataDB.errorCode
        //         });
        //     }
        //     else{
        //         userData= daraDB.data; // permission, boardName
         // Test
         userData= {permission: 2};
         // Test End
        //         userPermission= userData.permission;
                    // delete userData.permission;
        //     }
        // });
    }
}

function getBoards(){
    let cmd= {};
    cmd["act"]= "showBoardList";
    // $.post("../index.php", cmd, function(dataDB){
    //     dataDB= JSON.parse(dataDB);
    //     if(dataDB.status == false){
    //         swal({
    //             title: "獲取看版失敗",
    //             type: "error",
    //             // text: dataDB.errorCode
    //         });
    //     }
    //     else{
    //         boards= daraDB.data;
    //     }
    // });
    
    //Test
    boards= ["美食", "廢文", "八卦", "企鵝", "漫威", "星座", "旅遊"];
    //Test End

    if(boards.length== 0){
        console.log("沒有看版");
    }

    sessionStorage.setItem("Helen-boards", JSON.stringify(boards));
}