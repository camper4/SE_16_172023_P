var express = require('express');
//general lib
var app = express();
//connect DB
var pg = require('pg');
//GET
var util = require('util');
//post
var bind = require('bind');

var db = require('./database.js')

var HTML = require('./createHTML.js')


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

app.get('/', function(req, res) {
    bind.toFile('template/homepage.html',{}, 
    function(data) 
    {
        //write resonse
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});


app.get('/caricagiorni', function(req,res){
	
	db.loadQuery({
		text: 'select data from GiorniOrdinazioni',
	}, function(err,giorni) {
		if(err){
		  res.redirect('/error');
		}
		else {
          
          for(a in giorni){
            var d = new Date(giorni[a].data);
            var str = $.datepicker.formatDate('yy-mm-dd', d);
            console.log("giorni:" + str);
          }
          var tbody = HTML.creaTbodyGiorni();
          //creare tbody con i giorni presi dal database
          
          bind.toFile('template/selezione_giorni.html',{
              tbody: tbody
          },function(data){
              res.writeHead(200, {'Content-Type':'text/html'});
              res.end(data);
          });
		}
    });
});		



app.get('/caricapasti', function(req,res){
	/*
	db.loadQuery({
		text: 'select data from GiorniOrdinazioni',
	}, function(err,giorni) {
		if(err){
		  res.redirect('/error');
		}
		else {
          */
          var tbody = "<tbody><tr><td>10-12-1555555555</td><td><input type=\"checkbox\"></td></tr><tr><td>11-12-15</td><td><input type=\"checkbox\"></td></tr><tr><td>12-12-15</td><td><input type=\"checkbox\"></td></tr></tbody>"
          //creare tbody con i giorni presi dal database
          
          bind.toFile('template/selezione_pasti.html',{
              tbody: tbody
          },function(data){
              res.writeHead(200, {'Content-Type':'text/html'});
              res.end(data);
          });
		});
        /*
    });
});		
*/


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
