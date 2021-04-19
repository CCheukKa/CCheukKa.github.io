//!
const useHTML = false;
const debugOutline = false;
//!
if (debugOutline) { toggleDebugOutline(); }
//
window.addEventListener('load', () => {
    onLoadPage();
});
//
(function(exports) {
    var style = document.querySelector("head")
        .appendChild(document.createElement("style"));

    var styleSheet = document.styleSheets[document.styleSheets.length - 1];
    styleSheet.insertRule("* {}", 0);

    exports.universal = styleSheet.cssRules[0];
}(window));
//

function toggleDebugOutline() {
    let element = document.getElementById("debugOutline");
    if (element) {
        element.parentNode.removeChild(element);
    } else {
        document.head.innerHTML = document.head.innerHTML.concat(`<style id="debugOutline">*{outline: 1px solid #ffffffbb;}</style>`);
    }
    return;
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

function onLoadPage() {
    window.universal.style.transition = "all 0.3s";
    return;
}