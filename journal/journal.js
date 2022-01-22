const textContainer = document.getElementById('text-content');
const tocContainer = document.getElementById('toc-container');
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
    textContainer.innerHTML = parseResponse(response);
    addSectionTags(textContainer);
    buildTableOfContents(response, textContainer);
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
    let result = marked.parse(response);

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
        let id = element.innerHTML.toLowerCase().replaceAll(' ', '-').replaceAll(/[^a-zA-Z0-9_-]/g, "");
        // while (id.charAt(id.length - 1) == '-') {
        //     id = id.substr(0, id.length - 1);
        // }
        element.id = id;
        // console.log(element);
    });

    let h4 = container.getElementsByTagName("h4");
    let latest = h4[h4.length - 1];

    let latestTag = document.createElement('span');
    latestTag.id = 'latest';
    latest.appendChild(latestTag)
}

function toggleDarkMode(icon) {
    useDarkMode = !useDarkMode;
    icon.innerHTML = useDarkMode ? '🔅' : '🔆';
    lightModeStylesheet.disabled = useDarkMode;
}

function cycleFonts(button) {
    font = (font + 1) % fonts.length;
    button.style.fontFamily = fonts[font];
    [].slice.call(textContainer.getElementsByTagName('p')).forEach(p => {
        p.style.fontFamily = fonts[font];
    });

    console.log(fonts[font]);
}

function buildTableOfContents(response, text) {
    console.log(text);
    //
    let tocTitle = document.getElementById('table-of-contents');
    let tocTable = tocTitle.nextElementSibling;
    //
    tocContainer.innerHTML = tocTitle.outerHTML + tocTable.outerHTML;

    //
    tocTitle.hidden = true;
    tocTable.hidden = true;
    tocTable.nextElementSibling.hidden = true;
}