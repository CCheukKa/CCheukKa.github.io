//! <script src="https://cdn.jsdelivr.net/npm/bowser@2.9.0/es5.js"></script>
if (!useIncompatibilityWarning) {
    console.log('Incompatibility warning pop-up is disabled!');
    throw new Error;
}

const compatibleBrowserList = [
    'Chrome',
    'Microsoft Edge',
    'Opera'
];

window.addEventListener("load", function () {
    // (B1) PARSE USER AGENT
    var result = bowser.getParser(navigator.userAgent).getResult();

    //// (B2) BROWSER INFO
    //console.log(result.browser.name);
    //console.log(result.browser.version);
    //console.log(result.engine);
    //
    //// (B3) OPERATING SYSTEM
    //console.log(result.os.name);
    //console.log(result.os.version);
    //console.log(result.os.versionName);
    //
    //// (B4) PLATFORM
    //console.log(result.platform.type);

    //
    result.severity = severity(result.browser.name);
    console.log(result);
    //

    check(result);
});

function showWarning(isMobile, message) {
    if (isMobile) {
        document.getElementById("stylesheet").setAttribute('href', '/global/kits/modal/stylesheet-mobile.css');
    } else {
        document.getElementById("stylesheet").setAttribute('href', '/global/kits/modal/stylesheet-desktop.css');
    }
    setTimeout(() => {
        document.getElementById(`modalbox-title`).innerHTML = message.title;
        document.getElementById(`modalbox-body`).innerHTML = message.body.replaceAll('\n', '<br>');
        document.getElementById(`modalbox-button-text`).innerHTML = message.buttonText.replaceAll('\n', '<br>');
        document.getElementById(`modalButton`).click();
    }, 10);
    return;
}

function check(result) {
    let isMobile = insensitiveIsEqual(result.platform.type, "mobile");
    if (isMobile) {
        showWarning(isMobile, {
            title: 'Incompatibility Warning!',
            body: 'Mobile browser detected!\nYou are in potentially-incompatible territories.\nIf you wish to continue, some things may break!\nYou have been warned!',
            buttonText: 'ÒωÓ  Am stubborn;\nme wants in!'
        });
    }
    if (!compatibleBrowserList.includes(result.browser.name)) {
        showWarning(isMobile, {
            title: 'Incompatibility Warning!',
            body: `${result.browser.name} browser detected!\nThis website is developed and tested mainly on Google Chrome. I am trying my best to provide compatibility, but there are no promises! Some things may not display properly.\nYou have been warned.\nIncompatibility severity: ${result.severity}`,
            buttonText: "I'll take my chances"
        });
    }
}

function severity(browserName) {
    if (insensitiveIsEqual(browserName, "Firefox")) {
        return '★★★★☆ 4/5';
    }
    return '(Untested/Unknown browser)';
}