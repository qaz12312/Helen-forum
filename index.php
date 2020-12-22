<?php
    //require_once("./home.html");
    require_once("./PHPs/connectDB.php");
    require_once("./PHPs/tools.php");
    require_once("./PHPs/sendNotification.php");
    $conn = connSql();
    $input = $_POST;
    switch ($input["act"]) {
        case "sendMailPwd": // 【user】忘記密碼
            require_once("./PHPs/sendMailPwd.php"); 
            break;
        case "verifyForgetPwd": // 【user】忘記密碼的驗證
            require_once("./PHPs/verifyPwd.php"); 
            doVerifyPwd($input);
            break;
        case "showAuthority": //【前端頁面(即系統)】查看權限(若為版主，會有所屬看板)
            require_once("./PHPs/showAuthority.php");
            doShowAuthority($input);
            break;
        case "sendMailRegister": // 【非user者】註冊
            require_once("./PHPs/sendMailRegister.php"); 
            break;
        case "logIn": //登入
            require_once("./PHPs/logIn.php");
            doLogIn($input);
            break;
        case "logOut": //登出
            require_once("./PHPs/logOut.php");
            doLogOut($input);
            break;   
        case "editPersonalInfo": // 【user】修改個人資料(密碼/暱稱/顏色)
            require_once("./PHPs/editPersonalInfo.php");
            break;
        case "showBoardList": //【訪客】主頁的顯示所有board
            require_once("./PHPs/showBoardList.php");
            doBoardList($input);
            break;
        case "showArticleInBoard": //【訪客】檢視版內文章列表
            require_once("./PHPs/showArticleInBoard.php");
            doShowArticleInBoard($input);
            break;
        case "showNotice": //【user】查看user的通知
            require_once("./PHPs/showNotification.php");
            doShowNotification($input);
            break;
        case "clickNotice"://【user】點通知->刪除此則通知
            require_once("./PHPs/clickNotice.php");
            doClickNotice($input);
            break;
        case "sendNotification": // 【系統】發送通知給某個user
            doSendNotification($input);
            break;
        case "toAllNotification": // 【admin、系統】寄通知給所有人
            require_once("./PHPs/toAllNotification.php");
            doToAllNotification($input);
            break;
        case "searchBoard": //【訪客】看板內搜尋
            require_once("./PHPs/searchInBoard.php");
            doSearchBoard($input);
            break;
        case "sortInBoard": // 【系統】版內排序
            require_once("./PHPs/sortInBoard.php");
            doSortBoard($input);
            break;
        case "searchMenu": //【訪客】主頁搜尋
            require_once("./PHPs/searchInMenu.php");
            doSearchMenu($input);
            break;
        case "sortInMenu": // 【系統】首頁排序
            require_once("./PHPs/sortInMenu.php");
            doSortMenu($input);
            break;
        case "showArticleComment": //【訪客】檢視文章&留言
            require_once("./PHPs/showArticleComment.php");
            doShowArticleComment($input);
            break;
        case "heart": //【user】點擊愛心&取消
            require_once("./PHPs/changeHeart.php");
            doAddDeleteHeart($input);
            break;
        case "keep": //【user】點擊收藏&取消
            require_once("./PHPs/changeKeep.php");
            doAddDeleteKeep($input);
            break;
        case "newArticle": //【user】新增文章
            require_once("./PHPs/newArticle.php");
            doNewArticle($input);
            break; 
        case "deleteArticle"://【user】刪除他發過的文章
            require_once("./PHPs/deleteArticle.php");
            doDeleteArticle($input);
            break;
        case "editArticle": // 【user】修改自己發過的文章
            require_once("./PHPs/editArticle.php");
            doEditArticle($input);
            break;
        case "showPostRecord": // 【user】查看自己發文記錄列表
            require_once("./PHPs/showPostRecord.php");
            doShowPostRecord($input);
            break;
        case "newComment": //【user】留言
            require_once("./PHPs/newComment.php");
            doNewComment($input);
            break;
        case "deleteComment": // 【user】刪除他留過的留言
            require_once("./PHPs/deleteComment.php");
            doDeleteComment($input);
            break;
        case "editComment": // 【user】編輯自己留過的留言 
            require_once("./PHPs/editComment.php");
            doEditComment($input);
            break;
        case "newDir": //【user】新增收藏資料夾
            require_once("./PHPs/newDir.php");
            doNewDir($input);
            break;
        case "deleteDir": // 【user】刪除他的收藏資料夾
            require_once("./PHPs/deleteDir.php");
            doDeleteDir($input);
            break;
        case "editDir": //【user】修改收藏資料夾名稱
            require_once("./PHPs/editDir.php");
            doEditDir($input);
            break;
        case "showDirList": //【user】顯示收藏資料夾列表
            require_once("./PHPs/showDirList.php");
            doShowDirList($input);
            break;
        case "showArticleInDir": //【user】顯示某收藏資料夾下的文章列表
            require_once("./PHPs/showArticleInDir.php");
            doShowArticleInDir($input);
            break;
        case "removeKeepArticle":// 【user】將文章從收藏資料夾移除
            require_once("./PHPs/removeKeepArticle.php");
            doRemoveKeepArticle($input);
            break;
        case "sendReport": // 【user】檢舉某篇文章
            require_once("./PHPs/sendReport.php");
            doSendReport($input);
            break;
        case "showReport": //【版主】查看board底下的文章檢舉
            require_once("./PHPs/showReport.php");
            doShowReport($input);
            break;
        case "deleteReport": // 【版主】審核被檢舉文章
            require_once("./PHPs/deleteReport.php");
            doDeleteReport($input);
            break;
        case "newBoard": //【admin】新增board
            require_once("./PHPs/newBoard.php");
            doNewBoard($input);
            break;
        case "deleteBoard": //【admin】刪除board
            require_once("./PHPs/deleteBoard.php");
            doDeleteBoard($input);
            break;
        case "showModerator": //【admin】檢視版主列表
            require_once("./PHPs/showModerator.php");
            doShowModerator($input);
            break;
        case "editBoard": // 【版主】更改board的名字 + 版規
            require_once("./PHPs/editBoard.php");
            doEditBoard($input);
            break;
        case "editModerator": //【admin】更改版主
            require_once("./PHPs/editModerator.php");
            doEditModerator($input);
            break;
        case "editTopArticle": //【版主】選擇置頂一篇文章
            require_once("./PHPs/editTopArticle.php");
            doEditTopArticle($input);
            break;
        case "removeTopArticle": //【版主】移除置頂文章
            require_once("./PHPs/removeTopArticle.php");
            doRemoveTopArticle($input);
            break;
	case "showAllUser":	//【版主】顯示非版主, 非Admin的使用者
		require_once("showAllUser.php");
		doShowAllUser($input);
        break;
    case "checkPassword":	//【版主】顯示非版主, 非Admin的使用者
        require_once("checkPassword.php");
        doCheckPassword($input);
        break;
    }
    $conn = null;
?>
