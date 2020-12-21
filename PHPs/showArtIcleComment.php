<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showArticleComment";
    cmd["articleID"] = "ArticleID";
    cmd["account"] = "00757003";    // 訪客不用傳ㄋ
    s
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = ""
        dataDB.data[i] //有i筆文章
        (
        dataDB.data.comment[i].content //第i筆留言的內文
        dataDB.data.comment[i].floor //第i筆留言的樓層
        dataDB.data.comment[i].nickname
        dataDB.data.comment[i].color
        ) 
        dataDB.data.title //第i筆文章的標題
        dataDB.data.like //第i筆文章的總愛心數
        dataDB.data.keep//第i筆文章的總收藏數
        dataDB.data.nickname
        dataDB.data.color
    否則
        dataDB.errorCode = "Article doesn't exit."
        dataDB.data = ""
    */
    function doShowArticleComment($input){
        global $conn;
        $sql="SELECT `Title`,`Content`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `ArticleID`=?";
        $arr = array($input['articleID']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Article doesn't exit.");
        }
        else{
            $arr=array();
            // foreach($result as $row){
            $articleID=$result[0][3];
            if(isset($input['account'])){
                $userID=$input['account'];
                $sql ="SELECT UserID FROM FollowHeart WHERE `ArticleID`=? AND`UserID`=?" ;
                $arr = array($articleID, $input['account']);
                $heart = query($conn,$sql,$arr,"SELECT");
                $heartCount = count($heart);

                $sql ="SELECT UserID FROM FollowKeep WHERE `ArticleID`=? AND`UserID`=?" ;
                $arr = array($articleID, $input['account']);
                $keep = query($conn,$sql,$arr,"SELECT");
                $keepCount = count($keep);
                $arr = array("title"=>$result[0][0],"content"=>$result[0][1],"blockName"=>$result[0][2],"articleID"=>$result[0][3],"like"=>$result[0][4],"keep"=>$result[0][5], "hasHeart" => ( $heartCount>0 ? 1 : 0), "hasKeep" => ($keepCount>0 ? 1 : 0 ));
            }else
                $arr = array("title"=>$result[0][0],"content"=>$result[0][1],"blockName"=>$result[0][2],"articleID"=>$result[0][3],"like"=>$result[0][4],"keep"=>$result[0][5], "hasHeart" => "", "hasKeep" =>"");

            $sql ="SELECT `Nickname`, `Color`,`Content`,`Floor` FROM Comments JOIN Users ON Users.UserID=Comments.AuthorID WHERE `ArticleID`=? order by Floor ASC " ;
            $arr3 = array($articleID);
            $comment = query($conn,$sql,$arr3,"SELECT");
            $commentCount = count($comment);
            $arr2=array();
            if($commentCount <= 0){
                $arr2[0] = successCode("No comment.");
            }
            else{
                for($i=0;$i<$commentCount;$i++){
                    $row = $comment[$i];
                    $arr2[$i]=array("nickname"=>$row[0],"color"=>$row[1],"content"=>$row[2],"Floor"=>$row[3] );
                }
            }
            $arr['comment']=$arr2;
            $rtn = successCode("Successfully show article and comment.",$arr);
        }
        echo json_encode($rtn);
    }
?>