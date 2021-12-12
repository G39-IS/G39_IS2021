
const impostazioni = {
    template: `
    <div>
        <div class="header1 row d-flex justify-content-center">IMPOSTAZIONI</div>

        <div class="row pt-2 m-1"> 
            <div class="col-8"><a >Elimina Account</a></div>
            <div class="col"><button type="button" class="btn">Elimina</button></div>
        </div>

        <div class="row pt-2 m-1">
            <div class="col-8"><label class="form-check-label" for="mySwitch" id="lab_notifiche">{{notifica}}</label></div>
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
            <div class="row pt-2 m-1"><select class="form-select" v-for="cat in categoria"><option>{{cat}}</option></select></div>
            <div class="row pt-2 m-1"><div class="col-8"><p>Lingua</p></div>
                <div class="col"><p> {{lingua}} </p></div>
            </div>

        <div class="row pt-2 m-1"><a href="https://www.lipsum.com" target="_blank">Informativa&privacy</a></div>
    </div>
    </div>
`,

    data() {
        return {
            mode : "",
            noti : "",
            lingua : "italiano?",
            categoria : [],
            modalita : "true",
            notifica :"fasle"
        }
    },
    methods: {
        refreshData() {

            var request = new XMLHttpRequest();
            request.open('GET', 'http://localhost:8080/api/impostazioni', true);
            request.onload = function () {
        
                // Begin accessing JSON data here
                var data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    data.Impostazioni.forEach(impostazione => {
                        alert(impostazione.Dark);
                        if (impostazione.Dark == "true") {
                            this.mode = "true";
                        } else {
                            this.mode = "false";
                        }
                        if (impostazione.Notifiche == "true") {
                            this.noti = "true";
                        } else {
                            this.noti = "false";
                        }
                        this.lingua = impostazione.Lingua;
                        this.categoria=impostazione.categoria;
                    });
                } else {
                    const errorMessage = document.createElement('marquee');
                    errorMessage.textContent = `THE API IS NOT WORKING!`;
                    app.appendChild(errorMessage);
                }
            }
        
            request.send();
        
        
        
        },
        colormode() {
            if (document.getElementById("mySwitch").checked == false) {
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/api/impostazione_dark/false', true);
                request.send();
                document.getElementById("style").setAttribute('href', 'styleLight.css');
                this.modalita =  "Light Mode";
            } else {
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/api/impostazione_dark/true', true);
                request.send();
                document.getElementById("style").setAttribute('href', 'styleDark.css');
                this.modalita = "Dark Mode";
            }
            this.refreshData();
        },
        
         notifiche() {
            if (document.getElementById("myNotifiche").checked == true) {
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/api/impostazione_notifica/true', true);
                request.send();
                this.notifica = "Notifiche On";
            } else {
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/api/impostazione_notifica/false', true);
                request.send();
                this.notifica = "Notifiche Off";
            }

            this.refreshData();
        }
         

    },
    update: function () {
        this.refreshData();
    }

}



