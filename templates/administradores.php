<?php
if ($_POST[accion]!='') $accion=$_POST[accion];
else if ($_GET[accion]!='') $accion=$_GET[accion];

if ($accion=='nuevo' && $_POST[email]!=''){
	if ($idAdministrador=administradorNuevo($_POST[email], $_POST[nombre], $_POST[clave])){
		?>
		<script>
			alert("La inserción se ha realizado correctamente");
			location.href="?accion=ver&seccion=administradores";
		</script>
		<?php
	}else{
		?>
		¡¡ Error en la inserción !!
		<?php
	}
}
if ($accion=='nuevaClave'){
	if (actualizaClave($_POST[anteriorClave], $_POST[clave], $_POST[id])){
		?>
		<script>
			alert("El cambio de clave se ha realizado correctamente");
		</script>
		<?
	}else{
		?>
		<script>
			alert("La clave anterior indicada no es correcta");
		</script>
		<?
	}
	$accion='editar';
	$administrador=getAdministrador($_POST[id]);
}
if ($accion=='nuevo' || ($accion=='editar' && $_GET[id]>0)){
	if ($accion=='editar'){
		$administrador=getAdministrador($_GET[id]);
	}
	?>
	<form name='formUsuarios' id='formUsuarios' method='POST'>
		<input type='hidden' name='accion' id='accion' value='<?=$accion?>'>
		<input type='hidden' name='seccion' id='seccion' value='<?=$seccion?>'>
		<? if ($accion=='nuevo'){ ?>
			<input type='hidden' name='id' id='id' value='<?=$administrador[id]?>'>
		<? } ?>
		<table style='margin:auto;'>
			<tr>
				<td align='right'>E-mail: </td>
				<td align='left'><input type='text' name='email' id='email' value='<?=$administrador[email]?>'></td>
			</tr>
			<tr>
				<td align='right'>Nombre: </td>
				<td align='left'><input type='text' name='nombre' id='nombre' value='<?=$administrador[nombre]?>'></td>
			</tr>
			<? if ($accion=='nuevo'){ ?>
			<tr>
				<td align='right'>Clave: </td>
				<td align='left'><input type='password' name='clave' id='clave'></td>
			</tr>
			<tr>
				<td align='right'>Repetir clave: </td>
				<td align='left'><input type='password' name='clave2' id='clave2'></td>
			</tr>
			<? } ?>
			<tr>
				<td align='right'></td>
				<td align='right'><input type='button' value='<? if ($accion=='nuevo') echo 'Insertar'; else echo 'Editar'; ?>' onClick="javascript:insertar();"></td>
			</tr>
		</table>
		<script>
			function insertar(){
				if (document.getElementById('email') && document.getElementById('email').value=='' || document.getElementById('email').value.indexOf('@')<=0 || document.getElementById('email').value.indexOf('.')<=0){
					alert('Es necesario que indiques un e-mail válido');
					return false;
				}
				if (document.getElementById('nombre').value==''){
					alert("Es necesario indicar un nombre");
					return false
				}
				<? if ($accion=='nuevo'){ ?>
					if (document.getElementById('clave').value==''){
						alert("Es necesario indicar una clave");
						return false
					}
					if (document.getElementById('clave').value!=document.getElementById('clave2').value){
						alert("Las dos claves insertadas no coinciden");
						return false
					}
				<? } ?>
				document.getElementById('formUsuarios').submit();
			}
		</script>
	</form>	
	<? if ($accion=='editar'){ ?>
		<br>&nbsp;<br>
		<strong>Cambiar clave</strong>
		<br>&nbsp;<br>
		<form name='formClave' id='formClave' method='POST'>
			<input type='hidden' name='accion' id='accion' value='nuevaClave'>
			<input type='hidden' name='seccion' id='seccion' value='<?=$seccion?>'>
			<input type='hidden' name='id' id='id' value='<?=$administrador[id]?>'>
			<table style='margin:auto;'>
				<tr>
					<td align='right'>Clave actual: </td>
					<td align='left'><input type='password' name='anteriorClave' id='anteriorClave'></td>
				</tr>
				<tr>
					<td align='right'>Clave nueva: </td>
					<td align='left'><input type='password' name='clave' id='clave'></td>
				</tr>
				<tr>
					<td align='right'>Repetir clave nueva: </td>
					<td align='left'><input type='password' name='clave2' id='clave2'></td>
				</tr>
				<tr>
					<td align='right'></td>
					<td align='right'><input type='button' value='Cambiar' onClick="javascript:cambiar();"></td>
				</tr>
			</table>
			<script>
				function cambiar(){
					if (document.getElementById('anteriorClave').value==''){
						alert("Es necesario indicar la clave actual");
						return false
					}
					if (document.getElementById('clave').value==''){
						alert("Es necesario indicar la nueva clave");
						return false
					}
					if (document.getElementById('clave').value!=document.getElementById('clave2').value){
						alert("Las dos claves insertadas no coinciden");
						return false
					}
					document.getElementById('formClave').submit();
				}
			</script>
		</form>	
		<?php
	}
}else{
	?>
	<strong><a href='?seccion=administradores&accion=nuevo'>Agregar nuevo</a></strong>
	<br>&nbsp;<br>
	<form name='formUsuarios' method='POST'>
		<input type='hidden' name='filtra' id='filtra' value='si'>
		<input type='hidden' name='seccion' id='seccion' value='<?=$seccion?>'>
		<table style='margin:auto;'>
			<tr>
				<td align='right'>E-mail: </td>
				<td align='left'><input type='text' name='email' id='email'></td>
			</tr>
			<tr>
				<td align='right'>Nombre: </td>
				<td align='left'><input type='text' name='nombre' id='nombre'></td>
			</tr>
			<tr>
				<td align='right'></td>
				<td align='right'><input type='submit' value='Filtrar'></td>
			</tr>
		</table>
	</form>
	<?php
	if ($_POST[filtra]=='si'){
		$arrayAdministradores=getAdministradores($_POST[email], $_POST[nombre]);
		if (count($arrayAdministradores)>0){
			?>
			<br>
			<table style='margin:auto;'>
				<tr>
					<th>Nombre</th>
					<th>Email</th>
				</tr>
				<?php
				foreach ($arrayAdministradores as $administrador){
					?>
					<tr>
						<td><?=$administrador[nombre]?></td>
						<td><?=$administrador[email]?></td>
						<td><a href='?seccion=administradores&accion=editar&id=<?=$administrador[id]?>'>Editar</a></td>
						<td></td>
					</tr>
					<?php
				}
				?>
			</table>
			<?php
		}else{
			?>
			No se han encontrado resultados
			<?php
		}
	}
}
?>