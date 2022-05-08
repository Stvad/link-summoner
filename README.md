# Link Summoner

A script that you can embed in your website  to easily enable live link previews for a whitelisted set of websites.

![](./media/manifold-link-summoner.gif)

### Usage

Add the following tag to your page (update the version number if necessary):

```html
<script src="https://cdn.jsdelivr.net/npm/link-summoner@1.0.2/dist/browser.min.js" type="module"></script>
```

### Styling

Links that get live preview for them get the `link-with-preview` CSS class. You can add styling to indicate presence of the preview. For the following snippet would add `τ` after each link with preview:

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

