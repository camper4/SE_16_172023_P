/*
  variabile che contiene le funzioni che controllano la correttezza delle richieste mandate dalle varie pagine per interagire con il server
*/
var post_request = {
  /**
   * @brief Funzione che manda una richiesta al server per caricare i pasti nei giorni scelti
   */
  mostra_pasti: function(){
    if(checknum == 0){ //controllo che almeno una casella sia stata premuta
      //se nessuna casella è premuta mostro l'avviso di errore
      $(".bottone_alert").css("display","block"); 
    }
    else{
      //altrimenti mando la richiesta al server
      form_giorni.action = "/caricapasti";
      form_giorni.submit();
    } 
  },
  
  /**
   * @brief Funzione che manda una richiesta al server per inviare le scelte delle pietanze
   */
  invia_dati: function(){
    if(checknum == 0){//controllo che almeno una casella sia stata premuta
      //se nessuna casella è premuta mostro l'avviso di errore
      $(".bottone_alert").css("display","block");
    }
    else{
      //altrimenti mando la richiesta al server
      form_scelte.action = "/inviadati";
      form_scelte.submit();
    }
  },
  
  /**
   * @brief Funzione che manda una richiesta al server per inserire i dati di un'ordinazione 
   */
  conferma_dati: function(){
    //setto i messaggi di errore del codice fiscale o della mail vuoti per il caso in cui fossero stati precedentemente stati mostrati
    $("#email_error").css("display","none");
    $("#cod_fiscale_error").css("display","none");
    
    //controllo che non ci siano campi vuoti nel form
    if(form_dati.nome.value == "" || form_dati.cognome.value == "" || form_dati.cod_fiscale.value == "" || form_dati.indirizzo.value == "" || form_dati.email.value == ""){
      //se ci sono campi vuoti visualizzo il messaggio di allerta
      $(".bottone_alert").css("display","block");
    }
    else{
      //altrimenti dopo aver controllato che il codice fiscale e la mail siano corretti mando la richiesta al server
      if(controlla_email() && controlla_cod_fiscale()){
        form_dati.action = "/confermaordinazioni";
        form_dati.submit();
      }
    }
  }
};


/*
**************************************************************************************************************************************************************************************************************************************************************************************
*/


//funzioni jQuery della pagina 'homepage.html' , 'selezione_giorni.html', 'selezione_pasti.html' e 'invia.html'
$(document).ready(function () {
  
  //rendo visibile nella 'homepage.html' il messaggio errore se premuti pulsanti chat o info
  $("#chat").click(function(){
    $(".testo_entrata").animate({
      opacity: 1,
    }, 500); 
  });
  $("#info").click(function(){
    $(".testo_entrata").animate({
      opacity: 1,
    }, 500); 
  });
  
  //funzione della crocetta del riquadro di allerta di 'selezione_giorni.html' e 'selezione_pasti.html' e 'invia.html' che chiude la finestra di attenzione
  $("#chiudi_alert").click(function(){
    $(".bottone_alert").css("display","none");
  });
  
  //funizioni per evidenziare la casella corrente nelle tabelle
  $('td').on({
    mouseenter: function(){ $(this).css('background','#FF7936');},
    mouseleave: function(){$(this).css('background',''); }, 
  });
  
  //funzione in selezione_pasti che mostra una ricerca della pietanza scelta in 'selezione_pasti.html' con un doppio click
  $(".ricerca").dblclick(function(){
    leftPosition = window.innerWidth;
    topPosition = window.innerHeight;
    javascript:window.open('https://www.google.it/search?q='+$(this).text(), '_blank','toolbar=no,width='+leftPosition+',height='+topPosition);
  })
  
});


/*
**************************************************************************************************************************************************************************************************************************************************************************************
*/


var checknum = 0; //inizializzata la variabile per il controllo dei form vuoti
/**
 * @brief funzione che conta il numero di checkbox selezionate per il controllo dei form vuoti
 * @param in elementoform E' la casella checkbox che è stata selezionata in una pagina
 */
function conta(elementoform){
  if(elementoform.checked) //se la casella checkbox è stata selezionata
    checknum++; //incremento contatore
  else
    checknum--; //altrimenti la casella è stata tolta
}


/**
 * @brief Funzione che controlla che il codice fiscale inserito dall'utente in 'invia.html' sia corretto
 * @return Ritorna true se il codice fiscale va bene, false altrimenti
 */
function controlla_cod_fiscale(){
  console.log("ciao");
  // Definisco un pattern per il confronto
  var pattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;

  // creo una variabile per richiamare con facilità il nostro campo di input
  var CodiceFiscale = form_dati.cod_fiscale;

  //verifico la stringa inserita con search
  if (CodiceFiscale.value.search(pattern) == -1){
    // In caso di errore faccio comparire un avviso e pulisco il campo
    $("#cod_fiscale_error").css("display","block");
    CodiceFiscale.value = "";
    CodiceFiscale.focus();
    return false;
    }
  else{
     return true;
  }
};

/**
 * @brief Funzione che controlla che l'e-mail inserita dall'utente in 'invia.html' sia corretta
 * @return Ritorna true se l'e-mail va bene, false altrimenti
 */
function controlla_email() {
  //analoga procedura descritta per il codice fiscale
  var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var email = form_dati.email;
  if (email.value.search(pattern) == -1)
  {
    $("#email_error").css("display","block");
    email.value = "";
    email.focus();
    return false;
  }else{
     return true;
  }
}