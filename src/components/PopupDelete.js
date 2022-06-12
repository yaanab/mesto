export default class PopupDelete extends Popup {
  constructor({ selectorPopup, submitter }) {
    super(selectorPopup);
    this._submitter = submitter;
    this._element = this._popup.querySelector('.popup__form');
}

setEventListeners() {
  super.setEventListeners();

  this._element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._submitter();

    this.close();
  });
}
}
