export default class Card {
  constructor(
    item,
    handleClickCard,
    userId,
    handleDeleteCard,
    handleLikeCard,
    handleRemoveLike
  ) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._likes = item.likes;
    this._owner = item.owner;
    this._userId = userId;
    this._cardId = item._id;
    this._element = this._getTemplate();
    this._handleClickCard = handleClickCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleRemovelike = handleRemoveLike;

    // popup de imagem
    this._popupImage = document.querySelector(".popup__image");
    this._popupParagraph = document.querySelector(".popup__paragraph");
    this._openPopupImage = document.querySelector("#PopupImage");
    this._closePopupImage = document.querySelector("#CloseImagePopup");
  }

  _getTemplate() {
    return document
      .querySelector("#elements-template")
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _setProperties() {
    this._elementImage = this._element.querySelector(".element__image");
    this._elementName = this._element.querySelector(".element__text");
    this._likeBtn = this._element.querySelector(".element__icon");
    this._dltBtn = this._element.querySelector(".element__button_trash");
    this._imgBtn = this._element.querySelector(".element__image");
    this._fullImg = document.querySelector(".popup__image");
    this._footerimg = document.querySelector(".popup__paragraph");
    this._elementImage.src = this._link;
    this._elementName.textContent = this._name;
    this._popupImg = document.querySelector("#PopupImage");
    if (this._likes.some((item) => item._id === this._userId)) {
      this._likeBtn.classList.toggle("elements__icon-active");
    }
    this._likesCounter = this._element.querySelector(".elements__likes-number");
    this._likesCounter.textContent = this._likes.length;
    this._elementImage.alt = this._name;
    this._element.id = `id_${this._cardId}`;
  }

  _handleLike() {
    this._likeBtn.classList.toggle("elements__icon-active");
  }
  _changeLikeCounter(newArrayLikes) {
    this._likes = newArrayLikes;
    this._likesCounter.textContent = newArrayLikes.length;
  }
  _handleDelete() {
    this._element.remove();
  }
  handleOpenCard() {
    this.handleCardClick(this._name, this._link);
  }
  _setListeners() {
    this._likeBtn.addEventListener("click", () => {
      if (this._likes.some((item) => item._id === this._userId)) {
        this._handleRemovelike(this._cardId).then((cardWithLike) => {
          this._changeLikeCounter(cardWithLike.likes);
          this._handleLike();
        });
      } else {
        this._handleLikeCard(this._cardId).then((cardWithLike) => {
          this._changeLikeCounter(cardWithLike.likes);
          this._handleLike();
        });
      }
    });
    this._dltBtn.addEventListener("click", () => {
      this._handleDeleteCard(this._cardId);
    });
    this._imgBtn.addEventListener("click", () => {
      this._handleClickCard(this._link, this._name);
    });
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _openImage(evt) {
    const card = evt.target.closest(".element");
    const image = card.querySelector(".element__image");
    const paragraph = card.querySelector(".element__text");
    this._popupImage.src = image.src;
    this._popupImage.alt = image.alt;
    this._popupParagraph.textContent = paragraph.textContent;
    this._openPopupImage.classList.add("popup__image_opened");
  }

  _closeImage() {
    this._openPopupImage.classList.remove("popup__image_opened");
  }

  generateCard() {
    this._setProperties();
    this._setListeners();
    return this._element;
  }
}
