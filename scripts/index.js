const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-btn');
const closeButtonProfile = document.querySelector('.popup__close-btn_profile');
const closeButtonItem = document.querySelector('.popup__close-btn_item');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupTextTypeName = document.querySelector('.popup__text_type_name');
const popupTextTypeAbout = document.querySelector('.popup__text_type_about');
const popupEditForm = document.forms.editForm;
const popupItem = document.querySelector('.popup_item');
const addButton = document.querySelector('.profile__add-btn');
const popupItemForm = document.forms.itemForm;
const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const popupTextPlaceName = document.querySelector('.popup__text_place_name');
const popupTextPlaceUrl = document.querySelector('.popup__text_place_url');
const popupForm = document.querySelector('.popup__form');

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

initialCards.forEach((element) => {
  const initialCard = elementTemplate.cloneNode(true);

  initialCard.querySelector('.element__title').textContent = element.name;
  initialCard.querySelector('.element__photo').src = element.link;

  likeElement(initialCard);

  elementsList.append(initialCard);
});

function newElement(elementTitle, elementImage) {
  const newElement = elementTemplate.cloneNode(true);

  newElement.querySelector('.element__title').textContent = elementTitle;
  newElement.querySelector('.element__photo').src = elementImage;

  likeElement(newElement);

  elementsList.prepend(newElement);
}

function likeElement(element) {
  element.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
}

function addElement(evt) {
  evt.preventDefault();
  const placeName = document.querySelector('.popup__text_place_name');
  const placeUrl = document.querySelector('.popup__text_place_url');
  newElement(placeName.value, placeUrl.value);
  placeName.value = '';
  placeUrl.value = '';
  openClosePopupItem();
}

function openClosePopupProfile() {
  popupProfile.classList.toggle('popup_opened');
}

function openClosePopupItem() {
  popupItem.classList.toggle('popup_opened');
}

function showPopupProfile() {
  openClosePopupProfile();
  popupTextTypeName.value = profileName.textContent;
  popupTextTypeAbout.value = profileAbout.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupTextTypeName.value;
  profileAbout.textContent = popupTextTypeAbout.value;
  openClosePopupProfile();
}

editButton.addEventListener('click', showPopupProfile);
popupEditForm.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openClosePopupItem);
closeButtonProfile.addEventListener('click', openClosePopupProfile);
closeButtonItem.addEventListener('click', openClosePopupItem);
popupItemForm.addEventListener('submit', addElement);

