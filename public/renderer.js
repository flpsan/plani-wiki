const renderer = {
    resetSpa: () => {
        document.getElementById('editButton').classList.add('d-none');
        document.getElementById('editModeContainer').classList.add('d-none');
        document.getElementById('normalModeContainer').classList.remove('d-none');
    },
    renderList: json => {
        renderer.resetSpa();
        document.getElementById('pageTitle').innerText = 'Walcome to plani-wiki';
        document.getElementById('content').innerText = '';
        if (json.length) {
            for (var i = 0; i < json.length; i++) {
                document.getElementById('content').innerHTML += `<div class='my-2'><a href='/${json[i].name}'>${json[i].name}</a><div>`;
            }
        } else {
            document.getElementById('content').innerText = 'No articles found.'
        }
    },
    renderViewArticlePage: (article, openEditMode) => {
        currentArticle = article;
        renderer.resetSpa();
        document.getElementById('editButton').classList.remove('d-none');
        document.getElementById('pageTitle').innerText = article.name;
        if (openEditMode) { 
            editMode.start();
        }
    },
    renderArticleNotFound: (article, openEditMode) => {
        document.getElementById('content').innerText = 'No article with this exact name found. Use Edit button in the header to add it.';
        renderer.renderViewArticlePage(article, openEditMode);
    },
    renderArticle: (article, openEditMode) => {
        const converter = new showdown.Converter();
        document.getElementById('content').innerHTML = converter.makeHtml(article.content);
        renderer.renderViewArticlePage(article, openEditMode);
    },
}