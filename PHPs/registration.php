<?php include '../sendemail_login.php'; ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
   <head>
    <meta charset = "utf-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>註冊頁面</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel= "stylesheet" href= "../css/topnav.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.10.3/sweetalert2.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.10.3/sweetalert2.css" />

    <!-- w3school的搜尋圖示 -->
    
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <style>    
    
            #pptLogol {
                position: fixed;
                bottom: 10px;
                left: 10px;
            }
        </style>

   </head>
   <body>
    <div class="topnav">
        <div class="dropdown">
        <button class="dropbtn" onclick="myFunction(), cross(this)">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        </button>
        <div class="dropdown-content" id="myDropdown">	<!-- 各大版-->
          <a href="#">Link 1</a>	
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          <a href="#">+</a>
        </div>
        </div>
        <div class="login">
        <button>登入</button>
        </div>
        <div class="imgcontainer">
          <i class="fa fa-user-circle" aria-hidden="true"></i>
        </div>
        <div class="search-container">
          <input type="text" placeholder="Search.." name="search">
          <button type="submit"><i class="fa fa-search"></i></button>
        </div>
      </div>
    <div class= "tabContent">
        <h2>Helen－註冊</h2>
        <p>Welcome To Helen</p>
        <div class="contentArea">
            <div class= "content">
        <table>
            <tr>
                <td rowspan= "4" style="width: 200pt; height: 200pt">
                    <a href={{ url_for('index') }}> 
                        <img src= "../logo.png" class= "logo"></img>
                    </a>
                </td>
                <td>學校信箱 Mail</td>
                <td>
                    <span class="glyphicon glyphicon-envelope"></span>
                    <input type="email" id= "email" class="textInput"
                        name= "email" placeholder="Enter email"  autocomplete="off" required>
                    <span id="emailMsg"></span>
                    <button type="submit" class="btn btn-info" name="submit">
                        <span class="glyphicon glyphicon-send"></span> 驗證信箱</button>
                    </td>
            </tr>
            <tr>
                <td>密碼 Password</td>
                <td>
                    <i class="fa fa-lock"></i>
                    <input type="password" id= "password" class="textInput"
                    name= "password" placeholder="password" autocomplete="off" required>
                    <span id="pwMsg"></span>
                </td>
            </tr>
            <tr>
                <td>確認密碼 Confirm</td>
                <td>
                    <i class="fa fa-lock"></i>
                    <input type="password" id= "validatePW" class="textInput"
                    name= "validatePW" placeholder="validatePW" autocomplete="off" required>
                    <span id="checkPw"></span>
                </td>
            </tr>
            <tr>
                <td colspan="1">
                    <button type="button" class="btn btn-success" id="createBtn">
                        <span class="glyphicon glyphicon-piggy-bank"></span> 註冊</button></td>
                <td colspan="1">
                    <button type="button" class="btn btn-success" id="backBtn">
                        <span class="glyphicon glyphicon-piggy-bank"></span> 回登入頁面</button></td>
                        
    </tr>
        </table>
    
            </div>
        </div>
    </div>
    <script type="text/javascript">
if(window.history.replaceState){
    window.history.replaceState(null, null, window.location.href);
}
</script>
       <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js">
       </script>
       <script src="./static/indexMain.js">
       </script>
       

	
    </script>
    </body>
    <script src="../js/bar.js"></script>
    <script src="../js/registration.js"></script>
</html>