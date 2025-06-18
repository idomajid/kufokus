chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log("Redirect triggered from background.js");
    return { redirectUrl: "https://cats.com/" };
  },
  { urls: ["*://www.instagram.com/*"] },
  ["blocking"]
);
