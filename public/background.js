chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) return; // only main frame

  chrome.storage.local.get(["blockedSites", "kufokusEnabled"], (data) => {
    const { blockedSites = [], kufokusEnabled = false } = data;

    if (!kufokusEnabled) return;

    try {
      const url = new URL(details.url);
      const currentHost = url.hostname;

      const shouldRedirect = blockedSites.some((domain) =>
        currentHost.includes(domain)
      );

      if (shouldRedirect) {
        chrome.tabs.update(details.tabId, {
          url: "https://kufokus-redirect.vercel.app/",
        });
      }
    } catch (err) {
      console.error("Invalid URL in webNavigation listener", err);
    }
  });
});
