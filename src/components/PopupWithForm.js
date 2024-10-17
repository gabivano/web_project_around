import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._textButton = this._form.querySelector(".popup__button");
  }

  getUserInfo() {
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    const name = document.querySelector(".profile__name").textContent;
    const about = document.querySelector(".profile__area").textContent;
    const inputValues = { name, about };
    const inputForms = Array.from(form.elements);
    inputForms.forEach((element) => {
      if (element.name) {
        element.value = inputValues[element.name];
      }
    });
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  open() {
    if (this._textButton.textContent.trim() === "Salvando...") {
      this._textButton.textContent = "Salvar";
    }
    if (this._textButton.textContent.trim() === "Criando...") {
      this._textButton.textContent = "Criar";
    }
    super.open();
  }

  _toggleTextButton() {
    if (this._textButton.textContent.trim() === "Salvar") {
      this._textButton.textContent = "Salvando...";
    } else if (this._textButton.textContent.trim() === "Criar") {
      this._textButton.textContent = "Criando...";
    } else if (this._textButton.textContent.trim() === "Salvando...") {
      this._textButton.textContent = "Salvar";
    } else if (this._textButton.textContent.trim() === "Criando...") {
      this._textButton.textContent = "Criar";
    }
  }

  _loading(isLoading) {
    if (isLoading) {
      this._toggleTextButton();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._loading(true);
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
