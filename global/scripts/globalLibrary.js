//!
const useHTML = false;
const debugOutline = false;
//!
if (debugOutline) {
    document.head.innerHTML = document.head.innerHTML.concat(`<style>*{outline: 1px solid #ffffffbb;}</style>`);
}
//
const currentPageFile = window.location.pathname.split('/').pop().split('.html')[0];
const projectContainer = document.getElementById('projectContainer');
//
function getGlobalConfig() {
    return fetchConfig('/global/config.json');
}

function fetchConfig(path) {
    return new Promise((resolve, reject) => {
        fetch(path)
            .then(response => response.json())
            .then(data => { resolve(JSON.parse(JSON.stringify(data))); })
    });
}

function thisPage(catalogue) {
    for (let i = 0; i < catalogue.length; i++) {
        if (catalogue[i].refName == currentPageFile) { return catalogue[i]; }
    }
    return false;
}

function insensitiveIsEqual(a, b) {
    return a.toLowerCase() == b.toLowerCase();
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