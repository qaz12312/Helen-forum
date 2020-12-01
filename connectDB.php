<?php//連線資料庫 
    $serverName = "sql301.epizy.com";
    $userName = "epiz_24878672";
    $password = "ynVdCeYKBrDJ";
    $databaseName = "epiz_24878672_homework";
?>

<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type:text/html; charset=utf-8");
    date_default_timezone_set("Asia/Taipei");

    $conn = mysqli_connect($serverName, $userName, $password,$databaseName);

    if($conn->connect_error){
        die($conn->connect_error);
    }
    mysqli_query($conn, 'SET NAMES utf8'); //避免中文字亂碼 
    
    $input = $_POST; // 從前端拿到資料

    switch($input["act"]){
        case "logIn": //登入
            logIn.php;
            break;
        case "creatAccount": //註冊
            signUp.php;
            break;

        case "forgottenPwd": //忘記密碼
            forgetPassword.php;
            break;
        case "home": // 系統首頁
            home.php
            break;
	case "report":	//檢視檢舉
	    admin.php
	    break;
    }
?>
