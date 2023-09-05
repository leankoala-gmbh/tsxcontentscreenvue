# 360 Content Screen
A WebComponent for displaying info texts from an api.

## Install 
```bash
npm i @webpros/three-sixty-contentscreen
```

### Alternative with a CDN 
Or download as script from this URL
```html
<script type="module" crossorigin src="https://unpkg.com/@webpros/three-sixty-contentscreen@1.0.3/dist/threeSixtyContentScreen.js"></script>
```

## Usage
The Content Screen provides two elements that can be inserted into the document. The `<tsx-contentscreen>` should be placed in the footer area to display the API information.

The `<tsx-contentscreen-trigger content-id="CONTENTID" language="LANG">` element is the trigger element that can be wrapped around buttons or text elements. Important here is that this inner button element has no real function, it should only look good ;) Depending on `content-id`, when you click on the element, the corresponding content is retrieved via the API and displayed in the `tsx-contentscreen`.

The language of the content can be selected via the `language` parameter, by default it is set to English.

### Example
```html
<body>
...
<main>
  <tsx-contentscreen-trigger
    content-id="_demo.md.elements"
    type="marketing"
  >
    Open Marketing info
  </tsx-contentscreen-trigger>
  ...
</main>
<tsx-contentscreen />
</body>
```

### Props
- `content-id`: The ID of the article to be retrieved
- `language`: Optional language setting (default: english)
- `type`: Optional type of the content screen (default: advisor, options: 'advisor' | 'marketing' | 'content')
- `title`: Optional possibility to overwrite the title of the screen
- `label`: Optional possibility to overwrite the label for marketing header
- `partner-shop-url`: Optional to overwrite marked CTA URL from outside

## Alternative for the `<tsx-contentscreen-trigger>` element
Events are transmitted and distributed via the [MITT](https://github.com/developit/mitt) lib, so it is possible to trigger the content screen functionally.

```js
// Emits an event to the contentScreen
window.mitt.emit('tsxContentScreenConfig', {
  contentId: 'test',
})
```

```ts
interface MittPayload {
  contentId: string
  language?: string
  type?: 'advisor' | 'marketing' | 'content' | 'changelog' | 'kAdvisor'
  title?: string
  label?: string
  partnerShopUrl?: string
}
```

## Sending Events from the ContentScreen

```js
window.mitt.emit('tsxContentScreenEvents', {
  action: 'iFrameOpen'
})
```

```ts
interface MITTSendPayload {
  action: string
}
```

## Usage with Frontend Frameworks

### Vue / Nuxt 
So that Vue does not treat these elements as regular Vue components the tags must be ignored. The easiest way is to include the elements using `plugin`.

```js
import Vue from 'vue'
import '@webpros/three-sixty-contentscreen'

Vue.config.ignoredElements = [
  'tsx-contentscreen',
  'tsx-contentscreen-trigger'
]
```

### React / Next
Currently no findings.

## Colors
The colors are defined using CSSVars and must be included either inline or in the custom stylesheet.

```css
:root {
  --tsxScreenPrimary: #52bce5;
  --tsxScreenPrimaryHover: #68caef;
  --tsxScreenMarketing: #E77B35;
  --tsxScreenMarketingHover: #e16b1f;
  --tsxScreenBackground: #ffffff;
  --tsxScreenText: #374253;
  --tsxScreenHeadline: #111729;
}
```
