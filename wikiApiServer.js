const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); //Accept CORS
app.use(express.text());
app.use(express.urlencoded({ extended: true }))

const curlMiddleware = (req, res, next) => {
    //A simple workaround to accept CURL -d because its content-type is not plain/text as expected
    if (req.headers['content-type'] && 
        req.headers['content-type'].toLowerCase() === 'application/x-www-form-urlencoded' &&
        typeof req.body === 'object') {
        req.body = Object.keys(req.body)[0];
    }
    next();
}
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
 app.put('/articles/:name', curlMiddleware, function (req, res) {
    let articleContent = req.body;
    let articleName = req.params.name;
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

module.exports = { app: app, articles: articles };