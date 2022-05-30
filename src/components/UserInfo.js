export default class UserInfo {
  constructor (nameProfile, jobProfile) {
    this._userName = document.querySelector(nameProfile);
    this._userInfo = document.querySelector(jobProfile);
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
}
