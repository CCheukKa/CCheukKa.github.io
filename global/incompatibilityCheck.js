//! <script src="https://cdn.jsdelivr.net/npm/bowser@2.9.0/es5.js"></script>

window.addEventListener("load", function() {
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
    console.log(result);
    //

    check(result);
});

function showWarning(isMobile, message) {
    if (isMobile) {
        document.getElementById("modalStyleSheet").setAttribute('href', '/global/modalStyleSheet-Mobile.css');
    } else {
        document.getElementById("modalStyleSheet").setAttribute('href', '/global/modalStyleSheet-Desktop.css');
    }
    setTimeout(() => {
        document.getElementById(`modalbox-title`).innerHTML = message.title;
        document.getElementById(`modalbox-body`).innerHTML = message.body.replaceAll('\n', '<br>');
        document.getElementById(`modalbox-button-text`).innerHTML = message.buttonText;
        document.getElementById(`modalButton`).click();
    }, 10);
    return;
}

function check(result) {
    let isMobile = insensitiveIsEqual(result.platform.type, "mobile");
    if (isMobile) {
        showWarning(isMobile, {
            title: 'Incompatibility Warning!',
            body: 'Mobile browser detected!\nYou are in potentially-incompatible territories. If you wish to continue, some things may break!\nYou have been warned!',
            buttonText: 'ÒωÓ  Am stubborn; me wants in!'
        });
    }
    if (!insensitiveIsEqual(result.browser.name, "Chrome")) {
        showWarning(isMobile, {
            title: 'Incompatibility Warning!',
            body: `${result.browser.name} browser detected!\nThis website is developed and tested mainly on Google Chrome. I am trying my best to provide compatibility, but there are no promises! Some things may not display properly.\nYou have been warned.`,
            buttonText: "I'll take my chances"
        });
    }
}

function insensitiveIsEqual(a, b) {
    return a.toLowerCase() == b.toLowerCase();
}