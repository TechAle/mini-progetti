import os
import shutil

def get_project_choose():
    ## Prendo tutti i nostri progetti da aggiungere
    projects = os.listdir("./files_to_add")
    ## Stampo
    print("Projects: ")
    for idx, project in enumerate(projects):
        if not project.__contains__("Store"):
            print(f"{idx}\t{project}")
    return projects[int(input("Choose: "))]

def create_path(scelta):
    ## Prendo il mese
    mese = input("Mese: ").lower()
    ## Cerco qual'è il nome reale nella nostra directory
    mese_directory = [x for x in os.listdir("php_files") if x.__contains__(mese)][0]
    ## Ricavo il numero che prenderà il nostro progetto
    num = len(os.listdir("./php_files/" + mese_directory))
    num = str(num + 1) if num + 1 > 9 else '0' + str(num)
    ## Creo la directory
    path_ = f"./php_files/{mese_directory}/{num})_{scelta}"
    ## Muovo il file
    shutil.move(f"./files_to_add/{scelta}", path_)

def main():
    ## Prendo il progetto
    choose = get_project_choose()
    ## Creo il path e muovo il file
    create_path(choose)



if __name__ == "__main__":
    main()
