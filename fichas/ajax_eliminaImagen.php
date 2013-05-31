<?
include ("../inc/inc.php");
$id=$_GET[id];
$query="SELECT * FROM fichaFoto WHERE id='".$id."' ";
$cursor=mysql_query($query);
if (mysql_num_rows($cursor)>0){
	$registro=mysql_fetch_array($cursor);
	print_r($registro);
	$idFicha=$registro[idFicha];
	if (is_file(DOCUMENT_ROOT.'fichas/images/grande/'.$registro[foto])) unlink(DOCUMENT_ROOT.'fichas/images/grande/'.$registro[foto]);
	if (is_file(DOCUMENT_ROOT.'fichas/images/thumb/'.$registro[foto]))	unlink(DOCUMENT_ROOT.'fichas/images/thumb/'.$registro[foto]);
	$query="DELETE FROM fichaFoto WHERE id='".$id."'";
	$cursor=mysql_query($query);
	$query="UPDATE fichaFoto SET orden=orden-1 WHERE orden>'".$registro[orden]."' AND idFicha='".$idFicha."'";
	$cursor=mysql_query($query);
}
?>