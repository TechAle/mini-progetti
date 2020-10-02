
/// Variabili globali
// Animazione iniziale
let start_mouse_x = null,
    isMouseDown = false,
    size_max = 1000,
    perc_movimento = 0,
    titolo_iniziale,
    finita_animazione = false;


// una volta che hai scrollato tutto a sinistra, torna a destra
function sinistra_destra() {
    // Riporto
    titolo_iniziale.style.left = "0px";
    titolo_iniziale.animate({opacity: 1}, 1100);
}

// Quando abbiamo il mouse cliccato
function mouseDown(event) {
    // Se non abbiamo ancora fatto l'animazione
    if ( !finita_animazione ) {
        // Prendi il titolo
        titolo_iniziale = document.getElementById("titolo");
        // Le coordinate
        start_mouse_x = event.clientX;
        // Avvia la ricezione
        isMouseDown = true;
    }
}

// Quando abbiamo rilasciato il mouse
function mouseUp() {
    if ( !finita_animazione ) {
        isMouseDown = false;
        // Se abbiamo scrollato abbastanza a sinistra
        if (perc_movimento === -100) {
            // Non permettere più l'animazione
            finita_animazione = true;
            // Avvio animazione per i vari file php
            html_to_php();
            sinistra_destra()
        } else {
            // Se non ha completato, riportal all'inizio
            titolo_iniziale.style.left = "0px";
        }
    }
}

// Quando lo stiamo movendo
function mouseMove(event) {

    if ( ! finita_animazione) {
        // Se abbiamo il mouse cliccato
        if (isMouseDown) {
            // Ricavo le coordinate di ora
            let now_mouse_x = event.clientX;
            // Movimento fatto
            let movimento_fatto = start_mouse_x - now_mouse_x;
            // Se il movimento che è stato fatto è verso sinistra
            if (movimento_fatto > 0) {
                perc_movimento = -100;
                // Calcola il movimento in percentuale rispetto size_max
                if (movimento_fatto < size_max)
                    perc_movimento = -(movimento_fatto / size_max) * 100;
                titolo_iniziale.style.left = String(perc_movimento * 4) + "px";

            }
        }
    }

}
let finale = {}
// Cambiamento dal titolo ai progetti php
function html_to_php() {
    // Aggiungo i mesi a fine
    Object.keys(data).forEach((key) => {finale[key] = []});
    finita_animazione = true;
    /// Funzioni annidate per ordine
    // Entra dentro i mesi
    function mese(key) {
        // Saltiamo se è undefined
        if ( key !== undefined ) {
            // Aggiorno il path
            path_mese = "./php_files/" + key + '/';
            mese_ricordo = key;
            // Aggiorno il codice
            codice += "<li>" + key.split("_")[1];
            // Se abbiamo dei dati dentro il nostro mese
            if ( data[key].length !== 0 ) {
                // Inserisco la lista
                codice += "<ol>";
                /// Itero dentro i progetti
                Object.keys(data[key]).forEach(progetti);
                // Finisco la lista
                codice += "</ol>"
            }
        }
        // Finisco il mese
        codice += "</li>"
    }
    // Entra dentro i progetti
    function progetti(key) {
        // Aggiorno il path
        path_progetto = path_mese + key + '/';
        //// Inizio il progetto
        codice += "<li class='progetto'><ul class=\"files\">";
        /// Inserisco il nome del progetto
        codice += "<span onclick=\"animazione(this)\">" + key.split('_')[1] + "</span>";
        // Itero dentro i vari file
        data[mese_ricordo][key].forEach(file);
        //// Finisco il progetto
        codice += "</ul></li>"
    }
    // Entro dentro i vari file
    function file(key) {
        // Path finale
        let path_finale = path_progetto + key;
        // Aggiorno il codice
        codice += "<li class=\"file\"><a href=" + path_finale + "> " + key + " </a></li>"
    }
    // La nostra root dove andremo a lavorare
    let root = document.getElementById("back");
    // Togliamo il titolo

    //// Prima di tutto bisogna scrivere il codice, iniziamo dall'inizio
    /// Variabili
    // Il codice che aggiungere
    let codice = "";
    // Tutti i path temporanei
    let path_mese = "";
    let path_progetto = "";
    let mese_ricordo = "";
    // Inizio fisso
    codice += "<ol id=\"mesi\">";
    // Andiamo dentro e iteriamo dentro i mesi
    Object.keys(data).forEach(mese);
    // Termino
    codice += "</ol>";

    root.innerHTML = codice;
}

function animazione(testo_cliccato) {
    let links = testo_cliccato.parentElement.children;
    /// Se ha fatto l'animazione allora avrà una classe chiamata "animato"
    // Se non ce l'ha animalo (se non ce l'ha non ha nessuna classe)
    if (testo_cliccato.classList.length === 0) {
        // Vado indietro di 1 nel dom verso il parent per poi prendere i nostri link
        for (let i = 1; i < links.length ; i++) {
            // Li rendo visibili e aggiungo l'animazione
            links[i].style.display = "initial";
            links[i].classList.add("an" + i);
        }
        // Aggiungo la classe
        console.log("aggiungi");
        testo_cliccato.classList.add("animato");
    }
    else {
        /// Parametri di invisibile per identificare il thread
        // Mese
        let mese = testo_cliccato.parentElement.parentElement.parentElement.parentElement.innerText.split("\n")[0]
        // Idx
        let idx = Array.prototype.slice.call(testo_cliccato.parentElement.parentElement.parentElement.children).indexOf(testo_cliccato.parentElement.parentElement)

        console.log("scompari");
        // Effetto trasparenza
        for (let i = 1; i < links.length; i++) {
            links[i].animate({opacity: 0}, 1100);
        }
        // Funzione asincrona per poi rendere invisibile
        finale[mese][idx] = setInterval(function() {invisibili(links, mese, idx);},1000);
        // Rimuovo la classe
        testo_cliccato.classList.remove("animato");
    }
}
// Rendi invisibile il testo una volta cliccato (asincrona)
function invisibili(links, mese, idx) {
    // Itera e rendi invisibile
    for(let i = 1; i < links.length; i++) {
        links[i].style.display = "none";
    }
    // Ferma il timer
    clearInterval(finale[mese][idx]);
}

