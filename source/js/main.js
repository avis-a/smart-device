'use strict';

(function () {

  var closeButtons = document.querySelectorAll('.close-button');
  var closeAreas = document.querySelectorAll('.close-area');

  var searchForm = document.querySelector('.form');
  var submitButton = document.querySelector('.form__button');

  var mainNavButton = document.querySelector('.main-nav__button');
  var modalForm = document.querySelector('.modal');
  var modalButtonClose = document.querySelector('.modal__button--close');
  var modalOverlay = document.querySelector('.modal__overlay');

  var modalF = document.querySelector('.modal__form');
  var modalName = document.getElementById('modal-name');
  var modalTel = document.getElementById('modal-tel');
  var modalQuestion = document.getElementById('modal-question');

  var tel = document.getElementById('tel');
  var modalTel = document.getElementById('modal-tel');

  mainNavButton.href='#';

  var toggleAccordionButton = function (button, state) {
    if (state) {
      button.classList.remove('close-button--closed');
      button.classList.add('close-button--opened');
    } else {
      button.classList.remove('close-button--opened');
      button.classList.add('close-button--closed');
    }
  }

  var isOpenAccordionButton = function (button) {
    return button.classList.contains('close-button--opened');
  }

  var accordionButtonHandler = function (button, evt) {
    closeButtons.forEach(function (closeButton) {
      if (closeButton.id === evt.target.id) {
        if (isOpenAccordionButton(closeButton)) {
          toggleAccordionButton(closeButton, false);
        } else {
          toggleAccordionButton(closeButton, true);
        }
      }
      else {
        toggleAccordionButton(closeButton, false);
      }
    });
  }

  closeAreas.forEach(function (closeArea) {
    closeArea.addEventListener('click', function (evt) {
      var closeButton = closeArea.querySelector('.close-button');
      closeButton.click();
    });
  });

  // аккордеон
  closeButtons.forEach(function (closeButton) {
    if (closeButton) {
      closeButton.classList.remove('close-button--opened');
      closeButton.classList.add('close-button--closed');
      closeButton.classList.remove('close-button--nojs');

      closeButton.addEventListener('click', function (evt) {
        accordionButtonHandler(closeButton, evt);
      });
    }
  });

  // модальное окно
  if (mainNavButton) {
    mainNavButton.addEventListener('click', function () {
      modalForm.classList.remove('visually-hidden');
      document.querySelector('body').classList.add('page__hidden');
      document.getElementById('modal-name').focus();

      document.addEventListener('keydown', escPress);
      modalButtonClose.addEventListener('click', closeModal);
      modalOverlay.addEventListener('click', closeModal);

      var localItem = localStorage.getItem('modal-form-data');
      if (localItem) {
        var localData = JSON.parse(localItem);

        modalName.value = localData.name;
        modalTel.value = localData.tel;
        modalQuestion.value = localData.question;
      }
    });
  }

  var closeModal = function () {
    modalForm.classList.add('visually-hidden');
    document.querySelector('body').classList.remove('page__hidden');

    modalButtonClose.removeEventListener('click', closeModal);
    modalOverlay.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', escPress);
  };

  var escPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  };

  var modalInputChange = function () {
    var dataObj = {
      name: modalName.value,
      tel: modalTel.value,
      question: modalQuestion.value
    };

    localStorage['modal-form-data'] = JSON.stringify(dataObj);
  };

  if (modalName) {
    modalName.addEventListener('change', modalInputChange);
    modalTel.addEventListener('change', modalInputChange);
    modalQuestion.addEventListener('change', modalInputChange);

    modalF.addEventListener('submit', function () {
      localStorage.removeItem('modal-form-data');
    });
  }

  // маска поля телефон
  var maskConf = {
    mask: '+{7}(000)000-00-00'
  };

  if (tel) {
    IMask(tel, maskConf);
  }

  if (modalTel) {
    IMask(modalTel, maskConf);
  }

  // валидация формы
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
