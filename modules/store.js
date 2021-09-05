/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

store.js
This file is an asynchronous wrapper for chrome.storage.sync.

*/

export function get(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, function (items) {
      resolve(items);
    });
  });
}

export function set(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, function () {
      resolve();
    });
  });
}
