<?php
    /*
    account // 資料夾名稱
    time // 檔名(2020/12/21 22-15)
    info // 要 寫進檔案的內容
    */
    // log
    function writeLog($info){
        $TxtFileName = "../Data/Record/".$info["account"]."/".$info["time"].".txt";
        //以讀寫方式打寫指定檔案，如果檔案不存則建立
        if( ($TxtRes=fopen ($TxtFileName,"a")) === FALSE){
            echo("建立可寫檔案：".$TxtFileName."失敗");
            exit();
        }
        if(!fwrite ($TxtRes,$input["info"]."\n")){ //將資訊寫入檔案
            echo ("嘗試向檔案".$TxtFileName."寫入".$StrConents."失敗！");
            fclose($TxtRes);
            exit();
        }
        fclose ($TxtRes); //關閉指標
    }
?>