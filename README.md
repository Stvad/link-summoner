# Link Summoner

A script that you can embed in your website  to easily enable live link previews for a whitelisted set of websites.

![](./media/manifold-link-summoner.gif)

### Usage

#### Script tag

The simplest option is to add the following tag to your page (update the version number if necessary):

```html
<script src="https://cdn.jsdelivr.net/npm/link-summoner@1.1.0/dist/browser.min.js" type="module"></script>
```

#### Using as a library (via NPM)

See example usage in [examples/bundling](./examples/bundling)

1. `npm install link-summoner`
2. In the files/pages you want to have live link previews:
```javascript
import {initPreviews} from "link-summoner"

initPreviews()
```

### Styling

Links that can be previewed get the `link-with-preview` CSS class. You can specify styling for that class to indicate presence of the preview. For example, the following snippet would add `τ` after each link with preview:

```css
.link-with-preview::after {
	text-decoration: none;
	content: 'τ';
	margin-left: 0.2em;
	color: #4f5c68;
}
```

### Supported websites

For the list of supported websites see files in [src/rendering](./src/rendering) 

