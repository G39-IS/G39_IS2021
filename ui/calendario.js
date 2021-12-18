const calendario={template:`
<div>
    <div class="header1 row d-flex justify-content-center">CALENDARIO</div>

    <!-- all'apertura della schermata dovrebbe aprirsi solo la "tabella" con gli eventi, 
        al click del bottone "+" la tabella dovrebbe essere sostituita con il modulo "aggiungiEvento", 
        al click di "Salva dettagli" la visualizzazione dovrebbe tornare alla tabella aggiornata con il nuovo evento;
        ogni evento nella tabella dovrebbe essere munito di bottone "Visualizza dettagli",
        al click di questo bottone si apre il modal con dettagli con bottoni "Modifica" e "Cancella",
        il click al "Modifica" porta nuovamenta al modulo "aggiungiEvento" (compilata ai dettagli evento);
        il click al "Cancella" cancella evento -->

    <div class="visible" id="tabella">
        <table class="table table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>
                        <button type="button" class="btn btn-secondary" data-bs-target="#aggiungiEvento"
                            @click="addClick()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </th>
                    <th>
                        I tuoi prossimi eventi
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="evn in eventi">
                    <td>{{evn.Data}}</td>
                    <td>{{evn.Titolo}}</td>
                    <td><button type="button" class="btn btn-secondary btn-sm btn-block" data-bs-toggle="modal"
                            data-bs-target="#visualizzaEvento" @click="showClick(evn)">Visualizza dettagli</button></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="modal fade" id="visualizzaEvento" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{Titolo}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><b>Data: </b> {{Data}}</p>
                    <p><b>Priorita': </b>{{LivelloDiPriorita}}</p>
                    <p><b>Categoria: </b>{{Categoria}}</p>
                    <p><b>Descrizione: </b>{{Descrizione}}</p>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="editClick()">Modifica evento</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"
                            @click="deleteClick()">Cancella evento</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            <div class="hidden" id="add_ev">
            <button type="button" class="btn-close " @click="close()"></button>
                <div class="input-group mb-3">
                    <span class="input-group-text">Titolo</span>
                    <input type="text" class="form-control" v-model="Titolo">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Data</span>
                    <input type="date" class="form-control" v-model="Data">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Priorita'</span>
                    <select v-model="LivelloDiPriorita">
                        <option disabled value="">Seleziona</option>
                        <option>alta</option>
                        <option>media</option>
                        <option>bassa</option>
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
                <center><button type="button" class="btn btn-secondary" @click="createClick()">Salva i
                        dettagli!</button></center>
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
            axios.get('http://localhost:8080/api/eventi')
                .then((response) => {
                    this.eventi = response.data.Eventi;
                });
        },
        addClick() {
            document.getElementById("add_ev").setAttribute("class","visible");
            document.getElementById("tabella").setAttribute("class","hidden");
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
        showClick(evn){
            this.Titolo = evn.Titolo;
            this.Data = evn.Data;
            this.LivelloDiPriorita = evn.LivelloDiPriorita,
            this.Categoria = evn.Categoria,
            this.Descrizione = evn.Descrizione
        },
        close(){
            document.getElementById("add_ev").setAttribute("class","hidden");
            document.getElementById("tabella").setAttribute("class","visible");
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
