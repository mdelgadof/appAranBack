<?
set_time_limit(0);
error_reporting(E_ALL ^ E_NOTICE);
include('../inc/bbdd.php');
$idioma=$_GET[idioma];

$fichero=fopen('../inc/idiomas/'.$idioma.'/LC_MESSAGES/messages.po', 'w');

$query2="SELECT es_ES as texto, ".$idioma." as traduccion FROM traduccion WHERE ".$idioma."!='' ";
$cursor2=mysql_query($query2);
while ($registro2=mysql_fetch_array($cursor2)){
	$cadena='msgid "'.str_replace("\n", '\n"'."\n".'"', str_replace('"', '\"', $registro2[texto])).'"'."\n".'msgstr "'.str_replace("\n", '\n"'."\n".'"', str_replace('"', '\"', $registro2[traduccion])).'"'."\n";
	fwrite($fichero, $cadena);
}
fclose($fichero);	
system('msgfmt -o ../inc/idiomas/'.$idioma.'/LC_MESSAGES/messages.mo ../inc/idiomas/'.$idioma.'/LC_MESSAGES/messages.po');
$query2="UPDATE traduccion SET po='si' WHERE idioma='".$idioma."'";
$cursor2=mysql_query($query2);

?>
Regenerado