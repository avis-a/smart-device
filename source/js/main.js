'use strict';

(function () {

  var closeButtons = document.querySelectorAll('.close-button');

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

  // аккордеон
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

  // модальное окно
  mainNavButton.addEventListener('click', function (evt) {
    modalForm.classList.remove('visually-hidden');
    document.getElementById('modal-name').focus();

    document.addEventListener(`keydown`, escPress);
    modalButtonClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    let localItem = localStorage.getItem('modal-form-data');
    if(localItem) {
      let localData = JSON.parse(localItem);

      modalName.value = localData.name;
      modalTel.value = localData.tel;
      modalQuestion.value = localData.question;
    }
  });

  const closeModal = () => {
    modalForm.classList.add('visually-hidden');

    modalButtonClose.removeEventListener('click', closeModal);
    modalOverlay.removeEventListener('click', closeModal);
    document.removeEventListener(`keydown`, escPress);
  };

  const escPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeModal();
    }
  };

  const modalInputChange = () => {
    let dataObj = {
      name: modalName.value,
      tel: modalTel.value,
      question: modalQuestion.value
    };

    localStorage['modal-form-data'] = JSON.stringify(dataObj);
  };

  modalName.addEventListener('change', modalInputChange);
  modalTel.addEventListener('change', modalInputChange);
  modalQuestion.addEventListener('change', modalInputChange);

  modalF.addEventListener('submit', () => {
    localStorage.removeItem('modal-form-data');
  });

  // маска поля телефон
  const maskConf = {
    mask: '+{7}(000)000-00-00'
  };
  IMask(document.getElementById('tel'), maskConf);
  IMask(document.getElementById('modal-tel'), maskConf);

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
