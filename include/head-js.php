<?php include '../include/analitic-web-script.php'; ?>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMeqStSqC4lq01HX9yfjqAD8eNHHlWWac&libraries=places" async defer></script>

<script src="https://www.google.com/recaptcha/api.js?hl=es&onload=recaptchaCallback&render=explicit" async defer></script>

<script>
    var recaptchaCallback = () => {
        grecaptcha.render("rcap", {
            sitekey: '6LdUviUaAAAAAG1cfx3r5EO9anp6-pBQCuKXdDtv',
            callback: ($event) => {}
        });
        grecaptcha.render("rcap2", {
            sitekey: '6LdUviUaAAAAAG1cfx3r5EO9anp6-pBQCuKXdDtv',
            callback: ($event) => {
                setCaptchaLang(document.getElementById("rcap2"), localLenguaje.toLowerCase())
            }
        });
    }

    function setCaptchaLang(recaptchaContainer, lang) {
        lang = lang || "es";

        console.log(lang)

        // 1. Search for the ReCaptcha iframe
        const iframeGoogleCaptcha = recaptchaContainer.querySelector('iframe');

        // 2. Retrieve the current language
        const currentLang = iframeGoogleCaptcha.getAttribute("src").match(/hl=(.*?)&/).pop();

        // 3. Verify if the language that you want to set is different to the current one
        if (currentLang !== lang) {
            // 4. If it is, change it
            iframeGoogleCaptcha.setAttribute(
                "src",
                iframeGoogleCaptcha.getAttribute("src").replace(
                    /hl=(.*?)&/,
                    'hl=' + lang + '&'
                )
            );
        }
    }
</script>