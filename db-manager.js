const mysql = require('mysql');

// Déclaration de notre Classe
class DBManager {
// encapsulation / Polymorphisme / Héritage => Note pour plus tard
// db = attribut de la classe DB Manager

    constructor() { // Transforme notre classe en objet (qui vis qui a donc un état)
        // this = accès à l'intérieur de notre objet db, on affecte à db les valeurs de la connexion
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'classicmodels'
        });

        // Mapping de this pour pouvoir l'utiliser dans le scope de la fonction de callback connect
        const that = this;
        
        //lance la fonction de connexion => function de callback
        this.db.connect(error => {
            if (error) {
                throw error;
            }
            console.log(that.db);
            console.log("Connecté à la base de données MySQL!");
        });
    }
    // On déclare une méthode à l'intérieur de notre class
    getDb(){
        return this.db;
    }
}

//Définir le getter

// Export de la classe dans notre module
module.exports = DBManager;