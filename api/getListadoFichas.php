<?
header('Access-Control-Allow-Origin: *');

function listadoFichas($subcadena="",$pagina=1) {

	$MAXIMO_FICHAS_X_PAGINA = 25;
	
	$subcadena = mysql_real_escape_string($subcadena);
	$pagina = intval($pagina);
	if ($pagina==0) $pagina=1;
	
	$devuelve="";
	
	$query="SELECT id,nombre FROM ficha ";
	$queryWhere = ($subcadena) ? " AND nombre LIKE '%".$subcadena."%' ":"";
	$query.="WHERE 1 ".$queryWhere." AND activo=1 ORDER BY nombre LIMIT ".(($pagina*$MAXIMO_FICHAS_X_PAGINA)-$MAXIMO_FICHAS_X_PAGINA).",".$MAXIMO_FICHAS_X_PAGINA;
	
	$queryTotal="SELECT COUNT(*) FROM ficha ".$queryWhere;
	$ress=mysql_query($queryTotal);
	$arra = mysql_fetch_array($ress);
	$numeroTotalFichas=$arra[0];
	$numeroTotalPaginas=ceil($numeroTotalFichas/$MAXIMO_FICHAS_X_PAGINA);
	
	$ress=mysql_query($query);
	
	$devuelve.="<center><table width='90%' class='likert'><th>ID</th><th>Nombre</th></tr>";
	while ($arra=mysql_fetch_array($ress)) {
		$devuelve.="<tr bgColor='".$bgColor."' id='tr".$arra["id"]."'>
			<td>".$arra["id"]."</td>
			<td>".$arra["nombre"]."</td>
			</tr>";
	}
	
	$devuelve.="</table>";
	$devuelve.="</center><br><br>";

	return $devuelve;

} /* END function */

include ("../inc/inc.php");

$pagina=intval($_GET["pagina"]);
$subcadena=mysql_real_escape_string($_GET["subcadena"]);
echo listadoFichas($subcadena,$pagina);

?>