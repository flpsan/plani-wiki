const express = require('express');
const app = express();
app.use(express.text());
app.use(express.urlencoded());

let articles = [];

/**
 * Get all articles.
 */
app.get('/articles/', function (req, res) {
    res.status(200).json(articles);
});

/** 
 * Store an article endpoint.
 */
 app.put('/articles/:name', function (req, res) {
    let articleName = req.params.name;
    let articleFromMemory = articles.find(article => article.name === articleName);
    if (articleFromMemory) {
        //Update the article
        articleFromMemory.content = req.body;
        res.status(200).send('OK');
        return;
    }

    //Create a new article
    const newArticle = { name: articleName, content: req.body };
    articles.push(newArticle);
    res.status(201).send('Created');
});

/**
 * Get an article endpoint.
 */
app.get('/articles/:name', function (req, res) {
    const articleFromMemory = articles.find(article => article.name === req.params.name);
    if (articleFromMemory) {
        res.setHeader('content-type', 'text/html').status(200).send(articleFromMemory.content);
    } else {
        res.status(404).send('Not Found');
    }
});

const server = app.listen(9090);
console.log(`Listening on port ${server.address().port}`);