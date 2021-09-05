/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

user-tokens.js
This file is a library for creating and managing userTokenElements.

*/

import * as rbx from "./rbx.js";

export async function generateUserToken(userId, token) {
  let userToken = {};
  let userInfo = await rbx.getUser(userId);
  // let userHeaderInfo = await rbx.getUserProfileHeader(userId)

  userToken.value = token;
  userToken.id = userInfo.id;
  userToken.name = userInfo.name;
  // userToken.premium = userHeaderInfo.IsVieweePremiumOnlyUser

  return userToken;
}

export async function updateUserToken(userToken) {
  let userInfo = await rbx.getUser(userToken.id);

  userToken.name = userInfo.name;

  return userToken;
}
