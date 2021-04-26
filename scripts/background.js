/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

background.js
This is just some boilerplate to only show the page action when you're on roblox.com.
For the main code, see popup.js.

*/

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'roblox.com' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});