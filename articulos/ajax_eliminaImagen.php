<?
include ("../inc/inc.php");
$id=$_GET[id];
$query="SELECT * FROM articulo WHERE id='".$id."' ";
$cursor=mysql_query($query);
if (mysql_num_rows($cursor)>0){
	$registro=mysql_fetch_array($cursor);
	print_r($registro);
	$idArticulo=$registro[id];
	if (is_file(DOCUMENT_ROOT.'articulos/images/grande/'.$registro[fotografia])) unlink(DOCUMENT_ROOT.'articulos/images/grande/'.$registro[fotografia]);
	if (is_file(DOCUMENT_ROOT.'articulos/images/thumb/'.$registro[fotografia]))	unlink(DOCUMENT_ROOT.'articulos/images/thumb/'.$registro[fotografia]);

	$query="UPDATE articulo SET fotografia='' WHERE id='".$idArticulo."'";
	$cursor=mysql_query($query);
}
?>