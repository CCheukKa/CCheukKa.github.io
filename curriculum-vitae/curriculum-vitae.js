function replaceWithDownload() {
    console.log('Cannot display .pdf');
    const shelfContainer = document.getElementById('shelfContainer');
    shelfContainer.style.paddingTop = '5%';
    shelfContainer.style.paddingBottom = '5%';
    shelfContainer.style.paddingLeft = '5%';
    shelfContainer.style.paddingRight = '5%';
    shelfContainer.style.fontFamily = `'Bellota Text', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`;
    shelfContainer.style.fontSize = '22pt';
    shelfContainer.style.height = 'fit-content';
    shelfContainer.style.textAlign = 'center';
    shelfContainer.innerHTML = `<span>It seems that the PDF file cannot be displayed on your device.<br>Come back later using a desktop machine or click <a href="/curriculum-vitae/CCheukKa Curriculum Vitae [Reduced + Redacted].pdf" download style="font-weight: bold; text-decoration: underline;">HERE</a> to download it instead.</span>`;
}