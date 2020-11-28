<?php
	function printform(){
		echo <<< EOF
<form id="register_form" role="form" data-toggle="validator">
<div class="form-group">
<input id="inputName" name="Name" type="text" class="form-control" placeholder="姓名" required="required">
<div class="help-block with-errors"></div>
</div>
<div class="form-group">
<input id="inputEmail" name="Email" class="form-control" type="email" placeholder="電子郵件地址" data-error="郵件格式錯誤" required="required">
<div class="help-block with-errors"></div>
</div>
<div class="form-group">
<input id="inputPassword" name="Password" class="form-control" type="password" placeholder="設定密碼" pattern="^(?=.*\d)(?=.*[a-zA-Z]).{6,}$" data-error="請輸入含有英文字母及數字的密碼，至少六個字元。" required="required">
<div class="help-block with-errors"></div>
</div>
<div class="form-group">
<input id="inputConfirmPassword" name="ConfirmPassword" class="form-control" type="password" placeholder="確認密碼" data-match="#inputPassword" data-error="密碼未吻合！" required="required">
<div class="help-block with-errors"></div>
</div>
<input type="submit" value="註冊" class="btn btn-danger btn-block" />
</form>
EOF;
	}
	function includeSource(){
		echo<<<EOF
<script src='//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"></link>
<!--表單內容-->
<!--引用 Validator-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.min.js"></script>
<!--執行 Validator-->	
EOF;
	}
    ?>




	
