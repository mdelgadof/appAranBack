<div id='menu'>
<a href='<?=WEB_ROOT?>?seccion=administradores'>Administradores</a> - 
<a href='<?=WEB_ROOT?>?seccion=banners'>Banners</a> - 
<a href='<?=WEB_ROOT?>?seccion=categorias'>Categorias</a> - 
<a href='<?=WEB_ROOT?>?seccion=fichas'>Fichas</a> - 
<a href='<?=WEB_ROOT?>?seccion=articulos'>Art�culos</a> - 
<a href='<?=WEB_ROOT?>?seccion=traduccion'>Traducci�n</a>
</div>
<br>&nbsp;<br>
<?
if ($_GET[seccion]!='fichas' && $_GET[seccion]!='articulos' && $_GET[seccion]!=''){
	?>
	<div id="contenedor">
	<?
}
?>