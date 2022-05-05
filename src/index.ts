import {render} from './rendering/link-renderer'
import {showTippy} from './tippy'

const linkSelector = 'a, area'
const linkPreviewClass = 'link-with-preview'

async function initPreview(link: HTMLAnchorElement | HTMLAreaElement) {
    const previewElement = await render(new URL(link.href))
    if (!previewElement) return

    link.classList.add(linkPreviewClass)
    showTippy(link, previewElement)
}

async function initPreviews() {
    Array.from(document.links).forEach(initPreview)
}

const watchAndInitNewLinks = () => {
    const observer = new MutationObserver(mutations => {
        mutations
            .flatMap(mutations => Array.from(mutations.addedNodes))
            .forEach(checkIfLinkAndInit)
    })

    observer.observe(document.body, {childList: true, subtree: true})
}

const checkIfLinkAndInit = (node: Node) => {
    const isLink = node instanceof HTMLAnchorElement || node instanceof HTMLAreaElement
    if (isLink) {
        void initPreview(node)
    } else if (node instanceof HTMLElement) {
        const links = node.querySelectorAll(linkSelector) as NodeListOf<HTMLAnchorElement | HTMLAreaElement>
        links.forEach(initPreview)
    }
}

const loadExtension = async () => {
    void initPreviews()
    watchAndInitNewLinks()
}


void loadExtension()
