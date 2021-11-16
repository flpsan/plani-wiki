const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); //Accept CORS
app.use(express.text());
app.use(express.urlencoded());

let articles = [];

/**
 * Get all articles.
 */
app.get('/articles/', function (req, res) {
    return res.status(200).json(articles);
});

/** 
 * Store an article endpoint.
 */
 app.put('/articles/:name', function (req, res) {
    let articleName = req.params.name;
    let articleContent = typeof req.body !== 'string' ? '-' : req.body;
    let articleFromMemory = articles.find(article => article.name === articleName);
    if (articleFromMemory) {
        //Update the article
        articleFromMemory.content = articleContent;
        return res.status(200).send('OK');
    }

    //Create a new article
    const newArticle = { name: articleName, content: articleContent };
    articles.push(newArticle);
    return res.status(201).send('Created');
});

/**
 * Get an article endpoint.
 */
 app.get('/articles/:name', function (req, res) {
    const articleFromMemory = articles.find(article => article.name === req.params.name);
    if (articleFromMemory) {
        return res.setHeader('content-type', 'text/html').status(200).send(articleFromMemory.content);
    }
    return res.status(404).send('Not Found');
});

const restApiServer = app.listen(9090);
console.log(`REST API server is listening on port ${restApiServer.address().port}`);

const app2 = express();
const path = require('path');
app2.use(express.text());
app2.use(express.urlencoded());
app2.use(express.static('public'));

//Serve the SPA static asset for those GET routes
app2.get(['/','/:articleName', '/edit/:articleName'], (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const spaServer = app2.listen(8080);
console.log(`SPA server is listening on port ${spaServer.address().port}`);