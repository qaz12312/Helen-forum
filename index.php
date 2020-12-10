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
         case "boardList":
            require_once("boardList.php");
            doBoardList($input);
            break;
         case "browseAuthority": // 【前端頁面】查看權限(若為版主，則是所屬看板)
            require_once("browseAuthority.php");
            doBrowseAuthority($input);
            break;
         case "browseNotification": //【user】查看user的通知
            require_once("browseNotification.php");
            doBrowseNotification($input); 
            break;
         case "browseReport": //【版主】查看board底下的文章檢舉
            require_once("browseReport.php");
            doBrowseReport($input);
            break;
         case "heart": //【user】點擊愛心&取消
            require_once("changeHeart.php");
            doAddDeleteHeart($input);
            break;
         case "keep": //【user】點擊收藏&取消
            require_once("changeKeep.php");
            doAddDeleteKeep($input);
            break;
         case "clickNotice"://【user】點通知->刪除此則通知
            require_once("clickNotice.php");
            doClickNotice($input);
            break;
         case "deleteArticle"://【user】刪除他發過的文章
            require_once("deleteArticle.php");
            doDeleteArticle($input);
            break;
         case "deleteBoard": //【admin】刪除board
            require_once("deleteBoard.php");
            doDeleteBoard($input);
            break;
         case "deleteComment": // 【user】刪除他留過的留言
            require_once("deleteComment.php");
            doDeleteComment($input);
            break;
         case "deleteDir": // 【user】刪除他的收藏資料夾
            require_once("deleteDir.php");
            doDeleteDir($input);
            break;
         case "deleteReport": // 【版主】審核被檢舉文章
            require_once("deleteReport.php");
            doDeleteReport($input);
            break;
         case "editArticle": // 【user】修改自己發過的文章
            require_once("editArticle.php");
            doEditArticle($input);
            break;
         case "editBoard": // 【版主】更改board的名字 + 版規 --------------------------------版主是否可以自己更動版名?
            require_once("editBoard.php");
            doEditBoard($input);
            break;
         case "addKeepDir":
            require_once("editCollectionCatalog.php");
            doEditCollectionCatalog($input);
            break;
         case "editComment": // 【user】編輯自己留過的留言
            require_once("editComment.php");
            doEditComment($input);
            break;
         case "editModerator":
            require_once("editModerator.php");
            doEditModerator($input);
            break;
         case "editTopArticle": //【版主】選擇置頂一篇文章
            require_once("editTopArticle.php");
            doEditTopArticle($input);
            break;
         case "logIn": //登入
            require_once("logIn.php");
            doLogIn($input);
            break;
         case "logOut": //登出
            require_once("logOut.php");
            doLogOut($input);
            break;   
         case "newArticle": //【user】新增文章
            require_once("newArticle.php");
            doNewArticle($input);
            break;
         case "newBoard": //【admin】新增board
            require_once("newBoard.php");
            doNewBoard($input);
            break;
         case "newComment": //【user】留言
            require_once("newComment.php");
            doNewComment($input);
            break;
         case "newDir": //【user】新增收藏資料夾
            require_once("newDir.php");
            doNewDir($input);
            break;
         case "modifyPersonalInfo": // 【user】修改個人資料(密碼/暱稱/顏色)
            require_once("personalInfo.php");
            break;
         case "showPostRecord": // 【user】的發文記錄列表
            require_once("showPostRecord.php");
            doShowPostRecord($input);
            break;
         case "removeKeepArticle":// 【user】將文章從收藏資料夾移除
            require_once("removeKeepArticle.php");
            doRemoveKeepArticle($input);
            break;
         case "removeTopArticle": //【版主】移除置頂文章
            require_once("removeTopArticle.php");
            doRemoveTopArticle($input);
            break;
         case "searchBoard": //【訪客】看板內搜尋
            require_once("searchInBoard.php");
            doSearchBoard($input);
            break;
         case "searchMenu": //【訪客】主頁搜尋
            require_once("searchInMenu.php");
            doSearchMenu($input);
            break;
         case "sendNotification": // 【系統】發送通知給某個user
            require_once("sendNotification.php");
            doSendNotification($input);
            break;
         case "sendReport": // 【user】檢舉某篇文章
            require_once("sendReport.php");
            doSendReport($input);
            break;
         case "showAritcleComment": //【訪客】檢視文章&留言
            require_once("showAritcleComment.php");
            doShowAritcleComment($input);
            break;
         case "showArticleInBoard": //【訪客】檢視版內文章列表
            require_once("showArticleInBoard.php");
            doShowArticleInBoard($input);
            break;
         case "showArticleInDir": //【user】顯示某收藏資料夾下的文章列表
            require_once("showArticleInDir.php");
            doShowArticleInDir($input);
            break;
         case "showDirList": //【user】顯示收藏資料夾列表
            require_once("showDirList.php");
            doShowDirList($input);
            break;
         case "showModerator": //【admin】檢視版主列表
            require_once("showModerator.php");
            doShowModerator($input);
            break;
         case "showNotice": //【user】檢視通知
            require_once("showNotification.php");
            doShowNotification($input);
            break;
         case "showReport": // 【版主】檢視其版內檢舉列表
            require_once("showReport.php");
            doShowReport($input);
            break;
         case "sortInBoard": // 【系統】版內排序
            require_once("sortInBoard.php");
            doSortBoard($input);
            break;
         case "sortInMenu": // 【系統】首頁排序
            require_once("sortInMenu.php");
            doSortMenu($input);
            break;
         case "toAllNotification": // 【admin、系統】寄通知給所有人
            require_once("toAllNotification.php");
            doToAllNotification($input);
            break;
    }
?>
