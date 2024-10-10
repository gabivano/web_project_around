import Popup from "../components/popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._formElement = document.querySelector("#popupFormConfirmation");
    this.cardId = "";
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._formElement.querySelector(".popup__button"));
    console.log("sabado");
    this._formElement
      .querySelector(".popup__button")
      .addEventListener("click", (evt) => {
        console.log("testando");
        evt.preventDefault();
        this._handleConfirmation(this.cardId);
        super.close();
      });
  }

  open(cardId) {
    this.cardId = cardId;
    super.open();
  }

  close() {
    super.close();
  }
}
