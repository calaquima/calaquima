document.addEventListener('DOMContentLoaded', function () {
    const languageDropdownItems = document.querySelectorAll('.dropdown-item');
  
    languageDropdownItems.forEach(item => {
      item.addEventListener('click', function () {
        const selectedLang = this.getAttribute('data-lang');
        console.log('Selected language:', selectedLang);
        // Add your language switching logic here
        // For example, you could load language-specific content via AJAX
      });
    });
  });