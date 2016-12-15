/*CONTROLLI CHE SI INNESCANO QUANDO COMPILO USERNAME E PASSWORD NELLA PAGINA PRINCIPALE
  SE USERNAME E PASSWORD SONO VUOTI SI INNESCA UN ALERT PER SEGNALARE L'ERRORE
  
*/
function Controllo_Home() {
    // Variabili associate ai campi del modulo
    var username = document.FormLogin.username_input.value;
    var password = document.FormLogin.password_input.value;
   
   
      
    //Effettua il controllo sul campo USERNAME E PASSWORD
    
        if(username==""){
        alert("Il campo USERNAME non può essere VUOTO");
        document.FormLogin.username_input.focus();
        return false;
        }
    
     
    else if(password==""){
        alert("Il campo PASSWORD non può essere VUOTO");
        document.FormLogin.password_input.focus();
        return false;
        }
     
    
    
    //INVIA IL MODULO
    else {
        document.FormLogin.action = "/login_home";
        document.FormLogin.submit();
    }
    
}
