
function creaTbodyGiorni(){
  var text = "<tbody>\n";
  /*
  for( var i=0; i < quantita_righe_date; i++){
    text += "<tr>\n";
      text += "<td>";
      text += datadaldatabase
      text += "</td>\n"
      text += "<td>";
      text += "<input type=\"checkbox\">" //manca il valore per prendere la crocetta
      text += "</td>\n"
    text += "</tr>\n"
  }
  */
  text += "<tr>\n";
      text += "<td>";
      text += "holaaaa"
      text += "</td>\n"
      text += "<td>";
      text += "<input type=\"checkbox\">" //manca il valore per prendere la crocetta
      text += "</td>\n"
    text += "</tr>\n"
  text += "</tbody>\n";
  return text;
}

/*
  <tbody>
      <tr>
          <td>10-12-15</td>
          <td><input type="checkbox"></td>
      </tr>
      <tr>
          <td>11-12-15</td>
          <td><input type="checkbox"></td>
      </tr>
      <tr>
          <td>12-12-15</td>
          <td><input type="checkbox"></td>
      </tr>
  </tbody>
*/

exports.creaTbodyGiorni = creaTbodyGiorni; 