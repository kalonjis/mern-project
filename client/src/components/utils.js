/**Diverses fonctions qu'on va utiliser dans le projet à plusieurs endroits*/

// fonction pour traiter les dates

export const dateParser =(num) => {
    // on stocke le paramétrage de la date
    let options = {
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        weekday:'long',
        year:'numeric',
        month:'short',
        day:'numeric'
    };

    let timestamp = Date.parse(num) // methode native pour convertir une date texte en milisec depuis 01/01/70 (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/parse)

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options) //on convertit la date avec notre format

    return date.toString() //on renvoie la date
}

export const timestampParser =(num) => {
    // on stocke le paramétrage de la date
    let options = {
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        weekday:'long',
        year:'numeric',
        month:'short',
        day:'numeric'
    };

    let date = new Date(num).toLocaleDateString('fr-FR', options) //on convertit la date avec notre format

    return date.toString() //on renvoie la date
}

//Fonction pour vérifier si une variable est vide (pas de fct native dans JS !== PHP)

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value ==='object' && Object.keys(value).length === 0)||
        (typeof value === 'string' && value.trim().length === 0)
    );
};