import { ReactCookieFirstContext, initialContext } from "context";
import { useCallback, useEffect, useState } from "react";

const INIT_EVENT = "cf_init";
const CONSENT_EVENT = "cf_consent";

declare global {
  interface Window {
    CookieFirst: ReactCookieFirstContext;
  }
}

const getContextFromCfObject = (
  CookieFirst: ReactCookieFirstContext
): ReactCookieFirstContext => ({
  consent: CookieFirst.consent,
  openPanel: CookieFirst.openPanel,
  closePanel: CookieFirst.closePanel,
  updateConsent: CookieFirst.updateConsent,
  acceptCategory: CookieFirst.acceptCategory,
  acceptAllCategories: CookieFirst.acceptAllCategories,
  acceptPreselectedCategories: CookieFirst.acceptPreselectedCategories,
  declineAllCategories: CookieFirst.declineAllCategories,
  declineCategory: CookieFirst.declineCategory,
  withdrawConsent: CookieFirst.withdrawConsent,
});

const useContextManager = (): ContextManagerReturnType => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState<ReactCookieFirstContext>(
    initialContext
  );

  const handleInit = useCallback(() => {
    if (!window.CookieFirst) {
      return;
    }

    setContext(getContextFromCfObject(window.CookieFirst));
    setIsLoaded(true);
  }, []);

  const handleConsent = useCallback(() => {
    if (!window.CookieFirst) {
      return;
    }

    setContext(getContextFromCfObject(window.CookieFirst));
  }, []);

  useEffect(() => {
    window.addEventListener(INIT_EVENT, handleInit);
    window.addEventListener(CONSENT_EVENT, handleConsent);

    return () => {
      window.removeEventListener(INIT_EVENT, handleInit);
      window.removeEventListener(CONSENT_EVENT, handleConsent);
    };
  }, []);

  return [isLoaded, context];
};

type ContextManagerReturnType = [boolean, ReactCookieFirstContext];

export default useContextManager;
