import { getToken, setToken } from "../modules/token.js";
import { readTokens, getStoreToken, tokens } from "../modules/tokenmanager.js";

readTokens(function () {
  console.log(tokens);
});

var refreshAccountContainer = false;

var mouseTimer;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("DOMContentLoaded", async () => {
  const addAccountButton = document.getElementById("add-account");
  const logoutAccountButton = document.getElementById("logout-account");
  const logoutAllAccountsButton = document.getElementById("clear-account");
  const showSettingsButton = document.getElementById("settings-button");
  const hideSettingsButton = document.getElementById("close-settings");

  const accountContainer =
    document.getElementsByClassName("account-container")[0];
  const menuContainer = document.getElementsByClassName("menu-container")[0];

  const holdMs = 500;
  let moving = false;
  let movingElement;

  function holdDown(tokenElement) {
    /*
		Called when a button is held down for the amount of miliseconds stored in the holdMs variable.
		*/
    if (moving == false) {
      moving = true;
      movingElement = tokenElement;
      movingElement.classList.add("move-on");
    }
  }

  function refreshAccountContainer() {
    accountContainer.innerHTML = "";
    let orderId = 1;
    for (var key in tokens) {
      if (tokens.hasOwnProperty(key)) {
        let value = tokens[key];
        console.log(value);
        let tokenElement = document.createElement("button");
        tokenElement.classList.add("token-element");
        tokenElement.rbxid = key;
        tokenElement.style.order = orderId;

        tokenElement.addEventListener("click", async () => {
          await setToken(value.token);
        });

        tokenElement.addEventListener("mousedown", function () {
          if (mouseTimer) window.clearTimeout(mouseTimer);
          mouseTimer = window.setTimeout(function () {
            holdDown(tokenElement);
          }, holdMs);
        });

        let tokenTextElement = document.createElement("span");
        tokenTextElement.classList.add("token-text-element");
        tokenTextElement.innerHTML = value.title;

        tokenElement.appendChild(tokenTextElement);

        accountContainer.appendChild(tokenElement);
        orderId++;
      }
    }
  }

  async function getStoreRefreshToken() {
    /*
		Gets the current token with getStoreToken and then refreshes the accout container with refreshAccountContainer.
		*/

    await getStoreToken();
    refreshAccountContainer();
  }

  document.addEventListener("mouseup", function () {
    if (mouseTimer) window.clearTimeout(mouseTimer);
    if (moving) {
      moving = false;
      movingElement.classList.remove("move-on");
    }
  });

  document.addEventListener(
    "mousemove",
    function (event) {
      event.preventDefault();
      if (moving) {
        let activeElement = document.activeElement;
        let rect = activeElement.getBoundingClientRect();
        let deltaY = event.clientY - (rect.y + activeElement.clientHeight / 2);
        let compDeltaY = parseInt(deltaY / activeElement.clientHeight, 10);
        let compOrder = compDeltaY + parseInt(activeElement.style.order);
        activeElement.style.order = compOrder;
        console.log(compDeltaY);
      }
    },
    true
  );

  addAccountButton.addEventListener("click", async () => {
    await getStoreRefreshToken();
  });

  logoutAccountButton.addEventListener("click", async () => {
    await setToken("");
  });

  logoutAllAccountsButton.addEventListener("click", function () {
    areYouSure = confirm(
      "This will remove all accounts from Roblox Multi Accounts."
    );
    if (areYouSure) {
      tokens = {};
      setTokens(function () {
        window.close();
      });
    }
  });

  let allowOpenSettings = true;

  showSettingsButton.addEventListener("click", function () {
    if (allowOpenSettings) {
      menuContainer.classList.remove("hidden");
    }
  });

  hideSettingsButton.addEventListener("click", function () {
    allowOpenSettings = false;
    menuContainer.classList.add("hidden-right");
    setTimeout(function () {
      menuContainer.classList.remove("hidden-right");
      menuContainer.classList.add("notransition");
      menuContainer.classList.add("hidden");
      menuContainer.classList.remove("notransition");
      allowOpenSettings = true;
    }, 500);
  });

  readTokens();

  // alternate handler for "a" elements that works in Chrome extensions.
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    (function () {
      var ln = links[i];
      var loc = ln.href;
      ln.onclick = function () {
        chrome.tabs.create({ active: true, url: loc });
      };
    })();
  }
});
