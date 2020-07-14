# react-cookiefirst

A simple React component for loading and interacting with [CookieFirst](https://cookiefirst.com) banner.

## Installation

```
yarn add react-cookiefirst
// or
npm install react-cookiefirst
```

## Usage

```js
import ReactCookieFirst from "react-cookiefirst";
```

Then you can use it as a standalone component to simply load the banner

```jsx
<ReactCookieFirst apiKey="XXXXXX" />
```

Or as a context provider to get access to current consent state and various methods

```jsx
<ReactCookieFirst apiKey="XXXXXX">
  <SomeContextConsumer />
  {/* some other components */}
</ReactCookieFirst>
```

`SomeContextConsumer.jsx` file:

```jsx
import { useCookieFirst } from "react-cookiefirst";

const SomeContextConsumer = () => {
  const context = useCookieFirst();

  // ...
};
```

## `ReactCookieFirst` props

| Name                |  Type   |     Default | Description                                                                    |
| ------------------- | :-----: | ----------: | ------------------------------------------------------------------------------ |
| `apiKey`            | string  |        `""` | API key coming from cookiefirst.com panel                                      |
| `silent`            | boolean |     `false` | Silent mode to hide all CookieFirst console logs                               |
| `stealth`           | boolean |     `false` | Stealth mode to hide default banner UI. Use with custom banner                 |
| `lang`              | string  | `undefined` | Force banner UI texts in a given language. E.g. `lang="de"`                    |
| `renderBeforeReady` | boolean |     `false` | Enable this to render component's children before CookieFirst banner is loaded |

## Context

consent: null | Consent;
openPanel: () => void;
closePanel: () => void;
updateConsent: () => Promise<any>;
acceptCategory: () => Promise<any>;
acceptAllCategories: () => Promise<any>;
acceptPreselectedCategories: () => Promise<any>;
declineAllCategories: () => Promise<any>;
declineCategory: () => Promise<any>;
withdrawConsent: () => Promise<any>;
When using the `useCookieFirst` context hook, the returned value is an object with the following properties:

| Name                          |          Type          | Description                                                                                  |
| ----------------------------- | :--------------------: | -------------------------------------------------------------------------------------------- |
| `consent`                     | null or Consent object | Current user's consent. Will be `null` before user consents for the first time.              |
| `openPanel`                   |        function        | opens the settings panel / modal. Unavailable in stealth mode                                |
| `closePanel`                  |        function        | closes the settings panel / modal. Unavailable in stealth mode                               |
| `updateConsent`               |     async function     | Takes as an argument the new Consent object and saves it                                     |
| `acceptCategory`              |     async function     | Takes as an argument name of a cookie category and saves consent with this category accepted |
| `acceptAllCategories`         |     async function     | Saves consent with all categories accepted                                                   |
| `acceptPreselectedCategories` |     async function     | Saves consent with only preselected categories from the cookiefirst admin panel              |
| `declineAllCategories`        |     async function     | Saves consent with all categories rejected                                                   |
| `declineCategory`             |     async function     | Takes as an argument name of a cookie category and saves consent with this category rejected |
| `withdrawConsent`             |     async function     | Withdraws previous consent. Can be used only after consent is given.                         |

All of the consent-changing functions will trigger a page reload if there was a previously saved consent. This is done because on initialization CookieFirst banner checks accepted categories and loads respective scripts. There is no way to "unload" a script once it's loaded.

## The consent object

The consent object has the following structure:

```
{
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  advertising: boolean;
}
```

This is the object which is available under `consent` property of the object returned by `useCookieFirst` hook. This is also the structure expected by the `updateConsent` function. Example:

```js
const ctx = useCookieFirst();
console.log(ctx.consent);
/*
{
  necessary: true;
  performance: true;
  functional: false;
  advertising: false;
}
*/

ctx.updateConsent({
  ...ctx.consent,
  functional: true,
});

// website reloads because there was previous consent
```

The `acceptCategory` and `declineCategory` functions expect to be passed a key from the consent object. For example

```js
const ctx = useCookieFirst();
ctx.acceptCategory("performance");
// no window reload if this is the first consent, reload if not the first consent
```
