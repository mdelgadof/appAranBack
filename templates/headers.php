<!DOCTYPE html>
<html>
<head>
<title>Sistema de gestión</title>
<style type="text/css" media="screen"> 
<!-- @import url( <?=WEB_ROOT?>/css/menu.css ); -->
</style>
<? if ($_GET["seccion"]=="fichas" || $_GET["seccion"]=="articulos") { ?>

<!-- Meta Tags -->
<meta charset="ISO-8859-1">
<meta name="generator" content="Wufoo">
<meta name="robots" content="noindex, nofollow">

<!-- CSS -->
<link href="<?= WEB_ROOT ?>fichas/css/structure.css" rel="stylesheet">
<link href="<?= WEB_ROOT ?>fichas/css/form.css" rel="stylesheet">
<link href="<?= WEB_ROOT ?>fichas/aloha/css/aloha.css" rel="stylesheet" type="text/css" />

<!-- JavaScript -->
<script src="<?= WEB_ROOT ?>fichas/scripts/wufoo.js"></script>
<script type="text/javascript" src="<?= WEB_ROOT ?>fichas/aloha/lib/require.js"></script>
<script type="text/javascript" src="<?= WEB_ROOT ?>fichas/aloha/lib/vendor/jquery-1.7.2.js"></script>
<!-- load the Aloha Editor core and some plugins -->
<script src="<?= WEB_ROOT ?>fichas/aloha/lib/aloha.js"
	data-aloha-plugins="common/ui,
	common/format,
	common/list,
	common/link,
	common/highlighteditables">
</script>
<script type="text/javascript">
	Aloha.ready( function() {
		var $ = Aloha.jQuery;
		$('.editable').aloha();
	});
</script>

<!--[if lt IE 10]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>

<body id="public">

<? } else { ?>
<style type="text/css" media="screen"> 
<!-- @import url( <?=WEB_ROOT?>/css/estilos.css ); -->
</style>
<link href="<?= WEB_ROOT ?>fichas/css/structure.css" rel="stylesheet">
<link href="<?= WEB_ROOT ?>fichas/css/form.css" rel="stylesheet">


<script src='<?=WEB_ROOT?>/js/jquery.js' type='text/javascript'></script>
<script src="<?=WEB_ROOT?>/js/funciones.js"></script>
</head>

<body id="public">
<? } ?>