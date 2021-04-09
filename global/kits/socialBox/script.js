const socialBox = document.getElementById("social-box");
fetchConfig('/global/kits/socialBox/config.json')
    .then(config => socialBoxConstructor(config.links));

function socialBoxConstructor(links) {
    let publicSites = [];
    links.forEach(site => {
        if (!site.withheld) {
            publicSites.push(site);
        }
    });
    //
    addGhostSite(0);
    let sLength = Math.floor(publicSites.length / 2);
    for (let i = 0; i < sLength; i++) {
        createLogo(publicSites[i]);
    }
    //
    socialBox.innerHTML = socialBox.innerHTML.concat(`<div id="socialBoxLinebreak" style="flex-basis: 120%; height:5%;"></div>`);
    //
    for (let i = sLength; i < links.length; i++) {
        createLogo(publicSites[i]);
    }
    addGhostSite(0);
    //
    return;
}

function createLogo(site) {
    socialBox.innerHTML = socialBox.innerHTML.concat(`<div title="${site.title}"><a  href="${site.link}" target="_blank"><img src="/global/icons/${site.refName}.svg"></a></div>`);
    return;
}

function addGhostSite(width) {
    socialBox.innerHTML = socialBox.innerHTML.concat(`<div id="socialBoxGhostSite" style="width: ${width}px; margin: 0; padding: 0;"></div>`);
    return;
}