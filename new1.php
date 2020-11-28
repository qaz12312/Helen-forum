<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
	<title>1</title>
    
</head>
<body>
    <?php
	include('w3demo5.inc');
	includeSource();
	printform();
	
	echo("hello world! ");
	echo"<br>";
	echo "<font color=RED><hl><b><i>hello world!</i></b></hl></font>";
	echo('hello world! ');
	echo("<br>");
	
	$str1="mon";
	echo("today is {$str1}day.<br>");
	$a=1;$b=2;
	echo <<<EOF
			<font color='green'><h1>title$a</h1></font><br>
			<font color=BLUE><h2>title$b</h2></font><br>
EOF;
    $score=55;
	if($score >60)
		echo 'good';
	else
		echo'bad';
	echo '<br>';
	
	$x=$_GET['number1'];
	$y=$_GET['number2'];
	echo $x."*".$y."=".$x*$y;
	for($i=0;$i<=5;$i++){
		echo "<font color=RED>HI</font>" .$i."<br>";
	}
	$arr1[0]='蘭花';
	$arr2['花名']='梅花';
	$arr3[1][2]='玫瑰';
	$arr4['花名']['黃色']='桂花';
	
	echo $arr1[0]."<br>";
	echo $arr2['花名']."<br>";
	echo $arr3[1][2]."<br>";
	echo $arr4['花名']['黃色']."<br>";
	$arr5=array('北','中','南');
	
	$arr6=array('first'=>'北',
				'sec'=>'中',
				'third'=>'南');
	foreach ($arr6 as $value)
			echo $value.'<br>';
	
	?>

	
	
</body>
</html>