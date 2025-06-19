chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.storage.local.get("blockedSites", (data) => {
      const blocked = data.blockedSites || [];

      try {
        const currentHost = new URL(tab.url).hostname;
        if (blocked.some((domain) => currentHost.includes(domain))) {
          chrome.tabs.update(tabId, {
            url: "https://kufokus-redirect.vercel.app/",
          });
        }
      } catch (err) {
        console.error("Invalid URL", err);
      }
    });
  }
});

// [
//   {
//     "id": 1,
//     "priority": 1,
//     "action": {
//       "type": "redirect",
//       "redirect": {
//         "url": "https://cats.com/"
//       }
//     },
//     "condition": {
//       "urlFilter": "||www.instagram.com",
//       "resourceTypes": ["main_frame"]
//     }
//   }
// ]
