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
    chrome.runtime.sendMessage(evt.detail);
}, false);

window.addEventListener("PassToForeground", function(evt) {
    var event = new CustomEvent("PassToForeground", {detail: evt.detail});
    window.dispatchEvent(event);
}, false);