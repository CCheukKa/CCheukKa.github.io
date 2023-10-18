const url = GetURLParameter('url')
console.log(`Grabbing ${url}`);
replaceHTML(url);

/* -------------------------------------------------------------------------- */

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function replaceHTML(url) {
    // Get the entire HTML including header and style
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Replace the HTML
            document.open();
            document.write(data);
            document.close();
        });
}