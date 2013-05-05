<?
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
		if ($extension!='jpg' && $extension!='jpeg' && $extension!='gif' && $extension!='png' && $extension!='tif' && $extension!='swf') return "Error en formato de archivo de banner. Sólo se admiten extensiones jpg, gif o png";
		else{
			if (!copy($banner['tmp_name'], DOCUMENT_ROOT.'imagenes/banners/'.$nombre)) return "Error. No se ha podido subir el fichero";	
			else return true;
		}
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

if( !function_exists('fichas') ) {
	// FUNCION QUE DEVUELVE LAS FICHAS SEGUN SE ESPECIFIQUE
	function fichas($nombre='', $categoria=''){
		$arrayFichas=array();

		return $arrayFichas;
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