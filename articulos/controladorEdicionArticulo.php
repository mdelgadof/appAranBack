<?
include ("../inc/inc.php");

$queryArticulo="";

foreach ($_POST as $clave => $valor) {
	$localizacion = explode("_",$clave);
	
	if ($localizacion[0]=="articulo") {
		if ($localizacion[1]=="activo" && $valor!=1) $valor=0;
		$campo=mysql_real_escape_string($localizacion[1]);
		$valor=mysql_real_escape_string($valor);
		$queryArticulo.=$campo." = '".$valor."', ";
	}
	
	foreach ($localizacion as $valor2) echo $valor2." / ";
}

$queryArticulo=substr($queryArticulo,0,strlen($queryArticulo)-2);

if ($_POST["accion"]=="editar") {
	$id=intval($_POST["id"]);
	$query="UPDATE articulo SET ".$queryArticulo." WHERE id=".$id;
	$ress=mysql_query($query);
	$mensaje="editado";
}
else {
	$query="INSERT INTO articulo SET ".$queryArticulo;
	$ress=mysql_query($query);
	$id=mysql_insert_id();
	$mensaje="insertado";
}

header("Location:/?seccion=articulos&mensaje=".urlencode("OK, articulo ".$mensaje." correctamente"));
?>