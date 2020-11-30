// Importe les librairies grâce à "require"
const express = require('express');
const exphbs = require('express-handlebars');


// Import de la Classe
const DBManager = require('./db-manager');

// Instanciation de notre Objet
const dbManager = new DBManager();

// Instancie express
const app = express();

const port = 3000;

//Config Handlebars par express
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
  extname: '.hbs'
}));

// Déclare une route ici à la racine app.js
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// express.static = fonction logiciel pour importer des fichiers static
app.use(express.static('public'));

console.log('coucou');

app.get('/', function (req, res) {
  //Définit le type pour le header
  res.set('Content-Type', 'text/html');

  let query = "SELECT * FROM products";

  //Le serveur intercepte la requête
  dbManager.getDb().query(query, function (err, results) {
    if (err) throw err;
    console.log(results);

    res.render('home', {
      products: results,
    
    });
  });
});

// Création d'une nouvelle route pour le coté client (ici on cré une requête get)
app.get('/products', (req, res) => {
  console.log('toto');

  let query = "SELECT * FROM products";

  const search = req.query.search;
  // console.log('Search - ' + search);

  if (search) {
    query += " where productName like '%" + search + "%' ";
  } else {
    throw new Error('missing search parameter');
  }
  // connexion à la bdd + envoie requete de manière asynchrone // fonction de callback
  dbManager.getDb().query(query, function (err, results) {
    if (err) throw err;
    console.log(results);

    res.send(results);
  });


 
})

// Lance le serveur sur "tel" port
app.listen(port, () => {
  console.log('Le serveur écoute sur le port:' + " " + port)

})




