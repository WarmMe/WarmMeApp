<?php
$username = "root";
$password = "warmme";
$hostname = "localhost"; 

//connection to the database
$con = mysql_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");

mysql_select_db('warmme', $con) or die(mysql_error());

echo "from: ".$_POST["from"]."\n";
echo "to: ".$_POST["to"]."\n";
echo "tempValue: ".$_POST["tempValue"]."\n";
echo "id: ".$_POST["id"]."\n";

$sql = "UPDATE activationSchedule set
startTime=STR_TO_DATE('".$_POST["fromVal"]."','%h:%i:%s'),
endTime=STR_TO_DATE('".$_POST["toVal"]."','%h:%i:%s'),
tempValue=".$_POST["tempValue"]." where activationSchedule_id =".$_POST["idVal"];
    
echo $sql;

$result = mysql_query($sql, $con) or die(mysql_error());
?>  