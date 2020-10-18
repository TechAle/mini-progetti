
<?php
if (hash("sha256", $_COOKIE["accesso_psw"]) == "8c5eeee2f6697ec32a07261d3c227c6b984cdf5377d82d08dea274f605b01f8c")
{show_source($_GET["link"]);}
else {
    echo '<html lang="it">
    <head>
        <title>
            Autenticazione
        </title>
    </head>
    <body>
        <form method="post" action="">
            <h1>Inserire il codice segreto per potere vedere il codice sorgente</h1>
            <input type="password" name="pswd">
            <input type="submit" name="avvia">
        </form>

    </body>

</html>';
}
if (isset($_POST["avvia"])) {
    if (hash("sha256", $_POST["pswd"]) == "8c5eeee2f6697ec32a07261d3c227c6b984cdf5377d82d08dea274f605b01f8c") {
        echo "corretta, aggiorna la pagina per potere visualizzare il codice";
        setcookie("accesso_psw", $_POST["pswd"]);
    }
    else
        echo "sbagliata";
}
?>