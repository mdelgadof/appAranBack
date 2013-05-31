<?

function vistaArticulo($id,$idiomas) {

	$MAXIMO_CATEGORIAS_X_FICHA = 6;
	
	$id = intval($id);
	$accion = ($id) ? "editar":"insertar";
	$rotulo = ($id) ? "Edición de artículo":"Insertar nuevo artículo";

	$ficha = array();
	if ($accion=="editar") {
		// Capturar datos del artículo desde BD en $articulo
		$query="SELECT * FROM articulo WHERE id=$id";
		$ress=mysql_query($query);
		$articulo=mysql_fetch_array($ress);
		
		/*// Capturar categorias de la ficha desde BD en $fichaCategorias
		$query="SELECT DISTINCT(idCategoria) FROM fichaCategoria WHERE idFicha=$id";
		$ress=mysql_query($query);
		while ($arra=mysql_fetch_array($ress)) {
			$fichaCategorias[]=$arra["idCategoria"];
		}*/
	}
	
	// QUERY PARA SACAR CATEGORIAS SIN SUBCATEGORIA Y SUBCATEGORIAS CON NOMBRE DE PADRE DE MOMENTO COMENTADA
	/*$query="SELECT c.id,cn.nombre,cn2.nombre as nombrePadre 
		FROM 
			categoria c 
			LEFT JOIN categoriaNombre cn ON c.id=cn.idCategoria 
			LEFT JOIN categoriaNombre cn2 ON cn2.idCategoria=c.idPadre
		WHERE
			cn.idIdioma=1 AND
			(cn2.idIdioma=1 OR cn2.idIdioma IS NULL) AND 
			(c.idPadre!=0 OR c.id NOT IN 
				(select distinct(c2.idPadre) from categoria c2)
			)
		";*/
		
	/*$query="SELECT c.id,cn.nombre,cn2.nombre as nombrePadre 
		FROM 
			categoria c 
			LEFT JOIN categoriaNombre cn ON c.id=cn.idCategoria 
			LEFT JOIN categoriaNombre cn2 ON cn2.idCategoria=c.idPadre
		WHERE
			cn.idIdioma=1 AND
			(cn2.idIdioma=1 OR cn2.idIdioma IS NULL)
		";
		
	$ress=mysql_query($query);
	$i=0;
	while ($arra=mysql_fetch_array($ress)) {
		$categorias[$i]["id"]=$arra["id"];
		if ($arra["nombrePadre"]) 
			$categorias[$i]["nombre"]=$arra["nombrePadre"]." / ".$arra["nombre"];
		else $categorias[$i]["nombre"]=$arra["nombre"];
		$i++;
	}*/
	
?>
<!--<h1 id="logo">
<a href="http://wufoo.com" title="Powered by Wufoo">Wufoo</a>
</h1>-->

<form name="form25" class="wufoo  page" autocomplete="off" enctype="multipart/form-data" method="post" novalidate action="<?= WEB_ROOT ?>/articulos/controladorEdicionArticulo.php">
<input type="hidden" name="accion" value="<?= $accion ?>">
<? if ($accion=="editar") { ?><input type="hidden" name="id" value="<?= $id ?>"><? } ?>

<header id="header" class="info">
<h2><?= $rotulo ?></h2>
<div></div>
</header>

<ul>

<li class="notranslate">
<label class="desc">
Título
</label>
<div>
<input id="articulo_titulo" name="articulo_titulo" type="text" class="field text large" value="<?= $articulo["titulo"] ?>" maxlength="255" tabindex="1" onkeyup="" />
</div>
</li>

<li class="notranslate">
<label class="desc">
Título corto
</label>
<div>
<input id="articulo_tituloCorto" name="articulo_tituloCorto" type="text" class="field text large" value="<?= $articulo["tituloCorto"] ?>" maxlength="255" tabindex="1" onkeyup="" />
</div>
</li>

<li class="notranslate">
<label class="desc">
<!--<img src='../imagenes/banderas/<?= $idioma["codigo"] ?>.gif'>--> Texto
</label>
<div>
<textarea id="articulo_texto"
name="articulo_texto"
class="field textarea editable medium"
spellcheck="true"
rows="10" cols="50"
onkeyup=""
 ><?= $articulo["texto"] ?></textarea>
</div>
</li>

<li class="notranslate leftHalf">
<label class="desc">
Seleccionar Idioma
</label>
<div>
<select id="fichaCategoria_id_<?= $i ?>" name="fichaCategoria_id_<?= $i ?>" class="field select medium" tabindex="3">
	<option value="" >
	Ninguna
	</option>
<?
		foreach ($categorias as $key => $categoria) {
			
			$selected = ($categoria["id"]==$fichaCategorias[$i-1]) ? "selected":"";
?>
	<option value="<?= $categoria["id"] ?>" <?= $selected ?>>
	<?= $categoria["nombre"]; ?>
	</option>
<?
		} // END for de todas las categorías disponibles
?>
</select>
</div>
</li>

<li class="notranslate rightHalf">
<label class="desc">
Seleccionar Orden
</label>
<div>
<select id="fichaCategoria_id_<?= $i ?>" name="fichaCategoria_id_<?= $i ?>" class="field select medium" tabindex="3">
	<option value="" >
	Ninguna
	</option>
<?
		foreach ($categorias as $key => $categoria) {
			
			$selected = ($categoria["id"]==$fichaCategorias[$i-1]) ? "selected":"";
?>
	<option value="<?= $categoria["id"] ?>" <?= $selected ?>>
	<?= $categoria["nombre"]; ?>
	</option>
<?
		} // END for de todas las categorías disponibles
?>
</select>
</div>
</li>

<li class="notranslate">
<fieldset>
<label class="desc">
Estátus
</label>
<div>
<span>
<input id="articulo_activo" name="articulo_activo" type="checkbox" class="field checkbox" value="1" tabindex="8" <? if ($articulo["activo"]) echo "checked"; ?>/>
<label class="choice">Activo en la App</label>
</span>
</div>
</fieldset>
</li>
 <li class="buttons">
<div><input id="saveForm" name="saveForm" class="btTxt submit" type="submit" value="Enviar"/></div>
</li>

</ul>
</form>

<? } /* END function */ ?>