/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

background.js
This is just some boilerplate to only show the page action when you're on roblox.com.
For the main code, see popup.js.

*/

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(
		sender.tab
			? "from a content script:" + sender.tab.url
			: "from the extension"
	);
	chrome.tabs.sendMessage(sender.tab.id, { waffle: "troll" });
});
