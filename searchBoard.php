<!-- 前端 to 後端:
let cmd = {};
cmd["act"] = "searchBoard";
cmd["searchWord"] = "美食";
cmd["searchBoard"] = "美食版";
<!--
後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
 dataDB.data[i] //有i筆文章
   (
     dataDB.data[i].title //第i筆文章的標題
	 dataDB.data[i].blockName //第i筆文章的所屬看板
	 dataDB.data[i].articleID //第i筆文章的id
     dataDB.data[i].like //第i筆文章的總愛心數
     dataDB.data[i].keep //第i筆文章的總收藏數
    ) 
否則
    dataDB.data = "沒有文章" -->

<?php
	require_once 'connectDB.php'; //連線資料庫
	global $input,$conn;
	
	$sql1="CREATE VIEW TitleBoardNameArticleIDUserID(`Title`,`BoardName`,`ArticleID`,`cntHeart`) AS SELECT `Title`,`BoardName`,`ArticleID`,COUNT(`UserID`) FROM `Article` JOIN `Board` ON Article.BlockID= Board.BlockID JOIN `FollowHeart` ON Article.ArticleID= FollowHeart.ArticleID GROUP BY `ArticleID`";
	$result=$conn->query($sql1);
	if(!$result){
            die($conn->error);
    }
	$sql2="CREATE VIEW TitleBoardNameArticleIDKeepID(`Title`,`BoardName`,`ArticleID`,`cntKeep`) AS SELECT `Title`,`BoardName`,`ArticleID`,COUNT(`KeepID`) FROM `Article` JOIN `Board` ON Article.BlockID= Board.BlockID JOIN `FollowKeep` ON Article.ArticleID= FollowKeep.ArticleID GROUP BY `ArticleID` ";
	$result=$conn->query($sql2);
	if(!$result){
            die($conn->error);
    }
	$sql3="SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM TitleBoardNameArticleIDUserID NATURAL JOIN TitleBoardNameArticleIDKeepID WHERE (`Content` LIKE '%".$input['searchWord']."%' OR `Title` LIKE '%".$input['searchWord']."%') AND `BoardName` = '".$input['searchBoard']."' ORDER BY `Times` DESC";
	$result=$conn->query($sql3);
      if(!$result){
        die($conn->error);
    }
	
	if($result->num_rows <= 0){	//找不到文章
            $rtn = array();
            $rtn["statue"] = false;
            $rtn["errorCode"] = "沒有文章";
            $rtn["data"] = "";
    }
	
	else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){	//回傳找到的文章(包含關鍵字)
                $row=$result->fetch_row();
                $log=array("title"=>"$row[0]","blockName"=>"$row[1]","articleID"=>"$row[2]","like"=>"$row[3]","keep"=>"$row[4]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
?>