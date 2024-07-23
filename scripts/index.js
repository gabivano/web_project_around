import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

// Elementos do DOM
const editButton = document.querySelector(".profile__edit-button");
const miPopup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__button-closed");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__description");
const saveButton = document.querySelector(".popup__button-create");
const profileText = document.querySelector(".profile__text");
const profileProfession = document.querySelector(".profile__profession");
const templateSelector = ".template-card";
const cardZone = document.querySelector(".elements");
const buttonAddCard = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#popup-card");
const formCardPopup = document.querySelector(".popup__card-form");
const inputCardTitle = document.querySelector(".popup__card-title");
const inputUrl = document.querySelector(".popup__card-url");
const buttonCloseAddCard = document.querySelector(".popup__card-button-closed");
const popupImage = document.querySelector("#popup-image");
const buttonClosePopupImage = document.querySelector(
  ".popup__image-button-closed"
);

// Dados iniciais dos cartões
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Funções
function openImagePopup(link, name) {
  openPopup(popupImage);
  const popupPhoto = popupImage.querySelector(".popup__image-photo");
  const popupTitle = popupImage.querySelector(".popup__image-name");

  popupPhoto.src = link;
  popupTitle.textContent = name;
  popupPhoto.alt = name;
}

function saveChanges() {
  profileText.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closePopup(miPopup);
}

// Adiciona os eventos
editButton.addEventListener("click", () => openPopup(miPopup));
closeButton.addEventListener("click", () => closePopup(miPopup));
saveButton.addEventListener("click", saveChanges);
buttonAddCard.addEventListener("click", () => openPopup(cardPopup));
buttonCloseAddCard.addEventListener("click", () => closePopup(cardPopup));
buttonClosePopupImage.addEventListener("click", () => closePopup(popupImage));

formCardPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = new Card(
    inputCardTitle.value,
    inputUrl.value,
    templateSelector,
    openImagePopup
  );
  cardZone.prepend(card.generateCard());
  closePopup(cardPopup);
});

// Adiciona os cartões iniciais
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, templateSelector, openImagePopup);
  cardZone.append(card.generateCard());
});

// Configurações de validação
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
};

// Habilita a validação
const forms = Array.from(
  document.querySelectorAll(validationSettings.formSelector)
);
forms.forEach((form) => {
  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
});

// Evento de clique no overlay do popup
const popupOverlay = document.querySelectorAll(".popup__overlay");
popupOverlay.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    closePopup(overlay.parentNode);
  });
});
