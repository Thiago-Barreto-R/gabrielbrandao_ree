var btnModels = document.getElementById('btn-expand');
var btnClose = document.getElementById('close');

btnModels.addEventListener('click', function(event) {
    if (event.target === btnClose) {
        btnModels.classList.remove('expanded');
    } else {
        btnModels.classList.add('expanded');
    }
})

function translateText(sourceLang, targetLang) {
    const cache = {};
  
    const translateElement = (element) => {
      const textToTranslate = element.innerHTML;
  
      // Check if the text to translate should be skipped
      // Verifique se o texto a traduzir deve ser ignorado
      if (shouldSkipTranslation(textToTranslate)) {
        return;
      }
  
      if (cache[textToTranslate]) {
        element.innerHTML = cache[textToTranslate]
        return;
      }
  
      fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${textToTranslate}`)
        .then(response => response.json())
        .then(data => {
          const translatedText = data[0][0][0]

          element.innerHTML = translatedText

          cache[textToTranslate] = translatedText
      })
        .catch(error => {
          console.error(error)
          alert('Houve um erro ao traduzir o texto.')
        })
    }
  
    const elementsToTranslate = document.querySelectorAll('.texto')

    elementsToTranslate.forEach(translateElement)
  
    function shouldSkipTranslation(text) {
      const wordsToSkip = ['in']
  
      return wordsToSkip.includes(text.toLowerCase())
    }
}
  
translateText('en', 'pt')

const changeThemeBtn = document.querySelector('#theme')

function toggleDarkMode() {
    document.body.classList.toggle("dark")
}

function loadTheme() {
    const darkMode = localStorage.getItem("dark")
    if(darkMode){
        toggleDarkMode()
    }
}

loadTheme();

changeThemeBtn.addEventListener('change', function() {
    toggleDarkMode()

    localStorage.removeItem("dark")

    if(document.body.classList.contains("dark")) {
        localStorage.setItem("dark", 1)
    }
})

function changeActiveButton(button) {
  var buttons = document.querySelectorAll(".model-button");
  buttons.forEach(function(btn) {
      if (btn === button) {
          btn.classList.add("active-language");
          btn.classList.remove("reject-language");
      } else {
          btn.classList.remove("active-language");
          btn.classList.add("reject-language");
      }
  });
}

// Adicionar classe "active-language" ao botão "Br" ao carregar a página
window.onload = function() {
  var brButton = document.getElementById("brButton");
  changeActiveButton(brButton);
};