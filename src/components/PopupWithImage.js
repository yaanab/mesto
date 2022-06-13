import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImgPhoto = this._popup.querySelector('.popup-img__photo');
    this._popupImgTitle = this._popup.querySelector('.popup-img__title');
  }

  open(image, title) {
    this._popupImgPhoto.src = image;
    this._popupImgPhoto.alt = title;
    this._popupImgTitle.textContent = title;

    super.open();
  }
}
