const textContainer = document.getElementById('text-content');
const tocContainer = document.getElementById('toc-container');
const lightModeStylesheet = document.getElementById('light-mode-stylesheet');
var useDarkMode = true;
lightModeStylesheet.disabled = useDarkMode;
const fonts = [
    `Georgia, 'Times New Roman', Times, serif`,
    `'Atkinson Hyperlegible', sans-serif`,
    `'Bellota Text', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
    // `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`,
    // `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
    // `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    // `Verdana, Geneva, Tahoma, sans-serif`,

];
var font = -1;
cycleFonts(document.getElementById('font-selection'));
var calendarMode = true;

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

httpGetAsync("https://raw.githubusercontent.com/CCheukKa/CCheukKa/master/Journal.md", response => {
    // console.log(response);
    textContainer.innerHTML = parseResponse(response);
    addSectionTags(textContainer);
    buildTableOfContents(response, textContainer);
    cycleTocMode(false);
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
    marked.use({
        headerIds: true,
        smartypants: true
    });
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

    const fontIndicatorElement = document.getElementById('font-indicator');
    let string = '';
    for (let i = 0; i < fonts.length; i++) {
        string += i == font ? '●' : '○';
    }
    fontIndicatorElement.innerHTML = string;


    console.log('Changed font:', fonts[font]);
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
        },
        navigateToNextMonth: function () {
            if (calendar.getFullYear() == new Date().getFullYear() && calendar.getMonth() == new Date().getMonth()) { return; }
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
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
                            <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
                            <div class="calendar-year-month">
                            <a class="calendar-year-month-label"></a>
                            </div>
                            <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
                            </div>
                            <div class="calendar-today-date">Today: 
                            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
                            ${calendarControl.localDate.getDate()}, 
                            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
                            ${calendarControl.localDate.getFullYear()}
                            </div>
                            <div class="calendar-body"></div></div>`;
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
            console.log(calendar.getMonth() + 1, calendar.getFullYear(), calendarDays);
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
            prevBtn.addEventListener(
                "click",
                calendarControl.navigateToPreviousMonth
            );
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