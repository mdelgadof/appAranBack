<div id='traduccion'>
	<input type='text' name='texto' id='texto'>
	Idioma: 
	<select name='idioma' id='idioma'>
		<?
		foreach($arrayIdiomas as $elementoIdioma){
			?>
			<option value='<?=$elementoIdioma[codigo]?>'><?=$elementoIdioma[nombre]?></option>			
			<?
		}
		?>
	</select>
	<select name='modo' id='modo'>
		<option value='original'>En original</option>
		<option value='traduccion'>En traducción</option>
	</select>
	<input type='button' value='Buscar' onClick="javascript:busca(document.getElementById('texto').value, document.getElementById('idioma').value, document.getElementById('modo').value);">
	<div id='resultados'></div>
	<br>
	Idioma: 
	<select name='idiomaRegenerar' id='idiomaRegenerar'>
		<?
		foreach($arrayIdiomas as $elementoIdioma){
			?>
			<option value='<?=$elementoIdioma[codigo]?>'><?=$elementoIdioma[nombre]?></option>			
			<?
		}
		?>
	</select>
	<input type='button' value='Regenerar' onClick="javascript:regenera(document.getElementById('idiomaRegenerar').value);">
	<br>&nbsp;<br>
	<iframe src='' name='regenera' id='regenera' width='500' height='100' frameborder='0'></iframe>
</div>
<script>
function busca(texto, idioma, modo){
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("div#resultados").html("<img src='"+WEB_ROOT+"/imagenes/loading.gif' alt='Cargando'>");
	$.ajax( {
		type:"POST", url:WEB_ROOT+"/ajax/busquedaTraduccion.php",
		data:"t="+tiempo+"&texto="+texto+"&idioma="+idioma+"&modo="+modo,
		success: function (msg) {
			$("div#resultados").html(msg);
		}
	} )
	$("div#resultados").ajaxStop(function(){})	
}

function guardaTraduccion(traduccion, id, idioma){
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax( {
		type:"POST", url:WEB_ROOT+"/ajax/guardaTraduccion.php",
		data:"t="+tiempo+"&traduccion="+traduccion+"&id="+id+"&idioma="+idioma,
		success: function (msg) {
			alert("Guardado. No olvides regenerar el idioma una vez hechos todos los cambios.");
		}
	} )
}
function regenera(idioma){
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax( {
		type:"GET", url:WEB_ROOT+"/ajax/regeneraTraduccion.php",
		data:"t="+tiempo+"&idioma="+idioma,
		success: function (msg) {
			alert(msg);
		}
	} )
}
</script>