<? php
    $sql ="SELECT `Time`,`Content` FROM `Notice` where `UserID`= $input[`account`] order by `Time`asc" ;
    global $conn;
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "沒有";
        $rtn["data"] = "";
    }
    else{
        $arr=array();
        for($i=0;$i<$result->num_rows;$i++){
            $row=$result->fetch_row();
            $log=array("title"=>"$row[0]","blockName"=>"$row[1]","like"=>"$row[2]","keepID"=>"$row[3]");
            $arr[$i]=$log;
        }
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] =$arr;
    }
    echo json_encode($rtn);
    
?>