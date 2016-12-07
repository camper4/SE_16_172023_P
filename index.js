var express = require('express');
//general lib
var app = express();
//connect DB
var pg = require('pg');
//GET
var util = require('util');
//post
var bind = require('bind');

app.get('/stile.css', function(req,res){
	res.sendFile('template/stile.css' , { root : __dirname });
});

app.get('/script.js', function(req,res){
	res.sendFile('template/script.js' , { root : __dirname });
});

var connectionString = process.env.DATABASE_URL || 
    'postgres://usnbjcwzevjnge:4uObCrPpTSW3xSGc5E5hgp23IO@ec2-54-247-81-123.eu-west-1.compute.amazonaws.com:5432/d4mmdqep139jq1'
    

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    bind.toFile('template/homepage.html',{}, 
    function(data) 
    {
        //write resonse
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

//get
app.get('/caricagiorni', function(request, response) {
    bind.toFile('template/selezione_giorni.html',{}, 
    function(data) 
    {
        //write resonse
        console.log(data);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});


/**
 * @brief run select query
 * @return content of table test_table
 */
app.get('/select/', function(request, response) 
{
	var text = 'responce:';
	response.writeHead(200, {'Content-Type': 'text/html'});
    
    console.log(connectionString);

	//connect to database
	pg.connect(
		//enviromental variable, set by heroku when first databse is created
		connectionString, 
		function(err, client, done) {
		//query
		client.query('SELECT * FROM test_table', function(err, result) {
			//release the client back to the pool
			done();
			
			//manages err
			if (err){ 
				console.error(err); 
				response.end("Error select" + err); 
		  	}
		  	else {
				text = "<p>Dump db: <br> " + util.inspect(result.rows) + ".</p>";
				text = text + "<br> <br>";
		  	}
			
			//response here, otherwise the page will be sent before the execution of the query
			console.log("text final: "+text);
			response.end(text);
		});
  	});

});

/**
 * @brief run select query
 * @return notification or error
 */
app.get('/create/', function(request, response) 
{
	var text = 'responce:';
	response.writeHead(200, {'Content-Type': 'text/html'});
	
	console.log("called");

	pg.connect(connectionString, function(err, client, done) {
		
		console.log("connected to db");
	
		//create table	
		client.query('create table test_table (id integer, name text)', function(err, result) {
		  done();
			
		  if (err){ 
			   console.error(err); 
			   response.send("Error " + err); 
		   }
		  else{ 
			  response.end("table created");
		   }
		});

  	});
  	

});

/**
 * @brief run add query
 * @return notification or error
 */
app.get('/add/', function(request, response) 
{
	var text = 'responce:';
	response.writeHead(200, {'Content-Type': 'text/html'});
	
	console.log("called");

	pg.connect(connectionString, function(err, client, done) {
		
		console.log("connected to db");

		//add element
		client.query('insert into test_table values (1, \'hello database\')', function(err, result) {
		  done();
		  if (err) { 
			  console.error(err); 
			  response.send("Error insert " + err); }
		  else {
			  response.end("row added");
		   }
		});
  	});

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
