<?php
$nome = $_GET["nome"];
$costo = $_GET["costo"];
$riga="$nome;$costo";
$f=fopen("auto.txt","a") or die ("Errore nell'apertura del auto.txt...");
fputs($f, "\n" . $riga);
fclose($f);
echo "Riga ".$riga. " scritta nel file auto.txt";
?>