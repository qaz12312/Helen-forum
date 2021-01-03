var userPermission= 0; // 0(訪客) 1(一般使用者) 2(版主) 3(admin)
let userBoard = [];
var canApplyModerator = false;
var InvalidBoards = [];
var applyError = "";
var searchType = "";

async function barInitial() {
    if (sessionStorage.getItem("Helen-sort") == null) {
        sessionStorage.setItem("Helen-sort", "熱門");
    }

    await new Promise ((resolve, reject) => {getUserInfo(resolve, reject);});
    await new Promise ((resolve, reject) => {getBoards(resolve, reject);});
    await new Promise ((resolve, reject) => {getInvalidBoards(resolve, reject);});
    
    
    // 最左邊的 ham menu 初始化
    $("#menu").empty();
    let boards = sessionStorage.getItem("Helen-boards");
    boards = JSON.parse(boards);
	//console.log(userBoard.find(element => element == boards[10]));
	//console.log(boards.length);
    for (var i = 0; i < boards.length; i++) {
        var oneBoard = boards[i];
		if (userBoard.find(element => element == oneBoard)) {
			$("#menu").append("<a href=\"../HTMLs/sticky.html\"><li>" + oneBoard +
                                "版 <a href=\"../HTMLs/report.html\" class= \"glyphicon glyphicon-alert\"></li></a>");
		}
		else {
			$("#menu").append("<a href=\"../HTMLs/sticky.html\"><li>" +
				oneBoard +
				"版</li></a>");
		}
    }

    if (userPermission >= 3) // admin 可新增看版
        $("#menu").append("<a href=\"../HTMLs/manageBoard.html\">" +
            "<li><h3 class=\"glyphicon glyphicon-plus\">" +
            " A D D</h3></li></a>");
    else if (userPermission > 0)
        $("#menu").append("<a onclick='applyForModerator()'><li><h3 class=\"glyphicon glyphicon-plus\">" +
            " 我要當版主</h3></li></a>" +
            "<a onclick='applyForBoard()'><li><h3 class=\"glyphicon glyphicon-plus\">" +
            " 我要新增看版</h3></li></a>");

    // 登入/登出按紐顯示
    if (userPermission == 0) { // 訪客(登入)
        $("#logInBtn").attr("disable", false);
        $("#logOutBtn").attr("disable", true);
        $("#logInBtn").show();
        $("#logOutBtn").hide();
    } else { // 已登入(登出)
        $("#logInBtn").attr("disable", true);
        $("#logOutBtn").attr("disable", false);
        $("#logInBtn").hide();
        $("#logOutBtn").show();
    }

    // 頭像(登入改顏色)
    if (userPermission == 0) {
        $("#head").css("background-color", "#9da9be");
    } else {
        var userColor = sessionStorage.getItem("Helen-color")
        $("#head").css("background-color", userColor);
    }

    // 最右下拉選單: user info 
    $("#userDD").empty();
    if(userPermission== 0){ // 訪客(未登入)
        // $("#userDD").append("<li class= \"glyphicon glyphicon-user\"><span>"+
        //                     " 未登入"+
        //                     "</span></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-calendar\">"+
                            "<a href=\"../HTMLs/calendar.html\"> 行事曆</a></li>")                 
    }else{ // 一般使用者(已登入)
        
        $("#userDD").append("<li class= \"glyphicon glyphicon-user\"><span> "+
                            sessionStorage.getItem("Helen-nickname")+
                            "</span></li>")
        $("#userDD").append("<li class= \"divider\"></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-edit\">"+
                            "<a href=\"../HTMLs/PersonalProfile.html\"> 個人資料</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-pencil\">"+
                            "<a href=\"../HTMLs/publishArticle.html\"> 發佈新文章</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-star-empty\">"+
                            "<a href=\"../HTMLs/CollectionCatalog.html\"> 我的收藏</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-time\">"+
                            "<a href=\"../HTMLs/PostingRecord.html\"> 發文紀錄</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-bell\">"+
                            "<a href=\"../HTMLs/notice.html\"> 我的通知</a></li>")
        $("#userDD").append("<li class= \"glyphicon glyphicon-calendar\">"+
                            "<a href=\"../HTMLs/calendar.html\"> 行事曆</a></li>")

		/*
        if(userPermission>= 2){ // 版主
            $("#userDD").append("<li class= \"glyphicon glyphicon-alert\">"+
                                "<a href=\"../HTMLs/report.html\"> 檢舉區</a></li>")
        }
		*/
		
        if(userPermission>= 3){
            $("#userDD").append("<li class= \"glyphicon glyphicon-th-list\">"+
                                "<a href=\"../HTMLs/manageBoard.html\"> 管理看版</a></li>")
            $("#userDD").append("<li class= \"glyphicon glyphicon-king\">"+
                                "<a href=\"../HTMLs/moderator.html\"> 管理版主</a></li>")
            $("#userDD").append("<li class= \"glyphicon glyphicon-bullhorn\">"+
                                "<a href=\"../HTMLs/sendAlert.html\"> 發送通知</a></li>")
            $("#userDD").append("<li class= \"glyphicon glyphicon-ok\">"+
                                "<a href=\"../HTMLs/CheckCalendar.html\"> 審核行事曆</a></li>")

        }
    }

    // 點選最左邊的 ham menu(看版) -> 跳轉到特定看版
    $("#menu").on("click", "li", function () {
        let boardIndex = $("li").index($(this)); // this= <li>某某版</li>
        let boards = sessionStorage.getItem("Helen-boards");
        boards = JSON.parse(boards);
        sessionStorage.setItem("Helen-boardName", boards[boardIndex - 1]);
    });

    // 按搜尋或 'Enter Key' 搜尋頁面
    $("#searchBtn").click(function () {
        setSearchData();
    });
    $("#searchInputText").keypress(function (event) {
        if (event.keyCode == 13) { // 按下 ENTER
            setSearchData();
        }
    });

    // 登入/登出按紐
    $("#logInBtn").click(function () {
        location.href = "../HTMLs/login.html";
    });
    $("#logOutBtn").click(function () {
        let cmd = {};
        cmd["act"] = "logOut";
        cmd["account"] = sessionStorage.getItem("Helen-account");

        $.post("../index.php", cmd, function (dataDB) {
            dataDB = JSON.parse(dataDB);
            if (dataDB.status == false) {
                swal({
                    title: "登出失敗",
                    type: "error",
                    // text: dataDB.errorCode
                }).then((result) => { }, (dismiss) => { });
            }
            else { // 登出成功
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
                            userPermission = 0;
                            sessionStorage.clear();
                            location.href = "../HTMLs/home.html";
                        }
                    }
                )
            }
        });
    });

}

function setSearchData() {
    let searchType = $("#searchOption").val(); //獲取選中記錄的value值
    let searchStr = $("#searchInputText").val().trim();
    let searchArr = searchStr.split(" ");
    var contents = [];
    var hashtags = [];
    for (var i = 0; i < searchArr.length; i++) {
        if(searchType== 1){ // hashTag
            hashtags.push(searchArr[i]);
        }else{ // == 2, content
            contents.push(searchArr[i]);
        }
    }
    let searchData = {};
    searchData["content"] = contents;
    searchData["hashtag"] = hashtags;
    sessionStorage.setItem("Helen-search", JSON.stringify(searchData));

    if (sessionStorage.getItem("Helen-boardName") == null) {
        location.href = "../HTMLs/home.html";
    }else{
        location.href = "../HTMLs/sticky.html";
    }
}

function getUserInfo(resolve, reject) {
    if (sessionStorage.getItem("Helen-account") == null) {
        userPermission = 0;
        resolve(0);
    }
    else {
        let cmd = {};
        cmd["act"] = "showAuthority";
        cmd["account"] = sessionStorage.getItem("Helen-account");
        $.post("../index.php", cmd, function (dataDB) {
            dataDB = JSON.parse(dataDB);
            if (dataDB.status == false) {
                swal({
                    title: "獲取使用者權限失敗",
                    type: "error",
                    // text: dataDB.errorCode
                }).then((result) => { }, (dismiss) => { });
            }
            else {
                userData = dataDB.data; // permission, boardName
                // Test
                //  userData= {permission: 2};
                // Test End
				//console.log(userData.boardName[0].BoardName);
				
				for (var i = 0; i < userData.boardName.length; i++) {
					userBoard.push(userData.boardName[i].BoardName);
				}
				//console.log(userBoard);
				sessionStorage.setItem("User-boards", JSON.stringify(userBoard));
                userPermission = userData.permission;
                delete userData.permission;
            }
            resolve(0);
        });
    }

}

function getBoards(resolve, reject) {
    let boards = [];
    let cmd = {};
    cmd["act"] = "showBoardList";
    $.post("../index.php", cmd, function (dataDB) {
        dataDB = JSON.parse(dataDB);
        if (dataDB.status == false) {
            swal({
                title: "獲取看版失敗",
                type: "error",
                // text: dataDB.errorCode
            }).then((result) => { }, (dismiss) => { });
        }
        else {
            dataDB = dataDB.data;
            for (var i = 0; i < dataDB.length; i++) {
                boards.push(dataDB[i].boardName);
            }
            if (boards.length == 0) {
                console.log("沒有看版");
            }
			//console.log(dataDB);
            sessionStorage.setItem("Helen-boards", JSON.stringify(boards));
        }
        resolve(0);
    });

    //Test
    // boards= ["美食", "廢文", "八卦", "企鵝", "漫威", "星座", "旅遊"];
    //Test End

}

function applyForBoard() {
    let boards = sessionStorage.getItem("Helen-boards");
    boards = JSON.parse(boards);

    let addingQueue = [];
    let steps = [1, 2];

    addingQueue.push(
        {
            title: "新增看板申請<br /><small>&lt;看板名稱&gt;</small>",
            input: "text",
            inputPlaceholder: "請輸入看板名稱(不包含「版」)...",
            showCancelButton: true,
            confirmButtonText: "送出",
            cancelButtonText: "取消",
            animation: false,
        });

    addingQueue.push(
        {
            title: "新增看板申請<br /><small>&lt;申請原因&gt;</small>",
            input: "textarea",
            inputPlaceholder: "請輸入申請原因...",
            showCancelButton: true,
            confirmButtonText: "送出",
            cancelButtonText: "取消",
            animation: false,
        });

    swal.setDefaults({ progressSteps: steps });

    swal.queue(addingQueue).then(async (result) => {
        swal.setDefaults({ progressSteps: false });

        let dup = boards.indexOf(result[0]) != -1;

        while (result[0] !== false && (result[0] === "" || result[0].includes("版") || dup)) {
            if (result[0] === "") {
                result[0] = await swal({
                    title: "看板名稱不得為空",
                    type: "warning",
                    input: "text",
                    inputPlaceholder: "請輸入看板名稱...",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",

                }).then((result) => {
                    return result;

                }, (dismiss) => {
                        return false;
                    });
            }

            if (dup) {
                result[0] = await swal({
                    title: "看板已存在，請重新輸入",
                    type: "warning",
                    input: "text",
                    inputPlaceholder: "請輸入看板名稱...",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",

                }).then((result) => {
                    return result;

                }, (dismiss) => {
                        return false;
                    });
            }

            if (typeof result[0] == "string" && result[0].includes("版")) {
                result[0] = await swal({
                    title: "看板名稱不得含有「版」",
                    type: "warning",
                    input: "text",
                    inputPlaceholder: "請輸入看板名稱...",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",

                }).then((result) => {
                    return result;

                }, (dismiss) => {
                        return false;
                    });
            }

            dup = boards.indexOf(result[0]) != -1;
        }

        if (result[0] == false) return;

        let newBoard = result[0] + "版";
        let cmd = {};
        cmd[ "act" ] = "newApplyBoard";
        cmd[ "account" ] = sessionStorage.getItem("Helen-account");
        cmd[ "content" ] = "看板" + newBoard + " " + result[1];
        cmd[ "type" ] = "board"; 

        $.post( "../index.php", cmd, function(dataDB)
        {
            dataDB = JSON.parse(dataDB);

            if (dataDB.status == false) {
                swal({
                    title: "申請看板失敗<br/><small>&lt;" + newBoard + "&gt;</small>",
                    type: "error",
                    text: dataDB.errorCode,
                    confirmButtonText: "確定",

                }).then((result) => { }, (dismiss) => { });
            }
            else {
                swal({
                    title: "申請看板成功<br/><small>&lt;" + newBoard + "&gt;</small>",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,

                }).then((result) => { }, (dismiss) => { });
            }
        });

    }, (dismiss) => 
    {
        swal.setDefaults( { progressSteps: false } );
    });
}

async function applyForModerator()
{
    if( canApplyModerator )
    {
        let boards = sessionStorage.getItem( "Helen-boards");
        boards = JSON.parse( boards ); 

        let validBoards = [...boards];

        for (let i in boards) {
            if (invalidBoards.find((element) => element.boardName == boards[i]) !== undefined) {
                validBoards.splice(validBoards.indexOf(boards[i]), 1);
            }
        }

        if (validBoards.length == 0) {
            await swal({
                title: "無法申請看板",
                type: "error",
                text: "還沒有可申請的看板哦",
                confirmButtonText: "確定",

            }).then((result) => { }, (dismiss) => { });

            return;
        }

        let addingQueue = [];
        let steps = [1, 2];

        addingQueue.push(
            {
                title: "申請成為版主<br /><small>&lt;看板名稱&gt;</small>",
                input: "select",
                inputOptions: validBoards,
                showCancelButton: true,
                confirmButtonText: "送出",
                cancelButtonText: "取消",
                animation: false,
            });

        addingQueue.push(
            {
                title: "申請成為版主<br /><small>&lt;申請原因&gt;</small>",
                input: "textarea",
                inputPlaceholder: "請輸入申請原因...",
                showCancelButton: true,
                confirmButtonText: "送出",
                cancelButtonText: "取消",
                animation: false,
            });

        swal.setDefaults({ progressSteps: steps });

        swal.queue(addingQueue).then(async (result) => {
            swal.setDefaults({ progressSteps: false });

            let newBoard = validBoards[result[0]] + "版";
            let cmd = {};
            cmd[ "act" ] = "newApplyBoard";
            cmd[ "account" ] = sessionStorage.getItem("Helen-account");
            cmd[ "content" ] = "版主" + newBoard + " " + result[1];
            cmd[ "type" ] = "moderator"; 
            $.post( "../index.php", cmd, function(dataDB)
            {
                dataDB = JSON.parse(dataDB);

                if (dataDB.status == false) {
                    swal({
                        title: "申請版主失敗<br/><small>&lt;" + newBoard + "&gt;</small>",
                        type: "error",
                        text: dataDB.errorCode,
                        confirmButtonText: "確定",

                    }).then((result) => { }, (dismiss) => { });
                }
                else {
                    swal({
                        title: "申請版主成功<br/><small>&lt;" + newBoard + "&gt;</small>",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000,

                    }).then((result) => { }, (dismiss) => { });
                }
            });

        }, (dismiss) => 
        {
            swal.setDefaults( { progressSteps: false } );
        });
    }
    else
    {
        swal({
            title: "無法申請版主",
            type: "error",
            text: applyError,
            confirmButtonText: "確定",

        }).then((result) => {}, ( dismiss ) => {});
    }
}

function getInvalidBoards(resolve, reject)
{
    let cmd = {};
    cmd[ "act" ] = "showModerator";
    $.post( "../index.php", cmd, async function(dataDB)
    {
        dataDB = JSON.parse(dataDB);

        if( dataDB.status == false )
        {
            swal({
                title: "無法申請看板",
                type: "error",
                text: dataDB.errorCode,
                confirmButtonText: "確定",

            }).then((result) => {
                canApplyModerator = false;
                applyError = dataDB.errorCode;

            }, ( dismiss ) => {
                canApplyModerator = false;
                applyError = dataDB.errorCode;
                invalidBoards = {};
            });
        }
        else
        {
            canApplyModerator = true;
            applyError = "";
            invalidBoards = dataDB.data;
        }
        resolve(0);
    });
}
