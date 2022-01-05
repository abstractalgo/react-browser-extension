## web extensions React starter

starter repo for building browser extensions for any of the popular browsers, with a focus on Typescript and React

- :atom_symbol: content scripts, popup and options page as three separate React (v18.x+) apps
- 𝙏𝙎 Typescript (4.5+) support for all apps and other scripts
- 💬 a common communication channel and storage for all these apps and scripts
- 🧩 works with Manifest V3 (i.e. works with all Chromium-based browsers and soon Firefox)

### todo

- **browsers**
  - [x] chromium (v3 manifest)
  - [ ] firefox (v2? v3?)
  - [ ] safari
- **dev tools**
  - [ ] dev pipeline (watcher, hot reload, incremental builds, sim tabs env)
  - [ ] build pipeline (for chrome, for firefox)
- **logic**
  - [ ] content script
  - [ ] popup script
  - [ ] service workers ("background scripts" in MV2)
  - [ ] options page
  - [ ] ~~sidebar (*firefox-only*)~~
  - [ ] cross-context communication
    - [ ] storage
      - [ ] options / config
      - [ ] per tab
      - [ ] shared
      - [ ] synced
    - [ ] static assets
- **styling**
  - [x] css
  - [x] sass
  - [x] styled components
  - [x] tailwind

### dev

- local dev
- build for chrome/firefox/...
- load into chrome/firefox/...
- package
- submitting to stores

### how it works

- root folder holds basic information about the extension, its manifest and icons
- `/content_scripts` is a place for code that has to do with content that becomes part of the page - injected JS and CSS. within `/app` holds the React app where you basically write entirety of logic, and remaining files are there to create a container for your React root (similar how `div#root` exists in `public/index.html` when using regular CRA).
- `/popup` is a place for another React application that...
- `/options` is another React app...
- `/worker` is where the code for the service worker or a background script lives. these scripts never can never have any UI as a part of it

`react-app-rewired` ([on npm](https://www.npmjs.com/package/react-app-rewired)) is used to override some of the webpack configuration of a `create-react-app`, without ejecting. Each of the React apps in the project has its own `config-overrides.ts` file, that gets transpiled from TS to JS, that then gets coonsumed during the build phase by the `react-app-rewired`.

Notable webpack config overrides are:
- removing source maps
- bundling everything into a single JS file (no extra chunks)
- removing MiniCssExtractPlugin thus keeping all of the CSS bundled inside of JS

By having a very predictable build output (a single JS file) for each part of our extension, we can hardcode their script files inside `manifest.json` and that's it. Always same output, always same entry points and script files, i.e. no need for [programmatic injection](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#programmatic) of scripts.

This is a build output:

<img src="https://user-images.githubusercontent.com/1355455/148201165-d4d02ff7-f5ab-4ae4-9222-3dfe7bf9eee0.png" height="200"/>

You can see how that exactly matches the entry points defined inside `manifest.json`:

<img src="https://user-images.githubusercontent.com/1355455/148199900-da93d2e5-63d3-4174-a5d6-9b93f78217ff.png" height="200" />

(also to allow TS to load files outside root scope)

(record a video walkthrough)

communication between background, popup and content scripts. typescript everywhere (@types/chrome).

caveats: assets. no router. differences between browsers (manifest format, background scripts vs service workers, assets vs web accessible resources, differences in browser API, https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/, MV2 vs MV3)

### how to get started developing your own extension

- update information inside `manifest.json` (name, description, homepage,...) and update icons
- code and test your React apps within `/content_scripts/app`, `/options` and `/popup` (if you don't need some of those, simply remove them from project and their steps in the build pipeline; same goes for the service worker/background script)
- build/compile your extension, load it in the browser and try it there
- pack the extension
- publish it on the web stores


recipes: monorepo. shared lib.

resources:

- link to docs for Chrome extensions for devs
  - [Chrome API reference](https://developer.chrome.com/docs/extensions/reference/)
- link to docs for Firefox extensios for devs
  - [Anatomy of a Web Extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
  - [web-ext](https://github.com/mozilla/web-ext)