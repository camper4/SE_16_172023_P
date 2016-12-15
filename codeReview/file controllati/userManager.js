// LIBRERIE UTILIZZATE
var express = require('express');
var bind = require('bind');
var session = require('express-session')
var pg = require('pg');
var util = require('util');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));


//SESSION PER TENERE TRACCIA DEL USER ID
app.use(session({ 
	//required, used to prevent tampering
	secret: 'string for the hash', 
	//set time of validity of cookies
	cookie: { maxAge: 1000000 }
}));
/**
 * @brief GET PER GLI  SCRIPT DI CONTROLLO E DELL'IMMAGINE 
 */

app.get('/controlhome.js' , function(req,res){
    res.sendFile('home/controlhome.js' , {root: __dirname})
    });
app.get('/controlreg.js' , function(req,res){
    res.sendFile('registrazione/controlreg.js' , {root: __dirname})
    });
app.get('/controllo_pre_reg.js' , function(req,res){
    res.sendFile('prenotazione/controllo_pre_reg.js' , {root: __dirname})
    });
app.get('/style.css', function(req,res){
    res.sendFile('registrazione/style.css', {root: __dirname})
});
app.get('/immagine.png', function(req,res){
    res.sendFile('img/immagine.png', {root: __dirname})
});

/**
 * @brief POST CHE RICHIAMA LA PAGINA DI REGISTRAZIONE 
 */

app.use('/registrazione' , function(req,res){
    res.sendFile('registrazione/registrazione.html' , {root: __dirname})
    });

/**
 * @brief GET CHE GESTISCE LA PAGINA PRINCIPALE AL PRIMO AVVIO SE C'è GIA UNA SESSIONE ATTIVA MANDA AL LOGIN.TPL ALTRIMENTI MANDA ALLA PAGINA PRINCIPALE 
 */
 
app.get('/' , function(req,res){
   	//check if the session exists
	if (req.session.user_id != null) {
    	 bind.toFile('login/login.tpl', {
                        //set up parameters
                        username: req.session.user_id                             
                    }, function(data) {                                
                                res.end(data);
                                
                            });
  	}
	else
	{
		res.sendFile('home/home.html' , {root: __dirname})
		
	}
});
/**
 * @brief POST CHE GESTISCE IL LOGOUT, DISTRUGGE SESSION USER ID CORRENTE E MANDA ALLA PAGINA PRINCIPALE 
 */

app.use('/logout', function(request, response){
	    request.session.user_id = null;
    	response.sendFile('home/home.html' , {root: __dirname})
		
});



/**
 * @brief POST IN CUI REGISTRA UN NUOVO ACCOUNT
 */

app.use('/register/', function(request, response) {
    // VARIABILI PER ESTRAPOLARE I FORM DATA
	var username =request.body.username_reg;
    var password=request.body.password_reg;
    var email=request.body.email_reg;   
    
    //VARIABILE USATA PER CONTROLLARE SE ESISTE GIA' UN USERNAME CON LO STESSO NOME DEL DATABASE
    var username_exist;
	    
    //FUNZIONE CHE CONTROLLA SE CI SIA UN ALTRO ACCOUNT CON LO STESSO USERNAME, SE COSI FOSSE RIMANDA ALLA PAGINA PRINCIPALE + FUNZIONE DI CALLBACK PER //ESTRAPOLARE LA LUNGHEZZA DELLA TABELLA DA USARE COME USER_ID
    findusername(username,function(username_exist){
    lunghezza(function(count){
    if(!username_exist){
        response.writeHead(200, {'Content-Type': 'text/html'});
    pg.connect(process.env.DATABASE_URL , function(err, client, done) {  
		//add element
        
		client.query({text: 'insert into utente_registrato values ($1, $2, $3 , $4)',
			values: [count,request.body.username_reg,request.body.password_reg,request.body.email_reg]}
            , function(err, result) {
		          done();
                request.session.user_id=username;
		          if (err) { 
                      console.error(err); 
                      response.send("Error insert " + err); 
                  }
		          else {
                      	
			         bind.toFile('login/login.tpl', {
                        username: username                             
                    }, function(data) {                                
                                response.end(data);
                                
                            });
		          }
		      });
  	});
    }
    else{
        
        response.redirect('/');
    }
              
    });});

});

/**
 * @brief  POST PER LOGGARE DALLA PAGINA PRINCIPALE, SE C'è UNA SESSIONE ALLORA ANDANDO NELLA HOME RIMANE LA PROPRIA SESSIONE, SE NON C'è, SE SI PROVA A LOGGARE CON UN USERNAME SBAGLIATO, SI VIENE RIMANDATI ALLA PAGINA PRINCIPALE , ALTRIMENTI LOGGA
 */

app.use('/login_home/', function(request, response) {	
    	//check if the session exists
	if (request.session.user_id != null) 
	{
        bind.toFile('login/login.tpl', {
                        //set up parameters
                        username: request.session.user_id                            
                    }, 
                            function(data) {
                                response.writeHead(200, {'Content-Type': 'text/html'});	
                                response.end(data);
                                
                            });	
  	}
	else
	{
		
		pg.connect(process.env.DATABASE_URL, function(err, client, done) {		
           client.query({text: 'select username from utente_registrato where username=$1 and password=$2' ,                     
                values: [request.body.username_input , request.body.password_input ]}, function(err, result) {
                done();
                if (err) { 
                  console.error(err); 
                  response.send("Error insert " + err); }
                else {
                  if(result.rows.length>0){
                  request.session.user_id=result.rows[0].username;
                  bind.toFile('login/login.tpl', {
                            //set up parameters
                            username: result.rows[0].username                           
                        }, function(data) {
                                    response.writeHead(200, {'Content-Type': 'text/html'});	
                                    response.end(data);

                                });
                  }
                  else{
                    response.redirect('/');
                  }

               }
            });
  	});    
    }
	
});

/**
 * @brief POST PER LA PRENOTAZIONE CHE MANDA AD UNA PAGINA DOVE PUOI PRENOTARE UN VIAGGIO
 */
 
app.use('/prenotazione/', function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});	
	console.log("called prenotazione"+request.session.user_id);
	//check if the session exists
	create_table(function(table){
                    bind.toFile('prenotazione/prenotazione_reg.tpl', {
                        //set up parameters
                        username: request.session.user_id,
                        table : table
                    }, 
                            function(data) {
                                
                                response.end(data);
                                
                            });
    });
    
           });

/**
 * @brief POST PER IMETTERE LA PRENOTAZIONE NEL DATABASE
 */

app.use('/prenotazione_effettuata/', function(request, response) {
	var start =request.body.prenotazione_reg_start;
    var date=request.body.prenotazione_reg_date;
    var destination=request.body.prenotazione_reg_destination;
    var posto = '';
   	response.writeHead(200, {'Content-Type': 'text/html'});	
	 prenota_values(start,destination,date,function(n_bus,orario){
              pg.connect(process.env.DATABASE_URL , function(err, client, done) {		            
		          //add element
                    client.query({text: 'insert into prenota values ($1, $2, $3,$4,$5,$6)',
                        values: [request.session.user_id ,n_bus,posto,orario,start,destination]}
                        , function(err, result) {
                      done();

                      if (err) { 
                          console.error(err); 
                          response.send("Error insert " + err); }
                      else {
                           bind.toFile('prenotazione/prenotazione_effettuata.tpl', {
                                    //set up parameters
                                    username: request.session.user_id 

                                }, 
                                        function(data) {

                                            response.end(data);

                                        });
                       }
                    });
  	});  });

});

/**
 * @brief POST PER VISUALIZZARE NELLA PAGINA TUTTE LE PROPRIE PRENOTAZIONI
 */

app.use('/my_prenotazioni/', function(request, response) {
	var start =request.body.prenotazione_reg_start;
    var date=request.body.prenotazione_reg_date;
    var destination=request.body.prenotazione_reg_destination;
    var posto = '';
    var tabella="<table class=\"table\"><thead><tr><th>N_bus</th><th>Orario</th><th>N_posto</th><th>Partenza</th><th>Destinazione</th></tr></thead><tbody>";
	response.writeHead(200, {'Content-Type': 'text/html'});	
	 pg.connect(process.env.DATABASE_URL , function(err, client, done) {		
        
		//add element
		client.query({text: 'select n_bus,orario,posto,partenza,destinazione from prenota where username=$1',
			values: [request.session.user_id]}, function(err, result) {
		      done();
                for(i=0;i<result.rows.length;i++){
                    tabella=tabella+"<tr><td><b>"+result.rows[i].n_bus+"</td><td><b>"+result.rows[i].orario+"</td><td><b>"+result.rows[i].posto+"</td><td><b>"+result.rows[i].partenza+"</td><td><b>"+result.rows[i].destinazione+"</td></tr>";
                }
            tabella=tabella+"</tbody></table>";
		  if (err) { 
			  console.error(err); 
			  response.send("Error insert " + err); }
		  else {
			   bind.toFile('prenotazione/my_prenotazioni.tpl', {
                        //set up parameters
                        username: request.session.user_id,
                        table: tabella
                    }, 
                            function(data) {
                                
                                response.end(data);
                                
                            });
		   }
		});
  	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/**
 * @brief FUNZIONE CHE CALCOLA QUANTI ELEMENTI CI SONO NEL DATABASE
 * @param FUNZIONE DI CALLBACK PER SINCRONIZZARE GLI ACCESSI AL DATABASE, RESTITUENDO IL NUMERO DI RIGHE DA USARE COME NUOVO ID
 */

function lunghezza(callback) {
    var count;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {		
		//add element
		client.query('select * from utente_registrato', function(err, result) {
		  done();
          count = result.rows.length;
          console.log(count);
		  if (err) { 
			  console.error(err); 
			 }
		  else {             
			  callback(count);
		   }
		});
  	});
}

/**
 * @brief FUNZIONE CHE RESTITUISCE N_BUS ORARIO DOVE START DESTINATION E DATE RICHIESTI COINCIDONO CON IL BUS
 * @param START, DESTINATION, DATE , CALLBACK
 */


function prenota_values(start,destination,date,callback) {    
        var n_bus;
        var orario;
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {		
		//add element
        console.log("start: "+start+"destination: "+destination+" date: "+date);
		client.query({text: 'select n_bus , orario from bus WHERE partenza = $1 and destinazione = $2 and orario = $3',
			values: [start , destination, date]}, function(err, result) {
		  done();
          n_bus = result.rows[0].n_bus;
          orario = result.rows[0].orario;
          if (err) { 
			  console.error(err); 
			}
		  else {              
			  callback(n_bus,orario);
		   }
		});
  	});    
}
/**
 * @brief FUNZIONE CHE CREA GLI ORARI DEL BUS DA VISUALIZZARE IN TRIP PLANNER
 * @param FUNZIONE DI CALBACK PER LA SINCRONIZZAZIONE DEL DATABASE
 */

function create_table(callback){
    
    var text="<table class=\"table\"><thead><tr><th>N_bus</th><th>Orario</th><th>Posti_disponibili</th><th>partenza</th><th>destinazione</th></tr></thead><tbody>";
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {		
		        
		client.query('select n_bus, orario , posti_disponibili, partenza , destinazione from bus ', function(err, result) {
		  done();
         for(i=0;i<result.rows.length;i++){
             text=text+"<tr><td><b>"+result.rows[i].n_bus+"</td><td><b>"+result.rows[i].orario+"</td><td><b>"+result.rows[i].posti_disponibili+"</td><td><b>"+result.rows[i].partenza+"</td><td><b>"+result.rows[i].destinazione+"</td></tr>";
         }
            text=text+"</tbody></table>";
		  if (err) { 
			  console.error(err); 
			  text=("Error insert " + err); 
          }
		  else{callback(text);}
		});
  	});
    

}

/**
 * @brief FUNZIONE PER CERCARE UN USERNAME NEL DATABASE
 * @param USERNAME DA CERCARE E FUNZIONE DI CALLBACK PER SINCRONIZZARE IL DATABASE
 */

function findusername(username,callback){    
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {		
            //add element
            client.query({text: 'select username from utente_registrato where username=$1',                      
                values: [username]}, function(err, result) {
                done();
                if (err) { 
                  console.error(err); 
                  response.send("Error insert " + err); }
                else {
                  if(result.rows.length>0){
                 callback(true);
                  }
                  else{
                  callback(false);
                  }

               }
            });
  	});
}
  