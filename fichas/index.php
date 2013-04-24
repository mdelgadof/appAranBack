<!DOCTYPE html>
<html>
<head>

<title>
To Do List
</title>

<!-- Meta Tags -->
<meta charset="utf-8">
<meta name="generator" content="Wufoo">
<meta name="robots" content="noindex, nofollow">

<!-- CSS -->
<link href="css/structure.css" rel="stylesheet">
<link href="css/form.css" rel="stylesheet">
<link href="aloha/css/aloha.css" rel="stylesheet" type="text/css" />

<!-- JavaScript -->
<script src="scripts/wufoo.js"></script>
<script type="text/javascript" src="aloha/lib/require.js"></script>
<script type="text/javascript" src="aloha/lib/vendor/jquery-1.7.2.js"></script>
<!-- load the Aloha Editor core and some plugins -->
<script src="aloha/lib/aloha.js"
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
<div id="container" class="ltr">

<?
include "vistaFicha.php";
$idiomas=array();

// Sacar idiomas de BD...
$idiomas[0]["codigo"]="ES_es";
$idiomas[0]["nombre"]="Español";
$idiomas[1]["codigo"]="EN_gb";
$idiomas[1]["nombre"]="English";
$idiomas[2]["codigo"]="FR_fr";
$idiomas[2]["nombre"]="Français";

vistaFicha(0,$idiomas);

?>


</div><!--container-->

<a class="powertiny" href="http://wufoo.com/form-builder/" title="Powered by Wufoo"
style="display:block !important;visibility:visible !important;text-indent:0 !important;position:relative !important;height:auto !important;width:95px !important;overflow:visible !important;text-decoration:none;cursor:pointer !important;margin:0 auto !important">
<span style="background:url(./images/powerlogo.png) no-repeat center 7px; margin:0 auto;display:inline-block !important;visibility:visible !important;text-indent:-9000px !important;position:static !important;overflow: auto !important;width:62px !important;height:30px !important">Wufoo</span>
<b style="display:block !important;visibility:visible !important;text-indent:0 !important;position:static !important;height:auto !important;width:auto !important;overflow: auto !important;font-weight:normal;font-size:9px;color:#777;padding:0 0 0 3px;">Designed</b>
</a>
</body>
</html>