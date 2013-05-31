<?

function listadoArticulos($subcadena="",$pagina=1) {

	$MAXIMO_FICHAS_X_PAGINA = 25;
	
	$subcadena = mysql_real_escape_string($subcadena);
	$pagina = intval($pagina);
	if ($pagina==0) $pagina=1;
	
	$devuelve="";
	
	$query="SELECT id,titulo,activo FROM articulo ";
	$queryWhere = ($subcadena) ? " WHERE titulo LIKE '%".$subcadena."%' ":"";
	$query.=$queryWhere." ORDER BY orden LIMIT ".(($pagina*$MAXIMO_FICHAS_X_PAGINA)-$MAXIMO_FICHAS_X_PAGINA).",".$MAXIMO_FICHAS_X_PAGINA;
	
	$queryTotal="SELECT COUNT(*) FROM articulo ".$queryWhere;
	$ress=mysql_query($queryTotal);
	$arra = mysql_fetch_array($ress);
	$numeroTotalFichas=$arra[0];
	$numeroTotalPaginas=ceil($numeroTotalFichas/$MAXIMO_FICHAS_X_PAGINA);
	
	$ress=mysql_query($query);
	
	$devuelve.="<center><table width='90%' class='likert'><th>ID</th><th>Nombre</th><th>Editar</th><th>Activar/Desactivar</th><th>Eliminar</th></tr>";
	while ($arra=mysql_fetch_array($ress)) {
		$rotulo = ($arra["activo"]==1) ? "Desactivar":"Activar"; 
		$bgColor = ($arra["activo"]==1) ? "#88CC88":"#FF8888";
		$devuelve.="<tr bgColor='".$bgColor."' id='tr".$arra["id"]."'>
			<td>".$arra["id"]."</td>
			<td>".$arra["titulo"]."</td>
			<td><a href='".WEB_ROOT."/?seccion=articulos&accion=editar&id=".$arra["id"]."'>Editar</a></td>
			<td><a href='javascript:toggleActivarArticulo(".$arra["id"].")'><span id='rotulo".$arra["id"]."'>".$rotulo."</span></a></td>
			<td><a href='javascript:eliminarArticulo(".$arra["id"].")'>Eliminar</a></td>
			</tr>";
	}
	
	
	
	$paginado="";
	for ($i=1; $i<=$numeroTotalPaginas; $i++) {
		$rotulo = ($i==$pagina) ? "<b>$i</b>":"$i";
		$paginado.="<a href='javascript:listadoArticulos(\"".$subcadena."\",".$i.");'>$rotulo</a> &bull; ";
	}
	$paginado=substr($paginado,0,strlen($paginado)-8);
	$devuelve.="<tr><td colspan='5'><div style='float:right'>".$paginado."</div><div style='clear:both'></div></td></tr>";
	$devuelve.="</table>";
	$devuelve.="</center><br><br>";

	return $devuelve;

} /* END function */

include ("../inc/inc.php");

$pagina=intval($_GET["pagina"]);
$subcadena=mysql_real_escape_string($_GET["subcadena"]);
echo listadoArticulos($subcadena,$pagina);

?>