chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "URL_REPORT") {
    console.log("Received URL:", message.url);
    // You can handle it here, e.g., log, store, etc.
  }
});
