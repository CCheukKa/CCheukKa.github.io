fetchConfig('./chess/chessProjectConfig.json').then(config => projectShelfConstructor(config.projects));
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
        const pageURL = `./chess/${pathName}/${htmlName}`;
        const thumbnailURL = `./chess/${pathName}/thumbnail.png`;
        //
        let innerHTML = `<div class="project-wrapper"><a href="${pageURL}" target="_blank"><fieldset class="project" style="background-image: url('${thumbnailURL}');"><legend>`;
        //#ANCHOR //! marquee is terrible, find an alternative
        if (widthTester.clientWidth > 235) {
            innerHTML += `<marquee>${displayName}</marquee>`;
        } else {
            innerHTML += `${displayName}`;
        }
        innerHTML += `</legend></fieldset></a></div>`;
        projectContainer.innerHTML = projectContainer.innerHTML.concat(innerHTML);
    });
    widthTester.parentNode.removeChild(widthTester);
    return;
}