<?

function vistaFicha($id,$idiomas) {

	$MAXIMO_CATEGORIAS_X_FICHA = 6;
	
	$id = intval($id);
	$accion = ($id) ? "insertar":"editar";
	$rotulo = ($id) ? "Insertar nueva ficha":"Edición de ficha";

	$ficha = array();
	if ($accion=="editar") {
		// Capturar datos de la ficha desde BD en $ficha
		// Capturar categorias de la ficha desde BD en $fichaCategorias
	}
	
	// Sustituir por BD...
	$categorias[0]["id"]=1;
	$categorias[0]["nombre"]="Categoría uno";
	$categorias[1]["id"]=2;
	$categorias[1]["nombre"]="Categoría dos";
	$categorias[2]["id"]=3;
	$categorias[2]["nombre"]="Categoría tres";
	$categorias[3]["id"]=4;
	$categorias[3]["nombre"]="Categoría cuatro";
	$categorias[4]["id"]=5;
	$categorias[4]["nombre"]="Categoría cinco";
	$categorias[5]["id"]=6;
	$categorias[5]["nombre"]="Categoría seis";
	
	// A eliminar...
	$fichaCategorias[0]=4;
	$fichaCategorias[1]=2;
	$fichaCategorias[2]=3;
	$fichaCategorias[3]=5;
	$fichaCategorias[4]=6;
	$fichaCategorias[5]=1;
	
?>
<!--<h1 id="logo">
<a href="http://wufoo.com" title="Powered by Wufoo">Wufoo</a>
</h1>-->

<form id="form25" name="form25" class="wufoo  page" autocomplete="off" enctype="multipart/form-data" method="post" novalidate
action="controladorEdicionFicha.php">
<input type="hidden" name="accion" value="<?= $accion ?>">

<header id="header" class="info">
<h2><?= $rotulo ?></h2>
<div></div>
</header>

<ul>

<li id="foli106" class="notranslate">
<label class="desc">
Nombre
</label>
<div>
<input id="ficha_nombre" name="ficha_nombre" type="text" class="field text large" value="<?= $ficha["nombre"] ?>" maxlength="255" tabindex="1" onkeyup="" />
</div>
</li>

<?
	foreach ($idiomas as $idioma) {
?>
<li class="notranslate">
<label class="desc">
<img src='../images/banderas/<?= $idioma["codigo"] ?>.gif'> Descripción (<?= $idioma["nombre"] ?>)
</label>
<div>
<textarea id="fichaTexto_texto_<?= $idioma["codigo"] ?>_descripcion"
name="fichaTexto_texto_<?= $idioma["codigo"] ?>_descripcion"
class="field textarea editable medium"
spellcheck="true"
rows="10" cols="50"
onkeyup=""
 ></textarea>
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
onkeyup=""
 ><?= $ficha["direccion"] ?></textarea>
</div>
<div><input id="generarCoordenadas" name="generarCoordenadas" class="btTxt submit" type="button" value="Generar coordenadas"/></div>
</li>

<li id="foli1" class="notranslate leftHalf">
<label class="desc">
Latitud
</label>
<div>
<input type="text" name="ficha_latitud" value="<?= $ficha["latitud"] ?>" style="width:283px;">
</div>
</li>

<li id="foli108" class="notranslate rightHalf">
<label class="desc">
Longitud
</label>
<div>
<input type="text" name="ficha_longitud" value="<?= $ficha["longitud"] ?>" style="width:283px;">
</div>
</li>

<li id="foli1" class="notranslate leftHalf">
<label class="desc">
Web
</label>
<div>
<input type="text" style="width:283px;" value="<?= $ficha["web"] ?>">
</div>
</li>

<li id="foli108" class="notranslate rightHalf">
<label class="desc">
Teléfono
</label>
<div>
<input type="text" style="width:283px;" value="<?= $ficha["telefono"] ?>">
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
<select id="categoria_id_<?= $i ?>" name="categoria_id_<?= $i ?>" class="field select medium" tabindex="3">
	<option value="" >
	Ninguna
	</option>
<?
		foreach ($categorias as $key => $categoria) {
			
			$selected = ($categoria["id"]==$fichaCategorias[$key]) ? "selected":"";
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