<?
include ("../inc/inc.php");

$queryFicha="";
$categorias=$querysFichaTexto=array();

foreach ($_POST as $clave => $valor) {
	$localizacion = explode("_",$clave);
	
	if ($localizacion[0]=="ficha") {
		if ($localizacion[1]=="activo" && $valor!=1) $valor=0;
		$campo=mysql_real_escape_string($localizacion[1]);
		$valor=mysql_real_escape_string($valor);
		$queryFicha.=$campo." = '".$valor."', ";
	}
	
	else if ($localizacion[0]=="fichaCategoria" || $localizacion[0]=="categoria") {
		if ($localizacion[1]=="id") {
			$categoria=intval($valor);
			if ($categoria) $categorias[]=$categoria;
			$categorias=array_unique($categorias);
		}
	}
	
	else if ($localizacion[0]=="fichaTexto") {
		if ($localizacion[1]=="texto") {
			$idioma=intval($localizacion[2]);
			$referencia=mysql_real_escape_string($localizacion[3]);
			$valor=mysql_real_escape_string($valor);
			$querysFichaTexto[]="idIdioma='".$idioma."', referencia='".$referencia."', texto='".$valor."'";
			$updateFichaTexto[]="texto='".$valor."'";
		}
	}
	
	foreach ($localizacion as $valor2) echo $valor2." / ";
}

$queryFicha=substr($queryFicha,0,strlen($queryFicha)-2);

if ($_POST["accion"]=="editar") {
	$id=intval($_POST["id"]);
	$query="UPDATE ficha SET ".$queryFicha." WHERE id=".$id;
	$ress=mysql_query($query);
	$mensaje="editada";
}
else {
	$query="INSERT INTO ficha SET ".$queryFicha;
	$ress=mysql_query($query);
	$id=mysql_insert_id();
	$mensaje="insertada";
}

$query="DELETE FROM fichaCategoria WHERE idFicha=".$id;
$ress=mysql_query($query);

foreach($categorias as $categoria) {
	$query="INSERT INTO fichaCategoria SET idFicha=".$id.", idCategoria=".$categoria;
	$ress=mysql_query($query);
}

foreach ($querysFichaTexto as $clave => $queryFichaTexto) {
	$query = "INSERT INTO fichaTexto SET idFicha=".$id.", ".$queryFichaTexto." ON DUPLICATE KEY UPDATE ".$updateFichaTexto[$clave];
	$ress=mysql_query($query);
}

header("Location:/?seccion=fichas&mensaje=".urlencode("OK, ficha ".$mensaje." correctamente"));
?>