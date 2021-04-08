const emailAddressContainer = document.getElementById('emailAddressContainer');

emailAddressContainer.addEventListener('click', function() {
    const el = document.createElement('textarea');
    el.value = 'contact.CCheukKa@gmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    console.log('Copied')
    document.body.removeChild(el);
    var tooltip = document.getElementById("tooltipCopy");
    tooltip.innerHTML = "✔️ Copied! ";
});

emailAddressContainer.addEventListener('mouseleave', function() {
    console.log('Mouse leave');
    var tooltip = document.getElementById("tooltipCopy");
    tooltip.innerHTML = "📋 Copy to clipboard";
});