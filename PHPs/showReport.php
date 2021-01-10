<?php
/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showReport";
    cmd["boardName"] = "企鵝";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "No report right now." / "Successfully show the board's reports.";
        dataDB.data // 檢舉
        (
            dataDB.data[0].title  // 第1筆檢舉的Title
            dataDB.data[0].reason // 第1筆通知的Reason
            dataDB.data[0].time // 第1筆通知的Time
            ...
        )
    否則
        dataDB.errorCode = "No report right now.";
        dataDB.data = "";
    */
function doShowReport($input){ //查看board底下的文章檢舉
    global $conn;
    $sql="SELECT `Title`,`Reason`,Report.Times ,Report.ArticleID FROM `Report` JOIN `Article`  ON Article.ArticleID = Report.ArticleID  WHERE  `BlockName`=? ORDER BY `ArticleID` ASC, `Times` DESC ";
    $arr = array($input['boardName']);
    $result = query($conn,$sql,$arr,"SELECT");
    $resultCount = count($result);
    if ($resultCount <= 0) {
        $rtn = successCode("No report right now.");
    } else {
        $arr = array();
        for($i=0;$i<$resultCount;$i++){
            $row = $result[$i];
            $idx = strval($row[3]);
            if(!isset($arr[$idx])){
                $arr[$idx] = [];
            }
            array_push($arr[$idx],array("title" => $row[0],"reason" => $row[1], "time" => $row[2]));
        }
        $rtn = successCode("Successfully show the board's reports.",$arr);
    }
    echo json_encode($rtn);
}
?>