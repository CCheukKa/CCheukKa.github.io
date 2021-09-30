const text = document.getElementById('text-content');
const lightModeStylesheet = document.getElementById('light-mode-stylesheet');
var useDarkMode = true;
lightModeStylesheet.disabled = useDarkMode;

httpGetAsync("https://raw.githubusercontent.com/CCheukKa/CCheukKa/master/Journal.md", response => {
    // console.log(response);
    text.innerHTML = parseResponse(response);
    addSectionTags(text);
});

function parseResponse(response) {

    response = response.replaceAll('<!-- omit in toc -->', '');
    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer();
    var parsed = reader.parse(response);
    var result = writer.render(parsed);

    // console.log(result);
    return result;
}

function addSectionTags(container) {
    let tmp = [];
    tmp = tmp.concat([].slice.call(container.getElementsByTagName("h1")));
    tmp = tmp.concat([].slice.call(container.getElementsByTagName("h2")));
    tmp = tmp.concat([].slice.call(container.getElementsByTagName("h3")));
    tmp = tmp.concat([].slice.call(container.getElementsByTagName("h4")));

    tmp.forEach(element => {
        element.setAttribute('id', element.innerHTML.toLowerCase().replaceAll(' ', '-')).replaceAll(/[^a-zA-Z0-9_-]/g, "");
        // console.log(element);
    });
}

function toggleDarkMode(icon) {
    useDarkMode = !useDarkMode;
    icon.innerHTML = useDarkMode ? '🔆' : '🔅';
    lightModeStylesheet.disabled = useDarkMode;
}