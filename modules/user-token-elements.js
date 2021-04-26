/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

user-token-elements.js
This file is a library for creating and managing userTokenElements.

*/

import * as token from "./token.js"

const holdMs = 500;         // Amount of time that an account button must be held down before it can be dragged around
let justToggled = false;    // hacky workaround to allow sinking the click event
let moving = false;         // Whether an element is being moved right now or not
let movingElement;          // The element that is being moved
let mouseTimer;             // The hold-down timer

let tokenShadowElement = document.createElement("div")
tokenShadowElement.classList.add("token-shadow-element")

let userTokenElements = {};

const root = document.querySelector(":root")
const accountContainer = document.getElementsByClassName("account-container")[0];

function holdDown(tokenElement, event) {
    /*
    
    Called when a button is held down for the amount of miliseconds stored in the holdMs variable.
    
    */
    
    if (moving == false) {
        moving = true;
        movingElement = tokenElement;

        movingElement.style.left = (event.clientX - (movingElement.clientWidth/2)) + "px"
        movingElement.style.top = (event.clientY - (movingElement.clientHeight/2)) + "px"

        tokenShadowElement.style.order = movingElement.style.order
        accountContainer.appendChild(tokenShadowElement)
        movingElement.classList.add("moving");
    }
};

export function initializeMovement() {
    document.addEventListener("mouseup", function(event) {
		if (mouseTimer) window.clearTimeout(mouseTimer);
		if (moving) {
			moving = false;
            justToggled = true;
            movingElement.style.order = tokenShadowElement.style.order
            accountContainer.removeChild(tokenShadowElement)
			movingElement.classList.remove("moving");
		}
	});
	
	document.addEventListener("mousemove", function(event) {
		event.preventDefault();
		if (moving) {
			let activeElement = document.activeElement
            if (activeElement && activeElement.userToken) {
                // used to get the position of the element
                let rect = tokenShadowElement.getBoundingClientRect();
                
                // move it to mouse position
                activeElement.style.left = (event.clientX - (activeElement.clientWidth/2)) + "px"
                activeElement.style.top = (event.clientY - (activeElement.clientHeight/2)) + "px"

                // calculate Y delta
                let deltaY = event.clientY - (rect.y + activeElement.clientHeight/2);
                console.log(deltaY)
                // calculate order delta rather than pixel delta
                let compDeltaY = parseInt(deltaY/activeElement.clientHeight, 10) 
                // compute real order (current order + delta)
                let compOrder = compDeltaY + parseInt(tokenShadowElement.style.order);
                
                /*
                let lastOrder = 1;
                for (let userTokenElementKey in userTokenElements) {
                    let userTokenElement = userTokenElements[userTokenElementKey]
                    if (userTokenElement.style.order - lastOrder >= 2) {

                    }
                    lastOrder = userTokenElement.style.order
                }
                */
                
                // change the "shadow element" order and userToken order
                tokenShadowElement.style.order = compOrder;
                activeElement.userToken.order = compOrder
            }
		}
	}, true);
}

export function userTokenToElement(userToken) {
    if (userTokenElements[userToken.id]) return

    let tokenElement = document.createElement("button");
    userTokenElements[userToken.id] = tokenElement
    tokenElement.classList.add("token-element");
    tokenElement.userToken = userToken
    // tokenElement.style.order = orderId;
    
    tokenElement.addEventListener("click", async () => {
        if (justToggled) {
            justToggled = false;
            return;
        }
        await token.set(userToken.value);
        chrome.tabs.reload();
    });
    
    tokenElement.addEventListener("mousedown", function(event) {
        if (mouseTimer) window.clearTimeout(mouseTimer);
        mouseTimer = window.setTimeout(function() { 
            holdDown(tokenElement, event);
        }, holdMs);
    });
    
    let tokenTextElement = document.createElement("span");
    tokenTextElement.classList.add("token-text-element");
    tokenTextElement.innerHTML = userToken.name + " [" + userToken.id.toString() + "]"
    
    tokenElement.appendChild(tokenTextElement);
    accountContainer.appendChild(tokenElement);

    return tokenElement;
}

export function fixHeight() {
    /*
    
    I have no idea why this works, but it does.

    */
    root.style.height = "🐟"
    root.style.height = "auto"
}