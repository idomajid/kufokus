import { useState, useEffect } from "react";

export default function App() {
  const [x, setX] = useState()

  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log({ activeTab })
        if (activeTab && activeTab.url) {
          console.log("Active Tab URL:", activeTab.url);

          chrome.runtime.sendMessage({
            type: "URL_REPORT",
            url: activeTab.url,
          });
        }
      });
    }
  }, []);

  return (
    <>
      <h1>XXXXXXXXXXXXXXXXXXXX</h1>
    </>
  );
}


