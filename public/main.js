const LIST = 0;
const VIEW = 1;
const VIEW_ON_EDIT_MODE = 2;

let currentArticle;

/** This method handles the page load */
const loadSpa = () => {
    var path = window.location.pathname.substr(1).split('/');
    var url = 'http://localhost:9090/articles';
    var action = LIST; //Default action
    var articleName;

    //If the path is '/:articleName' it's a single article view action. 
    //If it is '/' or '/edit' the action will be ignored and understood as a list view (the default action).
    if (path.length === 1 && path[0] !== '' && path[0] !== 'edit') {
        action = VIEW;
        articleName = path[0];
        url += `\/${articleName}`;
    } else if (path.length === 2 && path[0] === 'edit') { //If the path is '/edit/:articleName' the edit-mode will be presented for articleName
        action = VIEW_ON_EDIT_MODE;
        articleName = path[1];
        url += `\/${articleName}`;
    }
    fetch(url, { method: 'GET' })
        .then(response => {
            if (action === LIST) {
                //Convert response to json
                response.json().then(json => renderer.renderList(json));
            } else if (action === VIEW || action === VIEW_ON_EDIT_MODE) {
                if (response.status === 404) {
                    //Status 404 means that the articleName was not found
                    renderer.renderArticleNotFound({ name: articleName, content: '' }, action === VIEW_ON_EDIT_MODE);
                } else if (response.status === 200) {
                    //Convert response to text
                    response.text().then(html => {
                        renderer.renderArticle({ name: articleName, content: html}, action === VIEW_ON_EDIT_MODE);
                    });
                }
            }
        }).catch(error => {
            alert(error.message);
        });
}