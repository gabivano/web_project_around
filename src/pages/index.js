import "./index.css";
import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { elementArea, avatarBtn } from "../components/utils.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__area",
  avatar: ".profile__image",
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-13",
  headers: {
    authorization: "09ac6562-9d55-490a-8075-542d7a17a753",
    "Content-Type": "application/json",
  },
});

//cards iniciais
api.getUserInfo().then((result) => {
  userInfo.setUserInfo(result);

  api.getInitialCards().then((result) => {
    const cardList = new Section(
      {
        items: result,
        renderer: (item) => {
          console.log(item);
          const cards = new Card(
            item,
            () => {
              popupPicture.handleCardClick(item.name, item.link);
            },
            userInfo._userId,
            () => {
              popupWithConfirmation.open(item._id);
            },
            () => api.addLike(item._id),
            () => api.removeLike(item._id)
          );
          const cardElement = cards.generateCard();
          cardList.addItem(cardElement);
        },
      },
      elementArea
    );

    cardList.renderItems();
  });
});

// Adciona cards. Quando o usuário adiciona um novo cartão, o PopupWithForm coleta os dados do formulário, envia uma requisição à API
//com as informações do novo cartão e, se bem-sucedido, renderiza o novo cartão na interface.
const popupAddCard = new PopupWithForm("#addPostPopup", (input) => {
  console.log(input);
  if (input.link) {
    api.addcards(input).then((result) => {
      const newCard = new Card(
        result,
        () => {
          popupPicture.handleCardClick(result.name, result.link);
        },

        userInfo._userId,
        () => {
          popupWithConfirmation.open(result._id);
        },

        (cardId) => api.addLike(cardId),
        (cardId) => api.removeLike(cardId)
      );
      const newCardElement = newCard.generateCard();
      elementArea.prepend(newCardElement);
      popupAddCard.close();
    });
  }
});
popupAddCard.setEventListeners();

//popup profile (Editar o perfil do usuário)
const popupProfile1 = new PopupWithForm("#editProfilePopup", (inputs) => {
  api.editProfile(inputs).then((result) => {
    userInfo.setUserInfo(result);
    popupProfile1.close();
  });
});
popupProfile1.setEventListeners();

//popup Avatar (específico para o Avatar)
const popupAvatarProfile = new PopupWithForm(
  "#popup-avatar-profile",
  (inputs) => {
    api.editAvatarProfile(inputs).then((result) => {
      userInfo.setUserInfo(result);
      popupAvatarProfile.close();
    });
  }
);
popupAvatarProfile.setEventListeners();

//Visualização de imagens em Popup
const popupPicture = new PopupWithImage("#PopupImage");
popupPicture.setEventListeners();

//popup confirmação de exclusão de cartão
const popupWithConfirmation = new PopupWithConfirmation(
  "#popup-delete-confirmation",
  (cardToDelete) => {
    api.deleteCard(cardToDelete).then(() => {
      popupWithConfirmation.close();
      const card = document.querySelector(`#id_${cardToDelete}`);
      if (card) {
        card.remove();
      }
    });
  }
);
popupWithConfirmation.setEventListeners();

// Event edit button
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    document.querySelector("#name").value = userData.name;
    document.querySelector("#area").value = userData.job;
    popupProfile1.open();
  });

//Event avatar button
avatarBtn.addEventListener("click", function () {
  popupAvatarProfile.open();
});

//event add button
document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupAddCard.open();
});

//Validação de formulários
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

const forms = Array.from(
  document.querySelectorAll(validationSettings.formSelector)
);
forms.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);
  validator.enableValidation();
});
