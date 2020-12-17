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
