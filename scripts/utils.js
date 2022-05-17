const popupImg = document.querySelector('.popup-img');
const popupImgPhoto = document.querySelector('.popup-img__photo');
const popupImgTitle = document.querySelector('.popup-img__title');

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  popupType.addEventListener('mousedown', closeByOverlay);
}

export { openPopup, popupImg, popupImgPhoto, popupImgTitle };
