fetchConfig('/plasticity/meta/plasticityConfig.json').then(config => fetchContent(config.projects));

function fetchContent(projects) {
    projects.forEach(project => {
        if (project.refName != currentPageFile) { return; }
        fetch(`/plasticity/${project.refName}.json`)
            .then(response => response.json())
            .then(metadata => {
                fetch(`/plasticity/${project.refName}.txt`)
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
    document.getElementById('text-content').style.height = `calc(100vh - ${metadata.textContainerHeightOffset}px)`;
    // success
    removeConstructionElement();
    return;
}