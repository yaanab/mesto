export default class UserInfo {
  constructor (nameProfile, jobProfile, avatar) {
    this._userName = document.querySelector(nameProfile);
    this._userInfo = document.querySelector(jobProfile);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userProfile = {};
    userProfile.name = this._userName.textContent;
    userProfile.job = this._userInfo.textContent;

    return userProfile;
  }

  setUserInfo({ name, job }) {
    this._userName.textContent = name;
    this._userInfo.textContent = job;
  }

  setAvatar({ avatar }) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
