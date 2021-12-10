function impostazioni() {
    var section =   
                    '<div class="header1 row d-flex justify-content-center">IMPOSTAZIONI</div>'+
                    '<div class="row pt-2 m-1">'+
                        '<div class="col-8"><a >Elimina Account</a></div>'+
                        '<div class="col"><button type="button" class="btn">Elimina</button></div>'+
                    '</div>'+
                    '<div class="row pt-2 m-1">'+
                        '<div class="col-8"><label class="form-check-label" for="mySwitch" id="lab_mode">Dark mode</label></div>'+
                        '<div class="col mx-2 form-switch"><input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" onclick="colormode()" checked></div>'+
                    '</div>'+
                    '<div class="row pt-2 m-1"><a href="https://www.lipsum.com" target="_blank">Informativa&privacy</a></div>';

    document.getElementById("contenuto").innerHTML = section;

}

function home() {
    var section =   '<div class="header1 row d-flex justify-content-center">HOME</div>';

    document.getElementById("contenuto").innerHTML = section;

}

function colormode(){
    if( document.getElementById("mySwitch").checked == true){
        document.getElementById("style").setAttribute('href','styleLight.css');
        document.getElementById("lab_mode").innerHTML="Light Mode";
    }else{
        document.getElementById("style").setAttribute('href','styleDark.css');
    }
}