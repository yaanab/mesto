import Card from './Сard.js'
export default class Section {
  constructor({ items }, containerSelector) {
    this._items = items;
    // this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((element) => {
      const card = new Card(element.name, element.link, '.element-template');
      const cardElement = card.createCard();

      this.setItem(cardElement);
    });
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
