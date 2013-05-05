<?
include ("../inc/inc.php");

$id=intval($_GET["id"]);

$query="DELETE FROM ficha WHERE id=".$id;
$ress=mysql_query($query);

$query="DELETE FROM fichaCategoria WHERE idFicha=".$id;
$ress=mysql_query($query);

$query="DELETE FROM fichaFoto WHERE idFicha=".$id;
$ress=mysql_query($query);

$query="DELETE FROM fichaTexto WHERE idFicha=".$id;
$ress=mysql_query($query);

$arra=mysql_fetch_array($ress);
$activo=$arra[0];
?>