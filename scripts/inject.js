/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

inject.js
This inserts the script.js file into the roblox.com website.

*/

let headElement = (document.head || document.documentElement);

let injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('scripts/script.js');
injectedScript.classList.add("multi-accounts-injected-by-jmk-💖");
headElement.appendChild(injectedScript);

window.addEventListener("PassToBackground", function(evt) {
    console.log("HANDING OFF TO BACKGROUND...")
    chrome.runtime.sendMessage(evt.detail);
}, false);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("HANDING OFF TO FOREGROUND...")
    var event = new CustomEvent("PassToForeground", {detail: request});
    window.dispatchEvent(event);
});