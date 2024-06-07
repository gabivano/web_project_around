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

  let userName = document.querySelector(".profile__name");
  let userAbout = document.querySelector(".profile__about");


  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value;

  closePopUp();
}

editButton.addEventListener("click", openPopUp);
closeButton.addEventListener("click", closePopUp);
formElement.addEventListener("click", handleProfileFormSubmit);
