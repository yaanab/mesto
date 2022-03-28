let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupTextTypeName = document.querySelector('.popup__text_type_name');
let popupTextTypeAbout = document.querySelector('.popup__text_type_about');
let popupForm = document.forms.editform;

function showPopap() {
  popup.classList.add('popup_opened');
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

editButton.addEventListener('click', showPopap);
closeButton.addEventListener('click', closePopeup);
popupForm.addEventListener('submit', formSubmitHandler);
