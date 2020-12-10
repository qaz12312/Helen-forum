let boards= [];// [{boardName: "1"}, {boardName: "2"}, ...]
let userData= {};

$(document).ready(function(){
    barInitial();
})

function barInitial(){
    getBoards();
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