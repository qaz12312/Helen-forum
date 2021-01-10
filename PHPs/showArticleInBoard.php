<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showArticleInBoard";
    cmd["boardName"] = "BoardName";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Board didn't have any article." / "Successfully article in board.";
        dataDB.data.articleList[i] //有i筆文章
        (
            dataDB.data.articleList[i].title //第i筆文章的標題
            dataDB.data.articleList[i].articleID
            dataDB.data.articleList[i].like //第i筆文章的總愛心數
            dataDB.data.articleList[i].keep//第i筆文章的總收藏數
        ) 
        dataDB.data.topArticleID //置頂文章
        dataDB.data.rule // 板規
    否則
        dataDB.errorCode = "Board is disappear." / "Article not in this board.";
        dataDB.data = "";
    */
    function doShowArticleInBoard($input){
        global $conn;
        $sql="SELECT `Rule`,`TopArticleID` FROM `Board` WHERE `BoardName`=?";//版是否存在
        $arr = array($input['boardName']);
        $result2 = query($conn,$sql,$arr,"SELECT");
        $result2Count = count($result);
        if($result2Count <= 0 ){
            errorCode("Board is disappear.");
        }

        $sql="SELECT `Title`,`ArticleID` ,`cntHeart`,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName`=?";
        $arr = array($input['boardName']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);

        if($resultCount <= 0 ){
            $rtn = successCode("Board didn't have any article.");
        }
        else{
            $articleList = array();
            for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $articleList[$i]=array("title"=>$row[0],"articleID"=>$row[1],"like"=>$row[2],"keep"=>$row[3]);
            }
            $arr = array("articleList"=>$articleList,"topArticleID"=>$result2[0][1],"rule"=>$result2[0][0]);
            $rtn = successCode("Successfully article in board.",$arr);
        }
        echo json_encode($rtn);
    }
?>