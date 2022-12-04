const utils = (function () {
  function getBestPoints() {
    if (localStorage.getItem('bestPoints')) {
      return localStorage.getItem('bestPoints');
    } else {
      localStorage.setItem('bestPoints', 0);
      return 0;
    }
  }

  function displayInstructions(e) {
    if (!e.target.innerHTML) {
      FOOTER_STRONG.innerText = 'How To Play?';
      FOOTER_INSTRUCTIONS.style.opacity = 0;
    } else {
      FOOTER_STRONG.innerHTML = '<i class="fas fa-times"></i>';
      FOOTER_INSTRUCTIONS.style.opacity = 1;
    }
  }

  function getById(id) {
    return document.getElementById(id);
  }

  function querySelect(param) {
    return document.querySelector(param);
  }

  return {
    getBestPoints,
    displayInstructions,
    getById,
    querySelect
  }
})();