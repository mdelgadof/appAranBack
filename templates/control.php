<?php
if ($_GET[accion]=='logout'){
	unset($_SESSION[arrayUsuario]);
}
if (isset($_POST[usuario]) && isset($_POST[clave])){
	if ($idUsuario=compruebaUsuario($_POST[usuario], $_POST[clave])){
		$_SESSION[arrayUsuario][id]=$idUsuario;
	}else{
		?>
		<div id='avisoCentrado'>Error en usuario o clave</div>
		<?php
	}
}
if (!isset($_SESSION[arrayUsuario])){
	?>
	<script type="text/javascript" src="<?= WEB_ROOT ?>js/jquery.js"></script>
	<form name='formuLogin' id='formuLogin' action='?t=<?=time()?>' method='POST'>
		<br>
		<table id='tablaLogin' align='center'>
			<tr>
				<td colspan='2' align='center'>
					<strong>ACCESO<br></strong><br>
				</td>
			</tr>
			<tr>
				<td align='right'>Usuario/Email:</td>
				<td align='left'><input type='text' name='usuario' id='usuario'></td>
			</tr>
			<tr>
				<td align='right'>Clave:</td>
				<td align='left'><input type='password' name='clave' id='clave'></td>
			</tr>
			<tr>
				<td align='right' colspan='2'><br><input type='button' value='Entrar' onClick="javascript:compruebaLogin();">
				<br>
				<br>
				<input type='button' value='Recuperar clave' onClick="javascript:recuperaClave(document.getElementById('usuario').value);"></td>
			</tr>
		</table>
	</form>
	<script>
		function compruebaLogin(){
			if (document.getElementById('usuario').value==''){
				alert("Se ha de rellenar correctamente el campo de usuario");
				return false;
			}
			if (document.getElementById('clave').value==''){
				alert("Se ha de rellenar correctamente la clave");
				return false;
			}
			document.getElementById('formuLogin').submit();
		}
		function recuperaClave(email){
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			if (email==''){
				alert("Tienes que indicar tu email de usuario");
				return false;
			}
			$.ajax( {
				type:"POST", url:"<?=WEB_ROOT?>ajax/recuerdaClave.php",
				data:"t="+tiempo+"&email="+email,
				success: function (msg) {
					if (msg=='vacio') alert("Tienes que indicar tu e-mail de usuario");
					else if (msg=='noExiste') alert("No existe ningún usuario con ese e-mail en el sistema");
					else if (msg=='error') alert("Se ha producido un error en el envío de la clave");
					else if (msg=='enviada') alert("La clave ha sido enviada correctamente al correo electrónico indicado");
				}
			} )
		}
	</script>
	<?php
	die();
}
?>