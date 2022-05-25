import Popup from './Popup.js';
import { popupImgPhoto, popupImgTitle } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup, image, title) {
    super(selectorPopup);
    this._image = image;
    this._title = title;
  }

  open() {
    popupImgPhoto.src = this._image;
    popupImgPhoto.alt = this._title;
    popupImgTitle.textContent = this._title;

    this._popup.classList.add('popup_opened');

    this.setEventListeners();
  }
}
