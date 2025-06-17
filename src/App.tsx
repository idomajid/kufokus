import { useEffect } from "react";






export default function App() {


  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log("tabs: ", tabs);

        if (activeTab?.url) {
          console.log("Active Tab URL:", activeTab.url);

          chrome.runtime.sendMessage({
            type: "URL_REPORT",
            url: activeTab.url,
          });
        } else {
          console.warn("Could not get tab URL");
        }
      });
    }
  })



  return (


    <div>
      <h1 className="text-red-100">Click to get active URL</h1>
      {/* <button onClick={handleClick} className="bg-blue-500 text-white p-2 rounded">
        Get URL
      </button> */}
    </div>
  );
}
