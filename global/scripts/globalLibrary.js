//!
const useHTML = false;
const debugOutline = false;
const useIncompatibilityWarning = false;
const useEmojiThumbnail = true;
//!
if (debugOutline) { toggleDebugOutline(); }
//
window.addEventListener('load', () => {
    onLoadPage();
});
//
(function (exports) {
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
const shelfContainer = document.getElementById('shelfContainer');
const listElement = document.getElementById('list');
//
function getGlobalConfig() {
    return fetchConfig('/global/config.jsonc');
}

function fetchConfig(path) {
    return new Promise((resolve, reject) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                resolve(JSON.parse(
                    //? Strip raw JSON text of comments
                    data.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m)
                ));
            });
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

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}