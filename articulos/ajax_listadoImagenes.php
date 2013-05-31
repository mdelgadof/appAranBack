<?
$id=$_GET[id];
function listadoImagenes($id) {
	$arrayImagenes=array();
	$query="SELECT fotografia FROM articulo WHERE id='".$id."'";
	$cursor=mysql_query($query);
	$i=0;
	while ($registro=mysql_fetch_array($cursor)){
		$arrayImagenes[$i][idArticulo]=$registro[id];
		$arrayImagenes[$i][fotografia]=$registro[fotografia];
		$i++;
	}
	return $arrayImagenes;
} 
include ("../inc/inc.php");
$arrayImagenes=listadoImagenes($id);
foreach($arrayImagenes as $imagen){
	?>
	<div id='imagen<?=$imagen[id]?>' style='float:left;margin:5px;border:1px solid;padding:3px;text-align:center;'>
		<a href='<?=WEB_ROOT.'articulos/images/grande/'.$imagen[fotografia]?>' target='_blank'><img src='<?=WEB_ROOT.'articulos/images/thumb/'.$imagen[fotografia]?>'></a><br>
		<a href="javascript:eliminaImagen('<?=$imagen[idArticulo]?>');">Eliminar</a>
	</div>
	<?
}
?>