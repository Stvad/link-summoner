import {LinkRenderer} from './link-renderer'
import {createIframe} from './iframe-renderer'

export class ManifoldRenderer implements LinkRenderer {
    canRender = async (url: URL) => regex.test(url.href)

    render = async (url: URL) =>
        createIframe(rewriteToEmbed(url.href), 'manifold-preview')
}

/**
 * Example:
 * https://manifold.markets/SG/will-elon-musk-buy-twitter-this-yea
 * -> https://manifold.markets/embed/SG/will-elon-musk-buy-twitter-this-yea
 */
function rewriteToEmbed(link: string) {
    const alreadyEmbed = link.includes('manifold.markets/embed/')
    if (alreadyEmbed) return link

    const match = link.match(regex)!

    return `https://manifold.markets/embed/${match[1]}/${match[2]}`
}

const regex = /^https?:\/\/manifold\.markets\/(?!charity\/)([^\/]+)\/([^\/]+)/
