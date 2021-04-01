const catalogueElement = document.getElementById('catalogue');
const currentPageFile = window.location.pathname.split('/').pop().split('.html')[0];

fetch('./global/config.json')
    .then(response => response.json())
    .then(data => { main(data) });

//
function main(config) {
    buildCatalogue(config.catalogue, config.useHTMLExtension);
    constructionSign(config.catalogue);
}

function constructionSign(catalogue) {
    let vThisPage = thisPage(catalogue);
    if (vThisPage && !vThisPage.underConstruction) {
        return;
    } else {
        addConstructionElement();
    }
    return;
}

function addConstructionElement() {
    let header = document.getElementById('header');
    header.innerHTML = header.innerHTML.concat('<span class="headerCatalogueSelected" id="construction-sign" style="position: absolute; left: 50%; margin-left: -120px; width: 100px; text-align: right; font-size: 25pt; text-shadow: 0px 0px 8px #ffffff;">🚧</span><span class="headerCatalogueSelected" id="construction-text" style="position: absolute; left: 50%; margin-left: -15px; width: 100px; font-size: 15pt; color: #f35858; text-shadow: 0px 0px 5px #000000;">Page under construction!</span>');
    return;
}

function buildCatalogue(catalogue, useHTML) {
    let establishedThisPage = false;
    //
    let separator = document.createElement('span');
    separator.innerHTML = ' | ';
    separator.className = 'headerCatalogueSeparator';
    //
    catalogue.forEach(page => {
        let newSpan = document.createElement('span');
        if (useHTML) {
            newSpan.innerHTML = `<a href="./${page.file}.html">${page.displayName}</a>`;
        } else {
            newSpan.innerHTML = `<a href="./${page.file}">${page.displayName}</a>`;
        }
        if (page.file == currentPageFile) {
            establishedThisPage = true;
            newSpan.className = 'headerCatalogueSelected';
        } else {
            newSpan.className = 'headerCatalogueUnselected';
        }
        catalogueElement.appendChild(newSpan);
        catalogueElement.appendChild(separator.cloneNode(true));
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
    return;
}

//#region   //! META
function thisPage(catalogue) {
    for (let i = 0; i < catalogue.length; i++) {
        if (catalogue[i].file == currentPageFile) { return catalogue[i]; }
    }
    return false;
}
//#endregion