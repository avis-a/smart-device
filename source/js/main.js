'use strict';

(function () {

  var citeButton = document.querySelector('.cite__button');
  // var searchForm = document.querySelector('.form');
  // var submitButton = document.querySelector('.form__button');

  if (citeButton) {
    citeButton.classList.remove('cite__button--opened');
    citeButton.classList.add('cite__button--closed');
    citeButton.classList.remove('cite__button--nojs');

    citeButton.addEventListener('click', function () {
      if (citeButton.classList.contains('cite__button--closed')) {
        citeButton.classList.remove('cite__button--closed');
        citeButton.classList.add('cite__button--opened');
      } else {
        citeButton.classList.add('cite__button--closed');
        citeButton.classList.remove('cite__button--opened');
      }
    });
  }


  // if (searchForm) {
  //   submitButton.addEventListener('click', function (evt) {

  //     var isValidateSuccess = true;

  //     // получаем поля формы
  //     var name = document.getElementById('name');
  //     var tel = document.getElementById('tel');

  //     name.setCustomValidity('');
  //     tel.setCustomValidity('');

  //     if (!name.value) {
  //       isValidateSuccess = false;
  //       name.setCustomValidity('Имя не может быть пустым.');
  //     }

  //     var regexResult = tel.value.match(/(\+?\d[- .]*){7,13}/i);

  //     if (!tel.value) {
  //       isValidateSuccess = false;
  //       tel.setCustomValidity('Телефон не может быть пустым.');
  //     } else if (regexResult === null || regexResult.length <= 0) {
  //       isValidateSuccess = false;
  //       tel.setCustomValidity('Значение поля "Телефон" не удовлетворяет шаблону!');
  //     }

  //     if (isValidateSuccess !== true) {
  //       name.reportValidity();
  //       tel.reportValidity();

  //       evt.preventDefault();
  //     }
  //   });
  // }
})();
