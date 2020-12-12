let boards= []; // (array) [{boardName: "1"}, {boardName: "2"}, ...]
let userData= {}; // (dir)

$(document).ready(function(){
    barInitial();
})

function barInitial(){
    $("#menu").empty();
    getBoards();
    for(var i= 0; i< boards.length; i++){
        var oneBoard= boards[i].boardName;
        $("#menu").append("<a href=\"#\"><li>"+ oneBoard+"版</li></a>");
    }
}

function getUserInfo(){
    let cmd= {};
    cmd["act"]= "userInfo";
    $.post("../index.php", cmd, function(dataDB){
        dataDB= JSON.parse(dataDB);
        if(dataDB.status == false){
            swal({
                title: "獲取使用者資料失敗",
                type: "error",
                // text: dataDB.errorCode
            });
        }
        else{
            userData= daraDB.data;
        }
    });
    
    //Test
    userData= {account: "00757015", 
                color: "#FF00FF", 
                nickname: "Cola", 
                premission: 2};
    //Test End
    console.log(userData);

    sessionStorage.setItem("Helen-userInfo", JSON.stringify(userData));
}

function getBoards(){
    let cmd= {};
    cmd["act"]= "boardList";
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
    boards= [{boardName: "美食"}, 
            {boardName: "廢文"},
            {boardName: "八卦"},
            {boardName: "企鵝"},
            {boardName: "漫威"}];
    //Test End

    if(boards.length== 0){
        console.log("沒有看版");
    }

    sessionStorage.setItem("Helen-boards", JSON.stringify(boards));
}