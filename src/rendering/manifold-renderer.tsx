import {LinkRenderer} from './link-renderer'

export class ManifoldRenderer implements LinkRenderer {
    async canRender(url: URL): Promise<boolean> {
        return regex.test(url.href)
    }

    async render(url: URL): Promise<HTMLElement> {
        const result = document.createElement('iframe')
        result.src = rewriteToEmbed(url.href)
        result.className = 'manifold-preview'
        return result
    }
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
