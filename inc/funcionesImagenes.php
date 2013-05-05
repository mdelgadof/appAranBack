<?
function redimensionar_img($img_original, $img_nueva, $dimension, $img_nueva_calidad, $tipoDimension='altura') {
	//Indicamos la ruta completa interna de la imagen que vamos a redimensionar, la de donde la vamos a alojar, la dimensión máxima elegida, el nivel de calidad en porcentaje 0-100, y el tipo de dimensión a que nos hemos referido anteriormente (anchura o altura).

	// Obtenemos el tamaño original de la imagen para escalarla de forma proporcional
	list($anchura, $altura) = @getimagesize($img_original);

	if ($altura == 0) return false;

	if ($tipoDimension=='altura' && (($dimension==0 && $altura>800) || $dimension>800)) $dimension=800;

	// EN FUNCION AL TIPO DE DIMENSION ESPECIFICADA, CALCULAMOS LA QUE NOS FALTA, ALTURA O ANCHURA
	if ($dimension==0){
		$nueva_anchura=$anchura;
		$nueva_altura=$altura;
	}elseif ($tipoDimension=='altura'){
		if ($altura<$dimension){
			$nueva_anchura=$anchura;
			$nueva_altura=$altura;
		}else{
			$nueva_anchura = round(($anchura * $dimension) / $altura);
			$nueva_altura=$dimension;
		}
	}else{
		if ($anchura<$dimension){
			$nueva_anchura=$anchura;
			$nueva_altura=$altura;
		}else{
			$nueva_altura = round(($altura * $dimension) / $anchura);
			$nueva_anchura=$dimension;
		}
	}

	 // Sacamos la extension

	 $ext = strtolower(substr($img_nueva,-3)); // para los "jpeg" se quedara "peg"
	 
	 // crear imagen desde original
	 if ($ext == 'jpg' || $ext == 'peg')
	  $img = ImageCreateFromJPEG($img_original);
	 elseif ($ext == 'png')
	  $img = ImageCreateFromPNG($img_original);
	 elseif ($ext == 'bmp')
	  $img = ImageCreateFromWBMP($img_original);
	 elseif ($ext == 'gif')
	  $img = ImageCreateFromGIF($img_original);


	 // creamos lienzo redimensionado

	 $imageResized = imagecreatetruecolor($nueva_anchura, $nueva_altura);

	  

	 // Creamos la imagen en el lienzo redimensionado

	 @imagecopyresampled($imageResized, $img, 0, 0, 0, 0, $nueva_anchura, $nueva_altura, @ImageSX($img), @ImageSY($img));
	  

	 // guardar la imagen redimensionada donde indica $img_nueva
	 if ($ext == 'jpg' || $ext == 'peg') {
	@  ImageJPEG($imageResized,$img_nueva,$img_nueva_calidad); }
	 elseif ($ext == 'png') {
	  ImagePNG($imageResized,$img_nueva,$img_nueva_calidad); }
	 elseif ($ext == 'bmp') {
	  ImageWBMP($imageResized,$img_nueva,$img_nueva_calidad); }
	 elseif ($ext == 'gif') { 
	  ImageGIF($imageResized,$img_nueva,$img_nueva_calidad); }
	 // RETORNAMOS EN UN ARRAY LAS NUEVAS MEDIDAS
	 $arrayMedidas[anchura]=$nueva_anchura;
	 $arrayMedidas[altura]=$nueva_altura;
	 return $arrayMedidas;
}

function corta_imagen($src,$destino,$cutpx, $comienzoCorte=0, $modo='altura'){ 
	// indicamos ruta interna de la imagen fuente, destino, pixeles a cortar, punto desde el que se corta y dimensión en la que se corta.
	$ext = strtolower(substr($src,-3));
	$size = getimagesize($src);/* Propiedades de la imagen */ 

	 /*Tomo la imagen origen */ 
	 if ($ext == 'jpg' || $ext == 'peg')
	  $im = ImageCreateFromJPEG($src);
	 elseif ($ext == 'png')
	  $im = ImageCreateFromPNG($src);
	 elseif ($ext == 'bmp')
	  $im = ImageCreateFromWBMP($src);
	 elseif ($ext == 'gif')
	  $im = ImageCreateFromGIF($src);

	if ($modo=='altura') @$img=imagecreatetruecolor($size[0],$cutpx);
	else @$img=imagecreatetruecolor($cutpx,$size[1]);
	if ($modo=='altura') imagecopyresized($img, $im, 0, 0, 0, $comienzoCorte, $size[0], $cutpx, $size[0], $cutpx); /* Copio en mi CANVAS la imagen $im en la dimensión que deseo */ 
	else @imagecopyresized($img, $im, 0, 0, $comienzoCorte, 0, $cutpx, $size[1], $cutpx, $size[1]);


	 /*Exporto la CANVAS a JPG con 95% */ 
	 if ($ext == 'jpg' || $ext == 'peg') {
	  @ImageJPEG($img,$destino,95); }
	 elseif ($ext == 'png') {
	  ImagePNG($img,$destino,95); }
	 elseif ($ext == 'bmp') {
	  ImageWBMP($img,$destino,95); }
	 elseif ($ext == 'gif') { 
	  ImageGIF($img,$destino,95); }


	@ImageDestroy($img); /* La Borro de la Cache */ 
} 

function generaImagenMarcada($imagenOriginal) {
	global $conexion;
	global $bdIdPortal;

	$arrayExtension=explode('.', $imagenOriginal);
	$extension=$arrayExtension[count($arrayExtension)-1];

	// Creamos las dos imágenes a utilizar
	$size=@getimagesize($imagenOriginal);
	if (!$size) return false;

	if (strtolower($extension)=="jpg" || strtolower($extension)=="jpeg")
	   $imagen1 = imagecreatefromjpeg($imagenOriginal);
	else if (strtolower($extension)=="gif")
	   $imagen1 = imagecreatefromgif($imagenOriginal);
	// Si no son jpg o gif no hacemos la transformación
	else return false;

	$anchura_original=$size[0];
	$altura_original=$size[1];

	$marcaDeAgua=DOCUMENT_ROOT."imagenes/agua.png";

	$imagen2 = imagecreatefrompng($marcaDeAgua);

	list($anchura_marcadeagua, $altura_marcadeagua) = @getimagesize($marcaDeAgua);

	// calcular la posicion donde debe copiarse la "marca de agua" en la fotografia
	$horizextra = abs($anchura_original - $anchura_marcadeagua);
	$vertextra = abs($altura_original - $altura_marcadeagua);
	$horizmargen = round($horizextra / 2);
	$vertmargen = round($vertextra / 2);

	// Copiamos una de las imágenes sobre la otra
	ImageCopy($imagen1,$imagen2,$horizmargen, $vertmargen, 0, 0, $anchura_marcadeagua, $altura_marcadeagua);


	// Damos salida a la imagen final, poniéndole nombre

	imagejpeg($imagen1,$imagenOriginal);

	// Destruimos ambas imágenes

	imagedestroy($imagen2);
	imagedestroy($imagen1);
}
?>