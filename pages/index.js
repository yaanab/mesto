import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
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
    const card = new Card({
      name: cardItem.name,
      link: cardItem.link,
      handleCardClick: (image, title) => {
        const popupImage = new PopupWithImage('.popup-img', image, title);
        popupImage.open();
      }
    },
      '.element-template'
    );
    const cardElement = card.createCard();

    cardList.addItem(cardElement);
  }
},
  cardsContainerSelector
);

cardList.renderItems();

const formItem = new PopupWithForm({
  selectorPopup: '.popup_item',
  submitter: (formData) => {
    const card = new Card({
      name: formData.place,
      link: formData.image,
      handleCardClick: (image, title) => {
        const popupImage = new PopupWithImage('.popup-img', image, title);
        popupImage.open();
      }
    },
      '.element-template'
    );
    const cardElement = card.createCard();

    cardList.addItem(cardElement);
  }
});

const formRenderer = new Section({
  items: []
},
  cardsContainerSelector
);

const formElement = formItem.generateForm();

formRenderer.renderItems(formElement);
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

// function addElementHandler(evt) {
//   evt.preventDefault();
//   renderCard(createCard(placeName.value, placeUrl.value));
//   closePopup(popupItem);
//   popupItemValidation.inactiveButtonState();
// }

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

// function showPopupItem() {
//   popupItemValidation.resetErrors();
//   popupItemForm.reset();!!!!!!!!!!!!!!!!
//   openPopup(popupItem);
// }

buttonAddCard.addEventListener('click', popupItemValidation.resetErrors.bind(popupItemValidation));
buttonAddCard.addEventListener('click', popupItemValidation.inactiveButtonState.bind(popupItemValidation));
buttonAddCard.addEventListener('click', formItem.open.bind(formItem));


buttonEdit.addEventListener('click', showPopupProfile);
popupEditForm.addEventListener('submit', submitProfileForm);



// popupItemForm.addEventListener('submit', addElementHandler);
// buttonAddCard.addEventListener('click', showPopupItem);
// buttonClosePopupItem.addEventListener('click', () => closePopup(popupItem));
// buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
// buttonClosePopupImage.addEventListener('click', () => closePopup(popupImg));
