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
const elementTemplate = document.querySelector('.element-template').content;
const cardsContainer = document.querySelector('.elements');
const popupImgPhoto = document.querySelector('.popup-img__photo');
const popupImgTitle = document.querySelector('.popup-img__title');

const initialCards = [
  {
    name: 'Кинерма',
    link: 'https://images.unsplash.com/photo-1559029881-7cfd01ac1f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'
  },
  {
    name: 'Красноярск',
    link: 'https://images.unsplash.com/photo-1597125760773-b0166e249ea7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Москва Сити',
    link: 'https://images.unsplash.com/photo-1579193079451-ce63e71db675?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1519906448142-1176f5530f5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80'
  },
  {
    name: 'Онежское озеро',
    link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1570720742937-423ec1d7a3e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=326&q=80'
  }
];

function createCard(cardTitle, cardImage) {
  const cardNew = elementTemplate.cloneNode(true);

  cardNew.querySelector('.element__title').textContent = cardTitle;
  cardNew.querySelector('.element__photo').src = cardImage;
  cardNew.querySelector('.element__photo').alt = cardTitle;

  return cardNew;
}

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__like')) {
    likeElementHandler(evt);
  } else if (evt.target.classList.contains('element__remove')) {
    removeElement(evt);
  } else if (evt.target.classList.contains('element__photo')) {
    showPopupImage(evt.target.alt, evt.target.src);
  }
});

function likeElementHandler(evt) {
  evt.target.classList.toggle('element__like_active');
}

function removeElement(evt) {
  evt.target.closest('.element').remove();
}

function showPopupImage(title, image) {
  popupImgPhoto.src = image;
  popupImgPhoto.alt = title;
  popupImgTitle.textContent = title;
  openPopup(popupImg);
}

function renderCard(card) {
  cardsContainer.prepend(card);
}

initialCards.forEach(function (element) {
  renderCard(createCard(element.name, element.link));
});

function addElementHandler(evt) {
  evt.preventDefault();
  renderCard(createCard(placeName.value, placeUrl.value));
  closePopup(popupItem);
  popupItemForm.reset();
}

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popupType);
    }
  });
  popupType.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popupType);
    }
  })
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');

}

function showPopupProfile() {
  popupTextTypeName.value = nameProfile.textContent;
  popupTextTypeAbout.value = jopProfile.textContent;
  openPopup(popupProfile);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = popupTextTypeName.value;
  jopProfile.textContent = popupTextTypeAbout.value;
  closePopup(popupProfile);
}

buttonEdit.addEventListener('click', showPopupProfile);
popupEditForm.addEventListener('submit', formSubmitHandler);
popupItemForm.addEventListener('submit', addElementHandler);
buttonAddCard.addEventListener('click', () => openPopup(popupItem));
buttonClosePopupItem.addEventListener('click', () => closePopup(popupItem));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImg));
