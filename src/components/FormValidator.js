export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._element = formElement;
    this._buttonElement = this._element.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    const form = this._element.querySelector(this._config.formSelector);
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(this._element.querySelectorAll(this._config.inputSelector));
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.inactiveButtonState();
    } else {
      this.activeButtonState();
    }
  };

  inactiveButtonState() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

  activeButtonState() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', '');
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  resetErrors() {
    const inputList = Array.from(this._element.querySelectorAll(this._config.inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
};

