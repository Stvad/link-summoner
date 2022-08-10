import {defaultRenderers, LinkRenderer, render} from './rendering/link-renderer'
import {createTippy} from './tippy'
import {Instance, Props} from 'tippy.js'
import {createPreviewWrapper} from './preview-wrapper'
import {LinkLike} from './types'

const linkSelector = 'a, area'

interface InitPreviewsOnPageParams {
    renderers?: LinkRenderer[]
    linkPreviewClass?: string
    tippyOptions?: Partial<Props>
    postInit?: (link: LinkLike) => void,
    actionProviders?: ((link: LinkLike) => HTMLElement)[]
}

export async function initPreviews(
    {
        renderers = defaultRenderers,
        linkPreviewClass = 'link-with-preview',
        tippyOptions = {},
        postInit = () => {},
        actionProviders = [],
    }: InitPreviewsOnPageParams = {},
) {
    async function initPreview(link: LinkLike): Promise<Instance | undefined> {
        try {
            const previewElement = await render(new URL(link.href), renderers)
            if (!previewElement) return

            link.classList.add(linkPreviewClass)
            const tippyInstance =
                createTippy(link, createPreviewWrapper(link, previewElement, actionProviders), tippyOptions)
            postInit(link)

            return tippyInstance
        } catch (e) {
            console.error('Failed to initialize the preview for', link, e)
        }
    }

    async function initPreviewsForExistingLinks() {
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
            const links = node.querySelectorAll(linkSelector) as NodeListOf<LinkLike>
            links.forEach(initPreview)
        }
    }

    void initPreviewsForExistingLinks()
    watchAndInitNewLinks()
}
