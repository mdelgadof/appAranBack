<div id='menu'>
<a href='<?=WEB_ROOT?>?seccion=administradores'>Administradores</a> - 
<a href='<?=WEB_ROOT?>?seccion=banners'>Banners</a> - 
<a href='<?=WEB_ROOT?>?seccion=categorias'>Categorias</a> - 
<a href='<?=WEB_ROOT?>?seccion=fichas'>Fichas</a> - 
<a href='<?=WEB_ROOT?>?seccion=articulos'>Artículos</a> - 
<a href='<?=WEB_ROOT?>?seccion=traduccion'>Traducción</a>
</div>
<br>&nbsp;<br>
<?
if ($_GET[seccion]!='fichas' && $_GET[seccion]!='articulos' && $_GET[seccion]!=''){
	?>
	<div id="contenedor">
	<?
}
?>