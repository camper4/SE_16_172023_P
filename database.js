var pg = require('pg');

var connessione = process.env.DATABASE_URL || 
    'postgres://wuconnkuogquta:0HDrxO4rlQ1Gs4QvYGJpU2GfEF@ec2-174-129-37-15.compute-1.amazonaws.com:5432/d49jsqiln2q6gg?ssl=true'

function loadQuery(querytext,funzione){
    console.log(querytext);
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

exports.loadQuery = loadQuery;