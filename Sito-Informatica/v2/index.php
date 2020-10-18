<html lang="it" style="overflow: auto">
<head>

    <title>Index</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


</head>


<body>
<!-- https://codepen.io/soulwire/pen/EKmwC -->

<link rel="stylesheet" href="main.css">
<script type="javascript" src="main.js"></script>

<header class="header">
    <hgroup>
        <h1>Condello Alessandro</h1>
        <h2>Lista di tutti i files prodotti fino ad ora</h2>
    </hgroup>
</header>
<?php

function recorsiva_funzione($step) {
    return 25 * $step + 30 + ($step != 0 ? recorsiva_funzione($step - 1) : 0);
}

function get_altezza($colonna, $files) {

    $alto =  $colonna == 1 ? 55.12 : 65.42;
    $righe = $colonna == 1 ? $files * 35 + 18*2 : recorsiva_funzione($files);

    return $alto + $righe;
}

// https://stackify.com/how-to-log-to-console-in-php/
function console_log($output, $with_script_tags = true)
{
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) .
        ');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}
// Contiene la doom
$tabella = array();
// Contiene i file da ignorare
$ignore_list = array("main.js", "main.css", "index.php", "index.html", "my_home", ".idea", "show_source_code.php");
$index = 0;
// Apro la directory corrente
if ($handle = opendir('.')) {
    // Controllo tutti i file
    while (false !== ($entry = readdir($handle))) {
        // Ignoro i file nascosti e i file da ignorare
        if ($entry[0] != "." && !in_array($entry, $ignore_list)) {
            // Aggiungo nuova riga
            array_push($tabella, array());
            // il primo valore è il nome della tabella
            array_push($tabella[$index], $entry);
            // Apro la nuova directory
            if ($handle_dir = opendir('./' . $entry)) {
                // controllo ogni file
                while (false !== ($riga = readdir($handle_dir))) {
                    // Ignoro tutti i file nascosti
                    if ( $riga[0] != ".") {
                        // Aggiungo
                        array_push($tabella[$index], $riga);
                    }
                }

            }
            closedir($handle_dir);

            // Output
            $index++;
        }
    }

    closedir($handle);
}

/// lavoriamo con la doom
// Creo il root
$root = new DOMDocument('1.0', 'iso-8859-1');
$colonne = $riga = $padding_top = 0;

// https://stackoverflow.com/questions/2699086/how-to-sort-multi-dimensional-array-by-value
// Ordiniamo i nostri progetti
usort($tabella, function($a, $b) {
    return $a[0] <=> $b[0];
});

// https://stackoverflow.com/questions/834303/startswith-and-endswith-functions-in-php
function endsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    if( !$length ) {
        return true;
    }
    return substr( $haystack, -$length ) === $needle;
}

foreach ($tabella as $progetto) {
    // Se siamo all'inizio di una nuova riga, aggiuni una nuova riga
    if ( $colonne == 0 ) {
        // Creiamo la riga e li aggiungiamo la classe
        $riga_div = $root->createElement('section');
        $riga_div->setAttribute("class", "demo");
        // Variabile per tenere l'altezza massima dei nostri valori
        $max_h = 0;
    }

    // Creiamo la tabella
    $dl_aggiungere = $root->createElement("dl");
    // Aggiungiamo la classe a seconda della sua colonna
    $dl_aggiungere->setAttribute("class", "list " .
                                ($colonne == 0 ? "nigiri" : (
                                 $colonne == 1 ? "maki" : "sashimi"
                                )));
    // Aggiungiamo di quanto deve essere in basso
    $dl_aggiungere->setAttribute("style", sprintf("top:%dpx",150*($riga+1) + $padding_top / 1.5));
    // Aggiungiamo il nome del progetto
    $dl_aggiungere->appendChild($root->createElement("dt", $progetto[0]));
    $count_files = 0;
    // Aggiungiamo i vari files
    for($i = 1; $i < count($progetto); $i++) {
        if (endsWith($progetto[$i], "php") || endsWith($progetto[$i], "html")) {
            // Creo nuova riga
            $dd = $root->createElement("dd");
            // Aggiungo l'elemento per metterci il file
            $link = $root->createElement("a", $progetto[$i]);
            // Aggiungo il link
            $link->setAttribute("value", "./" . $progetto[0] . '/' . $progetto[$i]);
            // Appendo alla riga il link
            $dd->appendChild($link);
            // Aggiungo il tutto alla riga
            $dl_aggiungere->appendChild($dd);
            $count_files++;
        }
    }
    // Ricavo l'altezza massima
    $h = get_altezza($colonne, $count_files);
    $max_h = $max_h < $h ? $h : $max_h;
    // Appendiamo tutto
    $riga_div->appendChild($dl_aggiungere);
    // Se abbiamo raggiunto il limite
    if ( $colonne == 2 ) {
        // Resetta
        $riga++;
        $padding_top = $max_h / 2 + $padding_top;
        $colonne = $max_h = 0;
        // Aggiungi
        $root->appendChild($riga_div);
    // Senò incrementa colonne
    } else $colonne += 1;
}

// Salvo
$root->appendChild($riga_div);
echo $root->saveXML();

?>

<script>
    $("a").mousedown(function(event) {
        const link = event.target.attributes["value"].value;
        switch (event.which) {
            case 1:
                window.open(link);
                break;
            case 2:
                alert('Middle Mouse button pressed.');
                break;
            case 3:
                window.open("./show_source_code.php?link=" + link);
                break;
            default:
                alert('You have a strange Mouse!');
        }
    });
</script>

</body>
</html>
