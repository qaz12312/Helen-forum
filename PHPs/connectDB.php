<?php
    function connSql(){     
        $serverName = "helendb.chw8qvtxo3mu.us-east-1.rds.amazonaws.com";
        $userName = "helen";
        $password = "ynVdCeYKBrDJ";
        $databaseName = "test";
        header("Access-Control-Allow-Origin: *");
        header("Content-Type:text/html; charset=utf-8");
        date_default_timezone_set("Asia/Taipei");
        try{
            $conn = new PDO("mysql:host=".$serverName.";dbname=".$databaseName,$userName,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));//MariaDB連線的物件
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
        }catch(PDOException $e){
            errorCode("【Connection Database】failed: " . $e->getMessage());
        }
        error_reporting(1);
        error_reporting(E_ALL);
        return $conn;
    }
?>