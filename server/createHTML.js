/**
 * @brief Funzione che ricevute le date disponili crea un pezzo di codice HTML in modo dinamico e me lo restituisce
 * @param in object giorni Oggetto contenente i giorni disponibili nel database
 * @return Stringa contenente un pezo di codice HTML da inserire in una pagina dal server
 */
function creaTbodyGiorni(giorni){
  var text = "<tbody>\n";
  for( a in giorni){
    text += "<tr>\n";
      text += "<td>";
      text += giorni[a].giorno + "-" + giorni[a].mese + "-" + giorni[a].anno;
      text += "</td>\n";
      text += "<td>";
      text += "<input name=\"checkgiorni\" onClick=\"conta(this)\" type=\"checkbox\" value=\""+giorni[a].giorno+giorni[a].mese+giorni[a].anno+"\">";
      text += "</td>\n";
    text += "</tr>\n";
  }
  text += "</tbody>\n";
  return text;
}


/**
 * @brief Funzione che ricevute le date scelte dall'utente crea un pezzo di codice HTML in modo dinamico e me lo restituisce
 * @param in object ord Oggetto contenente le date nelle quali l'utente vuole ordinare
 * @return Stringa contenente un pezo di codice HTML da inserire in una pagina dal server
 */
function creaTabellaOrdinazioniPossibili(ord){
  var text = "<tbody>\n";
  for (a in ord){
    text += "<tr>\n";
      text += "<td><b>";
        text += ord[a].giorno + "-" + ord[a].mese + "-" + ord[a].anno;
      text += "</b></td>\n";
      text += "<td class=\"ricerca\">";
        text += ord[a].primo +" ";
        text += "<input name=\"checkscelte\" type=\"checkbox\" onClick=\"conta(this)\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].primo+"\">";
      text += "</td>\n";
      text += "<td class=\"ricerca\">";
        text += ord[a].secondo +" ";
        text += "<input name=\"checkscelte\" type=\"checkbox\" onClick=\"conta(this)\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].secondo+"\">";
      text += "</td>\n";
      text += "<td class=\"ricerca\">";
        text += ord[a].contorno +" ";
        text += "<input name=\"checkscelte\" type=\"checkbox\" onClick=\"conta(this)\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].contorno+"\">";
      text += "</td>\n";
      text += "<td class=\"ricerca\">";
        text += ord[a].dessert +" ";
        text += "<input name=\"checkscelte\" type=\"checkbox\" onClick=\"conta(this)\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].dessert+"\">";
      text += "</td>\n";
    text += "</tr>\n";
  }
  text += "</tbody>\n";
  return text;
}


//esporto le funzioni per renderle visibili al server
exports.creaTbodyGiorni = creaTbodyGiorni; 
exports.creaTabellaOrdinazioniPossibili = creaTabellaOrdinazioniPossibili; 