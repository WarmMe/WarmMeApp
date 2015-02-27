<?php
$username = "root";
$password = "warmme";
$hostname = "localhost"; 

//connection to the database
$con = mysql_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");

mysql_select_db('warmme', $con) or die(mysql_error());

$sql = "delete activationSchedule where activationSchedule_id = ".$_POST["idVal"];

$result = mysql_query($sql, $con) or die(mysql_error());
?>  