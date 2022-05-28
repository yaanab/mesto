import {  nameProfile, jopProfile } from '../utils/constants.js';

export default class UserInfo {
  constructor (userName, userInfo) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
    const userProfile = {};
    userProfile.name = this._userName;
    userProfile.job = this._userInfo;

    return userProfile;
  }

  setUserInfo() {
    nameProfile.textContent = this._userName;
    jopProfile.textContent = this._userInfo;
  }
}
