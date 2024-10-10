export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    console.log("FormValidator initialized", this._settings, this._formElement);
  }

  _showInputError(inputElement, errorMessage) {
    console.log("Showing input error", inputElement, errorMessage);
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    console.log(inputElement.id);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    console.log("Hiding input error", inputElement);
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _getErrorMessage(inputElement) {
    console.log("Getting error message for", inputElement);
    if (inputElement.validity.valueMissing) {
      return "Preencha esse campo.";
    }
    if (inputElement.validity.tooShort) {
      return "Preencha esse campo.";
    }
    if (inputElement.validity.typeMismatch && inputElement.type === "url") {
      return "Por favor, insira um endereço web.";
    }
  }

  _checkInputValidity(inputElement) {
    console.log("Checking input validity for", inputElement);
    if (!inputElement.validity.valid) {
      const errorMessage = this._getErrorMessage(inputElement);
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    const invalid = this._inputList.some((inputElement) => {
      const validity = !inputElement.validity.valid;
      console.log("Checking if input is invalid", inputElement, validity);
      return validity;
    });
    console.log("Has invalid input:", invalid);
    return invalid;
  }

  _toggleButtonState() {
    console.log("Toggling button state");
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
      console.log("Button disabled");
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
      console.log("Button enabled");
    }
  }

  _setEventListeners() {
    console.log("Setting event listeners");
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log("Input event detected", inputElement);
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    console.log("Enabling validation");
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("Form submission prevented");
    });

    this._setEventListeners();
  }
}
