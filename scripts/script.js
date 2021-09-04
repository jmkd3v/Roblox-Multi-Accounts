function generateAccount(name, image) {
	// TODO: React.
	let baseElement = document.createElement("button");
	baseElement.classList.add("account");

	let imageElement = document.createElement("img");
	imageElement.classList.add("account-image");
	imageElement.src = image;

	let nameElement = document.createElement("p");
	nameElement.innerHTML = name;

	baseElement.appendChild(imageElement);
	baseElement.appendChild(nameElement);

	return baseElement;
}

function openAccountDialog() {
	Roblox.Dialog.close();
	Roblox.Dialog.open({
		titleText: "Roblox Multi Accounts",
		bodyContent: `Please choose an account to swap to.
    <div class="account-store">

    </div>`,
		acceptText: "Add",
		declineText: "Settings",
		allowHtmlContentInBody: true,
	});
    
    // this is a hack because roblox dialogs suck lol
    let modalContainer = document.getElementById("simplemodal-container");
    modalContainer.style.height = "auto";

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
                let accountElement = generateAccount(account.name, account.image);
                accountElement.addEventListener("click", function() {
                    Roblox.Dialog.close();

                    let accountChosenEvent = new CustomEvent("PassToBackground", {
                        detail: {
                            question: "accountChosen",
                            id: account.id
                        },
                    });
                
                });

				accountStore.appendChild(accountElement);
			}
		},
		{ once: true }
	);

	window.dispatchEvent(getAccountsEvent);
}

const obscureOverlay = document.createElement("div");
obscureOverlay.classList.add("obscure-overlay");
document.body.appendChild(obscureOverlay);

function obscureDocument() {
	let html = document.documentElement;
	let yOffset = html.scrollTop + (html.clientHeight/2);
	html.style.transformOrigin = "50vw " + yOffset + "px";
	html.classList.add("obscure");
	obscureOverlay.classList.add("obscure");
}

function disableObscure() {
	let html = document.documentElement;
	html.style.overflow = "hidden";
	html.classList.remove("obscure");
	obscureOverlay.classList.remove("obscure");
	setTimeout(() => {
		html.style.transformOrigin = "";
		html.style.overflow = "";
	}, 260)
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
