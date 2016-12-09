var post_request = {
	/**
 * @brief funzione che si attiva quando l'utente vuole inviare le scelte dei giorni fatti
 */
  mostra_pasti: function(){
    form_giorni.action = "/caricapasti";
    form_giorni.submit();
  },
  
  invia_dati: function(){
    form_scelte.action = "/inviadati";
    form_scelte.submit();
  },
  
  conferma_dati: function(){
    console.log("ciao");
    form_dati.action = "/confermaordinazioni";
    form_dati.submit();
  }
};



function controllaCF()
{
  // Definisco un pattern per il confronto
  var pattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;

  // creo una variabile per richiamare con facilità il nostro campo di input
  var CodiceFiscale = document.getElementById("cf");

  // utilizzo il metodo search per verificare che il valore inserito nel campo
  // di input rispetti la stringa di verifica (pattern)
  if (CodiceFiscale.value.search(pattern) == -1)
  {
    // In caso di errore stampo un avviso e pulisco il campo...
    alert("Il valore inserito non è un codice fiscale!");
    CodiceFiscale.value = "";
    CodiceFiscale.focus();
  }else{
     // ...in caso contrario stampo un avviso di successo!
     alert("Il codice fiscale è corretto!");
  }
};