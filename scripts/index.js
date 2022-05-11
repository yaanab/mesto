import { Card } from './Сard.js';
import { initialCards } from './elements.js';
import { FormValidator } from './FormValidator.js';

const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');
const buttonClosePopupProfile = document.querySelector('.popup__close-btn_profile');
const buttonClosePopupItem = document.querySelector('.popup__close-btn_item');
const buttonClosePopupImage = document.querySelector('.popup-img__close-btn');
const popupProfile = document.querySelector('.popup_profile');
const popupItem = document.querySelector('.popup_item');
export const popupImg = document.querySelector('.popup-img');
const nameProfile = document.querySelector('.profile__name');
const jopProfile = document.querySelector('.profile__about');
const popupEditForm = document.forms.editForm;
const popupTextTypeName = popupEditForm.elements.name;
const popupTextTypeAbout = popupEditForm.elements.job;
const popupItemForm = document.forms.itemForm;
const placeName = popupItemForm.elements.place;
const placeUrl = popupItemForm.elements.image;
const cardsContainer = document.querySelector('.elements');
const ESC_CODE = 'Escape';
const objectConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
  }

const popupProfileValidation = new FormValidator(objectConfig, popupProfile);
popupProfileValidation.enableValidation();
const popupItemValidation = new FormValidator(objectConfig, popupItem);
popupItemValidation.enableValidation();

function renderCard(card) {
  cardsContainer.prepend(card);
}

function createCard(cardTitle, cardImage) {
  const card = new Card(cardTitle, cardImage);
  const cardElement = card.createCard();
  return cardElement;
}

initialCards.forEach((element) => {
  renderCard(createCard(element.name, element.link));
});

function addElementHandler(evt) {
  evt.preventDefault();
  renderCard(createCard(placeName.value, placeUrl.value));
  closePopup(popupItem);
  popupItemValidation.inactiveButtonState();
}

export function openPopup(popupType) {
  if (popupType === popupItem) {
    popupItemValidation.resetErrors();
    popupItemForm.reset();
  } else if (popupType === popupProfile) {
    popupProfileValidation.resetErrors();
  }
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
