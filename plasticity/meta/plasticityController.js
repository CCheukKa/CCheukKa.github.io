fetchConfig('/plasticity/meta/plasticityConfig.jsonc').then(config => fetchContent(config.plastics));

function fetchContent(plastics) {
    plastics.forEach(plastic => {
        if (plastic.refName != currentPageFile) { return; }
        fetch(`/plasticity/${plastic.refName}.json`)
            .then(response => response.json())
            .then(metadata => {
                fetch(`/plasticity/${plastic.refName}.txt`)
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
    //
    let date;
    if (metadata.date) {
        date = metadata.date;
    } else {
        date = 'missing/undocumented';
    }
    document.getElementById('written-date').innerHTML = `Written on: ${date}`;
    // success
    removeConstructionElement();
    return;
}