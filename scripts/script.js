Roblox.Dialog.open({
    titleText: "Roblox Multi Accounts",
    bodyContent: `Please choose an account to swap to.
<div class="account-store">
    <button class="account">
        <img class="account-image" src="https://tr.rbxcdn.com/2b4ab4eee0e5531f990ccf6aac76c440/150/150/AvatarHeadshot/Png">
        <p>local_ip</p>
    </button>
</div>`,
    acceptText: "Add",
    declineText: "Settings",
    allowHtmlContentInBody: true
})

var event = new CustomEvent("PassToBackground", {detail: message});
window.dispatchEvent(event);