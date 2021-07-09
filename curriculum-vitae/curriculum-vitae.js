function replaceWithDownload() {
    console.log('Cannot display .pdf');
    const projectContainer = document.getElementById('projectContainer');
    projectContainer.style.paddingTop = '5%';
    projectContainer.style.paddingBottom = '5%';
    projectContainer.style.paddingLeft = '5%';
    projectContainer.style.paddingRight = '5%';
    projectContainer.style.fontFamily = `'Bellota Text', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`;
    projectContainer.style.fontSize = '22pt';
    projectContainer.style.height = 'fit-content';
    projectContainer.style.textAlign = 'center';
    projectContainer.innerHTML = `<span>It seems that the PDF file cannot be displayed on your device.<br>Come back later using a desktop machine or click <a href="/curriculum-vitae/CCheukKa Curriculum Vitae (reduced + redacted).pdf" download style="font-weight: bold; text-decoration: underline;">HERE</a> to download it instead.</span>`;
}