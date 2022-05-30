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
    this._popup.querySelector('.popup__close-btn').addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._closeByOverlay(evt);
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === ESC_CODE) {
      this.close();
    }
  }

  _closeByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }
}
