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
		if (confirm('¿Seguro que quieres eliminar esta ficha? Esta acción no se puede deshacer')) {
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