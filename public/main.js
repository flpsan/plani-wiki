const LIST = 0;
const VIEW = 1;
const VIEW_ON_EDIT_MODE = 2;
const SAVE = 3;

let currentArticle;

const renderers = {
    resetSpa: () => {
        document.getElementById('editButton').classList.add('d-none');
        document.getElementById('editModeContainer').classList.add('d-none');
        document.getElementById('normalModeContainer').classList.remove('d-none');
    },
    renderList: json => {
        renderers.resetSpa();
        document.getElementById('pageTitle').innerText = 'Walcome to plani-wiki';
        document.getElementById('content').innerText = '';
        if (json.length) {
            for (var i = 0; i < json.length; i++) {
                document.getElementById('content').innerHTML += `<a href='/${json[i].name}'>${json[i].name}</a>`;
            }
        }
    },
    renderViewArticlePage: (article, openEditMode) => {
        currentArticle = article;
        renderers.resetSpa();
        document.getElementById('editButton').classList.remove('d-none');
        document.getElementById('pageTitle').innerText = article.name;
        if (openEditMode) { 
            editMode.start();
        }
    },
    renderArticleNotFound: (article, openEditMode) => {
        document.getElementById('content').innerText = 'No article with this exact name found. Use Edit button in the header to add it.';
        renderers.renderViewArticlePage(article, openEditMode);
    },
    renderArticle: (article, openEditMode) => {
        const converter = new showdown.Converter();
        document.getElementById('content').innerHTML = converter.makeHtml(article.content);
        renderers.renderViewArticlePage(article, openEditMode);
    },
}

const editMode = {
    start: () => { 
        document.getElementById('editModeContainer').classList.remove('d-none');
        document.getElementById('normalModeContainer').classList.add('d-none');
        document.getElementById('editButton').classList.add('d-none');
        document.getElementById('editTextarea').value = currentArticle.content;
        document.getElementById('editTextarea').focus();
    },
    cancel: () => {
        document.getElementById('editModeContainer').classList.add('d-none');
        document.getElementById('normalModeContainer').classList.remove('d-none');
        document.getElementById('editButton').classList.remove('d-none');
        document.getElementById('editTextarea').value = '';
    },
    save: () => {
        alert('save');
        //document.location = `/edit/${currentArticleName}`;
    }
}

const loadSpa = () => {
    var path = window.location.pathname.substr(1).split('/');
    var url = 'http://localhost:9090/articles';
    var action = LIST; //Default action
    var articleName;
    if (path.length === 1 && path[0] !== '') {
        action = VIEW;
        articleName = path[0];
        url += `\/${articleName}`;
        
    } else if (path.length === 2 && path[0] === 'edit') {
        action = VIEW_ON_EDIT_MODE;
        articleName = path[1];
        url += `\/${articleName}`;
    }
    fetch(url, { method: action === SAVE ? 'PUT' : 'GET' })
        .then(response => {
            if (action === LIST) {
                response.json().then(json => {
                    renderers.renderList(json);
                });
            } else if (action === VIEW || action === VIEW_ON_EDIT_MODE) {
                if (response.status === 404) {
                    renderers.renderArticleNotFound({ name: articleName, content: '' }, action === VIEW_ON_EDIT_MODE);
                } else if (response.status === 200) {
                    response.text().then(html => {
                        renderers.renderArticle({ name: articleName, content: html}, action === VIEW_ON_EDIT_MODE);
                    });
                }
            }
        }).catch(error => {
            alert(error.message);
        });
}