import { openPopup } from "./index.js";

export class Card {
  constructor(name, link) {
    this._title = name;
    this._image = link;
  }

  _getTemplate() {
    const elementTemplate = document.querySelector('.element-template').content;
    const cardNew = elementTemplate.cloneNode(true);
    return cardNew;
  }

  createCard() {
    this._element = this._getTemplate();
    const photoElement = this._element.querySelector('.element__photo');

    this._element.querySelector('.element__title').textContent = this._title;
    photoElement.src = this._image;
    photoElement.alt = this._title;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like')) {
        this._likeElementHandler(evt);
      } else if (evt.target.classList.contains('element__remove')) {
        this._removeElement(evt);
      } else if (evt.target.classList.contains('element__photo')) {
        this._showPopupImage();
      }
    });
  }

  _removeElement(evt) {
    evt.target.closest('.element').remove();
  }

  _showPopupImage() {
    const popupImgPhoto = document.querySelector('.popup-img__photo');
    const popupImgTitle = document.querySelector('.popup-img__title');
    const popupImg = document.querySelector('.popup-img');
    popupImgPhoto.src = this._image;
    popupImgPhoto.alt = this._title;
    popupImgTitle.textContent = this._title;
    openPopup(popupImg);
  }

  _likeElementHandler(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}
