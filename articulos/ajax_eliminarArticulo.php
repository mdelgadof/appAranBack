<?
include ("../inc/inc.php");

$id=intval($_GET["id"]);

$query="DELETE FROM articulo WHERE id=".$id;
$ress=mysql_query($query);

?>