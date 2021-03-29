'use strict';

(function () {

  var closeButtons = document.querySelectorAll('.close-button');
  var searchForm = document.querySelector('.form');
  var submitButton = document.querySelector('.form__button');

  closeButtons.forEach(function (closeButton){
    if (closeButton) {
      closeButton.classList.remove('close-button--opened');
      closeButton.classList.add('close-button--closed');
      closeButton.classList.remove('close-button--nojs');

      closeButton.addEventListener('click', function () {
        if (closeButton.classList.contains('close-button--closed')) {
          closeButton.classList.remove('close-button--closed');
          closeButton.classList.add('close-button--opened');
        } else {
          closeButton.classList.add('close-button--closed');
          closeButton.classList.remove('close-button--opened');
        }
      });
    }
  });

  var phoneMask = IMask(
    document.getElementById('tel'), {
      mask: '+{7}(000)000-00-00'
    });


  if (searchForm) {
    submitButton.addEventListener('click', function (evt) {

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
