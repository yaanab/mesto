import { ESC_CODE } from '../utils/constants.js';
export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    })
  }

  _handleEscClose = (evt) => {
    if (evt.key === ESC_CODE) {
      this.close();
    }
  }
}
