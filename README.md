## extensions starter (boilerplate)

starter repo for building browser extensions for any of the popular browsers, with a focus on Typescript and React

in short, here's what to expect:

| browsers (manifest version) | React | Typescript |
| --------------------------- | ----- | ---------- |
| chrome (v3), firefox (v2)   | 17.x  | 4.5        |

### features

- **browsers**
  - [x] chromium (v3 manifest)
  - [ ] firefox (v2 manifest)
  - [ ] safari
- **dev tools**
  - [ ] dev pipeline (watcher, hot reload, incremental builds, sim tabs env)
  - [ ] build pipeline (for chrome, for firefox)
  - [ ] test pipeline
  - [ ] monorepo setup
- **logic**
  - [ ] content script
  - [ ] background script (service workers)
  - [ ] popup script
  - [ ] options page
  - [ ] ~~sidebar (*firefox-only*)~~
  - [ ] cross-ctx communication
  - [ ] storage
    - [ ] options / config
    - [ ] per tab
    - [ ] shared
    - [ ] synced
- [x] typescript support
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

- `/meta` holds basic information about the extension, its manifest and icons
- `/background` is where the code for the service worker or a background script lives. these scripts never can never have any UI as a part of it
- `/content_scripts` is a place for code that has to do with content that becomes part of the page - injected JS and CSS. within `/app` holds the React app where you basically write entirety of logic, and remaining files are there to create a container for your React root (similar how `div#root` exists in `public/index.html` when using regular CRA).
- `/popup` is a place for another React application that...
- `/options` is another React app...

(show build output, show how each part relates to section in manifest, record a video walkthrough)

communication between background, popup and content scripts. building the app (custom config with react-app-rewired) into a single JS file (no extra CSS, no different chunks, perf implications). typescript everywhere (@types/chrome, webpack config).

caveats: assets. no router. differences between browsers (manifest format, background scripts vs service workers, assets vs web accessible resources, differences in browser API, https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/, MV2 vs MV3)

recipes: monorepo. shared lib.

resources:

- link to docs for Chrome extensions for devs
  - [Chrome API reference](https://developer.chrome.com/docs/extensions/reference/)
- link to docs for Firefox extensios for devs
  - [Anatomy of a Web Extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
  - [web-ext](https://github.com/mozilla/web-ext)