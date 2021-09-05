/*

RobloxMultiAccounts
by jmkdev (https://jmk.gg/)

rbx.js
This file is a minimal library for accessing the Roblox API.

*/

const baseSite = "roblox.com";

let genders = {
  // Pointless :)
  Other: 1,
  Male: 2,
  Female: 3,
};

export function generateEndpoint(api, version, endpointPath) {
  return (
    "https://" + api + "." + baseSite + "/v" + version + "/" + endpointPath
  );
}

export function generateOtherEndpoint(api, endpointPath) {
  return "https://" + api + "." + baseSite + "/" + endpointPath;
}

export async function getAuthenticatedUser() {
  let response = await fetch(
    generateEndpoint("users", "1", "users/authenticated")
  );
  if (response.ok) {
    return response.json();
  } else {
    return false;
  }
}

export async function getUser(userId) {
  let response = await fetch(
    generateEndpoint("users", "1", "users/" + userId.toString())
  );
  if (response.ok) {
    return response.json();
  } else {
    return false;
  }
}

export async function getGender() {
  let response = await fetch(generateEndpoint("users", "1", "gender"));
  if (response.ok) {
    return response.json()["gender"];
  } else {
    return false;
  }
}

export async function getUserProfileHeader(userId) {
  let response = await fetch(
    generateOtherEndpoint(
      "www",
      "users/profile/profileheader-json?userId=" + userId.toString()
    )
  );
  if (response.ok) {
    return response.json();
  } else {
    return false;
  }
}
