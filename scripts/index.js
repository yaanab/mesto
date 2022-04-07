const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupTextTypeName = document.querySelector('.popup__text_type_name');
const popupTextTypeAbout = document.querySelector('.popup__text_type_about');
const popupForm = document.forms.editform;
const popupItem = document.querySelector('.popup_item');
const addButton = document.querySelector('.profile__add-btn');

function showPopupProfile() {
  popupProfile.classList.add('popup_opened');
  popupTextTypeName.value = profileName.textContent;
  popupTextTypeAbout.value = profileAbout.textContent;
}

function closePopeup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupTextTypeName.value;
  profileAbout.textContent = popupTextTypeAbout.value;
  closePopeup();
}

function showPopupItem() {
  popupItem.classList.add('popup_opened');
}

editButton.addEventListener('click', showPopupProfile);
closeButton.addEventListener('click', closePopeup);
popupForm.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', showPopupItem);

