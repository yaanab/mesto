import { openPopup } from '../utils/utils.js';
import { popupImg, popupImgPhoto, popupImgTitle } from '../utils/constants.js';

export default class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
    this._title = name;
    this._image = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const elementTemplate = document.querySelector(this._cardSelector).content;
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
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._likeElementHandler(evt);
    });
    this._element.querySelector('.element__remove').addEventListener('click', (evt) => {
      this._removeElement(evt);
    });
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._showPopupImage();
    });
  }

  _removeElement(evt) {
    evt.target.closest('.element').remove();
  }

  _showPopupImage() {
    this._handleCardClick(this._image, this._title);
  }

  _likeElementHandler(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}
