/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

popup.js
This file is the root script for the extension popup window.
It is linked to the popup.html file.

Download the extension at https://chrome.google.com/webstore/detail/cmeicimcdhgohgjmpmcdpakjjdohhocg

*/

import * as userTokenElements from "../modules/user-token-elements.js"
import * as token from "../modules/token.js"
import * as store from "../modules/store.js"
import { updateTokens } from "../modules/upgrade.js"
import { versionCompare } from "../modules/version-compare.js"

const version = chrome.runtime.getManifest().version; // get current extension version from manifest

document.addEventListener('DOMContentLoaded', async () => {
	const storeKey = "rbxtokens"; 								// key to look for tokens in
	
	let storeVersion = (await store.get("version")).version;	// get the version  the extension that last saved data into storage
	let userTokenStore = (await store.get(storeKey))[storeKey];	// get the tokens from chrome sync storage
	let versionDiff = -1;										// versionDiff defaults to -1
	let isOld = true;											// set to true if the data is pre-1.0 and needs to be updated
	
	
	if (!userTokenStore) {  // If there isn't any userTokenStore...
		// ...we know that this is a fresh install and don't have to upgrade anything
		isOld = false;

		userTokenStore = {}
	} else if (storeVersion) {  // If a version exists in the DB...
		// ...we know that the data stored was from post-rewrite, so we can set isOld to false
		isOld = false;

		 // Compare the DB stored version and the current version
		versionDiff = versionCompare(storeVersion, version); 
	}

	if (isOld) {
		// This means the data comes from before the new format was introduced.
		// We'll need to update it before using it.
		
		let oldTokenStore = userTokenStore[0];  // the old format stored an Array under the storeKey containing the tokens

		const t0 = performance.now();
		userTokenStore = await updateTokens(oldTokenStore);  // update pre-rewrite tokens and convert them to v1 tokens
		const t1 = performance.now();
		console.log(`Call took ${t1 - t0} milliseconds.`);
	}
	
	// Initialize movement (enable draggable userTokens)
	userTokenElements.initializeMovement()

	// Loop through stored userTokens
	for (let i in userTokenStore) {
		let userToken = userTokenStore[i]

		// Generate the userTokenElement
		let userTokenElement = userTokenElements.userTokenToElement(userToken);
		userTokenElement.style.order = i
	}
	
	const addAccountButton = document.getElementById("add-account");
	addAccountButton.addEventListener("click", function() {
		
	})

	const showSettingsButton = document.getElementById("settings-button")
	const hideSettingsButton = document.getElementById("close-settings")
	const menuContainer = document.getElementsByClassName("menu-container")[0]
	let allowOpenSettings = true;
	
	showSettingsButton.addEventListener('click', function() {
		if (allowOpenSettings) {
			menuContainer.classList.remove("hidden");
		}
	});
	
	hideSettingsButton.addEventListener('click', function() {
		allowOpenSettings = false;
		menuContainer.classList.add("hidden-right");
		setTimeout(function() {
			menuContainer.classList.remove("hidden-right");
			menuContainer.classList.add("notransition");
			menuContainer.classList.add("hidden");
			menuContainer.classList.remove("notransition");
			allowOpenSettings = true;
		}, 500);
	});
});
