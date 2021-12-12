
const impostazioni = {
    template: `<div>
<div class="header1 row d-flex justify-content-center">IMPOSTAZIONI</div>
<div class="row pt-2 m-1"> 
<div class="col-8"><a >Elimina Account</a></div>
<div class="col"><button type="button" class="btn">Elimina</button></div>
</div>
<div class="row pt-2 m-1"> {{noti}} 
</div>
<div class="row pt-2 m-1"> {{mode}}
</div>

<div class="row pt-2 m-1"><select class="form-select"> {{categoria}}
</select></div>
<div class="row pt-2 m-1"><div class="col-8"><p>Lingua</p></div><div class="col"><p> {{lingua}} </p></div></div>
<div class="row pt-2 m-1"><a href="https://www.lipsum.com" target="_blank">Informativa&privacy</a></div>
</div>
`,

    data() {
        return {
            mode : "",
            noti : "",
            lingua : "",
            categoria : ""
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
        
                    
        
                        if (impostazione.Dark == "true") {
        
                            this.mode = '<div class="col-8"><label class="form-check-label" for="mySwitch" id="lab_mode">Dark Mode</label></div><div class="col mx-2 form-switch"><input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" @click="colormode()" checked></div>';
                        } else {
                            this.mode = '<div class="col-8"><label class="form-check-label" for="mySwitch" id="lab_mode">Light Mode</label></div><div class="col mx-2 form-switch"><input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" @click="colormode()"></div>';
                        }
                        if (impostazione.Notifiche == "true") {
        
                            this.noti = '<div class="col-8"><label class="form-check-label" for="mySwitch" id="lab_notifiche">Notifiche On</label></div><div class="col mx-2 form-switch"><input class="form-check-input" type="checkbox" id="myNotifiche" name="notifiche" value="yes" @click="notifiche()" checked></div>';
        
                        } else {
                            this.noti = '<div class="col-8"><label class="form-check-label" for="mySwitch" id="lab_notifiche">Notifiche Off</label></div>div class="col mx-2 form-switch"><input class="form-check-input" type="checkbox" id="myNotifiche" name="notifiche" value="yes" @click="notifiche()" ></div>';
                        }
                        this.lingua = impostazione.Lingua;
        
                        impostazione.Categoria.forEach(cat => {
                            this.categoria += "<option style="+'"'+cat["col"]+'"'+">" + cat["cat"] + "</option>";
        
                        });
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
                document.getElementById("lab_mode").innerHTML = "Light Mode";
            } else {
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/api/impostazione_dark/true', true);
                request.send();
                document.getElementById("style").setAttribute('href', 'styleDark.css');
                document.getElementById("lab_mode").innerHTML = "Dark Mode";
            }
        },
        
         notifiche() {
            if (document.getElementById("myNotifiche").checked == true) {
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/api/impostazione_notifica/true', true);
                request.send();
                document.getElementById("lab_notifiche").innerHTML = "Notifiche On";
            } else {
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/api/impostazione_notifica/false', true);
                request.send();
                document.getElementById("lab_notifiche").innerHTML = "Notifiche Off";
            }
        }

    },
    mounted: function () {
        this.refreshData();
    }

}



