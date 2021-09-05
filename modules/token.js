/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

token.js
This file is a library for accessing the .ROBLOSECURITY token.

*/

let getCookieDetails = {
  url: "https://www.roblox.com",
  name: ".ROBLOSECURITY",
};

function generateSetCookieDetails(value) {
  let setCookieDetails = {
    domain: ".roblox.com",
    httpOnly: true,
    name: ".ROBLOSECURITY",
    path: "/",
    url: "https://www.roblox.com/",
    value: value,
  };
  return setCookieDetails;
}

export function get() {
  return new Promise((resolve, reject) => {
    chrome.cookies.get(getCookieDetails, function (cookie) {
      resolve(cookie);
    });
  });
}

export function set(value) {
  return new Promise((resolve, reject) => {
    chrome.cookies.set(generateSetCookieDetails(value), function (cookie) {
      resolve(cookie);
    });
  });
}
