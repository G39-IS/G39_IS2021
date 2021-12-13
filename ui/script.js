window.onload= dark_mode();

function dark_mode(){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8080/api/impostazioni', true);
    request.onload = function () {
           // Begin accessing JSON data here
           var data = JSON.parse(this.response);
           if (request.status >= 200 && request.status < 400) {
               data.Impostazioni.forEach(impostazione => {

   
                   if (impostazione.Dark == "true") {
                    document.getElementById("style").setAttribute('href', 'css/styleDark.css');
                   } else {
                    document.getElementById("style").setAttribute('href', 'css/styleLight.css');
                   }

               });
           } else {
               const errorMessage = document.createElement('marquee');
               errorMessage.textContent = `THE API IS NOT WORKING!`;
               app.appendChild(errorMessage);
           }
       }
   
       request.send();
}

