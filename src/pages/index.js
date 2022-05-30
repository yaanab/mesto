import './index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards, buttonEdit, buttonAddCard, popupProfile, popupItem, nameProfile,
  jopProfile, cardsContainerSelector, objectConfig
} from '../utils/constants.js';

const popupProfileValidation = new FormValidator(objectConfig, popupProfile);
popupProfileValidation.enableValidation();
const popupItemValidation = new FormValidator(objectConfig, popupItem);
popupItemValidation.enableValidation();

const popupImage = new PopupWithImage('.popup-img');
popupImage.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card({
      name: cardItem.name,
      link: cardItem.link
  },
      (image, title) => {
        popupImage.open(image, title);
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
      link: formData.image
    },
      (image, title) => {
        popupImage.open(image, title);
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

// const formElement = formItem.generateForm(); genetate убрала из PopupwithForm

const formElement = formItem.setEventListeners();

formRenderer.renderItems(formElement);

const formProfile = new PopupWithForm({
  selectorPopup: '.popup_profile',
  submitter: (formData) => {
    const userInfo = new UserInfo(formData.name, formData.job);
    userInfo.setUserInfo();
  }
});

// formProfile.generateForm(); genetate убрала из PopupwithForm

formProfile.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupItemValidation.resetErrors();
  popupItemValidation.inactiveButtonState();
  formItem.open();
});

buttonEdit.addEventListener('click', () => {
  popupProfileValidation.resetErrors();
  popupItemValidation.inactiveButtonState();

  const userInfo = new UserInfo(nameProfile.textContent, jopProfile.textContent);
  const profileInfo = userInfo.getUserInfo();
  formProfile.popupValues(profileInfo);

  formProfile.open();
});

