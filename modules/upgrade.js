/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

upgrade.js
This file is a library for upgrading a group of pre-rewrite userTokens to v1 userTokens.

*/

import * as userTokens from "./user-tokens.js";

export async function updateTokens(oldTokens) {
  let newTokens = [];

  let order = 1;
  for (let key in oldTokens) {
    let value = oldTokens[key];
    let token = value.token;
    let newToken = await userTokens.generateUserToken(key, token);
    newToken.order = order;
    newTokens.push(newToken);
    order++;
  }

  return newTokens;
}
