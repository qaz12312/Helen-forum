<?php
    $serverName = "helendb.chw8qvtxo3mu.us-east-1.rds.amazonaws.com";
    $userName = "helen";
    $password = "ynVdCeYKBrDJ";
    $databaseName = "test";
    header("Access-Control-Allow-Origin: *");
    header("Content-Type:text/html; charset=utf-8");
    date_default_timezone_set("Asia/Taipei");
	error_reporting(1);
	error_reporting(E_ALL);
    $conn = mysqli_connect($serverName, $userName, $password, $databaseName);
    mysqli_query($conn, 'SET NAMES utf8');
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $input = array();
    // 自己放測試資料
    $input["act"] = "logIn";
	$input["account"] = "admin";
    $input["password"] = "admin";
?>