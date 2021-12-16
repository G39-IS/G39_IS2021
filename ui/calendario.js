const calendario={template:`<div>
<div class="header1 row d-flex justify-content-center">CALENDARIO</div>
<button type="button"
class="btn btn-secondary"
data-bs-target="#aggiungiEvento"
@click="addClick()">
Aggiungi evento
</button>

<div class=container id="tabella">
<table class="table table-bordered" style="width:100%">
<thead>
    <tr>
        <th>
	<center>
           I tuoi prossimi eventi
	</center>
        </th>
    </tr>
</thead>
<tbody>
 <tr> <!--v-for=""-->
        <td><center>{{Data}}{{Titolo}}<button type="button"
            class="btn btn-secondary btn-sm btn-block"
            data-bs-toggle="modal"
            data-bs-target="#visualizzaEvento"
            @click="showClick()">Visualizza dettagli</button></center></td>
 </tr>
</tbody>
</thead>
</table>
</div>

<div class="modal fade" id="visualizzaEvento" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog modal-md modal-dialog-centered">
  <div class="modal-content">
    <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">

    <div class="modal-footer">
        <button type="button" class="btn btn-warning" @click="editClick()">Modifica evento</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteClick()">Cancella evento</button>
    </div>
            
    </div>
        
  </div>
 </div>
</div>
<div class=container id="aggiungiEvento">
            <div class="input-group mb-3">
                <span class="input-group-text">Data</span>
                <input type="date" class="form-control" v-model="Data">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">Titolo</span>
                <input type="text" class="form-control" v-model="Titolo">
            </div>

            <div class="input-group mb-3">
            <span class="input-group-text">Livello di priorità</span>
		<select v-model="Priorità">
 	        <option disabled value="">Seleziona</option>
 	        <option>Priorità alta</option>
  		    <option>Priorità media</option>
  		    <option>Priorità alta</option>
		</select>
            </div>

            <div class="input-group mb-3">
            <span class="input-group-text">Categoria</span>
		<select v-model="Categoria">
 	        <option disabled value="">Seleziona</option>
 	        <option>Cose da fare</option>
  	    	<option>Compleanno</option>
  		    <option>Evento di lavoro</option>
  		    <option>Divertimento</option>
  		    <option>Impegno scolastico</option>
  		    <option>Socialità</option>
  		    <option>Categoria personalizzata</option>
		 </select>
   
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">Descrizione</span>
                <textarea v-model="Descrizione" placeholder="Aggiungi la tua descrizione"></textarea>
            </div>

</div>
</div>`}
