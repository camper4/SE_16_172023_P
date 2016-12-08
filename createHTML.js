
function creaTbodyGiorni(giorni){
  var text = "<tbody>\n";
  for( a in giorni){
    text += "<tr>\n";
      text += "<td>";
      text += giorni[a].giorno + "-" + giorni[a].mese + "-" + giorni[a].anno
      text += "</td>\n"
      text += "<td>";
      text += "<input type=\"checkbox\" name=\""+giorni[a].giorno+"-"+giorni[a].mese+"-"+giorni[a].anno+"\">"
      text += "</td>\n"
    text += "</tr>\n"
  }
  text += "</tbody>\n";
  return text;
}



exports.creaTbodyGiorni = creaTbodyGiorni; 