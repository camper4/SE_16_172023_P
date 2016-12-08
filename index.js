var express = require('express');
//general lib
var app = express();
//connect DB
var pg = require('pg');
//GET
var util = require('util');
//post
var bind = require('bind');

var splittare = require('split');

var db = require('./database.js');

var HTML = require('./createHTML.js');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));


var session = require('express-session')
app.use(session({  //per settare la libreria delle sessioni
	//required, used to prevent tampering
	secret: 'stringa per la sessione',   //propria stringa che permette di non far modificare il cookie della sessione
	//set time of validity of cookies
	cookie: { maxAge: 60000 } //durata massima in millisecondi
}));


app.get('/stile.css', function(req,res){
	res.sendFile('template/stile.css' , { root : __dirname });
});

app.get('/script.js', function(req,res){
	res.sendFile('template/script.js' , { root : __dirname });
});

app.set('port', (process.env.PORT || 5000));


/*
  riceve la prima chiamata di connessione al sito
*/
app.get('/', function(req, res) {
    bind.toFile('template/homepage.html',{}, 
    function(data) 
    {
        //write resonse
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});



/*
  riceve le chiamate in get per caricare nella pagina di scelta dei giorni in cui ordinare
  i vari giorni disponibili messi a disposizione dall'azienda nel database
*/
app.get('/caricagiorni', function(req,res){
	//chiamo la funzione loadQuery che esegue la query che passo come argomento e mi ritorna il risultato
	db.loadQuery({
		text: 'select giorno , mese , anno from GiorniOrdinazioni',
	}, function(err,giorni) { 
		if(err){ //controllo che non ci siano errori
		  res.redirect('/error'); //se ce ne sono rimando alla pagina di errore
		}
		else {
          //altrimenti creo con la funzione richiamata da createHTML 
          //il tbody della tabella dei giorni disponibili che visualizzerò nella prossima pagina in modo dinamico
          var tbody = HTML.creaTbodyGiorni(giorni);
          
          //carico il prossimo file html col tbody creato con le varie date
          bind.toFile('template/selezione_giorni.html',{
              tbody: tbody
          },function(data){
              res.writeHead(200, {'Content-Type':'text/html'});
              res.end(data);
          });
		}
    });
});		


app.post('/caricapasti', function(req,res){
  
  //query per la ricerca nel database delle pietanze nei giorni selezionati
  var query_text = 'select giorno, mese, anno, primo , secondo , contorno , dessert from GiorniOrdinazioni where ';
  
  //controllo se sono stati selezionati uno o più checkbox (checkgiorni restituirà solo il value delle caselle selezionate)
  //che è stato settato con la data stessa
  switch(typeof(req.body.checkgiorni)){
    case "string": //se è stato selezionato un solo checkbox avrò una stringa che userò come unica ricerca della query
      query_text += "(giorno || mese || anno)='" + req.body.checkgiorni + "'";
      break;
    case "object": //se ci sono più caselle selezionate le concateno con un 'OR' nella query
      for(i in req.body.checkgiorni){
        if(i == req.body.checkgiorni.length-1) //se sono arrivato all'ultima casella selezionata non aggiungo 'OR'
          query_text += "(giorno || mese || anno)='" + req.body.checkgiorni[i] +"'";
        else
          query_text += "(giorno || mese || anno)='" + req.body.checkgiorni[i] +"'" + " or ";
      }
    default:
      break;
  }
   
  //chiamo la funzione loadQuery che esegue la query che passo come argomento e mi ritorna il risultato
  db.loadQuery({
      text: query_text
  }, function(err,ordinazioni_possibili) {
      if(err){ //controllo che non ci siano errori
		  res.redirect('/error'); //se ce ne sono rimando alla pagina di errore
		}
      else {
        //altrimenti creo con la funzione richiamata da createHTML 
        //il tbody della tabella delle pietanze nei giorni scelti che visualizzerò nella prossima pagina in modo dinamico
        var tbody = HTML.creaTabellaOrdinazioniPossibili(ordinazioni_possibili);

        bind.toFile('template/selezione_pasti.html',{
            tbody: tbody
        },function(data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        });
      }
  });
});		




app.get('/error', function(req, res) {
    bind.toFile('template/error.html',{}, 
    function(data) 
    {
        //write resonse
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
