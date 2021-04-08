fetchConfig('/projects/projectConfig.json').then(config => projectShelfConstructor(config.projects));
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
        let displayName = project.displayName,
            pathName = project.pathName,
            htmlName = project.htmlName;
        widthTester.innerHTML = displayName;
        if (useHTML) { htmlName = htmlName.concat('.html'); }
        let pageURL;
        if (project.htmlInRoot) {
            pageURL = `/projects/${htmlName}`;
        } else {
            pageURL = `/projects/${pathName}/${htmlName}`;
        }
        const thumbnailURL = `/projects/${pathName}/thumbnail.png`;
        const thumbnailExists = urlExists(thumbnailURL);
        //
        let innerHTML = `<div class="project-wrapper">`;
        if (project.openInNewTab) {
            innerHTML += `<a href="${pageURL}" target="_blank">`;
        } else {
            innerHTML += `<a href="${pageURL}">`;
        }
        innerHTML += `<fieldset class="project"`;
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
            innerHTML += `<span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 30pt; text-shadow: 0px 0px 8px #ffffff;">${pickRandom(['😐','🙃','🥴','🤪','😵','🤔','🤨'])}</span><br><span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 16pt; color: #a6ed8d; text-shadow: 0px 0px 5px #000000;">Thumbnail missing</span>`;
        }
        innerHTML += `</fieldset></a></div>`;
        projectContainer.innerHTML = projectContainer.innerHTML.concat(innerHTML);
    });
    widthTester.parentNode.removeChild(widthTester);
    return;
}