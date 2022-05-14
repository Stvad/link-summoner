import tippy, {Props} from 'tippy.js'

import shadowCss from 'bundle-text:./shadow.css'
import {lazy} from './common/lazy'

export const getShadowRoot = lazy(initShadowRoot)

export function showTippy(
    link: HTMLAnchorElement | HTMLAreaElement,
    previewElement: HTMLElement,
    options: Partial<Props> = {}
) {
    tippy(link, {
        content: previewElement,
        placement: 'bottom',
        arrow: true,
        // in shadow dom to avoid affecting the page styles
        appendTo: () => getShadowRoot() as unknown as Element,
        animation: 'fade',
        interactive: true,
        theme: 'light',
        maxWidth: '55em',
        delay: [0, 400],
        ...options
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
