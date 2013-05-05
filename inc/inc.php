<?php
error_reporting(E_ALL ^ E_NOTICE);
// DIFERENCIAMOS RUTAS SEGUN ESTEMOS EN LOCAL O EN REAL, PARA PODER DESARROLLAR
if (strpos($_SERVER['HTTP_HOST'], 'localhost')!==false || strpos($_SERVER['HTTP_HOST'], '192.168.1.')!==false){
	$_SERVER['HTTP_HOST'].='/baqueira';
	$_SERVER['DOCUMENT_ROOT'].='/baqueira';
}else{
	session_set_cookie_params(0, '/', $_SERVER['HTTP_HOST']); 
}

DEFINE("DOCUMENT_ROOT", $_SERVER['DOCUMENT_ROOT'].'/');
DEFINE("WEB_ROOT", 'http://'.$_SERVER['HTTP_HOST'].'/');

include(DOCUMENT_ROOT.'/inc/bbdd.php');
include(DOCUMENT_ROOT.'/inc/funciones.php');
?>