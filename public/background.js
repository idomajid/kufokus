chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.storage.local.get(["blockedSites", "kufokusEnabled"], (data) => {
      const { blockedSites = [], kufokusEnabled = false } = data;

      if (!kufokusEnabled) return;

      try {
        const currentHost = new URL(tab.url).hostname;
        if (blockedSites.some((domain) => currentHost.includes(domain))) {
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
