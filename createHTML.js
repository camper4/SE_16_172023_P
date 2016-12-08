
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
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
      text += "<td>";
        text += ord[a].secondo;
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
      text += "<td>";
        text += ord[a].contorno;
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
      text += "<td>";
        text += ord[a].dessert;
        text += "<input name=\"checkscelte\" type=\"checkbox\" value=\""+ord[a].giorno+ord[a].mese+ord[a].anno+"\">";
        text += "<button class=\"btn-info\"><span class=\"glyphicon glyphicon-info-sign\"></span></button>";
      text += "</td>\n";
    text += "</tr>\n";
  }
  text += "</tbody>\n";
  return text;
}
/*

<tbody>
    <tr>
      <td>data</td>
      <td>Pasta<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
      <td>carne<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
      <td>spinaci<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
     <td>frutta<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
     </tr>
    <tr>
        <td><b>Secondo</b></td>
        <td>Carne<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
        <td>Pesce<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
        <td>Carne<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
    </tr>
    <tr>
        <td><b>Contorno</b></td>
        <td>Patate<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
        <td>Piselli<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
        <td>Carote<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
    </tr>
    <tr>
        <td><b>Dessert</b></td>
        <td>Torta della nonna<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
        <td>Frutta<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
        <td>Frutta<input type="checkbox"><button class="btn-info"><span class="glyphicon glyphicon-info-sign"></span></button></td>
    </tr>
</tbody>
*/

exports.creaTbodyGiorni = creaTbodyGiorni; 
exports.creaTabellaOrdinazioniPossibili = creaTabellaOrdinazioniPossibili; 