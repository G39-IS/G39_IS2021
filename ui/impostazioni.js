
const impostazioni = {
    template: `
    <div>
        <div class="header1 row d-flex justify-content-center">IMPOSTAZIONI</div>

        <div class="row pt-2 m-1"> 
            <div class="col-8"><a >Elimina Account</a></div>
            <div class="col"><button type="button" class="btn">Elimina</button></div>
        </div>

        <div class="row pt-2 m-1">
            <div class="col-8"><label class="form-check-label" for="myNotifiche" id="lab_notifiche">{{notifica}}</label></div>
            <div class="col mx-2 form-switch">
                <input class="form-check-input" type="checkbox" id="myNotifiche" name="notifiche" v-if = "noti == true" checked value="yes" @click="notifiche()" >
                <input class="form-check-input" type="checkbox" id="myNotifiche" name="notifiche" v-if = "noti == false"  value="yes" @click="notifiche()" >
            </div> 
        </div>

        <div class="row pt-2 m-1">
            <div class="col-8"><label class="form-check-label" for="mySwitch" id="lab_mode">{{modalita}}</label></div>
            <div class="col mx-2 form-switch">
                <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" @click="colormode()" v-if = "mode == true" checked>
                <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" @click="colormode()"  v-if = "mode == false">
            </div>
            </div>
            <div class="row pt-2 m-1">
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Categorie Personalizzate
            </button>
            <ul class="dropdown-menu">
                <li v-for="cat in categoria">
                    <div class="row p-1">
                        <div class="col-7"><a>{{cat}}</a></div>
                        <div class="col"><a class="dropdown-item"><i class="icofont-trash"></i></a></div>
                    </div>
                </li>
            </ul>
            </div>
            </div>
            <div class="row pt-2 m-1"><div class="col-8"><p>Lingua</p></div>
                <div class="col"><p> {{lingua}} </p></div>
            </div>

        <div class="row pt-2 m-1"><a href="https://www.lipsum.com" target="_blank">Informativa&privacy</a></div>
    </div>
   
`,





    data() {
        return {
            mode: false,
            noti: false,
            lingua: "",
            categoria: [],
            modalita: "true",
            notifica: "fasle"
        }
    },
    methods: {
        refreshData() {


            axios.get("http://localhost:8080/api/impostazioni")
                .then((response) => {
                    response.data.Impostazioni.forEach(impostazione => {
                        if (impostazione.Dark == "true") {
                            this.mode = true;
                            this.modalita = "Dark mode";
                        } else {
                            this.mode = false;
                            this.modalita = "Light mode";
                        }
                        if (impostazione.Notifiche == "true") {
                            this.noti = true;
                            this.notifica = "Notifiche On";
                        } else {
                            this.noti = false;
                            this.notifica = "Notifiche Off";
                        }
                        this.lingua = impostazione.Lingua;
                        this.categoria = impostazione.Categoria;
                    });
                });

        },
        colormode() {
            if (document.getElementById("mySwitch").checked == false) {

                axios.post('http://localhost:8080/api/impostazione_dark/false')
                    .then((response) => {
                        document.getElementById("style").setAttribute('href', 'styleLight.css');
                        this.modalita = "Light Mode";
                    });

            } else {
                axios.post('http://localhost:8080/api/impostazione_dark/true')
                    .then((response) => {
                        document.getElementById("style").setAttribute('href', 'styleLight.css');
                        this.modalita = "Dark Mode";
                    });
            }
        },

        notifiche() {
            if (document.getElementById("myNotifiche").checked == true) {
                axios.post('http://localhost:8080/api/impostazione_notifica/true')
                    .then((response) => {
                        this.notifica = "Notifiche On";
                    });
            } else {
                axios.post('http://localhost:8080/api/impostazione_notifica/false')
                .then((response) => {
                    this.notifica = "Notifiche Off";
                });
            }

        }


    },
    mounted: function () {
        this.refreshData();
    }

}



