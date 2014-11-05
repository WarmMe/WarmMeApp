<?php
	session_start();
	include ("dbConnection.php");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Login</title>
	</head>
	<body>

		<?php
			include ("menuBar.php");
		?>

		
        <div id=form>
        
        <br /><br />
        <h1 id="label_login" align="center">Login</h1>
		<form id="login" action="login.php?action=login" method="post">
			
			  <br />
              <center>
			<table width="50%" >
			  <tr>
			    <td width="282"><h4 align="right">Nome utente : </h4></td>
			    <td width="282"><input type="text" name="username" class="input" /></td>
		      </tr>
			  <tr>
			    <td><h4 align="right">Password : </h4></td>
			    <td><input type="password" name="passwd" class="input" /></td>
		      </tr>
			  <tr>
			    <td>&nbsp;</td>
			    <td><br /><input type="submit" value="Accedi" class="form_btn" /></td>
		      </tr>
		  </table></center>
          <br />
		  
		</form>
		</div>
		<?php
			if ($_GET['action'] == "login") {
				
				if (( $_POST['username'] == "" ) || ( $_POST['passwd'] == "" )) {
					echo "<h3>Errore!</h3><br>utente o password non validi<br> <A HREF=\"javascript:history.go(-1)\">Prova e reinserire i dati</A>. Grazie";
					exit;
				}

				$name = $_POST['username'];
				$query = mysql_query("SELECT * FROM Cliente WHERE username='$name'");
				$data = mysql_fetch_array($query);

				if($_POST['passwd'] == $data['password']) {
					
					$_SESSION['logged'] = "ok";
					$_SESSION['user'] = $name;
					$_SESSION['userID'] = $data['cliente_id'];
					$_SESSION['userExtended'] = $data['nome']." ".$data['cognome'];
					
					mysql_close($con);
					echo"<script language='javascript'>document.getElementById('login').style.display=\"none\";</script>";
					echo"<script language='javascript'>document.getElementById('label_login').style.display=\"none\";</script>";
					include ("footer.php");
					print("<script language='javascript'>alert('Benvenuto ".$_SESSION['userExtended']." !');</script>");
					print("<script language='javascript'>location.href='index.php?login=ok';</script>");
				} else {
					mysql_close($con);
					echo "<div id=\"errorMessage\">";
					echo "<h3>Errore!</h3><br>utente o password non validi<br> <A HREF=\"javascript:history.go(-1)\">Prova e reinserire i dati</A>. Grazie";
					echo "</div>";
					exit;
				}
			}
			include ("footer.php");

		?> 
	</body>
</html>
