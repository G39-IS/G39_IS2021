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
                <div class="col-7">  <input type="text" class="title" id="tit" placeholder="Inserisci titolo" name="ntit" v-model="Titolo" disabled required></div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closemodificaClick()"></button>
                </div>
                <div class="modal-body visualizza" id ="modal_body">
                <form>
                    <div class="row">
                        <div class="col"> Data: </div>
                        <div class="col-7">  <input type="text" class="form-control" id="data" placeholder="Inserisci data" name="ndata" v-model="Data" disabled required></div>
                    </div>

                    <div class="mb-3 mt-3 row">
                        <div class="col">  LivelloDiPriorita':</div>
                        <div class="col-7">    
                            <select v-model="LivelloDiPriorita" id="livp" disabled required>
                                <option disabled value="" selected>Seleziona</option>
                                <option value="alta">alta</option>
                                <option value="media">media</option>
                                <option value="bassa">bassa</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 mt-3 row">
                        <div class="col">  Categoria:</div>
                        <div class="col-7">    
                            <select v-model="Categoria" id="cat" disabled required>
                                <option disabled value="" selected>Seleziona</option>
                                <option>Cose da fare</option>
                                <option>Compleanno</option>
                                <option>Evento di lavoro</option>
                                <option>Divertimento</option>
                                <option>Impegno scolastico</option>
                                <option>Socialità</option>
                                <option>Categoria personalizzata</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 mt-3">
                         Descrizione:
                             
                            <textarea disabled  class="form-control" id="desc" placeholder="Inserisci descrizione" name="ndesc" v-model="Descrizione" required></textarea>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="vismod" class="btn btn-warning visible" @click="editClick()">Modifica evento</button>
                        <button type="submit" id="modbut" class="btn btn-warning hidden" @click="editconfirmClick()">Conferma modifica</button>
                        <button type="button" id="delete" class="btn btn-danger visible" data-dismiss="modal" @click="deleteClick()">Cancella evento</button>
                    </div>
                    </form>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            <div class="hidden" id="add_ev">
                <button type="button" class="btn-close " @click="close()"></button>
                <form>
                <div class="input-group mb-3">
                    <span class="input-group-text">Titolo</span>
                    <input type="text" class="form-control" v-model="Titolo" required>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Data</span>
                    <input type="date" class="form-control" v-model="Data" required>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Priorita'</span>
                    <select v-model="LivelloDiPriorita" required>
                        <option disabled value="" selected>Seleziona</option>
                        <option>alta</option>
                        <option>media</option>
                        <option>bassa</option>
                    </select>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Categoria</span>
                    <select v-model="Categoria" required>
                        <option disabled value="" selected>Seleziona</option>
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
                    <textarea v-model="Descrizione" placeholder="Aggiungi la tua descrizione" required></textarea>
                </div>
                <center><button type="submit" class="btn btn-secondary" @click="createClick()">Salva i
                        dettagli!</button></center>
                        </form>
            </div>
    
</div>`,

    data() {
        return {
            eventi: [],
            Data: "",
            Titolo: "",
            LivelloDiPriorita: "",
            Categoria: "",
            Descrizione: "",
            ID:-1
        }
    },
    methods: {
        refreshData() {
            axios.get('http://localhost:8080/api/eventi')
                .then((response) => {
                    this.eventi = response.data;
                });
        },
        addClick() {
            document.getElementById("add_ev").setAttribute("class","visible");
            document.getElementById("tabella").setAttribute("class","hidden");
            this.Titolo = "";
            this.Data = "";
            this.LivelloDiPriorita = "";
            this.Categoria = "";
            this.Descrizione = "";
            this.ID = "";
        },
        editconfirmClick(){
            if (confirm("Sei sicuro di voler modificare?")) {
            axios.put('http://localhost:8080/api/eventi/'+this.ID,({
                "Descrizione": this.Descrizione,
                "Titolo": this.Titolo,
                "Data": this.Data,
                "LivelloDiPriorita" : this.LivelloDiPriorita,
                "Categoria" : this.Categoria
            }))
            .then((response) => {
                this.eventi = response.data.Eventi;
                this.refreshData();
            });
            this.closemodificaClick();
        }
        },
        closemodificaClick(){
            document.getElementById("modal_body").classList.add("visualizza");
            document.getElementById('data').disabled = true;
            document.getElementById('livp').disabled = true;
            document.getElementById('cat').disabled = true;
            document.getElementById('desc').disabled = true;
            document.getElementById('tit').disabled = true;
            document.getElementById("vismod").classList.add("visible");
            document.getElementById("modbut").classList.add("hidden");
            document.getElementById("delete").classList.add("visible");

            document.getElementById("vismod").classList.remove("hidden");
            document.getElementById("modbut").classList.remove("visible");
            document.getElementById("delete").classList.remove("hidden");

             
        },
        editClick() {
            document.getElementById("modal_body").classList.remove("visualizza");
            document.getElementById('data').disabled = false;
            document.getElementById('livp').disabled = false;
            document.getElementById('cat').disabled = false;
            document.getElementById('desc').disabled = false;
            document.getElementById('tit').disabled = false;

            document.getElementById("vismod").classList.add("hidden");
            document.getElementById("modbut").classList.add("visible");
            document.getElementById("delete").classList.add("hidden");

            document.getElementById("vismod").classList.remove("visible");
            document.getElementById("modbut").classList.remove("hidden");
            document.getElementById("delete").classList.remove("visible");
        },
        showClick(evn){
            this.Titolo = evn.Titolo;
            this.Data = evn.Data;
            this.LivelloDiPriorita = evn.LivelloDiPriorita;
            this.Categoria = evn.Categoria;
            this.Descrizione = evn.Descrizione;
            this.ID = evn.ID;
        },
        close(){
            document.getElementById("add_ev").setAttribute("class","hidden");
            document.getElementById("tabella").setAttribute("class","visible");
        },
        createClick() {
            axios.post('http://localhost:8080/api/eventi', {
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
        deleteClick() {
            if (confirm("Sei sicuro di voler cancellarlo?")) {
                axios.delete('http://localhost:8080/api/eventi/'+this.ID)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                }); 
            }
        },

    },
    mounted: function () {
        this.refreshData();
    }

}
