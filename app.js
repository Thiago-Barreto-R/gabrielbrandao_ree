var btnExpand = document.getElementById('btn-expand');
var btnModels = document.querySelector('.btn-models');

btnExpand.addEventListener('click', function() {
  btnModels.classList.toggle('expanded');
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
console.log(changeThemeBtn)

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