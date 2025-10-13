fetchConfig('/projects/projectConfig.jsonc').then(config => projectShelfConstructor(config.projects));
//
function projectShelfConstructor(projects) {
    const widthTester = document.createElement('div');
    document.body.appendChild(widthTester);
    widthTester.style.width = 'fit-content';
    widthTester.style.fontWeight = 'bold';
    widthTester.style.fontSize = 'xx-large';
    widthTester.style.fontFamily = "'Bellota Text', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
    //
    projects.forEach(project => {
        let displayName = project.displayName;
        widthTester.innerHTML = displayName;
        let pageURL;
        let thumbnailURL;

        let isLocal = project.isLocal ?? true;
        if (isLocal) {
            let pathName = project.pathName;
            let htmlName = project.htmlName;
            if (useHTML) { htmlName = htmlName.concat('.html'); }
            if (project.htmlInRoot) {
                pageURL = `/projects/${htmlName}`;
            } else {
                pageURL = `/projects/${pathName}/${htmlName}`;
            }
            thumbnailURL = `/projects/${pathName}/thumbnail.png`;
        } else {
            pageURL = project.redirectURL;
            thumbnailURL = `${pageURL}/thumbnail.png`;
        }
        //
        let innerHTML = `<div class="shelf-item-wrapper">`;
        if (project.openInNewTab || !isLocal) {
            innerHTML += `<a href="${pageURL}" target="_blank">`;
        } else {
            innerHTML += `<a href="${pageURL}">`;
        }
        innerHTML += `<fieldset class="shelf-item"`;
        const thumbnailExists = urlExists(thumbnailURL);
        if (thumbnailExists) {
            innerHTML += ` style="background-image: url('${thumbnailURL}');"><legend>`;
        } else {
            innerHTML += ` style="text-align: center;"><legend>`;
        }
        //#ANCHOR //! marquee is terrible, find an alternative
        if (widthTester.clientWidth > 235) {
            innerHTML += `<marquee>${displayName}</marquee>`;
        } else {
            innerHTML += `${displayName}`;
        }
        innerHTML += `</legend>`;
        if (!thumbnailExists) {
            innerHTML += `<span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 30pt; text-shadow: 0px 0px 8px #ffffff;">${pickRandom(['😐', '🙃', '🥴', '🤪', '😵', '🤔', '🤨'])}</span><br><span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 16pt; color: #a6ed8d; text-shadow: 0px 0px 5px #000000;">Thumbnail failed to load</span>`;
        }
        innerHTML += `</fieldset></a></div>`;
        shelfContainer.innerHTML = shelfContainer.innerHTML.concat(innerHTML);
    });
    widthTester.parentNode.removeChild(widthTester);
    return;
}