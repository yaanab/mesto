import { initialCards } from './cards.js';
const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');
const buttonClosePopupProfile = document.querySelector('.popup__close-btn_profile');
const buttonClosePopupItem = document.querySelector('.popup__close-btn_item');
const buttonClosePopupImage = document.querySelector('.popup-img__close-btn');
const popupProfile = document.querySelector('.popup_profile');
const popupItem = document.querySelector('.popup_item');
const popupImg = document.querySelector('.popup-img');
const nameProfile = document.querySelector('.profile__name');
const jopProfile = document.querySelector('.profile__about');
const popupEditForm = document.forms.editForm;
const popupTextTypeName = popupEditForm.elements.name;
const popupTextTypeAbout = popupEditForm.elements.job;
const popupItemForm = document.forms.itemForm;
const placeName = popupItemForm.elements.place;
const placeUrl = popupItemForm.elements.image;
const buttonSubmit = document.querySelector('.popup__submit-btn_item');
const elementTemplate = document.querySelector('.element-template').content;
const cardsContainer = document.querySelector('.elements');
const popupImgPhoto = document.querySelector('.popup-img__photo');
const popupImgTitle = document.querySelector('.popup-img__title');
const ESC_CODE = 'Escape';
class Card {
  constructor(name, link) {
    this._title = name;
    this._image = link;
  }

  _getTemplate() {
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
    popupImgPhoto.src = this._image;
    popupImgPhoto.alt = this._title;
    popupImgTitle.textContent = this._title;
    openPopup(popupImg);
  }

  _likeElementHandler(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}

function renderCard(card) {
  cardsContainer.prepend(card);
}

initialCards.forEach((element) => {
  const card = new Card(element.name, element.link);
  const cardElement = card.createCard();
  renderCard(cardElement);
});

function addElementHandler(evt) {
  evt.preventDefault();
  const card = new Card(placeName.value, placeUrl.value);
  const cardElement = card.createCard();
  renderCard(cardElement);
  closePopup(popupItem);
  popupItemForm.reset();
  buttonSubmit.classList.add('popup__submit-btn_disabled');
  buttonSubmit.setAttribute('disabled', '');
}

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  popupType.addEventListener('mousedown', closeByOverlay);
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  popupType.removeEventListener('mousedown', closeByOverlay);
}

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function showPopupProfile() {
  popupTextTypeName.value = nameProfile.textContent;
  popupTextTypeAbout.value = jopProfile.textContent;
  openPopup(popupProfile);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = popupTextTypeName.value;
  jopProfile.textContent = popupTextTypeAbout.value;
  closePopup(popupProfile);
}

buttonEdit.addEventListener('click', showPopupProfile);
popupEditForm.addEventListener('submit', submitProfileForm);
popupItemForm.addEventListener('submit', addElementHandler);
buttonAddCard.addEventListener('click', () => openPopup(popupItem));
buttonClosePopupItem.addEventListener('click', () => closePopup(popupItem));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImg));
