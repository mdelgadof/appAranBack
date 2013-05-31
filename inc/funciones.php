<?
if( !function_exists('administradorNuevo') ) {
	// FUNCION QUE GENERA UN NUEVO ADMINISTRADOR
	function administradorNuevo($email, $nombre, $clave){
		$query="INSERT INTO administradores (email, nombre, clave) VALUES ('".$email."', '".$nombre."', '".$clave."')";
		if ($cursor=mysql_query($query)){
			$idReg=mysql_insert_id();
			return $idReg;
		}else return false;
	}
}
if( !function_exists('actualizaClave') ) {
	// FUNCION QUE ACTUALIZA LA CLAVE DE UN ADMINISTRADOR
	function actualizaClave($anteriorClave, $clave, $id){
		$query="SELECT * FROM administradores WHERE id='".$id."'";
		$cursor=mysql_query($query);
		$registro=mysql_fetch_array($cursor);
		if ($registro[clave]!=$anteriorClave) return false;
		$query="UPDATE administradores SET clave='".$clave."' WHERE id='".$id."'";
		$cursor=mysql_query($query);
		return true;
	}
}
if( !function_exists('banners') ) {
	// FUNCION QUE DEVUELVE LOS BANNERS PUDIENDO FILTRARSE POR CATEGORIA O NOMBRE
	function banners($categoria='', $activo=''){
		$arrayBanners=array();
		$query="SELECT id, nombre, fechaInicio, fechaFin, idCategoria, activo, idFicha, urlDestino FROM banner WHERE 1 ";
		if ($categoria!='') $query.=" AND banner.idCategoria='".$categoria."' ";
		if ($activo!='') $query.=" AND banner.activo='".$activo."' ";
		$query.=" ORDER BY id DESC ";
		$cursor=mysql_query($query);
		$i=0;
		while ($registro=mysql_fetch_array($cursor)){
			$arrayBanners[$i][id]=$registro[id];
			$arrayBanners[$i][nombre]=$registro[nombre];
			$arrayBanners[$i][fechaInicio]=$registro[fechaInicio];
			$arrayBanners[$i][fechaFin]=$registro[fechaFin];
			$arrayBanners[$i][idCategoria]=$registro[idCategoria];
			$arrayBanners[$i][activo]=$registro[activo];
			$arrayBanners[$i][idFicha]=$registro[idFicha];
			$arrayBanners[$i][urlDestino]=$registro[urlDestino];
			$i++;
		}
		return $arrayBanners;
	}
}

if( !function_exists('bannerActualiza') ) {
	// FUNCION QUE ACTUALIZA LOS DATOS DE UN BANNER EN BBDD
	function bannerActualiza($datos){
		$query="UPDATE banner SET fechaInicio='".volteaFecha($datos[fechaInicio])."', fechaFin='".volteaFecha($datos[fechaFin])."', idCategoria='".$datos[categoria]."', idFicha='".$datos[ficha]."', urlDestino='".$datos[url]."' WHERE id='".$datos[id]."' ";
		if ($cursor=mysql_query($query)){
			return true;
		}else return "Error en la actualización del banner";
	}
}

if( !function_exists('bannerElimina') ) {
	// FUNCION QUE ELIMINA UN BANNER
	function bannerElimina($id){
		$query="SELECT nombre FROM banner WHERE id='".$id."' ";
		$cursor=mysql_query($query);
		$registro=mysql_fetch_array($cursor);
		if (is_file(DOCUMENT_ROOT.'imagenes/banner/'.$registro[nombre])) unlink(DOCUMENT_ROOT.'imagenes/banner/'.$registro[nombre]);
		$query="DELETE FROM banner WHERE id='".$id."'";
		if ($cursor=mysql_query($query)) return true;
		else return false;
	}
}

if( !function_exists('bannerEstadisticas') ) {
	// FUNCION QUE ELIMINA UN BANNER
	function bannerEstadisticas($idBanner, $fechaInicio, $fechaFin){
		$arrayEstadisticas=array();
		$query="SELECT fecha, sum(impresiones) as totalImpresiones, sum(clicks) as totalClicks FROM bannerEstadisticas WHERE idBanner='".$idBanner."' ";
		if ($fechaInicio!='') $query.=" AND fecha>='".volteaFecha($fechaInicio)."' ";
		if ($fechaFin!='') $query.=" AND fecha<='".volteaFecha($fechaFin)."' ";
		$query.=" GROUP BY fecha ORDER BY fecha ASC";
		$cursor=mysql_query($query);
		$i=0;
		while ($registro=mysql_fetch_array($cursor)){
			$arrayEstadisticas[$i][fecha]=$registro[fecha];
			$arrayEstadisticas[$i][impresiones]=$registro[totalImpresiones];
			$arrayEstadisticas[$i][clicks]=$registro[totalClicks];
			$i++;
		}
		return $arrayEstadisticas;
	}
}

if( !function_exists('bannerInserta') ) {
	// FUNCION QUE INSERTA EN BASE DE DATOS EL REGISTRO DE UN BANNER
	function bannerInserta($datos, $banner){
		$arrayExt=explode('.', $banner[name]);
		$extension=$arrayExt[count($arrayExt)-1];
		if ($extension=='swf') $tipo='flash';
		else $tipo='imagen';
		$query="SELECT max(id) as idMaxima FROM banner";
		$cursor=mysql_query($query);
		$registro=mysql_fetch_array($cursor);
		$id=$registro[idMaxima]+1;
		$nombre=$id.'.'.$extension;
		$query="INSERT INTO banner (id, nombre, fechaInicio, fechaFin, idCategoria, idFicha, urlDestino, tipo) VALUES ('".$id."', '".$nombre."', '".volteaFecha($datos[fechaInicio])."', '".volteaFecha($datos[fechaFin])."', '".$datos[categoria]."', '".$datos[ficha]."', '".$datos[url]."', '".$tipo."')";
		if ($cursor=mysql_query($query)){
			$arrayDatos[id]=mysql_insert_id();
			$arrayDatos[extension]=$extension;
			return $arrayDatos;
		}else return false;
	}
}

if( !function_exists('bannerSube') ) {
	// FUNCION QUE SUBE EL FICHERO DEL BANNER
	function bannerSube($banner, $nombre){
		$arrayExt=explode('.', $banner[name]);
		$extension=$arrayExt[count($arrayExt)-1];
		// && $extension!='swf' FLASH EN ESPERA DE VER SI SIRVEN DE ALGO DE CARA A LOS IPHONE
		if ($extension!='jpg' && $extension!='jpeg' && $extension!='gif' && $extension!='png' && $extension!='tif') return "Error en formato de archivo de banner. Sólo se admiten extensiones jpg, gif o png";
		else{
			$anchoDefecto='468';
			$altoDefecto='60';
			$destino=DOCUMENT_ROOT.'imagenes/banners/'.$nombre;
			if (!copy($banner['tmp_name'], $destino)) return "Error. No se ha podido subir el fichero";	
			else{
				if ($extension=='jpg' || $extension=='jpeg' || $extension=='png'){
					list($anchura, $altura) = @getimagesize($destino);
					if ($altoDefecto>0) $proporcionDefecto=$anchoDefecto/$altoDefecto;
					else $proporcionDefecto=1;
					if ($anchura/$altura>$proporcionDefecto){
						// ajustamos de altura y cortamos en ancho, ya que la imagen es más ancha en proporción
						$medidas=redimensionar_img($destino, $destino, $altoDefecto, 95, 0, 'altura');		
						$comienzoCorte=round(($medidas[anchura]-$anchoDefecto)/2);
						corta_imagen($destino,$destino,$anchoDefecto,$comienzoCorte,'anchura'); 
					}elseif ($anchura/$altura<$proporcionDefecto){
						// ajustamos de anchura y cortamos en alto, ya que la imagen es más alta en proporción	
						$medidas=redimensionar_img($destino, $destino, $anchoDefecto, 95, 0, 'anchura');			
						$comienzoCorte=round(($medidas[altura]-$altoDefecto)/2);
						corta_imagen($destino,$destino,$altoDefecto,$comienzoCorte,'altura'); 
					}else{
						// la proporción es perfecta, solo redimensionamos
						$medidas=redimensionar_img($destino, $destino, $anchoDefecto, 95, 0, 'anchura');
					}
				}
				return true;
			}
		}
	}
}

if( !function_exists('busquedaTraduccion') ) {
	function busquedaTraduccion($texto, $idioma, $modo){
		$arrayResultados=array();
		$query="SELECT * FROM traduccion WHERE ";
		if ($modo=='original') $query.="es_ES";
		else $query.=$idioma;
		if ($texto=='') $query.="='".$texto."' ";
		else $query.=" like '%".$texto."%' ";
		$cursor=mysql_query($query);
		$i=0;
		while ($registro=mysql_fetch_array($cursor)){
			$arrayResultados[$i][texto]=$registro[es_ES];
			$arrayResultados[$i][traduccion]=$registro[$idioma];
			$arrayResultados[$i][idioma]=$idioma;
			$arrayResultados[$i][id]=$registro[id];
			$i++;
		}
		return $arrayResultados;
	}
}
if( !function_exists('guardaTraduccion') ) {
	function guardaTraduccion($traduccion, $id, $idioma){
		if (trim($traduccion)=='') return false;
		if ($id<=0 || !is_numeric($id)) return false;
		$query="UPDATE traduccion SET ".$idioma."='".$traduccion."' WHERE id='".$id."'";
		$cursor=mysql_query($query);
	}
}

if( !function_exists('categorias') ) {
	// FUNCION QUE DEVUELVE LAS CATEGORIAS QUE DEPENDEN DE UN ID CONCRETO DE CATEGORIA
	function categorias($padre=0){
		$arrayCategorias=array();
		$query="SELECT id FROM categoria WHERE idPadre='".$padre."' ";
		$cursor=mysql_query($query);
		while ($registro=mysql_fetch_array($cursor)){
			$arrayCategorias[]=categoria($registro[id]);
		}
		return $arrayCategorias;
	}
}

if( !function_exists('categoria') ) {
	// FUNCION QUE DEVUELVE LOS DATOS DE UNA CATEGORIA CONCRETA
	function categoria($id, $idioma='es_ES'){
		$arrayCategoria=array();
		$query="SELECT categoria.id, categoria.idPadre, categoriaNombre.nombre FROM categoria, categoriaNombre, idioma WHERE categoria.id='".$id."' AND categoria.id=categoriaNombre.idCategoria AND categoriaNombre.idIdioma=idioma.id AND idioma.codigo='".$idioma."' ";
		$cursor=mysql_query($query);
		$registro=mysql_fetch_array($cursor);
		$arrayCategoria[id]=$registro[id];
		$arrayCategoria[nombre]=$registro[nombre];
		$arrayCategoria[padre]=$registro[idPadre];
		return $arrayCategoria;
	}
}

if( !function_exists('categoriaNombres') ) {
	// FUNCION QUE DEVUELVE LOS DATOS DE UNA CATEGORIA CONCRETA
	function categoriaNombres($id){
		$arrayCategoria=array();
		$query="SELECT categoriaNombre.nombre, idioma.codigo, idioma.nombre as nombreIdioma FROM categoria, categoriaNombre, idioma WHERE categoria.id='".$id."' AND categoria.id=categoriaNombre.idCategoria AND categoriaNombre.idIdioma=idioma.id ORDER BY idioma.nombre ASC ";
		$cursor=mysql_query($query);
		$i=0;
		while ($registro=mysql_fetch_array($cursor)){
			$arrayCategoria[$i][codigo]=$registro[codigo];
			$arrayCategoria[$i][nombre]=$registro[nombre];
			$arrayCategoria[$i][nombreIdioma]=$registro[nombreIdioma];
			$i++;
		}
		return $arrayCategoria;
	}
}

if( !function_exists('categoriaActualiza') ) {
	// FUNCION QUE ACTUALIZA LOS DATOS DE UNA CATEGORIA
	function categoriaActualiza($datos){
		$query="UPDATE categoria SET idPadre='".$datos[padre]."' WHERE id='".$datos[id]."' ";
		if (!$cursor=mysql_query($query)){
			return "Error actualizando la categoría";
		}
		$query="SELECT * FROM idioma ";
		$cursor=mysql_query($query);
		while ($registro=mysql_fetch_array($cursor)){
			if ($datos['nombre-'.$registro[codigo]]!=''){
				$query2="INSERT INTO categoriaNombre (idCategoria, idIdioma, nombre) VALUES ('".$datos[id]."', '".$registro[id]."', '".$datos['nombre-'.$registro[codigo]]."') ON DUPLICATE KEY UPDATE nombre='".$datos['nombre-'.$registro[codigo]]."'";
				if (!$cursor2=mysql_query($query2)){
					return "Error actualizando las traducciones de la categoria";
				}
			}
		}
		return true;
	}
}

if( !function_exists('categoriaNueva') ) {
	// FUNCION QUE INSERTA UNA CATEGORIA NUEVA
	function categoriaNueva($datos){
		$query="SELECT max(orden) as maxOrden FROM categoria WHERE idPadre='".$padre."' ";
		$cursor=mysql_query($query);
		$registro=mysql_fetch_array($cursor);
		$orden=$registro[maxOrden]+1;
		$query="INSERT INTO categoria (idPadre, orden) VALUES ('".$datos[padre]."', '".$orden."')";
		if ($cursor=mysql_query($query)) $idCategoria=mysql_insert_id();
		else return "Error insertando la categoría";
		$query="SELECT * FROM idioma ";
		$cursor=mysql_query($query);
		while ($registro=mysql_fetch_array($cursor)){
			if ($datos['nombre-'.$registro[codigo]]!=''){
				$query2="INSERT INTO categoriaNombre (idCategoria, idIdioma, nombre) VALUES ('".$idCategoria."', '".$registro[id]."', '".$datos['nombre-'.$registro[codigo]]."') ";
				if (!$cursor2=mysql_query($query2)){
					categoriaElimina($idCategoria);
					return "Error insertando las traducciones de la categoria";
				}
			}
		}
		return true;
	}
}

if( !function_exists('categoriaElimina') ) {
	// FUNCION QUE ELIMINA UNA CATEGORIA CONCRETA
	function categoriaElimina($id){
		$query="SELECT idFicha FROM fichaCategoria WHERE idCategoria='".$id."'";
		$cursor=mysql_query($query);
		if (mysql_num_rows($cursor)>0) return "Error. Existen fichas dependientes de dicha categoría";
		$query="SELECT id FROM categoria WHERE idPadre='".$id."'";
		$cursor=mysql_query($query);
		if (mysql_num_rows($cursor)>0) return "Error. Existen otras categorías dependientes de dicha categoría";
		$query="DELETE FROM categoria WHERE id='".$id."'";
		$cursor=mysql_query($query);
		$query="DELETE FROM categoriaNombre WHERE idCategoria='".$id."'";
		$cursor=mysql_query($query);
		return true;
	}
}
if( !function_exists('compruebaUsuario') ) {
	// FUNCION QUE COMPRUEBA SI EL USUARIO INDICADO SE DEBE DE LOGAR
	function compruebaUsuario($usuario, $clave){
		$query="SELECT id, clave FROM administradores WHERE email='".mysql_real_escape_string($usuario)."'";
		$cursor=mysql_query($query);
		$registro=mysql_fetch_array($cursor);
		if ($registro[clave]==$clave && $registro[id]>0) return $registro[id];
		else return false;
	}
}

if( !function_exists('getAdministradores') ) {
	// FUNCION QUE FILTRA LOS ADMINISTRADORES
	function getAdministradores($email, $nombre){
		$arrayAdministradores=array();
		$query="SELECT email, nombre, id FROM administradores WHERE 1 ";
		if ($email!='') $query.=" AND email like '%".$email."%' ";
		if ($nombre!='') $query.=" AND nombre like '%".$nombre."%' ";
		$query.=" ORDER BY nombre ASC ";
		$cursor=mysql_query($query);
		while ($registro=mysql_fetch_array($cursor)){
			$i++;
			$arrayAdministradores[$i][id]=$registro[id];
			$arrayAdministradores[$i][email]=$registro[email];
			$arrayAdministradores[$i][nombre]=$registro[nombre];
		}
		return $arrayAdministradores;
	}
}

if( !function_exists('getAdministrador') ) {
	// FUNCION QUE MUESTRA LOS DATOS DE UN ADMINISTRADOR
	function getAdministrador($id){
		$arrayAdministrador=array();
		$query="SELECT email, nombre, id FROM administradores WHERE id='".$id."' ";
		$cursor=mysql_query($query);
		while ($registro=mysql_fetch_array($cursor)){
			$i++;
			$arrayAdministrador[id]=$registro[id];
			$arrayAdministrador[email]=$registro[email];
			$arrayAdministrador[nombre]=$registro[nombre];
		}
		return $arrayAdministrador;
	}
}

if( !function_exists('fichas') ) {
	// FUNCION QUE DEVUELVE LAS FICHAS SEGUN SE ESPECIFIQUE
	function fichas($nombre='', $categoria=''){
		$arrayFichas=array();
		$query="SELECT ficha.id FROM ficha LEFT JOIN fichaCategoria ON ficha.id=fichaCategoria.idFicha WHERE 1 ";
		if ($nombre!='') $query.=" AND ficha.nombre like '%".$nombre."%' ";
		if ($categoria!='') $query.=" AND fichaCategoria.idCategoria='".$categoria."' ";
		$query.=" ORDER BY ficha.id ASC ";
		$cursor=mysql_query($query);
		while ($registro=mysql_fetch_array($cursor)){
			$arrayFichas[]=ficha($registro[id]);
		}
		return $arrayFichas;
	}
}

if( !function_exists('ficha') ) {
	// FUNCION QUE DEVUELVE LAS FICHAS SEGUN SE ESPECIFIQUE
	function ficha($id){
		$arrayFicha=array();
		$query="SELECT ficha.nombre, ficha.activo, ficha.telefono, ficha.web, ficha.direccion, ficha.longitud, ficha.latitud, categoriaNombre.idCategoria, categoriaNombre.nombre as categoriaNombre FROM ficha LEFT JOIN fichaCategoria ON ficha.id=fichaCategoria.idFicha LEFT JOIN categoriaNombre ON fichaCategoria.idCategoria=categoriaNombre.idCategoria AND categoriaNombre.idIdioma='1' WHERE ficha.id='".$id."' ";
		$cursor=mysql_query($query);
		while ($registro=mysql_fetch_array($cursor)){
			$arrayFicha[id]=$id;
			$arrayFicha[nombre]=$registro[nombre];
			$arrayFicha[activo]=$registro[activo];
			$arrayFicha[telefono]=$registro[telefono];
			$arrayFicha[web]=$registro[web];
			$arrayFicha[direccion]=$registro[direccion];
			$arrayFicha[longitud]=$registro[longitud];
			$arrayFicha[latitud]=$registro[latitud];
			$arrayFicha[idCategoria]=$registro[idCategoria];
			$arrayFicha[categoriaNombre]=$registro[categoriaNombre];
		}
		return $arrayFicha;
	}
}

if( !function_exists('recuperaClave') ) {
	// RECUPERA LA CLAVE DE UN EMAIL CONCRETO
	function recuperaClave($email){
		$query="SELECT clave FROM administradores WHERE email='".$email."'";
		$cursor=mysql_query($query);
		if (mysql_num_rows($cursor)==0) return false;
		else{
			$registro=mysql_fetch_array($cursor);
			return $registro[clave];
		}
	}
}

if( !function_exists('totalCategorias') ) {
	function totalCategorias($padre=0, $categorias=array(), $nivel=0){
		$nivel++;
		$arrayCategorias=categorias($padre);
		foreach ($arrayCategorias as $categoria){
			if (count($categorias)>0) $i=max(array_keys($categorias))+1;
			else $i=0;
			$categorias[$i][nombres]=categoriaNombres($categoria[id]);
			$categorias[$i][id]=$categoria[id];
			$categorias[$i][padre]=$categoria[padre];
			$categorias[$i][nivel]=$nivel;
			$query="SELECT id FROM categoria WHERE idPadre='".$categoria[idPadre]."' ";
			$cursor=mysql_query($query);
			if (mysql_num_rows($cursor)>0){
				$categorias=totalCategorias($categoria[id], $categorias, $nivel);
			}
		}
		return $categorias;
	}
}

if( !function_exists('volteaFecha') ) {
	// FUNCION QUE CAMBIA EL FORMATO DE FECHA SEGUN SEA NORMAL O MYSQL
	function volteaFecha($fecha){
		if (!is_numeric(substr($fecha, 2, 1))){
			// FECHA CON FORMATO NORMAL
			$fecha=substr($fecha, 6, 4).'/'.substr($fecha, 3, 2).'/'.substr($fecha, 0, 2).substr($fecha, 10);
		}else{
			// FECHA CON FORMATO MYSQL
			$fecha=substr($fecha, 8, 2).'-'.substr($fecha, 5, 2).'-'.substr($fecha, 0, 4).substr($fecha, 10);
		}
		return $fecha;
	}
}
?>