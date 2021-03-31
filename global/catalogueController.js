const catalogueElement = document.getElementById('catalogue');
const currentPageFile = window.location.pathname.split('/').pop().split('.html')[0];


fetch('./global/catalogueConfig.json')
    .then(response => response.json())
    .then(data => { buildCatalogue(data) });


function buildCatalogue(config) {
    let useHTML = config.useHTMLExtension;
    let establishedThisPage = false;
    config.list.forEach(item => {
        let newSpan = document.createElement('span');
        if (useHTML) {
            newSpan.innerHTML = `<a href="./${item.file}.html">${item.displayName}</a>`;
        } else {
            newSpan.innerHTML = `<a href="./${item.file}">${item.displayName}</a>`;
        }
        if (item.file == currentPageFile) {
            establishedThisPage = true;
            newSpan.className = 'headerCatalogueSelected';
        } else {
            newSpan.className = 'headerCatalogueUnselected';
        }
        catalogueElement.appendChild(newSpan);

        //

        let separator = document.createElement('span');
        separator.innerHTML = '|';
        separator.className = 'headerCatalogueSeparator';
        catalogueElement.appendChild(separator);
    });

    if (!establishedThisPage) {
        let newSpan = document.createElement('span');
        if (useHTML) {
            newSpan.innerHTML = `<a href="./${currentPageFile}.html">${currentPageFile}</a>`;
        } else {
            newSpan.innerHTML = `<a href="./${currentPageFile}">${currentPageFile}</a>`;
        }
        newSpan.className = 'headerCatalogueSelected';
        catalogueElement.appendChild(newSpan);
    } else {
        catalogueElement.removeChild(catalogueElement.lastElementChild);
    }
}