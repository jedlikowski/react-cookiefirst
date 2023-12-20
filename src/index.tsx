import * as React from "react";

import ReactCookieFirstContext from "context";
import useContextManager from "hooks/useContextManager";
import useLoadCFScript from "hooks/useLoadCFScript";

const ReactCookieFirst: React.FC<ReactCookieFirstProps> = ({
  apiKey,
  silent,
  stealth,
  lang,
  children,
  renderBeforeReady = false,
}) => {
  useLoadCFScript({ apiKey, silent, stealth, lang });
  const [isLoaded, context] = useContextManager();
  if (!isLoaded && !renderBeforeReady) {
    return <></>;
  }

  return (
    <ReactCookieFirstContext.Provider value={context}>
      {children}
    </ReactCookieFirstContext.Provider>
  );
};

export type ReactCookieFirstProps = {
  apiKey?: string;
  silent?: boolean;
  stealth?: boolean;
  lang?: string;
  renderBeforeReady?: boolean;
  children?: React.ReactElement | string | number | React.ReactFragment | React.ReactPortal;
};

export const useCookieFirst = () => React.useContext(ReactCookieFirstContext);

export default ReactCookieFirst;
