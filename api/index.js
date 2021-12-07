const Express = require("express");
const app = Express();

// modules to generate APIs documentation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API for My Project',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Group39',
                url: 'http://localhost:8080/',
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
 * /api/usersearch/{user}:
 *   get:
 *     summary: Retrieve a signle User.
 *     description: etrieve a signle User from the Server.
 *     responses:
 *       200:
 *         description: A User informations.
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
 *                         type: integer
 *                         description: The User Name.
 *                         example: Giovanna
 *                       Cognome:
 *                         type: string
 *                         description: The User Surname.
 *                         example: Barotti
 *                       User:
 *                          type: string
 *                          description: The User username
 *                          example: calligalli
 */
app.get('/api/usersearch:user', (request, response) => {
    var data = fs.readFileSync('../assets/users.json');
    var myObject = JSON.parse(data);
    
    for (let us of myObject.Users.entries()) {

        if (us.User == request.params.user) {

            
        }
    }

    response.send(us);

})


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a list of products.
 *     description: Retrieve a list of produdct from the Server.
 *     responses:
 *       200:
 *         description: A list of products.
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
 *                        Nome:
 *                         type: integer
 *                         description: The User Name.
 *                         example: Giovanna
 *                       Cognome:
 *                         type: string
 *                         description: The User Surname.
 *                         example: Barotti
 *                       User:
 *                          type: string
 *                          description: The User username
 *                          example: calligalli
 */
 app.get('/api/user', (request, response) => {
    var data = fs.readFileSync('../assets/users.json');
    var myObject = JSON.parse(data);

    response.send(myObject);

})
