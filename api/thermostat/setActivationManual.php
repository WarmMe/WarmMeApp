<?php
$username = "root";
$password = "warmme";
$hostname = "localhost"; 

//connection to the database
$con = mysql_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");

mysql_select_db('warmme', $con) or die(mysql_error());

if (isset($_POST["tempValue"])) {
		$result = mysql_query("UPDATE activationTarget set type='MANUAL', tempvalue=".$_POST["tempValue"], $con) or die(mysql_error());
	} else {
		$result = mysql_query("UPDATE activationTarget set type='MANUAL'", $con) or die(mysql_error());
	}
?>