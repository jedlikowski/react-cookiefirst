import { useEffect } from "react";

/**
 * Loads CookieFirst banner script if apiKey setting is provided.
 * Executes script loading only once, on initial render
 * @param {UseLoadCFSCriptSettings} settings
 */
const useLoadCFScript = ({
  apiKey,
  silent,
  stealth,
  lang,
}: UseLoadCFSCriptSettings) => {
  useEffect(() => {
    if (!apiKey) {
      return;
    }
    const script = document.createElement("script");

    script.src = "https://consent.cookiefirst.com/banner.js";
    script.async = true;
    script.setAttribute("data-cookiefirst-key", apiKey);
    if (typeof silent !== "undefined") {
      script.setAttribute("data-silent-mode", silent ? "true" : "false");
    }
    if (typeof stealth !== "undefined") {
      script.setAttribute("data-stealth-mode", stealth ? "true" : "false");
    }
    if (typeof lang !== "undefined") {
      script.setAttribute("data-language", lang);
    }

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

type UseLoadCFSCriptSettings = {
  apiKey?: string;
  silent?: boolean;
  stealth?: boolean;
  lang?: string;
};

export default useLoadCFScript;
