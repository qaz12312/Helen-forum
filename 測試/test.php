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
    // 改--自己放測試資料 ////////////////////////////////////////////
    $input = array();
    // $input["act"] = "logIn";
	// $input["account"] = "admin";
    // $input["password"] = "admin";
		$input["act"] = "addArticle";
		$input["articleID"] = "ArticleID";
        $input["authorID"] = "AuthorID";
        $input["blockID"] ="美食版";
        $input["title"] = "Title";
        $input["content"] = "Content";
        $input["picture "] = "Image";
        $input["hashTag"] ="HashTag";
        $input["timer"] ="2020-12-06 02:55:05";
			
    $input["act"] = "modifyPersonalInfo";
    $input["account"] = "00857210@mail.ntou.edu.tw";
    $input["option"] = /*"password" /*/ "nickname" /*/ "color"*/;
    $input["new"] = /*"123456789" /*/ "beauty cook~" /*/ "\#028d5f"*/;
    /////////////////////////////////////////////////////////////////
?>