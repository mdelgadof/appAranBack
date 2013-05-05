<div id="container" class="ltr">

<?
include DOCUMENT_ROOT."/fichas/vistaFicha.php";
$idiomas=array();

if ($_GET["id"]) $id=intval($_GET["id"]); else $id="";
if ($_GET["mensaje"]) $mensaje=htmlentities($_GET["mensaje"]); else $mensaje="";

// Sacar idiomas de BD...
$query="SELECT * FROM idioma";
$ress=mysql_query($query);
$i=0;
while ($arra=mysql_fetch_array($ress)) {
	$idiomas[$i]["codigo"]=$arra["codigo"];
	$idiomas[$i]["nombre"]=$arra["nombre"];
	$idiomas[$i]["id"]=$arra["id"];
	$i++;
	
}
?>
<center>
<h3>Fichas</h3>
<? if ($mensaje) { echo "<h4><span style='color:#00AA00'>".$mensaje."</span></h4>"; } ?>
<a href="javascript:showCapa('insertarFicha');">Insertar ficha</a> ·
<a href="javascript:listadoFichas('',1);">Listado de fichas</a>
</center><br>
<div id="insertarFicha" style="display:none">
<?= vistaFicha(0,$idiomas); ?>
</div>
<div id="listadoFichas" style="display:none">
</div>
<div id="editarFicha" style="display:block">
<? if ($id) {
	vistaFicha($id,$idiomas);
} ?>
</div>

</div><!--container-->

<script type="text/javascript" src="<?= WEB_ROOT ?>fichas/funciones.js"></script>