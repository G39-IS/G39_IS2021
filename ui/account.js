const account={template:`
<div >
    <div class="header1 row d-flex justify-content-center">ACCOUNT</div>

    <center><h1><i>Ciao, {{nome}} {{cognome}}!</i></h1></center>
    <div class="row ">
        <div class="col"><div class="row text-center"><h2>Seguiti</h2></div><div class="row text-center"><h2>{{seguiti}}</h2></div></div>
        <div class="col"><div class="row text-center"><h2>Follower</h2></div><div class="row text-center"><h2>{{follower}}</h2></div></div>
    </div>
    <center><h2>Il tuo username: <b>{{user}}</b></h2></center>
    <br>
    <center><button type="button" class="btn btn-secondary btn-lg btn-block">Lista desideri</button></center>
    <br>
    <center><button type="button" class="btn btn-secondary btn-lg btn-block">Lista richieste follow</button></center>
    <br>
    <center><button type="button" class="btn btn-secondary btn-lg">Log out</button></center>
    <br>
    <center>
    <form>
        <div class="row"> 
            <div class="col"><input type="text" id="name" v-model="cerca" v-on:keyup="cercautente()" placeholder="Cerca altri utenti..."> <i class="icofont-search-1 px-2"></i></div> 
        </div>
    </form>
    </center>
    <br>
        <div class="row mx-2">   
        <div id="ac" class="hidden"></div>
        <table class="table">
        <tbody>
          <tr v-if= "cerca != '' " v-for="us in risultati">
            <td><p>{{us.Nome}} {{us.Cognome}}</p></td>
            <td>{{us.User}}</td>
            <td>
           
            <a @click="showUser(us)"><i class="icofont-eye icofont-2x"></i></a></td>
           
          </tr>
          </tbody>
          </table> 
        
        </div>
    
</div>
`,


    data() {
        return {
            user: "",
            cognome: "",
            nome: "",
            seguiti: 0,
            follower: 0,
            cerca:"",
            risultati:[],
        }
    },
    methods: {
        refreshData() {
            axios.get("http://localhost:8080/api/userbyid/2") //In futuro si prende l'id dalla sessione, in questo caso utiliziamo 2 come esempio
                .then((response) => {
                            this.user = response.data.User;
                            this.cognome =  response.data.Cognome;
                            this.nome =  response.data.Nome;
                            this.seguiti = response.data.Seguiti;
                            this.follower = response.data.Follower;
                       
                });

        },

        cercautente(){
           
          axios.get("http://localhost:8080/api/userbyus/"+this.cerca) 
                .then((response) => {
                            this.risultati = response.data.Users;
                        
                }); 
        },

        showUser(us){
            document.getElementById("ac").setAttribute("class", "visible;");
           document.getElementById("ac").innerHTML =
            '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<h5 class="modal-title" id="exampleModalLabel">Profilo</h5>'+
                        '<button type="button" class="btn-close" onclick="closeUs()"></button>'+
                    '</div>'+
                    '<div class="modal-body">'+
                    ' <center><h1><i>'+us.Nome+' '+us.Cognome+'</i></h1></center>'+
                    '<div class="row ">'+
                        '<div class="col"><div class="row text-center"><h2>Seguiti</h2></div><div class="row text-center"><h2>'+us.Seguiti+'</h2></div></div>'+
                        '<div class="col"><div class="row text-center"><h2>Follower</h2></div><div class="row text-center"><h2>'+us.Follower+'</h2></div></div>'+
                    '</div>'+
                    '<center><h2>username: <b>'+us.User+'</b></h2></center>'+
                    '<br>'+
                    '<center><button type="button" class="btn btn-secondary btn-lg btn-block">Lista desideri</button></center>'+
                    '<br>'+
                    '</div></div>';

        }



    },

 
    mounted: function () {
        this.refreshData();
    }

}
