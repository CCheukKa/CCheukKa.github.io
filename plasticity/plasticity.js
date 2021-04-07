const projectContainer = document.getElementById('projectContainer');
var useHTML;

fetch('/global/config.json')
    .then(response => response.json())
    .then(data => {
        useHTML = data.useHTMLExtension;
        fetch('/plasticity/plasticityConfig.json')
            .then(response => response.json())
            .then(data => { projectShelfConstructor(data.projects) });
    });
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
            refName = project.refName;
        widthTester.innerHTML = displayName;
        if (useHTML) { refName = refName.concat('.html'); }
        let pageURL;
        if (project.htmlInRoot) {
            pageURL = `/plasticity/${refName}`;
        } else {
            pageURL = `/plasticity/${refName}`;
        }
        const thumbnailURL = `/plasticity/${refName}/thumbnail.png`;
        const thumbnailExists = urlExists(thumbnailURL);
        //
        let innerHTML = `<fieldset class="project"`;
        if (project.openInNewTab) {
            innerHTML += ` onclick="window.open('${pageURL}');"`;
        } else {
            innerHTML += ` onclick="location.href = '${pageURL}';"`;
        }
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
        innerHTML += `</fieldset>`;
        projectContainer.innerHTML = projectContainer.innerHTML.concat(innerHTML);
    });
    widthTester.parentNode.removeChild(widthTester);
    return;
}

function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}