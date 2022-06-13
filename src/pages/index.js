import './index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithComfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  buttonEdit, buttonAddCard, avatarEdit, popupProfile, popupItem, popupAvatar, cardsContainerSelector, objectConfig
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '63424667-6e61-48dd-be49-243228bff784',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo({
      name: user.name,
      job: user.about
    });
    userInfo.setAvatar({
      avatar: user.avatar
    });
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));


const popupProfileValidation = new FormValidator(objectConfig, popupProfile);
popupProfileValidation.enableValidation();
const popupItemValidation = new FormValidator(objectConfig, popupItem);
popupItemValidation.enableValidation();
const popupAvatarValidation = new FormValidator(objectConfig, popupAvatar);
popupAvatarValidation.enableValidation();

const popupImage = new PopupWithImage('.popup-img');
popupImage.setEventListeners();

const formItem = new PopupWithForm({
  selectorPopup: '.popup_item',
  submitter: (formData) => {
    formItem.changeButtonText('Cохранение...');
    api
      .addCard(formData.place, formData.image)
      .then(card => createCard(card))
      .then(() => formItem.close())
      .catch((err) => console.log(err))
      .finally(() => formItem.changeButtonText('Создать'));
  }
});

formItem.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

const formProfile = new PopupWithForm({
  selectorPopup: '.popup_profile',
  submitter: (formData) => {
    formItem.changeButtonText('Cохранение...');
    api
      .editProfile(formData.name, formData.job)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          job: data.about
        });
      })
      .then(() => formProfile.close())
      .catch((err) => console.log(err))
      .finally(() => formProfile.changeButtonText('Cохранить'));
  }
});

formProfile.setEventListeners();

const formAvatar = new PopupWithForm({
  selectorPopup: '.popup_avatar',
  submitter: (formData) => {
    formItem.changeButtonText('Cохранение...');
    api
      .editAvatar(formData.avatar)
      .then((data) => {
        userInfo.setAvatar({
          avatar: data.avatar
        });
      })
      .then(() => formAvatar.close())
      .catch((err) => console.log(err))
      .finally(() => formAvatar.changeButtonText('Cохранить'));
  }
})

formAvatar.setEventListeners();

const popupRemoveCard = new PopupWithConfirmation('.popup_confirmation');
popupRemoveCard.setEventListeners();

const cardList = new Section({
  renderer: (cardItem) => {
    createCard(cardItem);
  }
},
  cardsContainerSelector
);

function createCard(data) {
  const card = new Card(
    data,
    (image, title) => popupImage.open(image, title),
    () => {
      if (card.isLiked()) {
        api
          .removeLike(data._id)
          .then((data) => card.updateLikes(data))
          .catch((err) => console.log(err));
      } else {
        api
          .addLike(data._id)
          .then((data) => card.updateLikes(data))
          .catch((err) => console.log(err));
      }
    },
    () => {
      popupRemoveCard.open();
      popupRemoveCard.getConfirm(() => {
        popupRemoveCard.changeButtonText('Удаление...');
        api
          .deleteCard(data._id)
          .then(() => card.removeElement())
          .then(() => popupRemoveCard.close())
          .catch((err) => console.log(err))
          .finally(() => popupRemoveCard.changeButtonText('Да'));
      });
    },
    '.element-template',
    userId
  );
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

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

avatarEdit.addEventListener('click', () => {
  popupAvatarValidation.resetErrors();
  popupAvatarValidation.inactiveButtonState();
  formAvatar.open();
});

