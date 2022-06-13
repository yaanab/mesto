export default class Card {
  constructor(data, handleCardClick, handleLikeClick, deleteCard, cardSelector, userId) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._ownerId = data.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._deleteCard = deleteCard;

    this._cardSelector = cardSelector;
    this._userId = userId;
  }

  _getTemplate() {
    const elementTemplate = document.querySelector(this._cardSelector).content;
    const element = elementTemplate.querySelector('.element');
    const cardNew = element.cloneNode(true);
    this._element = cardNew;
  }

  createCard() {
    this._getTemplate();
    this._photo = this._element.querySelector('.element__photo');
    this._remove = this._element.querySelector('.element__remove');
    this._like = this._element.querySelector('.element__like-btn');
    this._counter = this._element.querySelector('.element_like-counter');

    this._element.querySelector('.element__title').textContent = this._title;
    this._counter.textContent = this._likes.length;
    this._photo.src = this._image;
    this._photo.alt = this._title;

    if (this._ownerId !== this._userId) {
      this._remove.classList.add('element__remove_hidden');
    }

    if (this.isLiked()) {
      this._activeLikeButton();
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => this._handleLikeClick());
    this._remove.addEventListener('click', () => this._deleteCard(this._id));
    this._photo.addEventListener('click', () => this._handleCardClick(this._image, this._title));
  }

  removeElement() {
    this._element.remove();
  }

  isLiked() {
    const userLike = this._likes.find((item) => item._id === this._userId);
    return Boolean(userLike);
  }

  updateLikes(data) {
    this._likes = data.likes;
    this._counter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._activeLikeButton();
    } else {
      this._inactiveLikeButton()
    }
  }

  _activeLikeButton() {
    this._like.classList.add('element__like-btn_active');
  }

  _inactiveLikeButton() {
    this._like.classList.remove('element__like-btn_active');
  }
}
