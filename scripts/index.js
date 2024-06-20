//Botão de editar
const editButton = document.querySelector(".profile__pen-button");
const saveButton = document.querySelector(".popup__save-button");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__form");

function openPopUp() {
  let popup = document.querySelector(".popup");

  popup.classList.add("popup__opened");
}

function closePopUp() {
  let popup = document.querySelector(".popup");

  popup.classList.remove("popup__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name").value;
  let aboutInput = document.querySelector("#about").value;

  let userName = document.querySelector(".profile__author-name");
  let userAbout = document.querySelector(".profile__explore");

  userName.textContent = nameInput;
  userAbout.textContent = aboutInput;

  closePopUp();
}

editButton.addEventListener("click", openPopUp);
closeButton.addEventListener("click", closePopUp);
formElement.addEventListener("submit", handleProfileFormSubmit);

//Botão de adicionar
const addCardButton = document.querySelector(".profile__add-button");
const saveCardButton = document.querySelector(".popup-add-card__create-button");
const closeCardButton = document.querySelector(".popup-add-card__close-icon");
const formCardElement = document.querySelector(".popup-add-card__form");

function openCardPopUp() {
  let popup = document.querySelector(".popup-add-card");

  popup.classList.add("popup__opened");
}

function closeCardPopUp() {
  let popup = document.querySelector(".popup-add-card");

  popup.classList.remove("popup__opened");
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  let titleInput = document.querySelector("#title").value;
  let linkInput = document.querySelector("#link-input").value;

  closePopUp();
}

addCardButton.addEventListener("click", openCardPopUp);
closeCardButton.addEventListener("click", closeCardPopUp);
formCardElement.addEventListener("submit", handleCardFormSubmit);

//Cards
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const template = document.querySelector(".elements__template");
const cardArea = document.querySelector(".elements__rectangle");

function createCard(name, link) {
  const card = template
    .cloneNode(true)
    .content.querySelector(".elements__card");
  const cardImage = card.querySelector(".elements__image");
  const cardText = card.querySelector(".elements__text");
  const cardTrashButton = card.querySelector(".elements__button_type_trash");
  const cardLikeButton = card.querySelector(".elements__button_type_like");
  const cardWindow = card.querySelector(".elements__window");
  const buttonCardImage = card.querySelector(".elements__image-button");
  const cardWindowImage = card.querySelector(".elements__window-image");
  const cardWindowName = card.querySelector(".elements__window-name");
  const windowCloseButton = card.querySelector("#window-close-button");

  cardImage.src = link;
  cardText.textContent = name;
  cardImage.alt = name;
  cardWindowImage.src = link;
  cardWindowImage.alt = name;
  cardWindowName.textContent = name;

  cardTrashButton.addEventListener("click", function () {
    card.remove();
  });

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("elements__button_type_like-active");
  });

  buttonCardImage.addEventListener("click", function () {
    cardWindow.classList.toggle("elements__window_opened");
  });

  windowCloseButton.addEventListener("click", function () {
    cardWindow.classList.remove("elements__window_opened");
  });

  return card;
}

initialCards.forEach(function (element) {
  const firstcards = createCard(element.name, element.link);
  cardArea.append(firstcards);
});

const formAddCard = document.querySelector(".popup-add-card__form");
const titleInput = document.querySelector("#title");
const linkInput = document.querySelector("#link-input");

formAddCard.addEventListener("submit", function () {
  const title = titleInput.value;
  const link = linkInput.value;
  const createdCard = createCard(title, link);
  cardArea.prepend(createdCard);
  formAddCard.reset();
  closeCardPopUp();
});
