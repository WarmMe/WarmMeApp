<?php 
	// connsessione db
	$con = mysql_pconnect( "sql1.web4web.it.", "w72372_prj", "amdamd") 
	or die( "Impossibile collegarsi al database"); 
	mysql_select_db("w72372_prj", $con) 
	or die( "Impossibile selezionare il database");
?>