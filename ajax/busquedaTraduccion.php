<?php
include('../inc/inc.php');
$texto=$_POST[texto];
$idioma=$_POST[idioma];
$modo=$_POST[modo];
$arrayResultados=busquedaTraduccion($texto, $idioma, $modo);
?>
<br>
<table width='90%' align='center'>
	<?
	foreach($arrayResultados as $resultado){
		if ($bgcolor=='#FFFFFF') $bgcolor="#CCCCCC";
		else $bgcolor="#FFFFFF";
		?>
		<tr bgcolor='<?=$bgcolor?>'>
			<td align='left'><?=$resultado[texto]?></td>
			<td><textarea cols='30' rows='2' name='traduccion<?=$resultado[id]?>' id='traduccion<?=$resultado[id]?>'><?=$resultado[traduccion]?></textarea></td>
			<td><input type='button' value='Guardar' onClick="javascript:guardaTraduccion(document.getElementById('traduccion<?=$resultado[id]?>').value, '<?=$resultado[id]?>', '<?=$idioma?>');"></td>
		</tr>
		<?	
	}
	?>
</table>