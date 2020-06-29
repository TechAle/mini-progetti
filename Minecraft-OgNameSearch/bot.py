## Per ricevere il codice sorgente
import requests
## Per analizzare i metadati
from bs4 import BeautifulSoup
## Per stoppare
import threading
## Per aspettare
import time
## Per vedere in tempo reale
import logging

'''
    Questa funzione ricorsiva riceve come input una parola e il punto dove
    deve iniziare e ritorna un altra parola seguendo le seguenti regole:
    inizi dall'ultima lettera,
    Se non è Z o 9 allora prendi il carattere successivo
    ( es a -> b oppure e -> f oppure 4 -> 5 )
    Se la lettera è Z allora trasformala in un 1
    Se la lettera è 9, trasformala in a e quella a sinistra falle fare
    il procedimento di sopra.
    Se tutte le lettere sono 9 allora crea una stringa di a che equivale a
    tanti a quanti caratteri c'erano prima + 1
'''
def rec_aument(parola, punto):
    ## Prendo la lunghezza della parola
    len_par = len(parola)
    ## Ricavo a quale index della lettera devo fare riferimento
    idx = len_par - 1 - punto
    ## Se siamo arrivati a un index che è maggiore della lunghezza attuale della parola
    if punto == len_par:
        ## Aggiungi a
        return 'a' + parola
    ## Se è z
    elif parola[idx] == 'z':
        ## Trasforma in 1
        return change_caracter(parola, '1', idx)
    ## Se è 9
    elif parola[idx] == '9':
        ## Trasforma in a
        parola = change_caracter(parola, 'a', idx)
        ## Ricomincia
        return rec_aument(parola, punto + 1)
    ## Senò
    else:
        ## Vai al carattere successivo
        return change_caracter(parola, chr(ord(parola[idx]) + 1), idx)

'''
    Funzione che, data una parola, un carattere e un index,
    restituisce la parola con all'index il nuovo carattere
'''
def change_caracter(parola, carattere, idx):
    ## Trasformo in lista
    s = list(parola)
    ## Sostituisco
    s[idx] = carattere
    ## Ritorno in stringa
    return "".join(s)

## I vari link
LINK = "https://api.mojang.com/users/profiles/minecraft/"
LINK2 = "https://it.namemc.com/name/"
## Setto logging
logging.basicConfig(filename = "name.log", format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')

## Stringa di inizio
start = "aaa"
try:
    ## Apro il file
    with open("checkpoint.txt", "r") as f:
        ## Leggo
        text = f.read().strip()
        ## Se è giusto
        if text.__len__() > 2:
            ## Sostituisci
            start = text
except FileNotFoundError:
    pass

## Funzione che appena si preme il pulsante invio termina il ciclo di sotto
def key_pressed():
    global uscita
    input("Premere invio per uscire")
    uscita = False

uscita = True
## Si avvia la funzione che termina
threading.Thread(target=key_pressed).start()
continua = True
## Cicla fino a che non si preme invio
while uscita:
    ## Prendi il codice sorgente dal primo link
    response2 = requests.get(LINK + start)
    ## Se è vuoto allora vuol dire che è disponibile
    if str(response2.text).__len__() == 0:
        ## Apro l'altro link
        response = requests.get(LINK2 + start)
        ## Uso BeautifulSoup per semplificare
        soup = BeautifulSoup(response.text)
        ## Prendo tutti i meta
        metas = soup.find_all('meta')
        ## Dai meta estraggo la descrizione
        val = [ meta.attrs['content'] for meta in metas if 'name' in meta.attrs and meta.attrs['name'] == 'description' ]
        try:
            ## Controllo aggiuntivo per evitare errori
            if not val[0].__contains__("Non"):
                output = start
                ## Controllo se c'è un countdown prima che sia disponibile
                if val[0].__contains__("sarà"):
                    ## Ultimo l'output
                    output += " {}".format(val[0].split(':')[1].split(',')[0])
                else:
                    output += " disponibile"
                ## Stampo nel logging
                logging.warning(output)
                ## Stampo nella console
                print(output)
            else:
                print("{} non disponibile".format(start))
        except IndexError:
            ## Nel caso ci siano state troppe richieste
            print("rallento")
            time.sleep(5)
        ## Chiudo la richiesta
        response.close()
    else:
        print("{} non disponibile".format(start))
        ## Stampo l'uuid
        print(response2.text)
    ## Se contiene "error"
    if response2.text.__contains__("error"):
        ## Aspetta, troppe richieste
        print("problema")
        time.sleep(4)
    else:
        ## Se tutto è andato liscio allora continua
        start = rec_aument(start, 0)
    ## Chiudi la richiesta
    response2.close()
    ## Attesa per evitare le troppe richieste
    time.sleep(0.87)
## Una volta finito salvo nel checkpoint
print("salvo")
with open("checkpoint.txt", "w") as f:
    f.write(start)
