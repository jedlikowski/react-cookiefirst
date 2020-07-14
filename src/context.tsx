import * as React from "react";

import noop from "helpers/noop";

type Consent = {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  advertising: boolean;
};

type Category = "necessary" | "performance" | "functional" | "advertising";

export type ReactCookieFirstContext = {
  consent: null | Consent;
  openPanel: () => void;
  closePanel: () => void;
  updateConsent: (newConsent: Consent) => Promise<any>;
  acceptCategory: (category: Category) => Promise<any>;
  acceptAllCategories: () => Promise<any>;
  acceptPreselectedCategories: () => Promise<any>;
  declineAllCategories: () => Promise<any>;
  declineCategory: (category: Category) => Promise<any>;
  withdrawConsent: () => Promise<any>;
};

export const initialContext = {
  consent: null,
  openPanel: noop,
  closePanel: noop,
  updateConsent: async () => noop(),
  acceptCategory: async () => noop(),
  acceptAllCategories: async () => noop(),
  acceptPreselectedCategories: async () => noop(),
  declineAllCategories: async () => noop(),
  declineCategory: async () => noop(),
  withdrawConsent: async () => noop(),
};

const context = React.createContext<ReactCookieFirstContext>(initialContext);

export default context;
