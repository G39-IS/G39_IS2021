const ricerca={template:`<div>
<div class="header1 row d-flex justify-content-center">RICERCA</div>
<br>
<div>
<center>
<h5><i>Non hai idea cosa regalare? Inserisci le informazioni della persona alla quale vuoi fare un regalo:</i></h5>
<br>
Categoria persona:<br>
<select v-model="selected">
  <option disabled value="">-SELEZIONA CATEGORIA-</option>
  <option>Uomo</option>
  <option>Donna</option>
  <option>Teenager</option>
  <option>Bambino</option>
</select><br><br>
Prezzo:<br>
<select v-model="selected">
  <option disabled value="">-SELEZIONA FASCIA PREZZO-</option>
  <option>Fino a 10 EUR</option>
  <option>Fino a 50 EUR</option>
  <option>Fino a 100 EUR</option>
  <option>Oltre 100 EUR</option>
</select><br><br>
Categoria d'interesse:<br>
<select v-model="selected" multiple>
  <option>Elettronica</option>
  <option>Cosmetici</option>
  <option>Libri</option>
  <option>Musica</option>
</select><br><br>
<input type=button class="btn btn-secondary" onClick="parent.open('https://www.amazon.it/')" 
value='Chiedi un consiglio a Jeff Bezos' >
</center>
</div>
</div>`}
