<?php
    //連線資料庫
    $serverName = "sql301.epizy.com";
    $userName = "epiz_24878672";
    $password = "ynVdCeYKBrDJ";
    $databaseName = "epiz_24878672_homework";

    header("Access-Control-Allow-Origin: *");
    header("Content-Type:text/html; charset=utf-8");
    date_default_timezone_set("Asia/Taipei");

    $conn = mysqli_connect($serverName, $userName, $password,$databaseName);// 建立資料庫連接 

    if($conn->connect_error){//無法開啟資料庫連接
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
        case "publishArticle"://新增文章
            publishArticle.php
        case "report":	//檢視檢舉
            admin.php
            break;
    }
?>

<?php
    //連接資料庫
    $serverName = "sql301.epizy.com";//主機名或IP位址
    $userName = "root";
    $password = "ynVdCeYKBrDJ";
    $databaseName = "epiz_24878672_homework";
    try{
        $conn = new PDO("mysql:host=".$serverName.";dbname=".$databaseName,$userName,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));//MariaDB連線的物件
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//透過db連線引出連線錯誤報告以及拋出exceptions異常
        $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);//交由database Driver預處理(prepare)，除非driver不能成功預處理(prepare)，才會交由PDO模擬

    }catch(PDOException $e){
        echo "ERROR!:". $e->getMessage();
        die();
    }

    //$conn = null;//關閉與MariaDB連線
?>
