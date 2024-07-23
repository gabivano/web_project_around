export class Card {
  constructor(name, link, templateSelector, openPopupCallback) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openPopupCallback = openPopupCallback;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__image-trash")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._element
      .querySelector(".elements__image-like")
      .addEventListener("click", (event) => {
        event.target.classList.toggle("elements__image-like_active");
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._openPopupCallback(this._link, this._name);
      });
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".elements__image");
    this._element.querySelector(".elements__title").textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
