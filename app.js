// Importe les librairies grâce à "require"
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

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

const dbConnexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'classicmodels'
});

dbConnexion.connect(error => {
  if (error) throw error;
  console.log("Connecté à la base de donnée");
});




app.get('/', function (req, res) {
  //Défini le type pour le header
  res.set('Content-Type', 'text/html');

  let query = "SELECT * FROM products";

  const search = req.query.search;
  console.log('Search - ' + search);

  if (search) {
    query += " where productName like '%" + search + "%' ";
  }

  //Le serveur intercepte la requête
  dbConnexion.query(query, function (err, results) {
    if (err) throw err;
    console.log(results);

    res.render('home', {
      products: results,
      searchKey: search
    });
  });
});

// Lance le serveur sur "tel" port
app.listen(port, () => {
  console.log('Le serveur écoute sur le port:' + " " + port)

});


