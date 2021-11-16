const editMode = {
    start: () => { 
        document.getElementById('normalModeContainer').classList.add('d-none');
        document.getElementById('editButton').classList.add('d-none');
        document.getElementById('editModeContainer').classList.remove('d-none');
        document.getElementById('editTextarea').value = currentArticle.content;
        document.getElementById('editTextarea').focus();
    },
    cancel: () => {
        document.getElementById('editModeContainer').classList.add('d-none');
        document.getElementById('previewModeContainer').classList.add('d-none');
        document.getElementById('normalModeContainer').classList.remove('d-none');
        document.getElementById('editButton').classList.remove('d-none');
        document.getElementById('editTextarea').value = '';
        document.getElementById('pageTitle').innerText = currentArticle.name;
    },
    preview: () => {
        const converter = new showdown.Converter();
        document.getElementById('editModeContainer').classList.add('d-none');
        document.getElementById('normalModeContainer').classList.add('d-none');
        document.getElementById('previewModeContainer').classList.remove('d-none');
        document.getElementById('contentPreview').innerHTML = converter.makeHtml(document.getElementById('editTextarea').value);
        document.getElementById('pageTitle').innerText = `${currentArticle.name} (preview mode)`;
    },
    returnToEdit: () => {
        document.getElementById('previewModeContainer').classList.add('d-none');
        document.getElementById('normalModeContainer').classList.add('d-none');
        document.getElementById('editModeContainer').classList.remove('d-none');
        document.getElementById('pageTitle').innerText = currentArticle.name;
        document.getElementById('editTextarea').focus();
    },
    save: () => {
        const url = `http://localhost:9090/articles/${currentArticle.name}`
        fetch(url, { method: 'PUT', body: document.getElementById('editTextarea').value })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    window.location = `/${currentArticle.name}`;
                }
            }).catch(error => {
                alert(error.message);
            });
    }
}