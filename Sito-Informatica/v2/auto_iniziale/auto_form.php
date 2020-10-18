<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>auto</title>
</head>
<body>
<form action="auto_risposta.php" method="get">
    <fieldset>
        <legend>SCELTA AUTO</legend>
        Scegli una macchina<br/>
        Data di ritiro <input type="date" name="data_ritiro"/><br/>
        <?php

        $f=fopen("auto.txt","r") or die ("Errore apertura file auto.txt...");

        while($s=fgets($f)) {
            $v = explode(";", $s);

            $output .= '<input type="radio" name="macchina" value=" ' . $v[1]. ' "/>' . $v[0] . ' ($' . $v[1] . ')<br/>';
        }
        fclose($f);


        echo $output ?>
    </fieldset>
    <fieldset>
        <legend>DATI</legend>
        Cognome<br><input type="text" name="cognome" required><br/>
        Nome<br><input type="text" name="nome" required><br/>
        Numero giorni<br><input type="number"  name="giorni"><br>
        Anni Conducente<br><input type="number" name="anni"><br>
    </fieldset>

    <input type="submit" name="invia">

</form>

</body>
</html>