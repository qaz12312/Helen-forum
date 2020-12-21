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
    return $stmt->fetchAll();
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
    account // 資料夾名稱
    time // 檔名(2020-12-21 22-15)
    info // 要 寫進檔案的內容
    */
    // log
    function writeRecord($info){
        $TxtFileName = "./Data/Record/".$info["account"]."/".$info["time"].".txt";
        //以讀寫方式打寫指定檔案，如果檔案不存則建立
        if( ($file=fopen ($TxtFileName,"a")) === FALSE){
            return "建立可寫檔案：".$TxtFileName."失敗";
            exit();
        }
        if(!fwrite ($file,$info["info"]."\n")){ //將資訊寫入檔案
            fclose($file);
            return "嘗試向檔案".$TxtFileName."寫入".$StrConents."失敗！";
            exit();
        }
        fclose ($file); //關閉指標
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