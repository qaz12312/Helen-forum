
document.querySelector("html").classList.add('js');

    
$(document).ready(async function(){
    barInitial();
    await new Promise((resolve, reject) => initial(resolve, reject));
})

$("#allday").click(function () {
    if ($(this).prop("checked")) {
        //$("#activityStartTime").attr('disabled','disabled');
        document.getElementById("activityStartTime").disabled = true;
        document.getElementById("activityEndTime").disabled = true;
        $("#activityStartTime").val("");
        $("#activityEndDate").val($("#activityStartDate").val());
        $("#activityEndTime").val("");
        $(this).val("true");
    } else {
        document.getElementById("activityStartTime").disabled = false;
        document.getElementById("activityEndTime").disabled = false;
        $(this).val("false");
    }
});
  
$("#newActivity").on("click", function(){
    console.log("I want publish.");
    var titleStr= $("#activityTitle").val().trim();
    var contentStr= $("#activityContent").val().trim();
    
    if(titleStr.length< 1){
        console.log("(Title) Too short.")
        swal({
            title: "標題太短嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }else if(titleStr.length> 127){
        console.log("(Title) Too long.")
        swal({
            title: "標題太長嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    if(contentStr.length< 1){
        console.log("(Content) Too shor.")
        swal({
            title: "內容太少嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }else if(contentStr.length> 20000){
        console.log("(Content) Too long.")
        swal({
            title: "內容太多嘍！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    if($("#allday").val()=="false" && (!$("#activityStartTime").val() ||!$("#activityEndTime").val())){
        swal({
            title: "請輸入時間或勾選全天！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    if(!$("#activityStartDate").val()){
        swal({
            title: "請輸入開始日期！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
    if($("#allday").val()=="false" && !$("#activityEndDate").val()){
        swal({
            title: "請輸入結束日期！",
            type: "warning",
            // text: dataDB.errorCode
        }).then(( result ) => {}, ( dismiss ) => {});
        return;
    }
        var startDate;
        var endDate;
    if($("#activityStartTime").val())
        startDate= $("#activityStartDate").val()+"T"+$("#activityStartTime").val()+":00";
    else
        startDate= $("#activityStartDate").val()+"T"+"00:00:00";

    if($("#activityEndTime").val())
        endDate= $("#activityEndDate").val()+"T"+$("#activityEndTime").val()+":00";
    else if($("#allday").val()=="true")
        endDate= $("#activityStartDate").val()+"T"+"23:59:59";

        var myStartDate = new Date(startDate);
        var myEndDate = new Date(endDate);
        var now=new Date();
        if(!(myStartDate <= myEndDate)||myEndDate<=now||myStartDate<=now){
            swal({
                title: "日期或時間輸入錯誤<br>請重新輸入！",
                type: "warning",
                // text: dataDB.errorCode
            }).then(( result ) => {}, ( dismiss ) => {});
            return;
        }

    let cmd= {};
    cmd["act"]= "newActivityInCanlendar";
    cmd["account"]= sessionStorage.getItem("Helen-account");
    cmd["title"] =titleStr;
    

    cmd["startTime"] =startDate;
    cmd["endTime"] = endDate;
    cmd["text"] =  $("#activityContent").val();
    console.log(cmd);
    
    $.post("../index.php", cmd, function(dataDB){
        var dataDB= JSON.parse(dataDB);
        if(dataDB.status== false){
            swal({
                title: "發佈文章失敗，請稍後重試！",
                type: "error",
                text: dataDB.errorCode,
                animation: false
            }).then(( result ) => {}, ( dismiss ) => {});
        }
        else{
            // ?依最新排序的首頁
            sessionStorage.setItem("Helen-act", "home");
            sessionStorage.setItem("Helen-sort", "最新");
            window.location.href = "../HTMLs/home.html";
        }
    })
})

$("#cancelActivity").on("click", function(){//取消
    console.log("Back To HOME Page.")
    window.location.href =  "./home.html";
})


async function initial(res, rej){
    let r = await new Promise((resolve, reject) => checkPermission(resolve, reject)
         // 未登入
    );
    $("#activityStartDate").val(sessionStorage.getItem("Helen-startTime"));
    if(!r) return;

    //selector 載入所有看版(從 session)
    let boardData= sessionStorage.getItem("Helen-boards");
    boards= JSON.parse(boardData);

    $("#chooseBoard").empty();
    for(var i= 0; i< boards.length; i++){
        $("#chooseBoard").append(new Option(boards[i]+ "版"), i, false);
    }
    $("#allday").prop('checked', false);
    $("#activityStartDate").val("");
    $("#activityStartTime").val("");
    $("#activityEndDate").val("");
    $("#activityEndTime").val("");
    res(0);
}

function checkPermission(resolve, reject){
    if(sessionStorage.getItem("Helen-account")){
        resolve(true);
    }
    else{
        swal({
            title: "載入頁面失敗",
            type: "error",
            text: "請先登入！"
        }).then(( result ) => {
            if ( result ){
                $( "body" ).empty();
                let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>403 Forbidden</h1>";
                $( "body" ).append( httpStatus );
            }
        }).then(( result ) => {}, ( dismiss ) => {});
        resolve(false);
    }
}