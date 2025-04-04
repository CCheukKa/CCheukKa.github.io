const textContainer = document.getElementById('text-content');
const tocContainer = document.getElementById('toc-container');
const lightModeStylesheet = document.getElementById('light-mode-stylesheet');
var useDarkMode = true;
lightModeStylesheet.disabled = useDarkMode;
const fontCount = 3;
var currentFont = -1;
var calendarMode = true;
const tags = [
    { icon: '📚', name: 'Academics' },
    { icon: '🏫', name: 'School life' },
    { icon: '💭', name: 'Philosophy' },
    { icon: '🧠', name: 'Mentality' },
    { icon: '🌞', name: 'Well-being' },
    { icon: '👣', name: 'Experiences' },
    { icon: '👥', name: 'Relationships' },
    { icon: '💻', name: 'Personal projects' },
    { icon: '💾', name: 'Technology' },
    { icon: '🍽', name: 'Food' },
    // 📚 Academics
    // 🏫 School life
    // 💭 Philosophy
    // 🧠 Mentality
    // 🌞 Well-being
    // 👣 Experiences
    // 👥 Relationships
    // 💻 Personal projects
    // 💾 Technology
    // 🍽 Food
];

// TOC Modes
const tocMode = {
    calendar: '',
    entries: ''
}
const calendarEntries = {}
const monthName = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}

const VERIFICATION_PASSWORD = 'verification-password';
let verificationData;
httpGetAsync("https://raw.githubusercontent.com/CCheukKa/upload-bin/refs/heads/main/output/verification-data.bin", async response => {
    console.log(response);
    verificationData = JSON.parse(await decryptData(response, VERIFICATION_PASSWORD));
    console.log(verificationData);
    verifyPassword();
});

const COOKIE_NAME = 'cck-wtf-journal';
var cookie;
try { cookie = Cookies.get(COOKIE_NAME); } catch (e) { console.log(e); }
if (cookie) {
    console.log(`Using ${cookie} from cookie as password`);
} else {
    console.log('no cookie');
}

const password = cookie ?? window.prompt('Password?\n\nIf you know me personally, ask me to generate one for you.\nIf you REALLY know me personally, try your name.', '')
    .replaceAll(' ', '').toLowerCase();
verifyPassword();

async function verifyPassword() {
    if (verificationData === undefined) {
        console.warn('Verification data not ready');
        return;
    }
    if (password === null) {
        console.warn('Password not ready');
        return;
    }

    console.log(`Verifying password ${password}...`);
    let verifiedVerification;
    for (const verification of verificationData) {
        const decryptedVerificationString = await decryptData(verification.verificationString, password)
            .catch(err => console.log(`Decryption failed for ${verification.verificationString} with password ${password}`));
        if (!decryptedVerificationString) { continue; }
        verifiedVerification = verification;
        break;
    }
    if (!verifiedVerification) {
        console.warn('No verification found');
        Cookies.remove(COOKIE_NAME, { path: '' });
        Array.from(document.getElementsByClassName('fetch-placeholder'))
            .forEach(element => {
                element.classList.add('wrong');
                element.innerHTML = 'Invalid password<br><br>If you know me personally, ask me to generate one for you.<br>If you REALLY know me personally, try your name.<br><br>Refresh to try again.';
            });
        return;
    }

    console.log(`Verified password ${password} with ${verifiedVerification.fileName}`);
    Cookies.set(COOKIE_NAME, password, { path: '' });
    console.log('Password cookie set');

    const verifiedBinUrl = `https://raw.githubusercontent.com/CCheukKa/upload-bin/refs/heads/main/output/${verifiedVerification.fileName}.bin`;
    httpGetAsync(verifiedBinUrl, async response => {
        const decryptedString = await decryptData(response, password);
        console.log(`Decrypted: ${decryptedString}`);
        buildJournal(decryptedString);
    });
}

function buildJournal(md) {
    // console.log(response);
    textContainer.innerHTML = parseResponse(handleComments(md));
    cycleFonts(document.getElementById('font-selection'));
    addSectionTags(textContainer);
    appendTags(textContainer);
    buildTableOfContents(md, textContainer);
    cycleTocMode(false);
    //
    console.log(`Done journal assembly`);
    if (window.location.href.split('#')[1]) {
        let redirect = `#${window.location.href.split('#').slice(-1)}`;
        window.location = redirect;
        console.log(`Redirected to ${redirect}`);
    }
    //
};

/* -------------------------------------------------------------------------- */

function handleComments(rawMD) {
    // remove unnecessary comments
    rawMD = rawMD.replaceAll('<!-- omit in toc -->', '');

    // handle tags
    tags.forEach(tag => {
        rawMD = rawMD.replaceAll(`<!-- ${tag.icon} ${tag.name} -->`, `<tag id="${tag.icon}">${tag.name}</tag>`);
    });

    return rawMD;
}

function parseResponse(uncommentedMD) {

    marked.use({
        headerIds: true,
        smartypants: true
    });
    let result = marked.parse(uncommentedMD);

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

function appendTags(container) {
    //TODO: append tags to table of contents

    let h4 = container.getElementsByTagName("h4");
    let tags = container.getElementsByTagName("tag");
    let tagIndex = 0;
    for (let i = 0; i < h4.length; i++) {
        let tag = tags[tagIndex];
        if (tag && tag.parentElement.previousSibling.previousSibling == h4[i]) {
            let tagContainerElement = document.createElement('span');
            tagContainerElement.className = 'tag-container';
            h4[i].appendChild(tagContainerElement);

            while (tag && tag.parentElement.previousSibling.previousSibling == h4[i]) {
                // tagContainerElement.innerHTML += tag.id;
                let tagElement = document.createElement('span');
                tagElement.innerHTML = tag.id;
                tagElement.title = tag.innerHTML;
                tagContainerElement.appendChild(tagElement);

                tagIndex++;
                tag = tags[tagIndex];
            }
        }
    }
}

function toggleDarkMode(icon) {
    useDarkMode = !useDarkMode;
    icon.innerHTML = useDarkMode ? '🔅' : '🔆';
    lightModeStylesheet.disabled = useDarkMode;
}

function cycleFonts(button) {
    currentFont = (currentFont + 1) % fontCount;
    button.dataset.font = currentFont;
    [].slice.call(textContainer.getElementsByTagName('p')).forEach(p => {
        p.dataset.font = currentFont;
    });

    const fontIndicatorElement = document.getElementById('font-indicator');
    let string = '';
    for (let i = 0; i < fontCount; i++) {
        string += i == currentFont ? '●' : '○';
    }
    fontIndicatorElement.innerHTML = string;


    console.log('Changed font:', currentFont);
}

function buildTableOfContents(response, text) {
    // console.log(text);
    //
    var tocTitle = document.getElementById('table-of-contents');
    let tocTable = tocTitle.nextElementSibling;
    //
    tocContainer.innerHTML = tocTitle.outerHTML + tocTable.outerHTML;

    //
    tocTitle.hidden = true;
    tocTable.hidden = true;
    tocTable.nextElementSibling.hidden = true;

    // TOC Mode
    var tocTitle = document.getElementById('table-of-contents')
    tocTitle.innerHTML = `${tocTitle.innerHTML} <a id="toc-mode-button" onclick="cycleTocMode()"></a>`;
    tocMode.entries = tocContainer.getElementsByTagName('ul')[0];
    tocMode.entries.id = 'toc-entries';

    //
    buildCalendar(tocMode.entries);
}

function cycleTocMode(cycle = true) {
    if (cycle) { calendarMode = !calendarMode; }
    var modeIcon = calendarMode ? '📅' : '🧾';
    let tocModeButton = document.getElementById('toc-mode-button')
    tocModeButton.innerHTML = modeIcon;

    //
    tocMode.entries.hidden = calendarMode;
    tocMode.calendar.hidden = !calendarMode;
}

function buildCalendar(entries = new HTMLElement) {
    let calendar = document.createElement('div');
    tocMode.calendar = calendar;
    calendar.id = 'toc-calendar'
    tocContainer.appendChild(calendar);

    //
    calendarEntries.years = [];
    const yearCount = entries.childElementCount;
    for (let i = 0; i < yearCount; i++) {
        const yearElement = entries.children[i];
        calendarEntries.years.push({ element: yearElement, months: [] });
    }
    //
    calendarEntries.years.forEach(year => {
        // console.log(year.element);
        const monthCount = year.element.lastElementChild.childElementCount;
        for (let i = 0; i < monthCount; i++) {
            const monthElement = year.element.lastElementChild.children[i];
            year.months.push({ element: monthElement, days: [] });
            // console.log(monthElement);
        }
    });
    //
    // console.log(calendarEntries);
    //
    const calendarElement = document.createElement('div');
    calendarElement.id = 'calendar';
    calendarElement.className = 'calendar';
    tocMode.calendar.appendChild(calendarElement);
    //
    const calendarEntriesElement = document.createElement('div');
    calendarEntriesElement.id = 'calendar-entries';
    tocMode.calendar.appendChild(calendarEntriesElement);
    //
    const calendarControl = new CalendarControl();
    document.querySelector('.calendar-today-date').remove();
}

function renderMonthEntries(qYear = 2021, qMonth = 9) {
    calendarEntries.years.forEach(year => {
        if (year.element.querySelector('a').innerHTML == qYear) {
            year.months.forEach(month => {
                if (monthName[month.element.querySelector('a').innerHTML.split(' ')[0]] == qMonth) {
                    // console.log(tocMode.calendar.lastElementChild.innerHTML);
                    const calendarEntriesElement = document.getElementById('calendar-entries');
                    calendarEntriesElement.innerHTML = month.element.innerHTML;
                    calendarEntriesElement.firstElementChild.remove();

                }
            });
        }
    });
}

function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
        localDate: new Date(),
        prevMonthLastDate: null,
        calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        calMonthName: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        firstDayNumber: function () {
            return calendarControl.firstDay().getDay() + 1;
        },
        lastDayNumber: function () {
            return calendarControl.lastDay().getDay() + 1;
        },
        getPreviousMonthLastDate: function () {
            let lastDate = new Date(
                calendar.getFullYear(),
                calendar.getMonth(),
                0
            ).getDate();
            return lastDate;
        },
        navigateToPreviousMonth: function () {
            if (calendar.getFullYear() == 2021 && calendar.getMonth() == 8) { return; } //? September 2021

            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();

            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            if (calendar.getFullYear() == 2021 && calendar.getMonth() == 8) { prevBtn.classList.add("disabled"); }
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            nextBtn.classList.remove("disabled");
        },
        navigateToNextMonth: function () {
            if (calendar.getFullYear() == new Date().getFullYear() && calendar.getMonth() == new Date().getMonth()) { return; }

            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();

            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            prevBtn.classList.remove("disabled");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            if (calendar.getFullYear() == new Date().getFullYear() && calendar.getMonth() == new Date().getMonth()) { nextBtn.classList.add("disabled"); }
        },
        navigateToCurrentMonth: function () {
            let currentMonth = calendarControl.localDate.getMonth();
            let currentYear = calendarControl.localDate.getFullYear();
            calendar.setMonth(currentMonth);
            calendar.setYear(currentYear);
            calendarControl.attachEventsOnNextPrev();
        },
        displayYearMonth: function () {
            let yearMonthLabel = document.querySelector(".calendar .calendar-year-month-label");
            yearMonthLabel.innerHTML = `${calendarControl.calMonthName[calendar.getMonth()]} - ${calendar.getFullYear()}`;
            yearMonthLabel.href = `#${calendarControl.calMonthName[calendar.getMonth()]}---${calendar.getFullYear()}`.toLowerCase();
        },
        selectDate: function (e) {
            console.log(`${(+e.target.textContent + 100).toString().substring(1)}-${calendar.getMonth() + 1}-${calendar.getFullYear()}`);
        },
        plotSelectors: function () {
            document.querySelector(
                ".calendar"
            ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
                            <div class="calendar-prev"><a><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
                            <div class="calendar-year-month">
                            <a class="calendar-year-month-label"></a>
                            </div>
                            <div class="calendar-next"><a><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
                            </div>
                            <div class="calendar-today-date">Today: 
                            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
                            ${calendarControl.localDate.getDate()}, 
                            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
                            ${calendarControl.localDate.getFullYear()}
                            </div>
                            <div class="calendar-body"></div></div>`;

            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            if (calendar.getFullYear() == 2021 && calendar.getMonth() == 8) { prevBtn.classList.add("disabled"); }
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            if (calendar.getFullYear() == new Date().getFullYear() && calendar.getMonth() == new Date().getMonth()) { nextBtn.classList.add("disabled"); }
        },
        plotDayNames: function () {
            for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
            }
        },
        plotDates: function () {
            document.querySelector(".calendar .calendar-body").innerHTML = "";
            calendarControl.plotDayNames();
            calendarControl.displayYearMonth();
            let count = 1;
            let prevDateCount = 0;

            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear()
            );
            // console.log(calendar.getMonth() + 1, calendar.getFullYear(), calendarDays);
            // dates of current month
            for (let i = 1; i < calendarDays; i++) {
                if (i < calendarControl.firstDayNumber()) {
                    prevDateCount += 1;
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                } else {
                    let fullDate = `${(count + 100).toString().substring(1)}-${(calendar.getMonth() + 101).toString().substring(1)}-${calendar.getFullYear()}`;
                    let haveEntries = document.getElementById(fullDate);
                    // console.log(fullDate, haveEntries);
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" id="${haveEntries ? 'logged-date' : 'unlogged-date'}" href="#${fullDate}">${count++}</a></div>`;
                }
            }
            //remaining dates after month dates
            for (let j = 0; j < prevDateCount + 1; j++) {
                let fullDate = `${(count + 100).toString().substring(1)}-${(calendar.getMonth() + 101).toString().substring(1)}-${calendar.getFullYear()}`;
                let haveEntries = document.getElementById(fullDate);
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" id="${haveEntries ? 'logged-date' : 'unlogged-date'}" href="#${fullDate}">${count++}</a></div>`;
            }
            calendarControl.highlightToday();
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates();
            //
            renderMonthEntries(calendar.getFullYear(), calendar.getMonth() + 1);
        },
        attachEvents: function () {
            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            let dateNumber = document.querySelectorAll(".calendar .dateNumber");
            prevBtn.addEventListener("click", calendarControl.navigateToPreviousMonth);
            nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
            for (var i = 0; i < dateNumber.length; i++) {
                dateNumber[i].addEventListener(
                    "click",
                    calendarControl.selectDate,
                    false
                );
            }
        },
        highlightToday: function () {
            let currentMonth = calendarControl.localDate.getMonth() + 1;
            let changedMonth = calendar.getMonth() + 1;
            let currentYear = calendarControl.localDate.getFullYear();
            let changedYear = calendar.getFullYear();
            if (
                currentYear === changedYear &&
                currentMonth === changedMonth &&
                document.querySelectorAll(".number-item")
            ) {
                document
                    .querySelectorAll(".number-item")
                [calendar.getDate() - 1].classList.add("calendar-today");
            }
        },
        plotPrevMonthDates: function (dates) {
            dates.reverse();
            for (let i = 0; i < dates.length; i++) {
                if (document.querySelectorAll(".prev-dates")) {
                    document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
                }
            }
        },
        plotNextMonthDates: function () {
            let childElemCount = document.querySelector('.calendar-body').childElementCount;
            //7 lines
            if (childElemCount > 42) {
                let diff = 49 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

            //6 lines
            if (childElemCount > 35 && childElemCount <= 42) {
                let diff = 42 - childElemCount;
                calendarControl.loopThroughNextDays(42 - childElemCount);
            }

        },
        loopThroughNextDays: function (count) {
            if (count > 0) {
                for (let i = 1; i <= count; i++) {
                    document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        init: function () {
            calendarControl.plotSelectors();
            calendarControl.plotDates();
            calendarControl.attachEvents();
        }
    };
    calendarControl.init();
}

/* -------------------------------------------------------------------------- */

async function deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const importedKey = await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );
    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        importedKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
    return derivedKey;
}

async function decryptData(encryptedBase64, password) {
    const encryptedData = base64ToArrayBuffer(encryptedBase64);
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 28);
    const encryptedBuffer = encryptedData.slice(28);
    const key = await deriveKey(password, salt);
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encryptedBuffer
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
    /* -------------------------------------------------------------------------- */

    function base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
}