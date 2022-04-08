const elementTemplate = document.querySelector('.element-template').content;
const elementsList = document.querySelector('.elements');
const popupEditForm = document.forms.editForm;
const editButton = document.querySelector('.profile__edit-btn');
const closeButtonProfile = document.querySelector('.popup__close-btn_profile');
const popupTextTypeName = document.querySelector('.popup__text_type_name');
const popupTextTypeAbout = document.querySelector('.popup__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupItemForm = document.forms.itemForm;
const addButton = document.querySelector('.profile__add-btn');
const closeButtonItem = document.querySelector('.popup__close-btn_item');

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

  likeElementHandler(initialCard);
  removeElement(initialCard);

  elementsList.append(initialCard);
});

function likeElementHandler(element) {
  const likeButton = element.querySelector('.element__like');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
}

function removeElement(element) {
  const removeButton = element.querySelector('.element__remove');
  removeButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
}

function newElement(elementTitle, elementImage) {
  const newElement = elementTemplate.cloneNode(true);

  newElement.querySelector('.element__title').textContent = elementTitle;
  newElement.querySelector('.element__photo').src = elementImage;

  likeElementHandler(newElement);
  removeElement(newElement);

  elementsList.prepend(newElement);
}

function showPopupProfile() {
  openClosePopupProfile();
  popupTextTypeName.value = profileName.textContent;
  popupTextTypeAbout.value = profileAbout.textContent;
}

function openClosePopupProfile() {
  const popupProfile = document.querySelector('.popup_profile');
  popupProfile.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupTextTypeName.value;
  profileAbout.textContent = popupTextTypeAbout.value;
  openClosePopupProfile();
}

function addElementHandler(evt) {
  evt.preventDefault();
  const placeName = document.querySelector('.popup__text_place_name');
  const placeUrl = document.querySelector('.popup__text_place_url');
  newElement(placeName.value, placeUrl.value);
  placeName.value = '';
  placeUrl.value = '';
  openClosePopupItem();
}

function openClosePopupItem() {
  const popupItem = document.querySelector('.popup_item');
  popupItem.classList.toggle('popup_opened');
}

editButton.addEventListener('click', showPopupProfile);
popupEditForm.addEventListener('submit', formSubmitHandler);
closeButtonProfile.addEventListener('click', openClosePopupProfile);
addButton.addEventListener('click', openClosePopupItem);
popupItemForm.addEventListener('submit', addElementHandler);
closeButtonItem.addEventListener('click', openClosePopupItem);
