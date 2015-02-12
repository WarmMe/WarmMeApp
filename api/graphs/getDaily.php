<?php
$username = "root";
$password = "warmme";
$hostname = "localhost"; 

//connection to the database
$con = mysql_connect($hostname, $username, $password) 
    or die("Unable to connect to MySQL");

mysql_select_db('warmme', $con) or die(mysql_error());
$result = mysql_query("SELECT created,value from sensorMonitor where DATE(created) = CURRENT_DATE()");
$rows = array();
while($r = mysql_fetch_assoc($result)) {
    $rows[] = $r;
}

 print json_encode($rows);
 ?>