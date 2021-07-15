getGlobalConfig().then(config => projectShelfConstructor(config.catalogue));
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
        if (project.hideFromShelf) { return; }
        let displayName = project.displayName,
            refName = project.refName;
        if (refName == "home") { return; }
        const thumbnailURL = `/${refName}/thumbnail.png`;
        const thumbnailExists = urlExists(thumbnailURL);
        widthTester.innerHTML = displayName;
        if (useHTML) { refName = refName.concat('.html'); }
        //if (project.htmlInRoot) {
        //    pageURL = `/projects/${htmlName}`;
        //} else {
        //    pageURL = `/projects/${pathName}/${htmlName}`;
        //}
        let innerHTML = '<div class="project-wrapper">';
        if (project.openInNewTab) {
            innerHTML += `<a href=/${refName} target="_blank">`;
        } else {
            innerHTML += `<a href=/${refName}>`;
        }
        innerHTML += `<fieldset class="project"`;
        if (project.underConstruction | !thumbnailExists) {
            innerHTML += ` style="text-align: center;"><legend>`;
        } else {
            innerHTML += ` style="text-align: center; background-image: url('${thumbnailURL}');"><legend>`;
        }
        //#ANCHOR //! marquee is terrible, find an alternative
        if (widthTester.clientWidth > 235) {
            innerHTML += `<marquee>${displayName}</marquee>`;
        } else {
            innerHTML += `${displayName}`;
        }
        innerHTML += `</legend>`;
        if (project.underConstruction) {
            innerHTML += `<span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 30pt; text-shadow: 0px 0px 8px #ffffff;">🚧</span><br><span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 16pt; color: #f35858; text-shadow: 0px 0px 5px #000000;">Page under construction!</span>`;
        } else {
            if (!thumbnailExists) {
                innerHTML += `<span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 30pt; text-shadow: 0px 0px 8px #ffffff;">${pickRandom(['😐','🙃','🥴','🤪','😵','🤔','🤨'])}</span><br><span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 16pt; color: #a6ed8d; text-shadow: 0px 0px 5px #000000;">Thumbnail missing</span>`;
            }
        }
        innerHTML += `</fieldset></a></div>`;
        projectContainer.innerHTML = projectContainer.innerHTML.concat(innerHTML);
    });
    widthTester.parentNode.removeChild(widthTester);
    return;
}