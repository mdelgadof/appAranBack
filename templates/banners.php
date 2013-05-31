<?
include(DOCUMENT_ROOT.'/inc/funcionesImagenes.php');
if ($_POST[accion]=='insertar'){
	?><br>&nbsp;<br><?
	$datos=bannerInserta($_POST, $_FILES[banner]);
	if (count($datos)>1){
		$respuesta=bannerSube($_FILES[banner], $datos[id].'.'.$datos[extension]);
		if (substr($respuesta, 0, 5)=='Error'){
			bannerElimina($datos[id]);
			?>
			<div class='aviso'><?=$respuesta?></div>		
			<?		
		}else{
			?>
			<div class='aviso'>El banner se ha subido correctamente</div>		
			<?
		}
	}else{
		?>
		<div class='aviso'>Se ha producido un error al insertar el banner</div>
		<?
	}
}elseif ($_POST[accion]=='actualizar'){
	if ($_FILES[banner][name]!=''){
		bannerElimina($_POST[id]);
		$datos=bannerInserta($_POST, $_FILES[banner]);
		if (count($datos)>1){
			$respuesta=bannerSube($_FILES[banner], $datos[id].'.'.$datos[extension]);
			if (substr($respuesta, 0, 5)=='Error'){
				bannerElimina($datos[id]);
				?>
				<div class='aviso'><?=$respuesta?></div>		
				<?		
			}else{
				?>
				<div class='aviso'>El banner se ha subido correctamente</div>		
				<?
			}
		}else{
			?>
			<div class='aviso'>Se ha producido un error al actualizar el banner</div>
			<?
		}
	}else{
		?><br>&nbsp;<br><?
		$respuesta=bannerActualiza($_POST);
		if (substr($respuesta, 0, 5)=='Error'){
			?>
			<div class='aviso'><?=$respuesta?></div>		
			<?		
		}else{
			?>
			<div class='aviso'>El banner se ha actualizado correctamente</div>		
			<?
		}
	}
}elseif ($_GET[accion]=='eliminar'){
	bannerElimina($_GET[id]);
}
?>
<br>&nbsp;<br>
<strong>Nuevo banner</strong>
<br>&nbsp;<br>
<form action='' name='formInsertar' method="POST" enctype="multipart/form-data">
	<input type='hidden' name='accion' id='accion' value='insertar'>
	<table class='formulario'>
		<tr>
			<td align='right'>Banner: </td>
			<td align='left'><input type='file' name='banner' id='banner'></td>
		</tr>
		<tr>
			<td align='right'>Fecha inicio: </td>
			<td align='left'><input type='text' name='fechaInicio' id='fechaInicio' value='<?=date('d/m/Y')?>'></td>
		</tr>
		<tr>
			<td align='right'>Fecha fin: </td>
			<td align='left'><input type='text' name='fechaFin' id='fechaFin'></td>
		</tr>
		<tr>
			<td align='right'>Categoria</td>
			<td align='left'>
				<select name='categoria' id='categoria'>
					<option value='0'>Raiz</option>
					<?
					$categorias=totalCategorias();
					foreach($categorias as $categoria){
						?>
						<option value='<?=$categoria[id]?>' <? if ($_POST[categoria]==$categoria[id]) echo 'SELECTED'; ?>><? for($i=0; $i<$categoria[nivel]; $i++){ ?>&nbsp;&nbsp;&nbsp;&nbsp;<? } ?>- <?=$categoria[nombres][0][nombre]?></option>
						<?
					}
					?>
				</select>
			</td>
		</tr>
		<tr>
			<td align='right'>Ficha (opcional)</td>
			<td align='left'>
				<select name='ficha' id='ficha'>
					<option value=''></option>
					<?
					$fichas=fichas();
					foreach($fichas as $ficha){
						?>
						<option value='<?=$ficha[id]?>'><?=$ficha[nombre]?></option>
						<?
					}
					?>
				</select>
			</td>
		</tr>
		<tr>
			<td align='right'>Url destino: </td>
			<td align='left'><input type='text' name='url' id='url'></td>
		</tr>
	</table>
	<input type='submit' value='Insertar'>
</form>
<br>&nbsp;<br>
<strong>Filtrar banners</strong>
<br>&nbsp;<br>
<form action='' method='POST' name='formFiltrar'>
	<input type='hidden' name='accion' id='accion' value='filtrar'>
	<table class='formulario'>
		<tr>
			<td>Categoria</td>
			<td>
				<select name='categoria' id='categoria'>
					<option value='0'>Raiz</option>
					<?
					$categorias=totalCategorias();
					foreach($categorias as $categoria){
						?>
						<option value='<?=$categoria[id]?>' <? if ($_POST[categoria]==$categoria[id]) echo 'SELECTED'; ?>><? for($i=0; $i<$categoria[nivel]; $i++){ ?>&nbsp;&nbsp;&nbsp;&nbsp;<? } ?>- <?=$categoria[nombres][0][nombre]?></option>
						<?
					}
					?>
				</select>
			</td>
		</tr>
		<tr>
			<td align='right'>Ficha</td>
			<td align='left'>
				<select name='ficha' id='ficha'>
					<option value=''></option>
					<?
					$fichas=fichas();
					foreach($fichas as $ficha){
						?>
						<option value='<?=$ficha[id]?>' <? if ($_POST[ficha]==$ficha[id]) echo 'SELECTED'; ?>><?=$ficha[nombre]?></option>
						<?
					}
					?>
				</select>
			</td>
		</tr>
		<tr>
			<td align='right'>Activo</td>
			<td align='left'>
				<select name='activo' id='activo'>
					<option value='si'>Si</option>
					<option value='no'>No</option>
				</select>
			</td>
		</tr>
	</table>
	<input type='submit' value='Filtrar'>
</form>
<br>
<?
if ($_POST[accion]=='filtrar'){
	$banners=banners($_POST[categoria], $_POST[activo]);
	if (count($banners)>0){
		?>
		<br>&nbsp;<br>
		<table class='listado'>
			<tr>
				<th>Banner</th>
				<th>Url</th>
				<th>Categoria</th>
				<th>Ficha</th>
				<th>Fecha Inicio</th>
				<th>Fecha Fin</th>
				<th>Activo</th>
			</tr>
			<?
			foreach($banners as $banner){
				?>
				<form action='' method='POST' enctype="multipart/form-data">
				<input type='hidden' name='accion' id='accion' value='actualizar'>
				<input type='hidden' name='id' id='id' value='<?=$banner[id]?>'>
				<tr>
					<td>Nuevo banner (opcional) <input type='file' name='banner' id='banner'></td>
					<td><input type='text' name='url' id='url' value='<?=$banner[urlDestino]?>'></td>
					<td>
						<select name='categoria' id='categoria'>
							<option value='0'>Raiz</option>
							<?
							$categorias=totalCategorias();
							foreach($categorias as $categoria){
								?>
								<option value='<?=$categoria[id]?>' <? if ($banner[idCategoria]==$categoria[id]) echo 'SELECTED'; ?>><? for($i=0; $i<$categoria[nivel]; $i++){ ?>&nbsp;&nbsp;&nbsp;&nbsp;<? } ?>- <?=$categoria[nombres][0][nombre]?></option>
								<?
							}
							?>
						</select>
					</td>
					<td>
						<select name='ficha' id='ficha'>
							<option value=''></option>
							<?
							$fichas=fichas();
							foreach($fichas as $ficha){
								?>
								<option value='<?=$ficha[id]?>' <? if ($banner[idFicha]==$ficha[id]) echo 'SELECTED'; ?>><?=$ficha[nombre]?></option>
								<?
							}
							?>
						</select>
					</td>
					<td><input type='text' name='fechaInicio' size='10' id='fechaInicio' value='<?=volteaFecha($banner[fechaInicio])?>'></td>
					<td><input type='text' name='fechaFin' size='10' id='fechaFin' value='<?=volteaFecha($banner[fechaFin])?>'></td>
					<td>
						<select name='activo' id='activo'>
							<option value='si' <? if ($banner[activo]=='si') echo 'SELECTED'; ?>>Si</option>
							<option value='no' <? if ($banner[activo]=='no') echo 'SELECTED'; ?>>No</option>
						</select>
					</td>
					<td>
						<input type='submit' value='Actualizar'>
						<input type='button' value='Eliminar' onClick="javascript:elimina('<?=$banner[id]?>');">
						<input type='button' value='Ver estadísticas' onClick="javascript:abreEstadisticas('<?=$banner[id]?>');">
					</td>
				</tr>
				</form>
				<?
			}
			?>
		</table>
		<script>
			function elimina(id){
				if (confirm("El banner indicado será eliminado definitivamente, ¿seguro?")) location.href="?seccion=banners&accion=eliminar&id="+id;
			}
		</script>
		<?
	}else{
		?>
		<div class='sinResultados'>
			No se han encontrado banners que mostrar
		</div>
		<?
	}
}
?>
<script>
	function abreEstadisticas(idBanner){
		window.open("<?=WEB_ROOT?>/templates/estadisticas.php?idBanner="+idBanner,"estadisticas","width=300,height=500") 
	}
</script>