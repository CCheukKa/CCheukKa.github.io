var useHTML;

fetch('/global/config.json')
    .then(response => response.json())
    .then(data => {
        useHTML = data.useHTMLExtension;
        fetch('/plasticity/plasticityConfig.json')
            .then(response => response.json())
            .then(data => { fetchContent(data.projects) });
    });

function fetchContent(projects) {
    projects.forEach(project => {
        if (project.refName != currentPageFile) { return; }
        fetch(`./content/${project.refName}.json`)
            .then(response => response.json())
            .then(metadata => {
                fetch(`./content/${project.refName}.txt`)
                    .then(response => response.text())
                    .then(body => { display(metadata, body) });
            });
    });
    return;
}

function display(metadata, body) {
    document.getElementById('title-big').innerHTML = metadata.title;
    document.getElementById('title-small').innerHTML = metadata.titleSmall;
    document.getElementById('text-title').innerHTML = metadata.title;
    document.getElementById('text-flavourText').innerHTML = metadata.flavourText;
    document.getElementById('text-description').innerHTML = metadata.description.replaceAll('\n', '<br>');
    document.getElementById('text-content').innerHTML = body.replaceAll('\n', '<br>');
    // success
    removeConstructionElement();
    return;
}