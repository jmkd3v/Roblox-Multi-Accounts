/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

background.js
This is just some boilerplate to only show the page action when you're on roblox.com.
For the main code, see popup.js.

*/

import * as userTokenElements from "../modules/user-token-elements.js";
import * as userTokens from "../modules/user-tokens.js";
import * as token from "../modules/token.js";
import * as store from "../modules/store.js";
import * as rbx from "../modules/rbx.js";
import { updateTokens } from "../modules/upgrade.js";
import { versionCompare } from "../modules/version-compare.js";

const version = chrome.runtime.getManifest().version; // get current extension version from manifest
const storeKey = "rbxtokens"; // key to look for tokens in

let storeVersion = (await store.get("version")).version; // get the version of the extension that last saved data into storage
let userTokenStore = (await store.get(storeKey))[storeKey]; // get the tokens from chrome sync storage
let versionDiff = -1; // versionDiff defaults to -1
let isOld = true; // set to true if the data is pre-1.0 and needs to be updated

if (!userTokenStore) {
	// If there isn't any userTokenStore...
	// ...we know that this is a fresh install and don't have to upgrade anything
	isOld = false;

	userTokenStore = {};
} else if (storeVersion) {
	// If a version exists in the DB...
	// ...we know that the data stored was from post-rewrite, so we can set isOld to false
	isOld = false;

	// Compare the DB stored version and the current version
	versionDiff = versionCompare(storeVersion, version);
}

if (isOld) {
	// This means the data comes from before the new format was introduced.
	// We'll need to update it before using it.

	let oldTokenStore = userTokenStore[0]; // the old format stored an Array under the storeKey containing the tokens

	const t0 = performance.now();
	userTokenStore = await updateTokens(oldTokenStore); // update pre-rewrite tokens and convert them to v1 tokens
	const t1 = performance.now();
	console.log(`Call took ${t1 - t0} milliseconds.`);
}

chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostSuffix: "roblox.com" },
					}),
				],
				actions: [new chrome.declarativeContent.ShowPageAction()],
			},
		]);
	});
});

console.log(userTokenStore)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(request);
	console.log(request.question);
	if (request.question == "getAccounts") {
		chrome.tabs.sendMessage(sender.tab.id, {
			answer: "giveAccounts",
			accounts: [
				{
					name: "waffle",
					displayName: "waffle",
					image:
						"https://tr.rbxcdn.com/2b4ab4eee0e5531f990ccf6aac76c440/150/150/AvatarHeadshot/Png",
				},
				{
					name: "waffle",
					displayName: "waffle",
					image:
						"https://tr.rbxcdn.com/2b4ab4eee0e5531f990ccf6aac76c440/150/150/AvatarHeadshot/Png",
				},
				{
					name: "waffle",
					displayName: "waffle",
					image:
						"https://tr.rbxcdn.com/2b4ab4eee0e5531f990ccf6aac76c440/150/150/AvatarHeadshot/Png",
				},
			],
		});
	} else if (request.question == "ready") {
		setTimeout(function () {
			chrome.tabs.sendMessage(sender.tab.id, { answer: "openAccountDialog" });
		}, 1000);
	}
});
