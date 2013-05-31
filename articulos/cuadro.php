<?php 
include('../inc/inc.php');
include('../inc/funcionesImagenes.php');

function subeImagenArticulo($imagen, $idArticulo){
	$arrayExt=explode('.', $imagen[name]);
	$extension=$arrayExt[count($arrayExt)-1];
	$nombre=$idArticulo.'.'.$extension;
	if ($extension!='jpg' && $extension!='jpeg' && $extension!='gif' && $extension!='png' && $extension!='tif') return "Error en formato de archivo de fotografía. Sólo se admiten extensiones jpg, gif o png";
	else{
		$anchoDefecto='120';
		$altoDefecto='80';

		$destino=DOCUMENT_ROOT.'articulos/images/thumb/'.$nombre;
		if (!copy($imagen['tmp_name'], $destino)) return "Error. No se ha podido subir el fichero";	
		else{
			if ($extension=='jpg' || $extension=='jpeg' || $extension=='png'){
				list($anchura, $altura) = @getimagesize($destino);
				if ($altoDefecto>0) $proporcionDefecto=$anchoDefecto/$altoDefecto;
				else $proporcionDefecto=1;
				if ($anchura/$altura>$proporcionDefecto){
					// ajustamos de altura y cortamos en ancho, ya que la imagen es más ancha en proporción
					$medidas=redimensionar_img($destino, $destino, $altoDefecto, 100, 'altura');		
					$comienzoCorte=round(($medidas[anchura]-$anchoDefecto)/2);
					corta_imagen($destino,$destino,$anchoDefecto,$comienzoCorte,'anchura'); 
				}elseif ($anchura/$altura<$proporcionDefecto){
					// ajustamos de anchura y cortamos en alto, ya que la imagen es más alta en proporción	
					$medidas=redimensionar_img($destino, $destino, $anchoDefecto, 100, 'anchura');			
					$comienzoCorte=round(($medidas[altura]-$altoDefecto)/2);
					corta_imagen($destino,$destino,$altoDefecto,$comienzoCorte,'altura'); 
				}else{
					// la proporción es perfecta, solo redimensionamos
					$medidas=redimensionar_img($destino, $destino, $anchoDefecto, 100, 'anchura');
				}
			}
		}
		$destino=DOCUMENT_ROOT.'fichas/articulos/grande/'.$nombre;
		if (!copy($imagen['tmp_name'], $destino)) return "Error. No se ha podido subir el fichero";	
		else{
			if ($extension=='jpg' || $extension=='jpeg' || $extension=='png'){
				// AUNQUE NO REDIMENSIONAMOS, USAMOS LA FUNCIONA PARA AJUSTAR CALIDAD
				list($anchura, $altura) = @getimagesize($destino);
				$medidas=redimensionar_img($destino, $destino, $altura, 95, 0, 'altura');		
			}
			return $nombre;
		}
	}
}

if (isset($_FILES[imagen]) && $_POST[id]>0){
	$respuesta=subeImagenArticulo($_FILES[imagen], $_POST[id]);
	if (substr($respuesta, 0, 5)=='Error'){
		?>
		<script>
			alert('<?=$respuesta?>');
		</script>
		<?
	}else{
		$query="UPDATE articulo SET fotografia='".$respuesta."' WHERE id='".intval($_POST[id])."' ";
		$cursor=mysql_query($query);
		?>
		<script>
			window.parent.cargaImagenes('<?=$_POST[id]?>');
		</script>
		<?
	}
}
?>