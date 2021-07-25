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
				accountStore.appendChild(generateAccount(account.name, account.image));
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
