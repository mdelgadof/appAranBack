<?
$meses['January']='01';
$meses['February']='02';
$meses['March']='03';
$meses['April']='04';
$meses['May']='05';
$meses['June']='06';
$meses['July']='07';
$meses['August']='08';
$meses['September']='09';
$meses['October']='10';
$meses['November']='11';
$meses['December']='12';

$tipo['Partly cloudy']='Parcialmente nublado';
$tipo['Fair']='Despejado';
$tipo['Cloudy']='Nublado';
$tipo['Rain']='Lluvioso';
$tipo['Rain showers']='Lluvioso';

$puntos['north']='norte';
$puntos['south']='sur';
$puntos['west']='oeste';
$puntos['east']='este';
$puntos['southwest']='suroeste';
$puntos['northwest']='noroeste';
$puntos['southeast']='sureste';
$puntos['northeast']='noreste';
$puntos['north-northwest']='norte-noroeste';
$puntos['north-northeast']='norte-noreste';
$puntos['south-southwest']='sur-suroeste';
$puntos['south-southeast']='sur-sureste';
$puntos['west-southwest']='oeste-suroeste';
$puntos['east-southeast']='este-sureste';
$puntos['west-northwest']='oeste-noroeste';
$puntos['east-northeast']='este-noreste';

$url="http://www.yr.no/place/Spain/Catalonia/Baqueira-Beret/varsel.rss";
$codigo=file_get_contents($url);
$datos= new SimpleXMLElement($codigo);
foreach($datos->channel->item as $dato){
	$description=$dato->description;
	$title=$dato->title;
	$imagen=$dato->enclosure[url];
	$tiempo=trim(substr($description, 0, strpos($description, '.')));

	$partesTitle=explode(' ', trim($title));
	$fecha=$partesTitle[3].'-'.$meses[$partesTitle[2]].'-'.$partesTitle[1];
	$hora=$partesTitle[5];

	$tiempo=$tipo[$tiempo];

	$description=substr($description, strpos($description, '.')+2);

	$temperatura=substr($description, 0, strpos($description, 'Â'));

	$aux=explode('at', $description);
	$hora=trim(substr($aux[1], 0, strpos($aux[1], '.')));

	$description=substr($description, strpos($description, '.')+2);

	$aux=explode(',', $description);
	$viento=trim(substr(trim($aux[1]), 0, strpos(trim($aux[1]), ' ')));

	$aux=explode('from', $description);
	$desde=trim(substr($aux[1], 0, strpos($aux[1], '.')));

	$aux=explode('. ', $description);
	$preci=trim(substr(trim($aux[1]), 0, strpos(trim($aux[1]), ' ')));

	$aux=explode('. ', $description);
	$hora=trim(substr(trim($aux[1]), 0, strpos(trim($aux[1]), ' ')));
}
?>