/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

output_warning.js
This file contains calls to console.log to prevent self-XSS attacks.

*/

console.log(
	"%c👋 hello\n", "font-size:26px",
    "unless you know exactly what you are doing, please don't type anything into here you might enter something in that can steal all of your Roblox login tokens\n",
    "if you do know exactly what you're doing, come egg"
);
