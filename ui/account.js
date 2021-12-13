const account={template:`
<div>
    <div class="header1 row d-flex justify-content-center">ACCOUNT</div>

    <form>
    <input type="text" id="name" onkeyup="myFunction()" placeholder="Cerca altri utenti...">
    </form>
    
    <center><h1><i>Ciao, {{nome}} {{cognome}}!</i></h1></center>
    <center><h2>Il tuo username: <b>{{user}}</b></h2></center>
    <br>
    <center><button type="button" class="btn btn-secondary btn-lg btn-block">Lista desideri</button></center>
    <br>
    <center><button type="button" class="btn btn-secondary btn-lg btn-block">Lista richieste follow</button></center>
    <br>
    <center><button type="button" class="btn btn-secondary btn-lg">Log out</button></center>
</div>
`,


    data() {
        return {
            user: "",
            cognome: "",
            nome: ""
        }
    },
    methods: {
        refreshData() {
            axios.get("http://localhost:8080/api/userbyid/2") //In futuro si prende l'id dalla sessione, in questo caso utiliziamo 2 come esempio
                .then((response) => {
                            this.user = response.data.User;
                            this.cognome =  response.data.Cognome;
                            this.nome =  response.data.Nome;
                       
                });

        }


    },
    mounted: function () {
        this.refreshData();
    }

}
