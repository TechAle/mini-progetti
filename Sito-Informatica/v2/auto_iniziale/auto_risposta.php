<?php
$data_ritiro = $_GET['data_ritiro'];
$macchina = $_GET['macchina'];
$cognome = $_GET['cognome'];
$nome = $_GET['nome'];
$giorni = $_GET['giorni'];
$anni = $_GET['anni'];

$costo = $macchina*$giorni;
if($giorni>3)
$costo = $costo - (5*$giorni);

if($anni<25)
    $costo = $costo + 12.50;


echo "Gent, Sig.$cognome $nome la sua prenotazione per il giorno $data_ritiro e’ stata accettata.
Al momento del ritiro dovra’ saldare un conto di euro $costo per $giorni di noleggio.<br/><b>(La tariffa comprende il supplemento assicurativo).</b>";
?>
