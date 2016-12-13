//importate alcune librerie necessarie al funzionamento del server
var express = require('express');
var app = express();
var pg = require('pg');
var util = require('util');
var bind = require('bind');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session')
app.use(session({
	secret: 'stringa segreta per la sessione', //setto il codice segreto per proteggere la sessione
	cookie: { maxAge: 60000 } //setto la durata dell'attributo di sessione
}));


//importate librerie locali per il database e per la creazione di alcune parti di HMTL
var db = require('./database.js');
var HTML = require('./createHTML.js');


//rendo disponibile gli stili e le funzioni di script per le pagine HTML
app.get('/stile.css', function(req,res){
	res.sendFile('template/stile.css' , { root : __dirname });
});
app.get('/script.js', function(req,res){
	res.sendFile('template/script.js' , { root : __dirname });
});



/*
  riceve la prima chiamata di connessione al sito e reindirizza alla homepage
*/
app.get('/', function(req, res) {
  if(req.headers.referer == undefined){ //controllo se arrivo da un ordine completato o da una normale connessione iniziale
    //carico la homepage normale
    bind.toFile('template/homepage.html',{
    },function(data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
  }
  else{
    //carico la homepage mandando prima lo scipt di avvenuto completamento di un ordine
    console.log("ordinefinito");
    bind.toFile('template/homepage.html',{
      script: "<script>alert('Complimenti, hai portato a termine un ordine, verrai reindirizzato alla homepage');</script>"
    },function(data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
  }
});


/*
  riceve le chiamate in get dall'homepage e recupera dal database le date in cui è possibile fare delle ordinazioni messe a disposizione precedentemente dall'azienda per visualizzarle nella successiva pagina
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
        //altrimenti creo con la funzione richiamata da createHTML.js il tbody della tabella dei giorni disponibili che visualizzerò nella prossima pagina in modo dinamico
        var tbody = HTML.creaTbodyGiorni(giorni);

        //carico il file html co il tbody creato con le varie date disponibili
        bind.toFile('template/selezione_giorni.html',{
            tbody: tbody
        },function(data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        });
      }
  });
});		


/*
  riceve le chiamate in post per caricare nella pagina di scelta delle pietanze i vari giorni scelti dall'utente nella precedente pagina di selezione dei giorni controllandone le varie checkbox che sono state spuntate
*/
app.post('/caricapasti', function(req,res){
  //prima parte del testo della query per la ricerca nel database delle pietanze nei giorni selezionati
  var query_text = 'select giorno, mese, anno, primo , secondo , contorno , dessert from GiorniOrdinazioni where ';
  
  //controllo se sono stati selezionati uno o più checkbox (checkgiorni restituirà solo il value delle caselle selezionate). Verrà trovata la data nella quale si ha scelto di ordinare qualcosa
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
  
  //chiamo la funzione loadQuery che esegue la query che passo come argomento e mi ritorna le pietanze da scegliere
  db.loadQuery({
      text: query_text
  }, function(err,ordinazioni_possibili) {
      if(err){ //controllo che non ci siano errori
        res.redirect('/error'); //se ce ne sono rimando alla pagina di errore
      }
      else {
        //altrimenti creo con la funzione richiamata da createHTML.js il tbody della tabella delle pietanze nei giorni scelti che verranno visualizzate nella prossima pagina in modo dinamico
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


/*
  riceve le chiamate in post dalla pagina di scelta delle pietanze e inserisce in un attributo di sessione le scelte fatte dall'utente per poi andare ad inserirle nel database dalla pagina successiva nella quale l'utente invierà i propri dati e confermerà le ordinazioni
*/
app.post('/inviadati', function(req,res){
  
  req.session.ordinazioni = ""; //setto l'attributo di sessione come vuoto
  var ordinazioni_da_mostrare = ""; //setto la variabile delle ordinazioni che farò visualizzare dalla successiva pagina
  
  //controllo se sono stati selezionati uno o più checkbox (checkscelte restituirà solo il value delle caselle selezionate). Ogni checkbox ritornerà la data seguita da un '=' con la pietanza scelta in quella data
  switch(typeof(req.body.checkscelte)){
    case "string": //se è stato selezionato un solo checkbox avrò una stringa unica di ordinazione
      req.session.ordinazioni += req.body.checkscelte;//inserisco nell'attributo di sessione
      ordinazioni_da_mostrare += req.body.checkscelte + "<br>";//inserisco nella variabile con un a capo
      break;
    case "object": //se ci sono più caselle selezionate metto tutte le scelte fatte
      for(i in req.body.checkscelte){
        req.session.ordinazioni += req.body.checkscelte[i] + "\n"; //inserisco nell'attributo di sessione
        ordinazioni_da_mostrare += req.body.checkscelte[i] + "<br>"; //inserisco nella variabile con un a capo
      }
    default:
      break;
  }
  
  ordinazioni_da_mostrare += "<br>"; //aggiungo l'ultimo a capo nella variabile che mostrerà le ordinazioni nella pagina di invio
  
  // carico la pagina di conferma dell'ordinazione con l'inserimento dei propri dati
  bind.toFile('template/invia.html',{
      ordinazioni: ordinazioni_da_mostrare //mando alla pagina le ordinazioni scelte dall'utente come promemoria per la conferma
    }, function(data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    });
});		


/*
  riceve le chiamate in post dalla pagina di invio delle credenziali e salva nel database la richiesta fatta dall'utente con tutte le sue generalità e con le ordinazioni fatte 
*/
app.post('/confermaordinazioni', function(req,res){
  
  //crea la prima parte della query per l'inserimento dei dati nel database
  var query_text = "INSERT INTO Ordinazioni (nome , cognome, codice_fiscale , indirizzo , email , ordinazioni ) VALUES ('";
  //inserisco tutti i campi digitati nel form per l'invio dei dati dall'utente
  query_text += req.body.nome + "' , '";
  query_text += req.body.cognome + "' , '";
  query_text += req.body.cod_fiscale + "' , '";
  query_text += req.body.indirizzo + "' , '";
  query_text += req.body.email + "' , '";
  query_text += req.session.ordinazioni + "')";
  
  //chiamo la funzione loadQuery che esegue la query che passo come argomento per inserire le generalità dell'utente e le 
  db.loadQuery({
      text: query_text
  }, function(err,risultato) {
      if(err){ //controllo che non ci siano errori
          res.redirect('/error'); //se ce ne sono rimando alla pagina di errore
        }
      else {
        res.redirect('/');
        //altrimenti mando l'utente alla pagina che gli conferma l'avvenuta registrazione dell'ordine
        
      }
  });
});


/*
  chiamata in get che si attiva quando si ha rilevato un errore interno
*/
app.get('/error', function(req, res) {
  bind.toFile('template/error.html',{
  }, function(data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
  });
});


//viene messo il server in ascolto e settata la porta

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});