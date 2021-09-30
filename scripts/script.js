try {
  Roblox = Roblox;
  React = React;
} catch {
  throw new Error("Page doesn't have a valid Roblox or React object.");
}

function generateAccount(account) {
  // TODO: React.
  let baseElement = document.createElement("button");
  baseElement.classList.add("account");

  let imageElement = document.createElement("img");
  imageElement.classList.add("account-image");
  imageElement.src = account.image;

  let nameContainer = document.createElement("div");
  nameContainer.classList.add("account-name-container");

  let displayNameElement = document.createElement("p");
  displayNameElement.innerHTML = account.displayName;
  displayNameElement.classList.add("account-display-name");

  let nameElement = document.createElement("p");
  nameElement.innerHTML = "@" + account.name;
  nameElement.classList.add("account-name");

  nameContainer.appendChild(displayNameElement);
  nameContainer.appendChild(nameElement);

  baseElement.appendChild(imageElement);
  baseElement.appendChild(nameContainer);

  return baseElement;
}

const blurObscureOverlay = document.createElement("div");
blurObscureOverlay.classList.add("blur-obscure-overlay");
document.body.appendChild(blurObscureOverlay);

const hideObscureOverlay = document.createElement("div");
hideObscureOverlay.classList.add("hide-obscure-overlay");
hideObscureOverlay.classList.add("hide");
document.body.appendChild(hideObscureOverlay);

function enableBlurObscure() {
  let html = document.documentElement;
  /*
	let yOffset = html.scrollTop + (html.clientHeight/2);
	html.style.transformOrigin = "50vw " + yOffset + "px";
	html.classList.add("obscure");
	*/
  blurObscureOverlay.classList.add("obscure");
  // html.style.overflow = "hidden";
}

function disableBlurObscure() {
  let html = document.documentElement;
  /*
	html.style.overflow = "hidden";
	html.classList.remove("obscure");
	*/
  blurObscureOverlay.classList.remove("obscure");
  setTimeout(() => {
    // html.style.transformOrigin = "";
    // html.style.overflow = "";
  }, 260);
}

function closeAccountDialog(full = true) {
  disableBlurObscure();
  if (full) {
    Roblox.Dialog.close();
  }
}

function openAccountDialog() {
  Roblox.Dialog.close();
  Roblox.Dialog.open({
    titleText: "Roblox Multi Accounts",
    bodyContent: `Please choose an account to swap to.
    <div class="account-store">

    </div>`,
    xToCancel: true,
    acceptText: "Add",
    declineText: "Settings",
    allowHtmlContentInBody: true,
    onDecline: () => {
      alert("decline");
    },
    onAccept: () => {
      alert("accept");
    },
    onCancel: () => {},
    onCloseCallback: () => {
      closeAccountDialog(false);
    },
  });

  // this is a hack because roblox dialogs suck lol
  let modalContainer = document.getElementById("simplemodal-container");
  modalContainer.classList.add("custom-modal");

  /*
  let modalOverlay = document.getElementById("simplemodal-overlay");
  modalOverlay.click = function () {}; // Disable overlay handler
  */

  enableBlurObscure();

  let accountStore = document.getElementsByClassName("account-store")[0];
  let getAccountsEvent = new CustomEvent("PassToBackground", {
    detail: {
      question: "getAccounts",
    },
  });

  window.addEventListener(
    "FG_giveAccounts",
    function (evt) {
      let accounts = evt.detail.accounts;
      console.log(accounts);
      for (let account of accounts) {
        let accountElement = generateAccount(account);
        accountElement.addEventListener("click", function () {
          Roblox.Dialog.close();

          let accountChosenEvent = new CustomEvent("PassToBackground", {
            detail: {
              question: "accountChosen",
              id: account.id,
            },
          });

          hideObscureOverlay.classList.remove("hide");
          setTimeout(() => {
            hideObscureOverlay.classList.add("obscure");
          }, 10);
          setTimeout(() => {
            window.dispatchEvent(accountChosenEvent);
          }, 260);
        });

        accountStore.appendChild(accountElement);
      }
    },
    { once: true }
  );

  window.dispatchEvent(getAccountsEvent);
}

window.addEventListener("FG_openAccountDialog", function (evt) {
  openAccountDialog();
});

let readyEvent = new CustomEvent("PassToBackground", {
  detail: {
    question: "ready",
  },
});
window.dispatchEvent(readyEvent);
