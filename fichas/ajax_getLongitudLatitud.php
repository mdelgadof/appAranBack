<?
include ("../inc/inc.php");


$url = "http://maps.google.com/maps/api/geocode/xml?address=".urlencode($_GET["dir"])."&sensor=true";
$xml = utf8_decode(file_get_contents($url));

$i=0;
while ($pos=strpos($xml,"<location>")) {
	$i++;
	$pos=strpos($xml,"<lat>",$pos)+5;
	$lat=substr($xml,$pos,strpos($xml,"</lat>",$pos)-$pos);
	$pos=strpos($xml,"<lng>",$pos)+5;
	$lng=substr($xml,$pos,strpos($xml,"</lng>",$pos)-$pos);
	$xml=substr($xml,$pos);
}
echo $i."|".$lat."|".$lng;
?>