const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

//Serve the SPA static asset for those GET routes
app.get(['/','/:articleName', '/edit/:articleName'], (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const spaServer = app.listen(8080);
console.log(`SPA server is listening on port ${spaServer.address().port}`);