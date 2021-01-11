<?php
function errorCode($msg){
    $rtn = array();
    $rtn["status"] = false;
    $rtn["errorCode"] = $msg;
    $rtn["data"] = "";
    echo json_encode($rtn);
    die();
}

function successCode($info,$data = ""){
    $rtn = array();
    $rtn["status"] = true;
    $rtn["info"] = $info;
    $rtn["data"] = $data;
    return $rtn;
}

function query($conn,$sql,$input,$option){
    try{
        $stmt =  $conn->prepare($sql);
    }catch(PDOException $e){
        errorCode("【SQL ".$option."-query】failed: ". $e->getMessage());
    }
    try{
        $error = $stmt->execute($input);
        if(!$error){
            errorCode("【query ".$option."-execute】failed.");
        }
    }catch(PDOException $e){
        errorCode("【SQL ".$option."-execute】failed: ". $e->getMessage());
    }
    if($option=="SELECT"){
	    return $stmt->fetchAll();
    }
}

// function query($conn,$sql,$input,$option){
//     $result = $conn->query($sql);
// 	if (!$result) {
//         errorCode("【SQL ".$option."-query】failed.");
// 		die($conn->error);
//     }
//     return $result;
// }
?>
<?php
    /*
    $infoU:account  // 資料夾名稱
    $infoA:act      // 重要動作
    $infoI:info     // 要 寫進檔案的內容
    */
    // log - db
    function writeRecord($infoU,$infoA,$infoI){
        global $conn;
        $sql="INSERT INTO `Logs`(`UserID`,`Act`,`Info`) VALUES(?,?,?)";
        $arr = array($infoU,$infoA,$infoI);
        query($conn,$sql,$arr,"INSERT");
    }
?>
<?php
    /*
    $infoA:account // 資料夾名稱
    $infoT:time // 檔名(2020-12-21 22-15)
    $infoI:info // 要 寫進檔案的內容
    */
    // log - txt file
    function writeRecordSTOP($infoA,$infoT,$infoI){
        $TxtFileName = "./Data/Record/".$infoA."/".$infoT.".txt";
        if( ($file=fopen($TxtFileName,"a")) === FALSE){
            return "建立可寫檔案：".$TxtFileName."失敗";
            exit();
        }
        $date = date_create('now', new DateTimeZone('Asia/Taipei'));
        $time = date_format($date, 'Y-m-d H:i:s');
        $str = "【".$time."】 ".$infoI."\n";
        if(!fwrite ($file,$str)){
            fclose($file);
            return "嘗試向檔案".$TxtFileName."寫入".$StrConents."失敗！";
            exit();
        }
        fclose ($file);
    }
    /*
    account // 資料夾名稱
     */
    // dir
    function newUserFolder($account){
        $root = "./Data/Record/".$account;
        if (!is_dir($root)){
            mkdir($root,0777,true);
        }
    }
?>
<?php
	/*
    account = "00757007";
	*/
    function showAuthority($input,$option=0){
        global $conn;
        $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`=? AND `UserID` not in ('admin')";
        $result = query($conn,$sql,array($input),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $sql="SELECT `IsAdmin` FROM `Users` WHERE `UserID`=?";
            $result = query($conn,$sql,array($input),"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                $authority=0;
            }else if($result[0][0]){
                $authority=3;
            }else{
                $authority=1;
            }
        }
        else{
            $authority=2;
        }
        if($option){
            return $authority;
        }else{
            $rtn = successCode("Successfully show.",$authority);
            echo json_encode($rtn);
        }
    }
    function GetIP(){
        if(!empty($_SERVER["HTTP_CLIENT_IP"])){
            $cip = $_SERVER["HTTP_CLIENT_IP"];
        }
        elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
            $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        }
        elseif(!empty($_SERVER["REMOTE_ADDR"])){
            $cip = $_SERVER["REMOTE_ADDR"];
        }
        else{
            $cip = "無法取得IP位址！";
        }
        return $cip;
    }
?>
