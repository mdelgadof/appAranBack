<?
include ("../inc/inc.php");

$id=intval($_GET["id"]);

$query="SELECT activo FROM articulo WHERE id=".$id;
$ress=mysql_query($query);
$arra=mysql_fetch_array($ress);
$activo=$arra[0];

$nuevoActivo = ($activo) ? 0:1;
$color = ($activo) ? "#FF8888":"#88CC88";
$rotulo = ($activo) ? "Activar":"Desactivar";

$query="UPDATE articulo SET activo='".$nuevoActivo."' WHERE id=".$id;
$ress=mysql_query($query);

echo $color."|".$rotulo;

?>