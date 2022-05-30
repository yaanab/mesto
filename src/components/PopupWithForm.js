import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selectorPopup, submitter }) {
    super(selectorPopup);
    this._submitter = submitter;
    this._element = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__text');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitter(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();

    this._element.reset();
  }

  popupValues(object) {
    this._inputList = this._popup.querySelectorAll('.popup__text');
    this._inputList.forEach(input => input.value = object[input.name]);
  }
}