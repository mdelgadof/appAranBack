var WEB_ROOT="";
if (document.domain=='localhost') WEB_ROOT="http://localhost/baqueira";

	function showCapa(capaShow) {
		$('#insertarFicha').hide();
		$('#listadoFichas').hide();
		$('#editarFicha').hide();
		$('#'+capaShow).show();
	}
	
	function listadoFichas(subcadena,pagina) {
		t = new Date();
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_listadoFichas.php",
			data:"t="+t.getTime()+"&subcadena="+subcadena+"&pagina="+pagina,
			type: "GET",
			success: function(dat) {
				$("#listadoFichas").html(dat);
				showCapa("listadoFichas");
			}
		});		
	}

	function eliminaImagen(id, idFicha) {
		if (confirm('La imagen será permanentemente eliminada, ¿seguro?')){
			t = new Date();
			$.ajax({
				url: WEB_ROOT+"/fichas/ajax_eliminaImagen.php",
				data:"t="+t.getTime()+"&id="+id,
				type: "GET",
				success: function(dat) {
					cargaImagenes(idFicha);
				}
			});		
		}
	}

	function mueveImagen(id, movimiento, idFicha) {
		t = new Date();
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_mueveImagen.php",
			data:"t="+t.getTime()+"&id="+id+"&movimiento="+movimiento,
			type: "GET",
			success: function(dat) {
				cargaImagenes(idFicha);
			}
		});		
	}

	function cargaImagenes(idFicha) {
		t = new Date();
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_listadoImagenes.php",
			data:"t="+t.getTime()+"&id="+idFicha,
			type: "GET",
			success: function(dat) {
				$("div#listadoImagenes").html(dat);
			}
		});		
	}
	
	function generaCoordenadas() {
	
		t = new Date();
		
		dir = $('textarea[name=ficha_direccion]').val();
		
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_getLongitudLatitud.php",
			data:"t="+t.getTime()+"&dir="+encodeURIComponent(dir),
			type: "GET",
			success: function(dat) {
				temp=dat.split("|");
				if (temp[0]==0) alert("Google Maps no ha podido encontrar coordenadas para esta dirección");
				else if (temp[0]>1) alert("Google Maps da más de una coordenada para esta dirección. Por favor, revisar que la elegida es la correcta");
				$('input[name="ficha_latitud"]').val(temp[1]);
				$('input[name="ficha_longitud"]').val(temp[2]);
				alert("Coordenadas generadas: "+temp[1]+" "+temp[2]);
			}
		});	
	}

	function toggleActivarFicha(id) {

		t = new Date();
	
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_toggleActivarFicha.php",
			data:"t="+t.getTime()+"&id="+id,
			type: "GET",
			success: function(dat) {
				temp=dat.split('|');
				$("#tr"+id).css("background-color",temp[0]);
				$("#rotulo"+id).html(temp[1]);
			}
		});		

	}
	
	function eliminarFicha(id) {
		t = new Date();
		if (confirm('¿Seguro que quieres eliminar esta ficha? Esta acción no se puede deshacer')) {
			$.ajax({
				url: WEB_ROOT+"/fichas/ajax_eliminarFicha.php",
				data:"t="+t.getTime()+"&id="+id,
				type: "GET",
				success: function(dat) {
					$("#tr"+id).fadeOut();
				}
			});		
		}
	}