import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selectorPopup, submitter }) {
    super(selectorPopup);
    this._submitter = submitter;
    this._element = this._popup.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__text');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitter(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._element.reset();
  }

  popupValues(inputValuesInitial) {
    this._inputList.forEach(input => input.value = inputValuesInitial[input.name]);
  }

  changeButtonText(text) {
    this._button = this._element.querySelector('.popup__submit-btn');
    this._button.textContent = text;
  }
}
