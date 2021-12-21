const Express = require("express");
const app = Express();

// modules to generate APIs documentation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Time Gitf Application',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Group39'
            },
        },
        servers: [
            {
                url: 'http://localhost:8080/',
                description: 'Development server',
            },
        ],
    },
    apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



var fs = require('fs');

var cors = require('cors')
app.use(cors())

// module to parse the API body request
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(8080, () => {
    console.log("APIs Running");


});


/**
 * @swagger
 * /api/userbyus/{user}:
 *   get:
 *     summary: Restituisce degli utenti.
 *     description: Restituisce degli utenti che contengono una certa stringa nel campo User.
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *             type: string
 *         required: true
 *         description: stringa da cercare nel campo User degli utenti
 *     responses:
 *       200:
 *         description: Informazioni utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Nome:
 *                         type: string
 *                         description: Nome dell'utente.
 *                         example: Giovanna
 *                       Cognome:
 *                         type: string
 *                         description: Cognome dell'utente.
 *                         example: Barotti
 *                       User:
 *                          type: string
 *                          description: Username dell'utente
 *                          example: calligalli
 *                       Password:
 *                          type: string
 *                          description: Password dell'utente
 *                          example: calligalli
 *                       E-mail:
 *                          type: string
 *                          description: email dell'utente
 *                          example: calligalli
 *                       Seguiti:
 *                          type: array
 *                          description: lista id degli account seguiti dall'utente
 *                          example: [1,2,3,4]
 *                       Follower:
 *                          type: int
 *                          description: Numero follower dell'utente
 *                          example: calligalli
 */



app.get('/api/userbyus/:user', (request, response) => {
    var data = fs.readFileSync('../assets/users.json', 'utf8');
    var myObject = JSON.parse(data);
    var tmp =  JSON.parse(data);
    tmp.Users.splice(0,tmp.Users.length)

   for (let [i, us] of myObject.Users.entries()) {

    if (us.User.includes(request.params.user) == true) {
        tmp.Users.push(us);
        
    }
}
    response.send(tmp);
   console.log("success");

})

/**
 * @swagger
 * /api/userbyid/{id}:
 *   get:
 *     summary: Restituisce degli utenti.
 *     description: Restituisce degli utenti con un ID che combacia con il paramentro passato.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: id utente cercato
 *     responses:
 *       200:
 *         description: Informazioni utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Nome:
 *                         type: string
 *                         description: Nome dell'utente.
 *                         example: Giovanna
 *                       Cognome:
 *                         type: string
 *                         description: Cognome dell'utente.
 *                         example: Barotti
 *                       User:
 *                          type: string
 *                          description: Username dell'utente
 *                          example: calligalli
 *                       Password:
 *                          type: string
 *                          description: Password dell'utente
 *                          example: calligalli
 *                       E-mail:
 *                          type: string
 *                          description: email dell'utente
 *                          example: calligalli
 *                       Seguiti:
 *                          type: array
 *                          description: lista id degli account seguiti dall'utente
 *                          example: [1,2,3,4]
 *                       Follower:
 *                          type: int
 *                          description: Numero follower dell'utente
 *                          example: calligalli
 */
 
 app.get('/api/userbyid/:id', (request, response) => {
    var data = fs.readFileSync('../assets/users.json', 'utf8');
    var myObject = JSON.parse(data);


   for (let [i, us] of myObject.Users.entries()) {

    if (us.ID == request.params.id) {
        response.send(us);
    }
}

   console.log("success");

})



/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Restituisce tutti utenti.
 *     description: Restituisce tutti utenti.
 *     responses:
 *       200:
 *         description: Informazioni utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Nome:
 *                         type: string
 *                         description: Nome dell'utente.
 *                         example: Giovanna
 *                       Cognome:
 *                         type: string
 *                         description: Cognome dell'utente.
 *                         example: Barotti
 *                       User:
 *                          type: string
 *                          description: Username dell'utente
 *                          example: calligalli
 *                       Password:
 *                          type: string
 *                          description: Password dell'utente
 *                          example: calligalli
 *                       E-mail:
 *                          type: string
 *                          description: email dell'utente
 *                          example: calligalli
 *                       Seguiti:
 *                          type: array
 *                          description: lista id degli account seguiti dall'utente
 *                          example: [1,2,3,4]
 *                       Follower:
 *                          type: int
 *                          description: Numero follower dell'utente
 *                          example: calligalli
 */
 
 app.get('/api/user', (request, response) => {
    var data = fs.readFileSync('../assets/users.json');
    var myObject = JSON.parse(data);

    response.send(myObject);

})


/**
 * @swagger
 * /api/impostazioni:
 *   get:
 *     summary: Restituisce la lista delle impostazioni.
 *     description: Restituisce la lista delle impostazioni.
 *     responses:
 *       200:
 *         description: A list of impostations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Dark:
 *                         type: string
 *                         description: Darkmode.
 *                         example: true
 *                       Notifiche:
 *                         type: string
 *                         description: Notifiche.
 *                         example: false
 *                       Lingua:
 *                          type: string
 *                          description: Lingua
 *                          example: Italiano
 *                       Categoria:
 *                          type: array
 *                          items: string
 *                          example: ["ds","fd","cf"]
*/


 app.get('/api/impostazioni', (request, response) => {
    var data = fs.readFileSync('../assets/impostazioni.json');
    var myObject = JSON.parse(data);

    response.send(myObject);

})


/**
 * @swagger
 * /api/impostazione_dark/{value}:
 *   put:
 *     summary: Modifica visualizzazione applicazione
 *     parameters:
 *       - in: path
 *         name: value
 *         schema:
 *             type: string
 *         required: true
 *         description: true -> dark , fasle -> Light
 *     responses:
 *       200:
 *         description: the impostation was update
 *       404:
 *         description: the impostation was not update
*/
app.put('/api/impostazione_dark/:value', (request, response) => {
    var data = fs.readFileSync('../assets/impostazioni.json');
    var myObject = JSON.parse(data);
  
    myObject.Impostazioni[0].Dark=request.params.value;

    //memorizzo il nuovo JSON dopo la cancellazione
    var newData = JSON.stringify(myObject);
    console.log(newData);
    fs.writeFile('../assets/impostazioni.json', newData, err => {
        // error checking
        if (err) throw err;
    });
    response.json("Update Successfully: " + myObject.Impostazioni.length);
})

/**
 * @swagger
 * /api/impostazione_notifica/{value}:
 *   put:
 *     summary: Modifica impostazione notifiche
 *     parameters:
 *       - in: path
 *         name: value
 *         schema:
 *             type: string
 *         required: true
 *         description: true -> yes , fasle -> no
 *     responses:
 *       200:
 *         description: the impostation was update
 *       404:
 *         description: the impostation was not update
*/
app.put('/api/impostazione_notifica/:value', (request, response) => {
    var data = fs.readFileSync('../assets/impostazioni.json');
    var myObject = JSON.parse(data);
  
    myObject.Impostazioni[0].Notifiche=request.params.value;

    //memorizzo il nuovo JSON dopo la cancellazione
    var newData = JSON.stringify(myObject);
    console.log(newData);
    fs.writeFile('../assets/impostazioni.json', newData, err => {
        // error checking
        if (err) throw err;
    });
    response.json("Update Successfully: " + myObject.Impostazioni.length);
})



/**
 * @swagger
 * /api/eventi:
 *   get:
 *     summary: Restituisce tutti gli eventi.
 *     description: Restituisce tutti gli eventi.
 *     responses:
 *       200:
 *         description: Informazioni eventi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Data:
 *                         type: string
 *                         description: Data evento.
 *                         example: 10/01/2022
 *                       Titolo:
 *                         type: string
 *                         description: Titolo evento.
 *                         example: Esame di Ingegneria del Software
 *                       LivelloDiPriorita:
 *                          type: string
 *                          description: Priorità dell'evento
 *                          example: alta
 *                       Categoria:
 *                          type: string
 *                          description: Categoria dell'evento
 *                          example: Impegno scolastico
 *                       Descrizione:
 *                          type: string
 *                          description: Descrizione dell'evento
 *                          example: Presentazione del progetto
 *                       Fasciaoraria:
 *                          type: string
 *                          description: Descrizione dell'evento
 *                          example: Presentazione del progetto
 *                       Frequenza:
 *                          type: string
 *                          description: Descrizione dell'evento
 *                          example: Presentazione del progetto
 *                       Frequenzanotifica:
 *                          type: string
 *                          description: Descrizione dell'evento
 *                          example: Presentazione del progetto
 *                       Listaamici:
 *                          type: array
 *                          description: lista id degli account seguiti dall'utente
 *                          example: [1,2,3,4]
 *                       Messaggioautomatico:
 *                          type: bool
 *                          description: Impostazione invio automatico dei messaggi
 *                          example: true
 *                       Numerotelefono:
 *                          type: string
 *                          description: Nuemero telefono a cui inviare sms
 *                          example: 3837642340
 *                       Testo:
 *                          type: string
 *                          description: Testo del messaggio
 *                          example: Testo del messaggio
 *                       Orario:
 *                          type: string
 *                          description: Orario invio messaggio dell'evento
 *                          example: null
 *                       Fusi-orari:
 *                          type: string
 *                          description: Fuso orario notifica dell'evento
 *                          example: disattivato
 */
 
 app.get('/api/eventi', (request, response) => {
    var data = fs.readFileSync('../assets/eventi.json');
    var myObject = JSON.parse(data);

    response.send(myObject.ev.Eventi);

})


/**
 * @swagger
 * /api/eventi/{id}:
 *   delete:
 *     summary: Delete a event.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: int
 *         required: true
 *         description: the event id
 *     responses:
 *       200:
 *         description: the event was deleted
 *       404:
 *         description: the event was not found
*/
app.delete('/api/eventi/:id', (request, response) => {
    var data = fs.readFileSync('../assets/eventi.json');
    var myObject = JSON.parse(data);
    for (let [i, ev] of myObject.ev.Eventi.entries()) {

        if (ev.ID == request.params.id) {
            myObject.ev.Eventi.splice(i, 1);
        }
    }
    //memorizzo il nuovo JSON dopo la cancellazione
    var newData = JSON.stringify(myObject);
    fs.writeFile('../assets/eventi.json', newData, err => {
        // error checking
        if (err) throw err;
    });
    response.json("Deleted Successfully: " + myObject.ev.Eventi.length);
})


/**
 * @swagger
 * /api/eventi/{id}:
 *   put:
 *     summary: Modifica evento corrispondente all'id passato come parametro
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: int
 *         required: true
 *         description: id dell'evento da modificare
 *     responses:
 *       200:
 *         description: evento was update
 *       404:
 *         description: evento was not update
*/
app.put('/api/eventi/:id', (request, response) => {
    var data = fs.readFileSync('../assets/eventi.json');
    var myObject = JSON.parse(data);

    for (let [i, evn] of myObject.ev.Eventi.entries()) {
        if (evn.ID == request.params.id) {
            myObject.ev.Eventi[i].Descrizione=request.body['Descrizione'];
            myObject.ev.Eventi[i].Data=request.body['Data'];
            myObject.ev.Eventi[i].Titolo=request.body['Titolo'];
            myObject.ev.Eventi[i].LivelloDiPriorita=request.body['LivelloDiPriorita'];
            myObject.ev.Eventi[i].Categoria=request.body['Categoria'];
           
        }
    }

    //memorizzo il nuovo JSON dopo la cancellazione
    var newData = JSON.stringify(myObject);
    fs.writeFile('../assets/eventi.json', newData, err => {
        // error checking
        if (err) throw err;
    });
    response.json("Update Successfully: " + myObject.ev.Eventi.length);
})

/**
 * @swagger
 * /api/eventi:
 *   post:
 *     summary: Crea un evento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                  type: integer
 *                  description: The product Name.
 *                  example: Antonio
 *               Price:
 *                  type: string
 *                  description: The product's price.
 *                  example: 20.0
 *               Location:
 *                  type: string
 *                  description: The product's location
 *                  example: Refrigerated foods
 *     responses:
 *       201:
 *         description: successful executed
*/
app.post('/api/eventi', (request, response) => {

    // lettura file json e estrazione dati
    var data = fs.readFileSync('../assets/eventi.json');
    var myObject = JSON.parse(data);


    // creazione nuovo elemento da inserire da Request Parameter
    let newevn = {
        "ID": myObject.ev.LastId+1,
        "Data": request.body['Data'],
        "Titolo": request.body['Titolo'],
        "LivelloDiPriorita": request.body['LivelloDiPriorita'],
        "Categoria": request.body['Categoria'],
        "Descrizione": request.body['Descrizione'],
        "Fasciaoraria": "Tutto il giorno",
        "Frequenza": "una volta",
        "Frequenzanotifica": "Mai",
        "Listaamici": [ 1,3,4,5],
        "Messaggioautomatico": true,
        "Numerotelefono": null,
        "Testo": null,
        "Orario": null,
        "Fusi-orari": "disattivato"
    };
    myObject.ev.LastId=myObject.ev.LastId+1;
    //aggiunta nuovo elemento
    myObject.ev.Eventi.push(newevn);

    //aggiornamento file json con il nuovo elemento
    var newData = JSON.stringify(myObject);
    fs.writeFile('../assets/eventi.json', newData, err => {
        // error checking
        if (err) throw err;
    });

    response.json("Evento Aggiunto Correttamente: (" + myObject.ev.Eventi.length + ")");
})

module.exports = app;