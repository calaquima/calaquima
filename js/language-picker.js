document.addEventListener('DOMContentLoaded', () => {
    let langData = {};
    let currentLang = 'ca';  // Default language

    // Function to fetch translations from JSON file
    async function loadTranslations() {
        try {
            const response = await fetch('translations.json');
            if (!response.ok) throw new Error('Network response was not ok.');
            langData = await response.json();  // Save translation data

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
        document.getElementById('menu-home').textContent = langData[currentLang]['menu-home'];
        document.getElementById('menu-about').textContent = langData[currentLang]['menu-about'];
        document.getElementById('menu-services').textContent = langData[currentLang]['menu-services'];
        document.getElementById('menu-ca-la-quima').textContent = langData[currentLang]['menu-ca-la-quima'];
        document.getElementById('menu-ca-la-maria').textContent = langData[currentLang]['menu-ca-la-maria'];
        document.getElementById('menu-ca-la-nuria').textContent = langData[currentLang]['menu-ca-la-nuria'];
        document.getElementById('menu-contact').textContent = langData[currentLang]['menu-contact'];
        document.getElementById('services-title').textContent = langData[currentLang]['services-title'];
        document.getElementById('service-parking-title').textContent = langData[currentLang]['service-parking-title'];
        document.getElementById('service-parking-description').textContent = langData[currentLang]['service-parking-description'];
        document.getElementById('service-room-title').textContent = langData[currentLang]['service-room-title'];
        document.getElementById('service-room-description').textContent = langData[currentLang]['service-room-description'];
        document.getElementById('service-equipment-title').textContent = langData[currentLang]['service-equipment-title'];
        document.getElementById('ca-la-quima-title').textContent = langData[currentLang]['ca-la-quima-title'];
        document.getElementById('ca-la-quima-description').textContent = langData[currentLang]['ca-la-quima-description'];
        document.getElementById('ca-la-maria-title').textContent = langData[currentLang]['ca-la-maria-title'];
        document.getElementById('ca-la-maria-description').textContent = langData[currentLang]['ca-la-maria-description'];
        document.getElementById('ca-la-nuria-title').textContent = langData[currentLang]['ca-la-nuria-title'];
        document.getElementById('ca-la-nuria-description').textContent = langData[currentLang]['ca-la-nuria-description'];
        document.getElementById('contact-title').textContent = langData[currentLang]['contact-title'];
        document.getElementById('contact-phone').textContent = langData[currentLang]['contact-phone'];
        document.getElementById('contact-email').textContent = langData[currentLang]['contact-email'];

        // Initialize or update the typed text based on the current language
        updateTypedText();

        // Dispatch a languageChange event to notify main.js about the language change
        const event = new CustomEvent('languageChange', {
            detail: {
                newLang: currentLang,
                translations: langData[currentLang]
            }
        });
        document.dispatchEvent(event);
    }

    // Function to handle language change
    function handleLanguageChange(event) {
        const selectedLang = event.target.value;
        switch (selectedLang) {
            case 'catalan':
                currentLang = 'ca';
                break;
            case 'spanish':
                currentLang = 'es';
                break;
            case 'english':
                currentLang = 'en';
                break;
            case 'francais':
                currentLang = 'fr';
                break;
            default:
                currentLang = 'ca';
                break;
        }
        applyTranslations();
    }

    function updateTypedText() {
        const typedElement = document.querySelector('.typed');
        if (typedElement && langData[currentLang] && langData[currentLang]['typed-text']) {
            typedElement.textContent = langData[currentLang]['typed-text'];
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
