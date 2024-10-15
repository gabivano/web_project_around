import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
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

  _toggleTextButton() {
    const textButton = this._form.querySelector(".popup__button");
    let texttoggle = "";
    if (textButton.textContent.trim() === "Salvar") {
      texttoggle = "Salvando...";
    } else if (textButton.textContent.trim() === "Criar") {
      texttoggle = "Criando...";
    } else if (textButton.textContent.trim() === "Salvando...") {
      texttoggle = "Salvar";
    } else if (textButton.textContent.trim() === "Criando...") {
      texttoggle = "Criar";
    }
    textButton.textContent = texttoggle;
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
    this._toggleTextButton();
    super.close();
    this._form.reset();
  }
}
