{
    /*
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- github.io/ads -->
    <ins class="adsbygoogle" style="display:block; width: 40%" data-ad-client="ca-pub-7040441057461150" data-ad-slot="8740595378" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    */
}

const adCount = 4;
const adContainer = document.getElementById('ad-container');
const adUnitHTML = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- github.io/ads --><ins class="adsbygoogle" style="display:block; width: 40%" data-ad-client="ca-pub-7040441057461150" data-ad-slot="8740595378" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`;

for (let i = 0; i < adCount; i++) {
    adContainer.innerHTML += adUnitHTML;
}