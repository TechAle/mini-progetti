import os
import json
import collections

## Funzione che, dato un path, restituisce tutti i file
def get_files(root):
    ## Variabile che conterrà il tutto
    doom = {}
    ## Questo for è stato preso da https://stackoverflow.com/questions/2909975/python-list-directory-subdirectory-and-files
    for path, subdirs, files in list(os.walk(root))[::-1]:
        for name in files:
            if name[0] == '.':
                continue
            file = os.path.join(path, name)[15:]
            ### Mia modifiche: Raggruppo in mesi
            ## Controllo se il mese esiste
            mese = file.split('/')[0]
            if not doom.keys().__contains__(mese):
                doom[mese] = {}
            ## Controllo se dentro abbiamo già il progetto
            print(os.path.join(path, name))
            nome_progetto = file.split('/')[1]
            if not doom[mese].keys().__contains__(nome_progetto):
                doom[mese][nome_progetto] = []
            ## Aggiungiamo il file
            doom[mese][nome_progetto].append(file.split('/')[-1])

    ## Transormo le nostre key per renderle compatibili con le nostre directory
    for num, mese in list(enumerate(doom.keys())):
        ## Siccome non possiamo cambiare le key, prima creiamo
        ## Una nuova colonna e poi eliminiamo
        doom[f"0{num + 1}_{mese}"] = doom.pop(mese)

    ## Ordiniamo le key
    for mese in doom:
        doom[mese] = collections.OrderedDict(sorted(doom[mese].items()))

    return "var data = " + json.dumps(doom)

## Export
def create_json():
    with open("data.js", "w") as f:
        f.write(get_files("./php_files"))

if __name__ == "__main__":
    create_json()