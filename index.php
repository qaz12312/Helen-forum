<?php
    require_once("home.html"); 
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
        case "sendmailPwd": // 【user】忘記密碼 ----- 轅
            require_once("sendmailPwd.php"); 
            break;
        case "verifyForgetPwd": // 【user】忘記密碼的驗證 ----- 轅
            require_once("verifyPwd.php"); 
            doVerifyPwd($input)
            break;
        case "showAuthority": //【前端頁面(即系統)】查看權限(若為版主，會有所屬看板) -----鈞
            require_once("showAuthority.php");
            doShowAuthority($input);
            break;
        case "sendMailRegister": // 【非user者】註冊 ----- 轅
            require_once("sendmailRegister.php"); 
            break;
        case "logIn": // 【user】登入 -----鈞
            require_once("logIn.php");
            doLogIn($input);
            break;
        case "logOut": // 【user】登出 -----鈞
            require_once("logOut.php");
            doLogOut($input);
            break;   
        case "editPersonalInfo": // 【user】修改個人資料(密碼/暱稱/顏色) -----鈞
            require_once("editPersonalInfo.php");
            break;
        case "showBoardList": //【訪客】主頁的顯示所有board -----劉
            require_once("showBoardList.php");
            doBoardList($input);
            break;
        case "showArticleInBoard": //【訪客】檢視版內文章列表 -----劉
            require_once("showArticleInBoard.php");
            doShowArticleInBoard($input);
            break;
        case "showNotice": //【user】查看user的通知 -----劉
            require_once("showNotification.php");
            doShowNotification($input);
            break;
        case "clickNotice"://【user】點通知->刪除此則通知 -----劉
            require_once("clickNotice.php");
            doClickNotice($input);
            break;
        case "sendNotification": // 【系統】發送通知給某個user -----劉
            require_once("sendNotification.php");
            doSendNotification($input);
            break;
        case "toAllNotification": // 【admin、系統】寄通知給所有人 -----劉
            require_once("toAllNotification.php");
            doToAllNotification($input);
            break;
        case "searchBoard": //【訪客】看板內搜尋 -----轅+劉
            require_once("searchInBoard.php");
            doSearchBoard($input);
            break;
        case "sortInBoard": // 【系統】版內排序 -----轅+劉
            require_once("sortInBoard.php");
            doSortBoard($input);
            break;
        case "searchMenu": //【訪客】主頁搜尋 -----轅+劉
            require_once("searchInMenu.php");
            doSearchMenu($input);
            break;
        case "sortInMenu": // 【系統】首頁排序 -----轅+劉
            require_once("sortInMenu.php");
            doSortMenu($input);
            break;
        case "showAritcleComment": //【訪客】檢視文章&留言 -----劉
            require_once("showAritcleComment.php");
            doShowAritcleComment($input);
            break;
        case "heart": //【user】點擊愛心&取消 -----轅
            require_once("changeHeart.php");
            doAddDeleteHeart($input);
            break;
        case "keep": //【user】點擊收藏&取消 -----轅
            require_once("changeKeep.php");
            doAddDeleteKeep($input);
            break;
        case "newArticle": //【user】新增文章 -----劉
            require_once("newArticle.php");
            doNewArticle($input);
            break; 
        case "deleteArticle"://【user】刪除他發過的文章 -----劉
            require_once("deleteArticle.php");
            doDeleteArticle($input);
            break;
        case "editArticle": // 【user】修改自己發過的文章 -----劉
            require_once("editArticle.php");
            doEditArticle($input);
            break;
        case "showPostRecord": // 【user】查看自己發文記錄列表 -----劉
            require_once("showPostRecord.php");
            doShowPostRecord($input);
            break;
        case "newComment": //【user】留言 -----劉
            require_once("newComment.php");
            doNewComment($input);
            break;
        case "deleteComment": // 【user】刪除他留過的留言 -----劉
            require_once("deleteComment.php");
            doDeleteComment($input);
            break;
        case "editComment": // 【user】編輯自己留過的留言 -----劉
            require_once("editComment.php");
            doEditComment($input);
            break;
        case "newDir": //【user】新增收藏資料夾 -----劉
            require_once("newDir.php");
            doNewDir($input);
            break;
        case "deleteDir": // 【user】刪除他的收藏資料夾 -----劉
            require_once("deleteDir.php");
            doDeleteDir($input);
            break;
        case "editDir": //【user】修改收藏資料夾名稱 -----劉
            require_once("editDir.php");
            doEditDir($input);
            break;
        case "showDirList": //【user】顯示收藏資料夾列表 -----劉
            require_once("showDirList.php");
            doShowDirList($input);
            break;
        case "showArticleInDir": //【user】顯示某收藏資料夾下的文章列表 -----劉
            require_once("showArticleInDir.php");
            doShowArticleInDir($input);
            break;
        case "removeKeepArticle":// 【user】將文章從收藏資料夾移除 -----伶
            require_once("removeKeepArticle.php");
            doRemoveKeepArticle($input);
            break;
        case "sendReport": // 【user】檢舉某篇文章 -----伶
            require_once("sendReport.php");
            doSendReport($input);
            break;
        case "showReport": //【版主】查看board底下的文章檢舉 -----劉
            require_once("showReport.php");
            doShowReport($input);
            break;
        case "deleteReport": // 【版主】審核被檢舉文章 -----伶
            require_once("deleteReport.php");
            doDeleteReport($input);
            break;
        case "newBoard": //【admin】新增board -----劉
            require_once("newBoard.php");
            doNewBoard($input);
            break;
        case "deleteBoard": //【admin】刪除board -----劉
            require_once("deleteBoard.php");
            doDeleteBoard($input);
            break;
        case "showModerator": //【admin】檢視版主列表 -----劉
            require_once("showModerator.php");
            doShowModerator($input);
            break;
        case "editBoard": // 【版主】更改board的名字 + 版規 -----劉
            require_once("editBoard.php");
            doEditBoard($input);
            break;
        case "editModerator": //【admin】更改版主 -----劉
            require_once("editModerator.php");
            doEditModerator($input);
            break;
        case "editTopArticle": //【版主】選擇置頂一篇文章 -----伶
            require_once("editTopArticle.php");
            doEditTopArticle($input);
            break;
        case "removeTopArticle": //【版主】移除置頂文章 -----伶
            require_once("removeTopArticle.php");
            doRemoveTopArticle($input);
            break;
        case "sendMail": // 【系統】寄email -----轅
            require_once("sendMail.php");
            break;
    }
?>
