<?

function vistaFicha($id,$idiomas) {

	$MAXIMO_CATEGORIAS_X_FICHA = 6;
	
	$id = intval($id);
	$accion = ($id) ? "editar":"insertar";
	$rotulo = ($id) ? "Edición de ficha":"Insertar nueva ficha";

	$ficha = array();
	if ($accion=="editar") {
		// Capturar datos de la ficha desde BD en $ficha
		$query="SELECT * FROM ficha WHERE id=$id";
		$ress=mysql_query($query);
		$ficha=mysql_fetch_array($ress);
		
		// Capturar categorias de la ficha desde BD en $fichaCategorias
		$query="SELECT DISTINCT(idCategoria) FROM fichaCategoria WHERE idFicha=$id";
		$ress=mysql_query($query);
		while ($arra=mysql_fetch_array($ress)) {
			$fichaCategorias[]=$arra["idCategoria"];
		}
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
		
	$query="SELECT c.id,cn.nombre,cn2.nombre as nombrePadre 
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
	}
	
?>
<!--<h1 id="logo">
<a href="http://wufoo.com" title="Powered by Wufoo">Wufoo</a>
</h1>-->

<form name="form25" class="wufoo  page" autocomplete="off" enctype="multipart/form-data" method="post" novalidate action="<?= WEB_ROOT ?>/fichas/controladorEdicionFicha.php">
<input type="hidden" name="accion" value="<?= $accion ?>">
<? if ($accion=="editar") { ?><input type="hidden" name="id" value="<?= $id ?>"><? } ?>

<header id="header" class="info">
<h2><?= $rotulo ?></h2>
<div></div>
</header>

<ul>

<li class="notranslate">
<label class="desc">
Nombre
</label>
<div>
<input id="ficha_nombre" name="ficha_nombre" type="text" class="field text large" value="<?= $ficha["nombre"] ?>" maxlength="255" tabindex="1" onkeyup="" />
</div>
</li>

<?
	foreach ($idiomas as $idioma) {
	
		if ($accion=="editar") {
			$query="SELECT texto FROM fichaTexto WHERE idFicha='".$id."' AND idIdioma='".$idioma["id"]."' AND referencia='descripc'";
			$ress=mysql_query($query);
			$arra=mysql_fetch_array($ress);
			$texto=$arra["texto"];
		}
		else $texto="";
?>
<li class="notranslate">
<label class="desc">
<img src='../imagenes/banderas/<?= $idioma["codigo"] ?>.gif'> Descripción (<?= $idioma["nombre"] ?>)
</label>
<div>
<textarea id="fichaTexto_texto_<?= $idioma["id"] ?>_descripcion"
name="fichaTexto_texto_<?= $idioma["id"] ?>_descripcion"
class="field textarea editable medium"
spellcheck="true"
rows="10" cols="50"
onkeyup=""
 ><?= $texto ?></textarea>
</div>
</li>
<?
	}
?>

<li class="notranslate">
<label class="desc">
Dirección
</label>
<div>
<textarea id="ficha_direccion"
name="ficha_direccion"
class="field textarea small"
spellcheck="true"
rows="10" cols="50"
tabindex="2"
onkeyup="$('#ficha_direccion').val($(this).val());$('.perri').show();"
 ><?= $ficha["direccion"] ?></textarea>
</div>
<div class='perri' style='display:none'><input id="generarCoordenadas" name="generarCoordenadas" class="btTxt submit" type="button" onclick="generaCoordenadas();" value="Generar coordenadas"/></div>
</li>

<li id="foli1" class="notranslate leftHalf">
<label class="desc">
Latitud
</label>
<div>
<input id="ficha_latitud" type="text" name="ficha_latitud" value="<?= $ficha["latitud"] ?>" style="width:283px;"/>
</div>
</li>

<li id="foli108" class="notranslate rightHalf">
<label class="desc">
Longitud
</label>
<div>
<input type="text" id="ficha_longitud" name="ficha_longitud" value="<?= $ficha["longitud"] ?>" style="width:283px;"/>
</div>
</li>

<li id="foli1" class="notranslate leftHalf">
<label class="desc">
Web
</label>
<div>
<input type="text" name="ficha_web" style="width:283px;" value="<?= $ficha["web"] ?>">
</div>
</li>

<li id="foli108" class="notranslate rightHalf">
<label class="desc">
Teléfono
</label>
<div>
<input type="text" name="ficha_telefono" style="width:283px;" value="<?= $ficha["telefono"] ?>">
</div>
</li>

<!--<li id="foli2" class="date notranslate      ">
<label class="desc">
Due Date
</label>
<span>
<input id="Field2-1" name="Field2-1" type="text" class="field text" value="" size="2" maxlength="2" tabindex="5" />
<label for="Field2-1">MM</label>
</span>
<span class="symbol">/</span>
<span>
<input id="Field2-2" name="Field2-2" type="text" class="field text" value="" size="2" maxlength="2" tabindex="6" />
<label for="Field2-2">DD</label>
</span>
<span class="symbol">/</span>
<span>
 <input id="Field2" name="Field2" type="text" class="field text" value="" size="4" maxlength="4" tabindex="7" />
<label for="Field2">YYYY</label>
</span>
<span id="cal2">
<img id="pick2" class="datepicker" src="images/calendar.png" alt="Pick a date." />
</span>
</li>-->

<? 
	for ($i=1; $i<=$MAXIMO_CATEGORIAS_X_FICHA; $i++) {
	
		$alineacion = ($i%2==0) ? "right":"left";
		
?>
<li class="notranslate <?= $alineacion ?>Half">
<label class="desc">
Seleccionar Categoría
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
<?
	} // END for número de categorías posibles por ficha
?>

<li class="notranslate">
<fieldset>
<label class="desc">
Estátus
</label>
<div>
<span>
<input id="ficha_activo" name="ficha_activo" type="checkbox" class="field checkbox" value="1" tabindex="8" <? if ($ficha["activo"]) echo "checked"; ?>/>
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