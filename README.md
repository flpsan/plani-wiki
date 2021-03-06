# Welcome to Plani-Wiki

Instructions to run and test:

- `git clone https://github.com/flpsan/plani-wiki.git`
- `cd plani-wiki`
- `npm install`
- `npm start`
- Done! SPA should be listening at localhost:8080 and the API at localhost:9090
  - Examples for API endpoints:
    - `curl http://localhost:9090/articles/` to list articles
    - `curl -X PUT http://localhost:9090/articles/article1 -d "New article content"` to create or update an article named `article1`
    - `curl http://localhost:9090/articles/article1` to get `article1` content
- To test the API: `npm test`

Technologies and APIs used:

- Node.js to provide full back-end funcionality
- [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) to make http requests
- [Bootstrap](https://getbootstrap.com/) as front-end framework
- [showdown.js](https://github.com/showdownjs/showdown) to convert plain text on Markdown notation to HTML
- [concurrently.js](https://www.npmjs.com/package/concurrently) to provide cross-plataform solution for multiple `npm start` commands
- [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for tests

Yet to do:

- Test invalid Markdown
