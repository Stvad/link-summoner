import tippy from 'tippy.js'

import shadowCss from 'bundle-text:./shadow.css'

const shadowRoot = initShadowRoot()

export function showTippy(link: HTMLAnchorElement | HTMLAreaElement, previewElement: HTMLElement) {
    tippy(link, {
        content: previewElement,
        placement: 'bottom',
        arrow: true,
        // in shadow dom to avoid affecting the page styles
        appendTo: () => shadowRoot as unknown as Element,
        animation: 'fade',
        interactive: true,
        theme: 'light',
        maxWidth: '55em',
        delay: [0, 400],
    })
}


function initShadowRoot() {
    const shadowContainer = document.createElement('div')
    shadowContainer.className = 'transclude-shadow-container'

    const shadowRoot = shadowContainer.attachShadow({mode: 'open'})
    const style = document.createElement('style')
    style.innerText = shadowCss

    shadowRoot.append(style)
    document.body.append(shadowContainer)

    return shadowRoot
}
