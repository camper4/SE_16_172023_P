//inclusione delle librerie necessarie
var pg = require('pg');

//variabile per la connessione al database
var connessione = process.env.DATABASE_URL || 
    'postgres://wuconnkuogquta:0HDrxO4rlQ1Gs4QvYGJpU2GfEF@ec2-174-129-37-15.compute-1.amazonaws.com:5432/d49jsqiln2q6gg?ssl=true'


/**
 * @brief Funzione per l'esecuzione delle query dal database che sincronizza con una callback le successive operazioni nel server
 * @param in string querytext Query da eseguire dal database
 * @param in callback funzione Funzione di callback per sincronizzare i tempi di esecuzione con l'accesso al database
 */
function loadQuery(querytext,funzione){
	//connect to database
	pg.connect(
		//enviromental variable, set by heroku when first databse is created
		connessione, 
		function(err, client, done) {
		//query
		client.query(querytext, function(err, result) {
			//release the client back to the pool
			done();
			//manages err
			if (err){ 
				funzione(true,null);
		  	}
		  	else {
				funzione(false, result.rows);
		  	}
		});
  	});
}

//esporto la funzione per renderla visibile al server
exports.loadQuery = loadQuery;