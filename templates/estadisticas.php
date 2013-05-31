<?
include('../inc/inc.php');
if (!isset($_GET[idBanner])){
	echo "Error, falta la identificación del banner";
	die();
}
?>
<form method='GET' action=''>
	<input type='hidden' value='<?=$_GET[idBanner]?>' name='idBanner' id='idBanner'>
	<table>
		<tr>
			<td>Fecha inicio</td>
			<td><input type='text' name='fechaInicio' id='fechaInicio'></td>
		</tr>
		<tr>
			<td>Fecha fin</td>
			<td><input type='text' name='fechaFin' id='fechaFin'></td>
		</tr>
		<tr>
			<td></td>
			<td><input type='submit' value='Filtrar'></td>
		</tr>
	</table>
</form>
<?
$arrayEstadisticas=bannerEstadisticas($_GET[idBanner], $_GET[fechaInicio], $_GET[fechaFin]);
if (count($arrayEstadisticas)>0){
	?>
	<table>
		<tr>
			<th>Fecha</th>
			<th>Impresiones</th>
			<th>Clicks</th>
		</tr>
		<?
		foreach($arrayEstadisticas as $linea){
			?>
			<tr>
				<td><?=volteaFecha($linea[fecha])?></td>
				<td align='right'><?=$linea[impresiones]?></td>
				<td align='right'><?=$linea[clicks]?></td>
			</tr>
			<?
			$totalImpresiones+=$linea[impresiones];
			$totalClicks+=$linea[clicks];
		}
		?>
		<tr>
			<th>Total</th>
			<th align='right'><?=$totalImpresiones?></th>
			<th align='right'><?=$totalClicks?></th>
		</tr>
	</table>
	<?
}else echo "No hay estadísticas para los datos indicados";
?>