const text = document.getElementById('text-content');
const lightModeStylesheet = document.getElementById('light-mode-stylesheet');
var useDarkMode = true;
lightModeStylesheet.disabled = useDarkMode;
const fonts = [
    `Georgia, 'Times New Roman', Times, serif`,
    `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`,
    `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
    `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    `Verdana, Geneva, Tahoma, sans-serif`,
];
var font = 0;

httpGetAsync("https://raw.githubusercontent.com/CCheukKa/CCheukKa/master/Journal.md", response => {
    // console.log(response);
    text.innerHTML = parseResponse(response);
    addSectionTags(text);
    buildNavigation(text);
    //
    console.log(`Done journal assembly`);
    if (window.location.href.split('#')[1]) {
        let redirect = `#${window.location.href.split('#').slice(-1)}`;
        window.location = redirect;
        console.log(`Redirected to ${redirect}`);
    }
    //
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
        element.setAttribute('id', element.innerHTML.toLowerCase().replaceAll(' ', '-').replaceAll(/[^a-zA-Z0-9_-]/g, ""));
        // console.log(element);
    });
}

function toggleDarkMode(icon) {
    useDarkMode = !useDarkMode;
    icon.innerHTML = useDarkMode ? '🔅' : '🔆';
    lightModeStylesheet.disabled = useDarkMode;
}

function cycleFonts(button) {
    font = (font + 1) % fonts.length;
    button.style.fontFamily = fonts[font];
    [].slice.call(text.getElementsByTagName('p')).forEach(p => {
        p.style.fontFamily = fonts[font];
    });

    console.log(fonts[font]);
}

function buildNavigation(text) {

}