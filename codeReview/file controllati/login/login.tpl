<!--
TEMPLATE PER IL LOGIN VISUALIZZA IL NOME DELL'UTENTE E AGGIUNGE IL PULSANTE "MIE PRENOTAZIONI" 
FUNZIONE TRIP PLANNER E MY TRIP PLANNER ABILITATI
-->
<!DOCTYPE html>
<html>
    <head><title>Pagina Principale</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    
    </head>
<body background="immagine.png">
    <nav class="navbar navbar-default">
  <div class="container-fluid">
   
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
        <a class="navbar-brand" href="login_home">Home</a>
    </div>

   
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        
        <form action="/logout" method='post' name="FormLogout" class="navbar-form navbar-right">
            <input type="submit" id="logout_button" value="Logout" class= "btn btn-danger">
        </form>
        <div class ="navbar-form navbar-right"> Bentornato,  <b>(:username:)</b></div>
               
    </div>
  </div>
</nav>

<!--
FORM PER ABBONAMENTI 
-->
<br><br><br>
<div style="text-align: center"> 
<div><h3>Gestione abbonamento e Prenotazione BUS</h3></div><br><br>
<form action="" method='post' name="FormAbbonamento">
<p><input type="submit" id="abbonamento_button" value="Abbonamento" class="btn btn-primary" disabled>
</p>
</form><br><br>
<!--
FORM PER PRENOTAZIONI 
-->    
<form action="/prenotazione" method='post' name="FormPrenotazione">
<p><input type="submit" id="prenotazione_button" value="TripPlanner" class="btn btn-primary">
</p>
</form><br><br>
<!--
FORM PER PRENOTAZIONI UTENTE 
-->
<form action="/my_prenotazioni" method='post' name="FormPrenotazioneUtente" >
<p><input type="submit" id="pren_button" value="My Trip Planner" class="btn btn-primary">
</p>
</form>
</div>
</body>

</html>