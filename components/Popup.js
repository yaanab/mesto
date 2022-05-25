import { buttonClosePopupSelector, ESC_CODE } from '../utils/constants.js';
export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }

  open() {
    this._popup.classList.add('popup_opened');

    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');

    this._removeEventListener();
  }

  setEventListeners() {
    this._popup.querySelector(buttonClosePopupSelector).addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.addEventListener('mousedown', (evt) => {
      this._closeByOverlay(evt);
    });
  }

  _removeEventListener() {
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.removeEventListener('mousedown', (evt) => {
      this._closeByOverlay(evt);
    });
  }

  _handleEscClose(evt) {
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
