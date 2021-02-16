const emailAddressContainer = document.getElementById('emailAddressContainer');

emailAddressContainer.addEventListener('click', function(e) {
    const el = document.createElement('textarea');
    el.value = 'contact.CCheukKa@gmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    console.log('Copied')
    document.body.removeChild(el);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "✔️ Copied! ";
});

emailAddressContainer.addEventListener('mouseleave', function(e) {
    console.log('Mouse leave');
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "📋 Copy to clipboard";
});