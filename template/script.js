var post_request = {
	/**
 * @brief funzione che si attiva quando l'utente vuole inviare le scelte dei giorni fatti
 */
  mostra_pasti: function(){
    formgiorni.action = "/caricapasti";
    formgiorni.submit();
  }
}