export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatar }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      userAvatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    if (data) {
      this._nameElement.textContent = data.name;
      this._jobElement.textContent = data.about;
      if (data.avatar) {
        this._avatar.src = data.avatar;
      }
      if (data._id) {
        this._userId = data._id;
      }
    }
  }
}
