var WEB_ROOT="";
if (document.domain=='localhost') WEB_ROOT="http://localhost/baqueira";

	function showCapa(capaShow) {
		$('#insertarArticulo').hide();
		$('#listadoArticulos').hide();
		$('#editarArticulo').hide();
		$('#'+capaShow).show();
	}
	
	function listadoArticulos(subcadena,pagina) {
		t = new Date();
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_listadoArticulos.php",
			data:"t="+t.getTime()+"&subcadena="+subcadena+"&pagina="+pagina,
			type: "GET",
			success: function(dat) {
				$("#listadoArticulos").html(dat);
				showCapa("listadoArticulos");
			}
		});		
	}

	function eliminaImagen(idArticulo) {
		if (confirm('La imagen será permanentemente eliminada, ¿seguro?')){
			t = new Date();
			$.ajax({
				url: WEB_ROOT+"/fichas/ajax_eliminaImagen.php",
				data:"t="+t.getTime()+"&id="+idArticulo,
				type: "GET",
				success: function(dat) {
					cargaImagenes(idArticulo);
				}
			});		
		}
	}

	function mueveImagen(id, movimiento, idArticulo) {
		t = new Date();
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_mueveImagen.php",
			data:"t="+t.getTime()+"&id="+id+"&movimiento="+movimiento,
			type: "GET",
			success: function(dat) {
				cargaImagenes(idArticulo);
			}
		});		
	}

	function cargaImagenes(idArticulo) {
		t = new Date();
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_listadoImagenes.php",
			data:"t="+t.getTime()+"&id="+idArticulo,
			type: "GET",
			success: function(dat) {
				$("div#listadoImagenes").html(dat);
			}
		});		
	}
	
	function toggleActivarArticulo(id) {

		t = new Date();
	
		$.ajax({
			url: WEB_ROOT+"/fichas/ajax_toggleActivarArticulo.php",
			data:"t="+t.getTime()+"&id="+id,
			type: "GET",
			success: function(dat) {
				temp=dat.split('|');
				$("#tr"+id).css("background-color",temp[0]);
				$("#rotulo"+id).html(temp[1]);
			}
		});		

	}
	
	function eliminarArticulo(id) {
		t = new Date();
		if (confirm('¿Seguro que quieres eliminar este artículo? Esta acción no se puede deshacer')) {
			$.ajax({
				url: WEB_ROOT+"/fichas/ajax_eliminarArticulo.php",
				data:"t="+t.getTime()+"&id="+id,
				type: "GET",
				success: function(dat) {
					$("#tr"+id).fadeOut();
				}
			});		
		}
	}