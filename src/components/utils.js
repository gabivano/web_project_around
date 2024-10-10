export const elementArea = document.querySelector(".elements");
export const avatarBtn = document.querySelector(".profile__avatar-edit");

//botao edit profile

const editProfile = document.querySelector(".profile__edit-button");
const popupOpen = document.querySelector("#editProfilePopup");
const popupClose = document.querySelector("#closePopupButton");

//funções edit

export function openPopup() {
  popupOpen.classList.add("popup_opened");
}

export function closePopup() {
  popupOpen.classList.remove("popup_opened");
}

//eventos edit profile

editProfile.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);

//botao add post

const addPost = document.querySelector(".profile__add-button");
const addPostPopup = document.querySelector("#addPostPopup");
const addClosePopup = document.querySelector("#CloseAddPopup");

//funções add

export function openAddPost() {
  addPostPopup.classList.add("popup_opened");
}

export function closeAddPost() {
  addPostPopup.classList.remove("popup_opened");
}

//eventos add post

addPost.addEventListener("click", openAddPost);
addClosePopup.addEventListener("click", closeAddPost);

//close popup click fora

popupOpen.addEventListener("click", function (evt) {
  if (evt.target === popupOpen) {
    closePopup();
  }
});

addPostPopup.addEventListener("click", function (evt) {
  if (evt.target === addPostPopup) {
    closeAddPost();
  }
});

//esc close popup

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");

    if (openedPopup) {
      closePopup(openedPopup);
      closeAddPost(openedPopup);
    }
  }
});
