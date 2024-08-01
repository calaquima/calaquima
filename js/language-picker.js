console.log('jQuery version:', $.fn.jquery);
console.log('Typed plugin:', $.fn.typed ? 'Available' : 'Not available');

document.addEventListener('DOMContentLoaded', () => {
    let langData = {};
    let currentLang = 'ca';  // Default language

    // Function to fetch translations from JSON file
    async function loadTranslations() {
        try {
            const response = await fetch("json/translations.json");
            if (!response.ok) throw new Error('Network response was not ok.');
            langData = await response.json();  // Save translation data

            // Load the selected language from localStorage if available
            const savedLang = localStorage.getItem('selectedLang');
            if (savedLang && langData[savedLang]) {
                currentLang = savedLang;
            }

            // Update the language picker to match the selected language
            const languagePicker = document.getElementById('language-picker-select');
            if (languagePicker) {
                languagePicker.value = getLanguageNameFromCode(currentLang);
            } else {
                console.error('Language picker select element not found.');
            }

            applyTranslations();  // Apply the default language
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    }

    // Function to apply translations to the page
    function applyTranslations() {
        if (!langData[currentLang]) {
            console.error(`Language ${currentLang} not found in translation data.`);
            return;
        }
        document.title = langData[currentLang]['page-title'];
        document.getElementById('page-subtitle').textContent = langData[currentLang]['page-subtitle'];
        document.getElementById('menu-home').textContent = langData[currentLang]['menu-home'];
        document.getElementById('menu-about').textContent = langData[currentLang]['menu-about'];
        document.getElementById('menu-services').textContent = langData[currentLang]['menu-services'];
        document.getElementById('menu-ca-la-quima').textContent = langData[currentLang]['menu-ca-la-quima'];
        document.getElementById('menu-ca-la-maria').textContent = langData[currentLang]['menu-ca-la-maria'];
        document.getElementById('menu-ca-la-nuria').textContent = langData[currentLang]['menu-ca-la-nuria'];
        document.getElementById('menu-contact').textContent = langData[currentLang]['menu-contact'];
        document.getElementById('about-description').innerHTML = langData[currentLang]['about-description'];
        document.getElementById('services-title').textContent = langData[currentLang]['services-title'];
        document.getElementById('service-parking-title').textContent = langData[currentLang]['service-parking-title'];
        document.getElementById('service-parking-description').textContent = langData[currentLang]['service-parking-description'];
        document.getElementById('service-room-title').textContent = langData[currentLang]['service-room-title'];
        document.getElementById('service-room-description').textContent = langData[currentLang]['service-room-description'];
        document.getElementById('service-equipment-title').textContent = langData[currentLang]['service-equipment-title'];
        document.getElementById('service-equipment-description').innerHTML = langData[currentLang]['service-equipment-description'];
        document.getElementById('ca-la-quima-title').textContent = langData[currentLang]['ca-la-quima-title'];
        document.getElementById('ca-la-quima-description').textContent = langData[currentLang]['ca-la-quima-description'];
        document.getElementById('ca-la-maria-title').textContent = langData[currentLang]['ca-la-maria-title'];
        document.getElementById('ca-la-maria-description').textContent = langData[currentLang]['ca-la-maria-description'];
        document.getElementById('ca-la-nuria-title').textContent = langData[currentLang]['ca-la-nuria-title'];
        document.getElementById('ca-la-nuria-description').textContent = langData[currentLang]['ca-la-nuria-description'];
        document.getElementById('contact-title').textContent = langData[currentLang]['contact-title'];
        document.getElementById('contact-description').innerHTML = langData[currentLang]['contact-description'];
        document.getElementById('contact-phone').textContent = langData[currentLang]['contact-phone'];
        document.getElementById('contact-email').textContent = langData[currentLang]['contact-email'];

        // Initialize or update the typed text based on the current language
        // updateTypedText();

    }

    // Function to handle language change
    function handleLanguageChange(event) {
        const selectedLang = event.target.value;
        currentLang = getLanguageCodeFromName(selectedLang);

        // Save the selected language to localStorage
        localStorage.setItem('selectedLang', currentLang);
        applyTranslations();
    }

    // Function to get language code from language name
    function getLanguageCodeFromName(languageName) {
        switch (languageName.toLowerCase()) {
            case 'catalan':
                return 'ca';
            case 'spanish':
                return 'es';
            case 'english':
                return 'en';
            case 'francais':
                return 'fr';
            default:
                return 'ca';
        }
    }

    // Function to get language name from language code
    function getLanguageNameFromCode(languageCode) {
        switch (languageCode) {
            case 'ca':
                return 'catalan';
            case 'es':
                return 'spanish';
            case 'en':
                return 'english';
            case 'fr':
                return 'francais';
            default:
                return 'catalan';
        }
    }

    function updateTypedText() {
        const typedElement = document.querySelector('.typed');
        if (typedElement && langData[currentLang] && langData[currentLang]['typed-text']) {
            const text = langData[currentLang]['typed-text'];
            console.log('Updating typed text to:', text);
            typedElement.textContent = text;
        } else {
            console.error('Typed element or text data not found.');
        }
    }

    // Initialize language picker
    const languagePicker = document.getElementById('language-picker-select');
    if (languagePicker) {
        languagePicker.addEventListener('change', handleLanguageChange);
    } else {
        console.error('Language picker select element not found.');
    }

    // Load translations and apply the default language
    loadTranslations();
});
