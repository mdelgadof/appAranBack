<?
if ($_POST[accion]=='insertar'){
	?><br>&nbsp;<br><?
	$respuesta=categoriaNueva($_POST);
	if (substr($respuesta, 0, 5)=='Error'){
		?>
		<div class='aviso'><?=$respuesta?></div>		
		<?		
	}else{
		?>
		<div class='aviso'>La categor�a se ha insertado correctamente</div>		
		<?
	}
}elseif ($_POST[accion]=='actualizar'){
	?><br>&nbsp;<br><?
	$respuesta=categoriaActualiza($_POST);
	if (substr($respuesta, 0, 5)=='Error'){
		?>
		<div class='aviso'><?=$respuesta?></div>		
		<?		
	}else{
		?>
		<div class='aviso'>La categor�a se ha actualizado correctamente</div>		
		<?
	}
}elseif ($_GET[accion]=='eliminar'){
	$respuesta=categoriaElimina($_GET[id]);
	if (substr($respuesta, 0, 5)=='Error'){
		?>
		<div class='aviso'><?=$respuesta?></div>		
		<?		
	}else{
		?>
		<div class='aviso'>La categor�a se ha eliminado correctamente</div>		
		<?
	}
}
?>
<br>&nbsp;<br>
<strong>Nueva categor�a</strong>
<br>&nbsp;<br>
<form action='' name='formInsertar' method="POST">
	<input type='hidden' name='accion' id='accion' value='insertar'>
	<table class='formulario'>
		<tr>
			<td align='right'>Nombre (Espa�ol): </td>
			<td align='left'><input type='text' name='nombre-es_ES' id='nombre-es_ES'></td>
		</tr>
		<tr>
			<td align='right'>Nombre (Franc�s): </td>
			<td align='left'><input type='text' name='nombre-fr_FR' id='nombre-fr_FR'></td>
		</tr>
		<tr>
			<td align='right'>Nombre (Ingl�s): </td>
			<td align='left'><input type='text' name='nombre-en_EN' id='nombre-en_EN'></td>
		</tr>
		<tr>
			<td align='right'>Categoria padre</td>
			<td align='left'>
				<select name='padre' id='padre'>
					<option value='0'>Raiz</option>
					<?
					$categorias=totalCategorias();
					foreach($categorias as $categoria){
						?>
						<option value='<?=$categoria[id]?>'><? for($i=0; $i<$categoria[nivel]; $i++){ ?>&nbsp;&nbsp;&nbsp;&nbsp;<? } ?>- <?=$categoria[nombres][0][nombre]?></option>
						<?
					}
					?>
				</select>
			</td>
		</tr>
	</table>
	<input type='submit' value='Insertar'>
</form>
<br>&nbsp;<br>
<strong>Categorias</strong>
<br>&nbsp;<br>
<div style='text-align:left;margin:auto;'>
<?
reset($categorias);
$categorias2=$categorias;
foreach($categorias as $categoria){
	?>
	<form name='actualiza<?=$categoria[id]?>' id='actualiza<?=$categoria[id]?>' method='POST' action=''>
		<input type='hidden' name='accion' id='accion' value='actualizar'>
		<input type='hidden' name='id' id='accion' value='<?=$categoria[id]?>'>
		<?
		for($i=0; $i<$categoria[nivel]; $i++){ ?> &nbsp; &nbsp; &nbsp; &nbsp; <? };
		echo " - ";
		foreach($categoria[nombres] as $nombre){
			?>
			<?=$nombre[nombreIdioma]?> <input type='text' name='nombre-<?=$nombre[codigo]?>' value='<?=$nombre[nombre]?>'>, 
			<?
		}
		reset($categorias2);
		?>
		Depende de 
		<select name='padre' id='padre'>
			<option value='0'>Raiz</option>
			<?
			foreach($categorias2 as $categoria2){
				?>
				<option value='<?=$categoria2[id]?>' <? if ($categoria[padre]==$categoria2[id]) echo 'SELECTED'; ?>><? for($i=0; $i<$categoria2[nivel]; $i++){ ?>&nbsp;&nbsp;&nbsp;&nbsp;<? } ?>- <?=$categoria2[nombres][0][nombre]?></option>
				<?
			}
			?>
		</select>
		<input type='submit' value='Actualiza'>
		<input type='button' value='Elimina' onClick="javascript:elimina('<?=$categoria[id]?>');">
	</form>
	<?
}
?>
</div>

<script>
	function elimina(id){
		if (confirm("La categoria indicada ser� eliminada definitivamente, �seguro?")) location.href="?seccion=categorias&accion=eliminar&id="+id;
	}
</script>