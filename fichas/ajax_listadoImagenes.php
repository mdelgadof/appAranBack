<?
$id=$_GET[id];
function listadoImagenes($id) {
	$arrayImagenes=array();
	$query="SELECT * FROM fichaFoto WHERE idFicha='".$id."' ORDER BY orden ASC ";
	$cursor=mysql_query($query);
	$i=0;
	while ($registro=mysql_fetch_array($cursor)){
		$arrayImagenes[$i][id]=$registro[id];
		$arrayImagenes[$i][idFicha]=$registro[idFicha];
		$arrayImagenes[$i][foto]=$registro[foto];
		$arrayImagenes[$i][thumb]=$registro[thumb];
		$arrayImagenes[$i][orden]=$registro[orden];
		$i++;
	}
	return $arrayImagenes;
} 
include ("../inc/inc.php");
$arrayImagenes=listadoImagenes($id);
foreach($arrayImagenes as $imagen){
	?>
	<div id='imagen<?=$imagen[id]?>' style='float:left;margin:5px;border:1px solid;padding:3px;text-align:center;'>
		<a href='<?=WEB_ROOT.'fichas/images/grande/'.$imagen[foto]?>' target='_blank'><img src='<?=WEB_ROOT.'fichas/images/thumb/'.$imagen[foto]?>'></a><br>
		<a href="javascript:mueveImagen('<?=$imagen[id]?>', '-1', '<?=$imagen[idFicha]?>');">Subir</a> - <a href="javascript:mueveImagen('<?=$imagen[id]?>', '1', '<?=$imagen[idFicha]?>');">Bajar</a> - <a href="javascript:eliminaImagen('<?=$imagen[id]?>', '<?=$imagen[idFicha]?>');">Eliminar</a>
	</div>
	<?
}
?>