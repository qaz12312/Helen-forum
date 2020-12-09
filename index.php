<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type:text/html; charset=utf-8");
    date_default_timezone_set("Asia/Taipei");
    error_reporting(1);
    error_reporting(E_ALL);
    $input = $_POST;
    require_once("connectDB.php");
    $conn = connSql();
    // session_start();
    switch ($input["act"]) {
        case "logIn": //登入
            require_once("logIn.php");
            doLogIn($input);
            break;
        case "browseAuthority": //獲得權限+所管理的版
            require_once("browseAuthority.php");
            doBrowseAuthority($input);
            break;
        case "creatAccount": //註冊
            require_once("signUp.php");
            doCreatAccount($input);
            break;
        case "modifyPersonalInfo": //修改個資
            require_once("personalInfo.php");
            break;
        case "":
            require_once("");
            break;
    }
?>