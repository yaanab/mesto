export default class Card {
  constructor(data, handleCardClick, deleteLike, addLike, cardSelector, userId) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes.length;
    this._id = data.id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._deleteLike = deleteLike;
    this._addLike = addLike;
    this._cardSelector = cardSelector;
    this._userId = userId;
  }

  _getTemplate() {
    const elementTemplate = document.querySelector(this._cardSelector).content;
    const cardNew = elementTemplate.cloneNode(true);
    return cardNew;
  }

  createCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector('.element__photo');
    this._remove = this._element.querySelector('.element__remove');

    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element_like-counter').textContent = this._likes;
    this._photo.src = this._image;
    this._photo.alt = this._title;

    if (this._ownerId !== this._userId) {
      this._remove.classList.add('element__remove_hidden');
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => this._likeElementHandler(evt));
    this._remove.addEventListener('click', (evt) => this._removeElement(evt));
    this._photo.addEventListener('click', () => this._handleCardClick(this._image, this._title));
  }

  _removeElement(evt) {
    evt.target.closest('.element').remove();
  }

  _likeElementHandler(evt) {
    if (evt.target.classList.contains('element__like_active')) {
      evt.target.classList.remove('element__like_active');
      this._deleteLike(this._id);
    } else {
      evt.target.classList.add('element__like_active');
      this._addLike(this._id);
    }
  }
}
