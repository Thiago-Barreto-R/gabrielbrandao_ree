let btnModels = document.getElementById('btn-expand')

btnModels.addEventListener('click', () => {
  btnModels.classList.toggle('expanded')
})

function translateText(sourceLang, targetLang) {
    const cache = {};
  
    const translateElement = (element) => {
      const textToTranslate = element.innerHTML;
  
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

function changeActiveButton(button) {
  let buttons = document.querySelectorAll(".model-button");
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
window.onload = function() {
  let brButton = document.getElementById("brButton");
  changeActiveButton(brButton);
}

document.getElementById('openModalLink').addEventListener('click', function(event) {
  event.preventDefault()
  document.getElementById('playlistModal').style.display = 'block'
})

document.getElementById('closeModalButton').addEventListener('click', function() {
  document.getElementById('playlistModal').style.display = 'none'
});

const links = document.querySelectorAll('.shake-links');

function animateLinks(index) {
    const currentIndex = index % links.length;
    const nextIndex = (index + 1) % links.length;

    links[currentIndex].style.animation = 'shake 0.5s ease-in-out';

    // Remover a animação após o término
    links[currentIndex].addEventListener('animationend', () => {
        links[currentIndex].style.animation = '';
    });

    setTimeout(() => {
        animateLinks(nextIndex);
    }, 1500);
}

animateLinks(0);

const pointer = document.querySelector('.pointer');

        function clickAnimation() {
            pointer.style.top = '5px';
            setTimeout(() => {
                pointer.style.top = '30px';
            }, 500);
        }

        setInterval(clickAnimation, 3000);