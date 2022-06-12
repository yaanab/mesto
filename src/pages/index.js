import './index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  initialCards, buttonEdit, buttonAddCard, popupProfile, popupItem, cardsContainerSelector, objectConfig
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '63424667-6e61-48dd-be49-243228bff784',
    'Content-Type': 'application/json'
  }
});

let userId;

api.getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      job: user.about
    });
    userId = user._id;
  });

api.getInitialCards()
  .then(cards => cardList.renderItems(cards));

const popupProfileValidation = new FormValidator(objectConfig, popupProfile);
popupProfileValidation.enableValidation();
const popupItemValidation = new FormValidator(objectConfig, popupItem);
popupItemValidation.enableValidation();

function createCard(data) {
  const card = new Card(
    data,
    (image, title) => popupImage.open(image, title),
    () => api.removeLike(data._id),
    () => api.addLike(data._id),
    '.element-template',
    userId
  );
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

const popupImage = new PopupWithImage('.popup-img');
popupImage.setEventListeners();

const cardList = new Section({
  renderer: (cardItem) => {
    createCard(cardItem);
  }
},
  cardsContainerSelector
);

const formItem = new PopupWithForm({
  selectorPopup: '.popup_item',
  submitter: (formData) => {
    api.addCard(formData.place, formData.image)
      .then(card => createCard(card));
  }
});

formItem.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__about');

const formProfile = new PopupWithForm({
  selectorPopup: '.popup_profile',
  submitter: (formData) => {
    api.editProfile(formData.name, formData.job)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          job: data.about
        });
      });
  }
});

formProfile.setEventListeners();



buttonAddCard.addEventListener('click', () => {
  popupItemValidation.resetErrors();
  popupItemValidation.inactiveButtonState();
  formItem.open();
});

buttonEdit.addEventListener('click', () => {
  popupProfileValidation.resetErrors();
  popupProfileValidation.inactiveButtonState();

  const profileInfo = userInfo.getUserInfo();
  formProfile.popupValues(profileInfo);

  formProfile.open();
});

