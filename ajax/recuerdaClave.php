<?
$anulaControl=true;
include('../inc/inc.php');
$email=$_POST[email];
if ($email==''){
	echo "vacio";
	die();
}
if ($clave=recuperaClave($email)){
	if (mail($email, 'Consulta de clave', "La clave solicitada es: ".$clave, "From:clave@".$dominio)) echo "enviada";
	else echo "error";
}else echo "noExiste";
?>