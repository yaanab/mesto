import Popup from './Popup.js';

export default class PopupWithComfirmation extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._button = this._popup.querySelector('.popup__submit-btn');
}

getConfirm(remove) {
  this._deleteCard = remove;
}

setEventListeners() {
  super.setEventListeners();

  this._button.addEventListener('click', () => {
    this._deleteCard();
    this.close();
  });
}
}
