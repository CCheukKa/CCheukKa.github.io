const fileInputElement = document.getElementById('file-input');
const deleteCookieButtonElement = document.getElementById('delete-cookie-button');
const addEntryButtonElement = document.getElementById('add-entry-button');
//
const dataTableElement = document.getElementById('data-table');
const trTemplateElement = document.getElementById("entry-template").children[0].children[0];
// console.log(document.getElementById('entry-template').children);


//? delete cookie
deleteCookieButtonElement.addEventListener('click', () => {
    if (!window.confirm('確定移除暫存數據？')) { return; }
    document.cookie = 'null';
    window.alert('已移除暫存數據');
    location.reload();
});


//? try get cookie
let cookie;
try {
    cookie = JSON.parse(document.cookie);
} catch {
    try {
        cookie = JSON.parse(`{${document.cookie.match(/(?<=data={)(.*)(?=};)/)[0]}}`);
    } catch {
        cookie = null;
    }
}
if (cookie) {
    console.log(cookie);
    importJSON(cookie);
} else {
    console.log('no cookie');
}
fileInputElement.addEventListener('change', (event) => {
    dataTableElement.querySelectorAll('.data').forEach(tr => {
        tr.remove();
    });

    event.target.files[0].text().then(text => importJSON(JSON.parse(text)));
});

//? add entry
addEntryButtonElement.addEventListener('click', () => {
    const newEntryElement = trTemplateElement.children[1].cloneNode(true);
    newEntryElement.querySelector('.date').value = new Date().toISOString().slice(0, 10); // today
    dataTableElement.appendChild(newEntryElement);
});

//? save
document.getElementById('save-button').addEventListener('click', () => {
    const json = exportJSON();
    writeCookie(json);
});

/* -------------------------------------------------------------------------- */

function importJSON(json) {
    console.log(json);
    json.entries.forEach(entry => {
        const newEntryElement = trTemplateElement.children[1].cloneNode(true);
        newEntryElement.querySelector('.date').value = new Date(entry.date.year, entry.date.month - 1, entry.date.day).toISOString().slice(0, 10);
        newEntryElement.querySelectorAll('.measurement')[0].value = entry.measurements[0].value;
        newEntryElement.querySelectorAll('.measurement')[1].value = entry.measurements[1].value;
        dataTableElement.appendChild(newEntryElement);
    });
}
function writeCookie(json) {
    // document.cookie = `data=${JSON.stringify(json)}; null`;
    document.cookie = JSON.stringify(json);
    console.log(document.cookie);
    // let cookie = `{${document.cookie.match(/(?<=data={)(.*)(?=};)/)[0]}}`;
    let cookie = document.cookie;
    console.log(cookie);
    console.log(JSON.parse(cookie));
}

function exportJSON() {
    const json = {};
    json.entries = [];

    dataTableElement.querySelectorAll('.data').forEach(tr => {
        const entry = {};
        //
        const date = new Date(Date.parse(tr.querySelector('.date').value));
        entry.date = {};
        entry.date.day = date.getDate() + 1;
        entry.date.month = date.getMonth() + 1;
        entry.date.year = date.getFullYear();
        // TODO: time
        const measurement1 = {};
        measurement1.time = '10:00';
        measurement1.value = +tr.querySelectorAll('.measurement')[0].value != 0 ? +tr.querySelectorAll('.measurement')[0].value : null;
        const measurement2 = {};
        measurement2.time = '22:00';
        measurement2.value = +tr.querySelectorAll('.measurement')[1].value != 0 ? +tr.querySelectorAll('.measurement')[1].value : null;
        entry.measurements = [measurement1, measurement2];
        //
        json.entries.push(entry);
    })

    console.log(json);

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    const downloadAnchorElement = document.createElement('a');
    downloadAnchorElement.setAttribute("href", dataStr);
    downloadAnchorElement.setAttribute("download", "data.json");
    downloadAnchorElement.click();

    return json;
}

function removeEntry(element) {
    if (!window.confirm('確定移除當日數據？')) { return; }
    element.parentElement.parentElement.parentElement.remove();
    window.alert('已移除當日數據');
}