
function creaTbodyGiorni(giorni){
  var text = "<tbody>\n";
  for( a in giorni){
    text += "<tr>\n";
      text += "<td>";
      text += giorni[a].giorno + "-" + giorni[a].mese + "-" + giorni[a].anno;
      text += "</td>\n";
      text += "<td>";
      text += "<input name=\"checkgiorni\" type=\"checkbox\" value=\""+giorni[a].giorno+giorni[a].mese+giorni[a].anno+"\">";
      text += "</td>\n";
    text += "</tr>\n";
  }
  text += "</tbody>\n";
  return text;
}

function creaTabellaOrdinazioniPossibili(ord){
  text = "<tbody>\n";
  for (a in ord){
    text += "<tr>\n";
      text += "<td><b>";
        text += ord[a].giorno + "-" + ord[a].mese + "-" + ord[a].anno;
      text += "</b></td>\n";
      text += "<td>";
        text += ord[a].primo;
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].primo+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
      text += "<td>";
        text += ord[a].secondo;
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].secondo+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
      text += "<td>";
        text += ord[a].contorno;
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].contorno+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
      text += "<td>";
        text += ord[a].dessert;
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+" = "+ord[a].dessert+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
    text += "</tr>\n";
  }
  text += "</tbody>\n";
  return text;
}


exports.creaTbodyGiorni = creaTbodyGiorni; 
exports.creaTabellaOrdinazioniPossibili = creaTabellaOrdinazioniPossibili; 