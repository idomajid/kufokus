import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log("tabs: ", tabs);

        if (activeTab?.url) {
          const url = new URL(activeTab.url);
          console.log("Active Tab URL:", url.href);

          // Check if the host is exactly "www.google.com"
          if (url.hostname === "www.instagram.com") {
            chrome.tabs.update(activeTab.id!, {
              url: "https://cats.com/",
            });
            return;
          }

          // Otherwise send the message
          chrome.runtime.sendMessage({
            type: "URL_REPORT",
            url: url.href,
          });
        } else {
          console.warn("Could not get tab URL");
        }
      });
    }
  }, []);

  return <div>Hello Chrome Extension</div>;
}
