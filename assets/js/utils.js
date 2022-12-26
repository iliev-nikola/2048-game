const utils = (function () {
  const getBestPoints = () => {
    if (localStorage.getItem('bestPoints')) {
      return localStorage.getItem('bestPoints');
    } else {
      localStorage.setItem('bestPoints', 0);
      return 0;
    }
  };

  const displayInstructions = (e) => {
    if (!e.target.innerHTML) {
      FOOTER_STRONG.innerText = 'How To Play?';
      FOOTER_INSTRUCTIONS.style.opacity = 0;
    } else {
      FOOTER_STRONG.innerHTML = '<i class="fas fa-times"></i>';
      FOOTER_INSTRUCTIONS.style.opacity = 1;
    }
  };

  const getById = (id) => {
    return document.getElementById(id);
  };

  const querySelect = (param) => {
    return document.querySelector(param);
  };

  const getTouches = (event) => {
    return event.touches || event.originalEvent.touches;
  };

  return {
    getBestPoints,
    displayInstructions,
    getById,
    querySelect,
    getTouches
  }
})();