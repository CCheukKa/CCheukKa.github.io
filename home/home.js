getGlobalConfig().then(config => homeShelfConstructor(config.catalogue));
//
function homeShelfConstructor(pages) {
    const widthTester = document.createElement('div');
    document.body.appendChild(widthTester);
    widthTester.style.width = 'fit-content';
    widthTester.style.fontWeight = 'bold';
    widthTester.style.fontSize = 'xx-large';
    widthTester.style.fontFamily = "'Bellota Text', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
    //
    pages.forEach(page => {
        if (page.hideFromShelf) { return; }
        let displayName = page.displayName,
            refName = page.refName;


        const thumbnailURL = `/${refName}/thumbnail.png`;
        let thumbnailExists = false;
        if (!useEmojiThumbnail) { thumbnailExists = urlExists(thumbnailURL); }
        widthTester.innerHTML = displayName;
        if (useHTML) { refName = refName.concat('.html'); }

        //#region   //! Define tags
        //! <div>
        let divOpen = `<div class="shelf-item-wrapper">`;
        //! <a>
        let aOpen = `<a href=/${refName}`;
        if (page.openInNewTab) {
            aOpen += ` target="_blank"`;
        }
        aOpen += `>`;
        //! <fieldset>
        let fieldsetOpen = `<fieldset class="shelf-item" style="text-align: center;`;
        if (!useEmojiThumbnail) {
            if (!page.underConstruction && thumbnailExists) {
                fieldsetOpen += ` background-image: url('${thumbnailURL}');`;
            }
        }
        fieldsetOpen += `">`;
        //! <legend></legend>
        let legendInside = '';
        if (widthTester.clientWidth > 235) {
            legendInside = `<marquee>${displayName}</marquee>`;
            //#ANCHOR //! marquee is terrible, find an alternative
        } else {
            legendInside = `${displayName}`;
        }
        //! <span></span>
        let spanOpen1 = `<span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 30pt; text-shadow: 0px 0px 8px #ffffff;">`;
        let spanInside1 = '';
        let spanOpen2 = `<span class="headerCatalogueSelected" style="position: relative; top: 35px; font-size: 16pt; color: $COLOUR; text-shadow: 0px 0px 5px #000000;">`;
        let spanInside2 = '';
        if (page.underConstruction) {
            spanInside1 = `🚧`;
            spanInside2 = `Page under construction!`;
            spanOpen2 = spanOpen2.replace('$COLOUR', '#f35858');
        } else {
            if (!thumbnailExists) {
                spanInside1 = pickRandom(['😐', '🙃', '🥴', '🤪', '😵', '🤔', '🤨', '💀']);
                spanInside2 = `Thumbnail failed to load`;
                spanOpen2 = spanOpen2.replace('$COLOUR', '#a6ed8d');
            }
            if (page.emoji) {
                spanInside1 = page.emoji;
                spanInside2 = '';
            }
        }
        //#endregion

        let innerHTML = `
            ${divOpen}
                ${aOpen}
                    ${fieldsetOpen}
                        <legend>
                            ${legendInside}
                        </legend>
                        ${spanOpen1}
                            ${spanInside1}
                        </span>
                        <br>
                        ${spanOpen2}
                            ${spanInside2}
                        </span>
                    </fieldset>
                </a>
            </div>
        `;
        shelfContainer.innerHTML = shelfContainer.innerHTML.concat(innerHTML);
    });
    widthTester.parentNode.removeChild(widthTester);
    return;
}