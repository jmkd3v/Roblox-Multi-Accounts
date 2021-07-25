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

function generateAccount(name, image, identifier) {
    // TODO: React.
    let baseElement = document.createElement("button")
    baseElement.classList.add("account")

    let imageElement = document.createElement("image")
    imageElement.classList.add("account-image")
    imageElement.src = image

    let nameElement = document.createElement("p")
    nameElement.innerHTML = name

    baseElement.appendChild(imageElement)
    baseElement.appendChild(nameElement)
    
    return baseElement
}

console.log("injected script: sending...")
let myEvent = new CustomEvent(
    "PassToBackground",
    {
        detail: "waffle@@"
    }
);
window.dispatchEvent(myEvent);

window.addEventListener("PassToForeground", function(evt) {
    console.log(evt.detail)
})
