import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import SubmitForm from '../components/SubmitForm.js';
import { openPopup, closePopup } from '../utils/utils.js';
import {
  initialCards, buttonEdit, buttonAddCard, buttonClosePopupProfile, buttonClosePopupItem, buttonClosePopupImage,
  popupProfile, popupItem, nameProfile, jopProfile, popupEditForm, popupTextTypeName, popupTextTypeAbout,
  popupItemForm, placeName, placeUrl, cardsContainerSelector, objectConfig, popupImg
} from '../utils/constants.js';

const popupProfileValidation = new FormValidator(objectConfig, popupProfile);
popupProfileValidation.enableValidation();
const popupItemValidation = new FormValidator(objectConfig, popupItem);
popupItemValidation.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem.name, cardItem.link, '.element-template');
    const cardElement = card.createCard();

    cardList.addItem(cardElement);
  }
},
  cardsContainerSelector
);

cardList.renderItems();

// function renderCard(card) {
//   cardsContainer.prepend(card);
// }

// function createCard(cardTitle, cardImage) {
//   const card = new Card(cardTitle, cardImage, '.element-template');
//   const cardElement = card.createCard();
//   return cardElement;
// }

// initialCards.forEach((element) => {
//   renderCard(createCard(element.name, element.link));
// });

// const form = new SubmitForm({
//   formSelector: '.popup_item',
//   handleFormSubmit: (formData) => {
//     const card = new Card(formData.place, formData.image, '.element-template');
//     const cardElement = card.createCard();

//     cardList.setItem(cardElement);
//   }
// });

// const formRenderer = new Section({
//   items: [],
// },
//   cardsContainerSelector
// );

// const formElement = form.generateForm();

// formRenderer.setItem(formElement);


function addElementHandler(evt) {
  evt.preventDefault();
  renderCard(createCard(placeName.value, placeUrl.value));
  closePopup(popupItem);
  popupItemValidation.inactiveButtonState();
}

function showPopupProfile() {
  popupProfileValidation.resetErrors();
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

function showPopupItem() {
  popupItemValidation.resetErrors();
  popupItemForm.reset();
  openPopup(popupItem);
}

buttonEdit.addEventListener('click', showPopupProfile);
popupEditForm.addEventListener('submit', submitProfileForm);
popupItemForm.addEventListener('submit', addElementHandler);
buttonAddCard.addEventListener('click', showPopupItem);
buttonClosePopupItem.addEventListener('click', () => closePopup(popupItem));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImg));
