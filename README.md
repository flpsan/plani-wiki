# Welcome to Plani-Wiki

Instructions to run:

- `git clone https://github.com/flpsan/plani-wiki.git`
- `cd plani-wiki`
- `npm install`
- `npm start`
- Done! SPA should be listening at localhost:8080 and the REST api at localhost:9090.

Yet to do:

- Unit testing
- Test a not valid Markdown

Technologies and APIs used:

- Node.js to provide full back-end funcionality
- [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) to make http requests
- [Bootstrap](https://getbootstrap.com/) as front-end framework
- [showdown.js](https://github.com/showdownjs/showdown) to convert plain text on Markdown notation to HTML
- [concurrently.js](https://www.npmjs.com/package/concurrently) to provide a closs plataform solution for multiple `npm start` commands
