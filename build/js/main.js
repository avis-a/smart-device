'use strict';

(function () {

  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');
  var searchForm = document.querySelector('.form');
  var submitBuuton = document.querySelector('.form__button');
  var mainPage = document.querySelector('.page__main');

  if (navMain && navToggle) {
    navMain.classList.remove('main-nav__opened');
    navMain.classList.add('main-nav__closed');
    navMain.classList.remove('main-nav__nojs');

    navToggle.addEventListener('click', function () {
      if (navMain.classList.contains('main-nav__closed')) {
        navMain.classList.remove('main-nav__closed');
        navMain.classList.add('main-nav__opened');
        mainPage.classList.add('page__hidden');
      } else {
        navMain.classList.add('main-nav__closed');
        navMain.classList.remove('main-nav__opened');
        mainPage.classList.remove('page__hidden');
      }
    });
  }


  if (searchForm) {
    submitBuuton.addEventListener('click', function (evt) {

      var isValidateSuccess = true;

      // получаем поля формы
      var name = document.getElementById('name');
      var tel = document.getElementById('tel');

      name.setCustomValidity('');
      tel.setCustomValidity('');

      if (!name.value) {
        isValidateSuccess = false;
        name.setCustomValidity('Имя не может быть пустым.');
      }

      var regexResult = tel.value.match(/(\+?\d[- .]*){7,13}/i);

      if (!tel.value) {
        isValidateSuccess = false;
        tel.setCustomValidity('Телефон не может быть пустым.');
      } else if (regexResult === null || regexResult.length <= 0) {
        isValidateSuccess = false;
        tel.setCustomValidity('Значение поля "Телефон" не удовлетворяет шаблону!');
      }

      if (isValidateSuccess !== true) {
        name.reportValidity();
        tel.reportValidity();

        evt.preventDefault();
      }
    });
  }
})();
