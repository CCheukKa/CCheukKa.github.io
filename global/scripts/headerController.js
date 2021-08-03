const catalogueElement = document.getElementById('catalogue');
const dropdownMenuElement = document.getElementById('dropdownMenu');

document.getElementsByClassName("headerTitle")[0].style.whiteSpace = 'nowrap';
getGlobalConfig().then(config => main(config));

//
function main(config) {
    buildNavigation(config.catalogue);
    constructionSign(config.catalogue);
    handleExceptions(config.exception);
    return;
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

function removeConstructionElement() {
    document.getElementById('header').removeChild(document.getElementById('construction-sign'));
    document.getElementById('header').removeChild(document.getElementById('construction-text'));
    return;
}

function buildNavigation(catalogue) {
    let establishedThisPage = false;
    //
    let separator = document.createElement('span');
    separator.innerHTML = ' | ';
    separator.className = 'headerCatalogueSeparator';
    //
    catalogue.forEach(page => {
        let newSpan = document.createElement('span');
        if (useHTML) {
            newSpan.innerHTML = `<a href="/${page.refName}.html">${page.displayName}</a>`;
        } else {
            newSpan.innerHTML = `<a href="/${page.refName}">${page.displayName}</a>`;
        }
        if (page.refName == currentPageFile) {
            establishedThisPage = true;
            newSpan.className = 'headerCatalogueSelected';
        } else {
            newSpan.className = 'headerCatalogueUnselected';
        }
        catalogueElement.appendChild(newSpan);
        catalogueElement.appendChild(separator.cloneNode(true));
        //
        let newDiv = document.createElement('div');
        newDiv.className = newSpan.className;
        newDiv.appendChild(newSpan.childNodes[0].cloneNode(true));
        dropdownMenuElement.appendChild(newDiv);
    });

    if (!establishedThisPage) {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = `<a href="">${currentPageFile}</a>`;
        newSpan.className = 'headerCatalogueSelected';
        catalogueElement.appendChild(newSpan);
    } else {
        catalogueElement.removeChild(catalogueElement.lastElementChild);
    }
    return;
}

function handleExceptions(exception) {
    exception.forEach(page => {
        if (page.refName == currentPageFile && !page.underConstruction) {
            removeConstructionElement();
        }
    });
    return;
}