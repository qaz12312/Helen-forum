<?php
    function connSql(){     
        $serverName = "helendb.chw8qvtxo3mu.us-east-1.rds.amazonaws.com";
        $userName = "helen";
        $password = "ynVdCeYKBrDJ";
        $databaseName = "test";
        $conn = mysqli_connect($serverName, $userName, $password, $databaseName);
        mysqli_query($conn, 'SET NAMES utf8');
        if($conn->connect_error){
            die($conn->connect_error);
        }
        return $conn;
    }
?>