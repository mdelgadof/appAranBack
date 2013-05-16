	function showCapa(capaShow) {
		$('#insertarFicha').hide();
		$('#listadoFichas').hide();
		$('#editarFicha').hide();
		$('#'+capaShow).show();
	}
	
	function listadoFichas(subcadena,pagina) {
	
		t = new Date();
	
		$.ajax({
			url: "/fichas/ajax_listadoFichas.php",
			data:"t="+t.getTime()+"&subcadena="+subcadena+"&pagina="+pagina,
			type: "GET",
			success: function(dat) {
				$("#listadoFichas").html(dat);
				showCapa("listadoFichas");
			}
		});		
	}
	
	function generaCoordenadas() {
	
		t = new Date();
		
		dir = $('textarea[name=ficha_direccion]').val();
		
		$.ajax({
			url: "/fichas/ajax_getLongitudLatitud.php",
			data:"t="+t.getTime()+"&dir="+encodeURIComponent(dir),
			type: "GET",
			success: function(dat) {
				temp=dat.split("|");
				if (temp[0]==0) alert("Google Maps no ha podido encontrar coordenadas para esta direcci�n");
				else if (temp[0]>1) alert("Google Maps da m�s de una coordenada para esta direcci�n. Por favor, revisar que la elegida es la correcta");
				$('input[name="ficha_latitud"]').val(temp[1]);
				$('input[name="ficha_longitud"]').val(temp[2]);
				alert("Coordenadas generadas: "+temp[1]+" "+temp[2]);
			}
		});	
	}

	function toggleActivarFicha(id) {

		t = new Date();
	
		$.ajax({
			url: "/fichas/ajax_toggleActivarFicha.php",
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
		if (confirm('�Seguro que quieres eliminar esta ficha? Esta acci�n no se puede deshacer')) {
			$.ajax({
				url: "/fichas/ajax_eliminarFicha.php",
				data:"t="+t.getTime()+"&id="+id,
				type: "GET",
				success: function(dat) {
					$("#tr"+id).fadeOut();
				}
			});		
		}
	}