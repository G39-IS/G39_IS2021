const calendario={template:`<div>
<div class="header1 row d-flex justify-content-center">CALENDARIO</div>

<!-- all'apertura della schermata dovrebbe aprirsi solo la "tabella" con gli eventi, 
al click del bottone "+" la tabella dovrebbe essere sostituita con il modulo "aggiungiEvento", 
al click di "Salva dettagli" la visualizzazione dovrebbe tornare alla tabella aggiornata con il nuovo evento;
ogni evento nella tabella dovrebbe essere munito di bottone "Visualizza dettagli",
al click di questo bottone si apre il modal con dettagli con bottoni "Modifica" e "Cancella",
il click al "Modifica" porta nuovamenta al modulo "aggiungiEvento" (compilata ai dettagli evento);
il click al "Cancella" cancella evento -->

<div class=container id="tabella">
<table class="table table-bordered" style="width:100%">
<thead>
    <tr>
        <th>
	<button type="button"
	class="btn btn-secondary"
	data-bs-target="#aggiungiEvento" 
	@click="addClick()">
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  	<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
	</svg>
	</button> 
            I tuoi prossimi eventi
        </th>
    </tr>
</thead>
<tbody>
 <tr> <!--  dovrebbe essere tipo <tr v-for="evn in eventi"> commentato perche' altrimenti mi fa sparire questa sezione-->
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
	<h5 class="modal-title">{{Titolo}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>
    <div class="modal-body">
   	 <p>Data:</p> {{Data}}
   	 <p>Livello di priorita':</p> {{LivelloDiPriorita}}
    	 <p>Categoria:</p> {{Categoria}}
    	 <p>Descrizione:</p> {{Descrizione}}
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
                <span class="input-group-text">Titolo</span>
                <input type="text" class="form-control" v-model="Titolo">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">Data</span>
                <input type="date" class="form-control" v-model="Data">
            </div>

            <div class="input-group mb-3">
            <span class="input-group-text">Livello di priorita'</span>
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
        <center><button type="button" class="btn btn-secondary" @click="createClick()">Salva i dettagli!</button></center>
</div>
</div>`,

    data() {
        return {
            eventi: [],
            Titolo: "",
            Data: "",
            LivelloDiPriorita: "",
            Categoria: "",
            Descrizione: ""
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "evento")
                .then((response) => {
                    this.eventi = response.data;
                });
        },
        addClick() {
            this.modalTitle = "Aggiungi evento";
            this.EmployeeId = 0;
            this.EmployeeName = "";
            this.Department = "",
            this.DateOfJoining = ""
        },
        editClick(evn) {
            this.Titolo = evn.Titolo;
            this.Data = evn.Data;
            this.LivelloDiPriorita = evn.LivelloDiPriorita,
            this.Categoria = evn.Categoria,
            this.Descrizione = evn.Descrizione
        },
        createClick() {
            axios.post(variables.API_URL + "evento", {
                Titolo: this.Titolo,
                Data: this.Data,
                Categoria: this.Categoria,
                LivelloDiPriorita: this.LivelloDiPriorita,
                Descrizione: this.Descrizione
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick() {
            axios.put(variables.API_URL + "evento", {
                Titolo: this.Titolo,
                Data: this.Data,
                Categoria: this.Categoria,
                LivelloDiPriorita: this.LivelloDiPriorita,
                Descrizione: this.Descrizione
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id) {
            if (!confirm("Sei sicuro di voler cancellarlo?")) {
                return;
            }
            axios.delete(variables.API_URL + "evento/" + Titolo)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });

        },

    },
    mounted: function () {
        this.refreshData();
    }

}
