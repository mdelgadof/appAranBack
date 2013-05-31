<?
$url="http://www.baqueira.es/parte/report";
$codigo=file_get_contents($url);
$aux=explode('Total Km. esquiables:', $codigo);
$km=trim(substr($aux[1], 0, strpos($aux[1], '<')));

echo '<h1>Km esquiables: '.$km.'</h1>';;

$tipos=explode('<h3', $codigo);
$n=0;
foreach($tipos as $tipo){
	$n++;
	if ($n<=1) continue;
	if ($n>4) continue;
	$aux=explode('>', $tipo);
	$nombreTipo=substr($aux[1], 0, strpos($aux[1], '<'));
echo '<h2>'.$nombreTipo.'</h2>';
	$zonas=explode('<h4>', $tipo);
	$i=0;
	foreach ($zonas as $zona){
		$i++;
		if ($i<=1) continue;
		$nombreZona=substr($zona, 0, strpos($zona, '<'));
echo '<br><strong>'.$nombreZona.'</strong><br>&nbsp;<br>';
		$pistas=explode('<li>', $zona);
		$j=0;
		foreach($pistas as $pista){
			$j++;
			if ($j<=1) continue;
			$aux=explode('alt="', $pista);
			$tipoPista=substr($aux[1], 0, strpos($aux[1], '"'));
			$estadoPista=substr($aux[2], 0, strpos($aux[2], '"'));
			$nombrePista=trim(strip_tags($pista));
echo $nombrePista.' - '.$tipoPista.' - '.$estadoPista.'<br>';
		}
	}
}

?>