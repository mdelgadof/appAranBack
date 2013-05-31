<?php
include('../inc/inc.php');
$idioma=$_POST[idioma];
$traduccion=$_POST[traduccion];
$id=$_POST[id];
guardaTraduccion($traduccion, $id, $idioma);
?>