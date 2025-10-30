const fileInputElement = document.getElementById('file-input');
const deleteCookieButtonElement = document.getElementById('delete-cookie-button');
const addEntryButtonElement = document.getElementById('add-entry-button');
const exportGraphButtonElement = document.getElementById('export-graph-button');
//
const chartElement = document.getElementById('chart');
const dataTableElement = document.getElementById('data-table');
const trTemplateElement = document.getElementById("entry-template").children[0].children[0];
// console.log(document.getElementById('entry-template').children);
const COOKIE_NAME = 'blood-sugar-data';


//? delete cookie
deleteCookieButtonElement.addEventListener('click', () => {
    if (!window.confirm('確定移除暫存數據？')) { return; }
    Cookies.remove(COOKIE_NAME, { path: '' });
    window.alert('已移除暫存數據');
    location.reload();
});
//
var chart;

window.addEventListener('resize', () => {
    console.log('resize');
    redrawGraph();
});

//? try get cookie
var cookie;
try { cookie = JSON.parse(Cookies.get(COOKIE_NAME)); } catch (e) { console.log(e); }
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

//? export graph
exportGraphButtonElement.addEventListener('click', () => {
    exportGraph();
});

/* -------------------------------------------------------------------------- */

function importJSON(json) {
    console.log(json);
    json.entries.forEach(entry => {
        const newEntryElement = trTemplateElement.children[1].cloneNode(true);
        newEntryElement.querySelector('.date').value = new Date(entry.date.year, entry.date.month - 1, entry.date.day + 1).toISOString().slice(0, 10); //? toISOString() is jank!
        newEntryElement.querySelectorAll('.measurement')[0].value = entry.measurements[0].value;
        newEntryElement.querySelectorAll('.measurement')[1].value = entry.measurements[1].value;
        dataTableElement.appendChild(newEntryElement);
    });
    redrawGraph();
}
function writeCookie(json) {
    Cookies.set(COOKIE_NAME, JSON.stringify(json), { path: '' });

    let cookie = Cookies.get(COOKIE_NAME);
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
        entry.date.day = date.getDate();
        entry.date.month = date.getMonth() + 1;
        entry.date.year = date.getFullYear();
        // TODO: time
        const measurement1 = {};
        // measurement1.time = '10:00';
        measurement1.value = +tr.querySelectorAll('.measurement')[0].value != 0 ? +tr.querySelectorAll('.measurement')[0].value : null;
        const measurement2 = {};
        // measurement2.time = '22:00';
        measurement2.value = +tr.querySelectorAll('.measurement')[1].value != 0 ? +tr.querySelectorAll('.measurement')[1].value : null;
        entry.measurements = [measurement1, measurement2];
        //
        json.entries.push(entry);
    });

    console.log(json);

    const dateTimeString = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Hong_Kong' }).replaceAll('/', '-').replaceAll(':', '-').replaceAll(' ', '_').replaceAll(',', '');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    const downloadAnchorElement = document.createElement('a');
    downloadAnchorElement.setAttribute("href", dataStr);
    downloadAnchorElement.setAttribute("download", `data_${dateTimeString}.json`);
    downloadAnchorElement.click();

    return json;
}

function removeEntry(element) {
    if (!window.confirm('確定移除當日數據？')) { return; }
    element.parentElement.parentElement.parentElement.remove();
    window.alert('已移除當日數據');
    redrawGraph();
}

function redrawGraph() {
    // canvasElement.style.width = canvasElement.getBoundingClientRect().width;
    // canvasElement.style.height = canvasElement.getBoundingClientRect().height;

    const xLabels = [];
    const dayData = [];
    const nightData = [];

    //! grab data
    const dataClassElements = dataTableElement.querySelectorAll('.data');
    let firstDate = new Date(Date.parse(dataClassElements[0].querySelector('.date').value));
    let lastDate = new Date(Date.parse(dataClassElements[dataClassElements.length - 1].querySelector('.date').value));

    var searchIndex = 0;
    for (let d = firstDate; d <= lastDate; d.setDate(d.getDate() + 1)) {
        xLabels.push(d.toLocaleDateString());

        const searchDate = new Date(Date.parse(dataClassElements[searchIndex].querySelector('.date').value));
        if (searchDate > d) {
            dayData.push(null);
            nightData.push(null);
            continue;
        }
        const measurementElements = dataClassElements[searchIndex].querySelectorAll('.measurement');
        dayData.push(+measurementElements[0].value != 0 ? +measurementElements[0].value : null);
        nightData.push(+measurementElements[1].value != 0 ? +measurementElements[1].value : null);
        searchIndex++;
    }

    dataTableElement.querySelectorAll('.data').forEach(tr => {
        const entry = {};
        //
        const date = new Date(Date.parse(tr.querySelector('.date').value));
        const measurementElements = tr.querySelectorAll('.measurement');
        value1 = +measurementElements[0].value != 0 ? +measurementElements[0].value : null;
        value2 = +measurementElements[1].value != 0 ? +measurementElements[1].value : null;
        //
    });

    //! draw graph
    if (chart) { chart.destroy() };
    chart = new Chart("chart", {
        data: {
            labels: xLabels,
            datasets: [{
                type: "line",
                label: "早上血糖",
                data: dayData,
                pointBackgroundColor: "gold",
                backgroundColor: "gold",
                borderColor: "gold",
                fill: false,
                spanGaps: true
            }, {
                type: "line",
                label: "晚上血糖",
                data: nightData,
                pointBackgroundColor: "skyblue",
                backgroundColor: "skyblue",
                borderColor: "skyblue",
                fill: false,
                spanGaps: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderJoinStyle: 'round'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#F9EAE1"
                    },
                    grid: {
                        // color: "#F9EAE1"
                        color: "rgba(249, 234, 225, 0.2)"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#F9EAE1",
                    },
                    grid: {
                        // color: "#F9EAE1"
                        color: "rgba(249, 234, 225, 0.2)"
                    },
                    title: {
                        display: true,
                        text: "血糖值 (mmol/L)",
                        color: "#F9EAE1"
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "#F9EAE1"
                    },
                },
                annotation: {
                    annotations: {
                        range: {
                            drawTime: 'beforeDatasetsDraw',
                            type: 'box',
                            yMin: 5,
                            yMax: 8,
                            // backgroundColor: "##48A9A6",
                            backgroundColor: "rgba(72, 169, 166, 0.5)",
                        }
                    }
                },
                customCanvasBackgroundColor: {
                    color: '#19112d',
                }
            }
        },
        plugins: [{
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart, args, options) => {
                const { ctx } = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color || '#99ffff';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        }]
    });
}

function exportGraph() {
    const dateTimeString = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Hong_Kong' }).replaceAll('/', '-').replaceAll(':', '-').replaceAll(' ', '_').replaceAll(',', '');
    const downloadAnchorElement = document.createElement('a');
    downloadAnchorElement.setAttribute("href", chart.toBase64Image());
    downloadAnchorElement.setAttribute("download", `graph_${dateTimeString}.png`);
    downloadAnchorElement.click();
}