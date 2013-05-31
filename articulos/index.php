<script type="text/javascript" src="<?= WEB_ROOT ?>fichas/funciones.js"></script>
<div id="container" class="ltr">

<?
include DOCUMENT_ROOT."/articulos/vistaArticulo.php";
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
<h3>Artículos</h3>
<? if ($mensaje) { echo "<h4><span style='color:#00AA00'>".$mensaje."</span></h4>"; } ?>
<a href="javascript:showCapa('insertarArticulo');">Insertar artículo</a> ·
<a href="javascript:listadoArticulos('',1);">Listado de artículos</a>
</center><br>
<div id="insertarArticulo" style="display:none">
<?= vistaArticulo(0,$idiomas); ?>
</div>
<div id="listadoArticulos" style="display:none">
</div>
<div id="editarArticulo" style="display:block">
<? if ($id) {
	vistaArticulo($id,$idiomas);
	?>
	<div id='listadoImagenes' style='clear:both;'></div>
	<br>&nbsp;<br>
	<form style='clear:both;' action='<?=WEB_ROOT?>articulos/cuadro.php' name='formImagen' method="post" enctype="multipart/form-data" target="frameImagen">
		<input type='hidden' name='id' value='<?=$id?>'>
		<input type='hidden' name='accion' value='sube'>
		<table align='center'>
			<tr>
				<td align='right'><?php echo "Insertar foto"; ?>: </td>
				<td align='left'><input type='file' name='imagen' id='imagen'></td>
			</tr>
			<tr>
				<td align='right'></td>
				<td align='right'><input type='submit' value='Subir'></td>
			</tr>
		</table>
		<br>
	</form>
	<script>
		cargaImagenes('<?=$id?>');
	</script>
	<iframe src='' name='frameImagen' id='frameImagen' width='0' height='0'></iframe>
	<?
} ?>
</div>

</div><!--container-->

