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
	console.log(request);
	console.log(request.question);
	if (request.question == "getAccounts") {
		chrome.tabs.sendMessage(sender.tab.id, {
			answer: "giveAccounts",
			accounts: [
				{
					name: "waffle",
					image:
						"https://tr.rbxcdn.com/2b4ab4eee0e5531f990ccf6aac76c440/150/150/AvatarHeadshot/Png",
				},
				{
					name: "waffle",
					image:
						"https://tr.rbxcdn.com/2b4ab4eee0e5531f990ccf6aac76c440/150/150/AvatarHeadshot/Png",
				},
				{
					name: "waffle",
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
