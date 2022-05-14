import {IframeRenderer} from './iframe-renderer'
import {WikipediaRenderer} from './wikipedia-renderer'
import {findAsync, someAsync} from '../async'
import {ManifoldRenderer} from './manifold-renderer'

export interface LinkRenderer {
	canRender(url: URL): Promise<boolean>

	render(url: URL): Promise<HTMLElement>
}

export const siteSpecificRenderers: LinkRenderer[] = [
	new ManifoldRenderer(),
	new WikipediaRenderer()
]
/**
 * Order is priority
 */
export const defaultRenderers: LinkRenderer[] = [
	...siteSpecificRenderers,
	new IframeRenderer(),
]

export const render = async (link: URL, renderers: LinkRenderer[] = defaultRenderers): Promise<HTMLElement | null> => {
	// Do pre-check,so we can assume something is going to render and do that async
	if (!await canRender(link, renderers)) return null

	const renderContainer = defaultRenderContainer()
	renderComponent(renderers, link)?.then(component => {
		renderContainer.append(component)
	})
	return renderContainer
}

const canRender = async (link: URL, renderers: LinkRenderer[] = defaultRenderers): Promise<boolean> =>
	someAsync(renderers, renderer => renderer.canRender(link))

const renderComponent = async (renderers: LinkRenderer[], link: URL) => {
	const renderer = await findAsync(renderers, r => r.canRender(link))
	if (!renderer) throw new Error('No matching renderer found')

	return renderer.render(link)
}

function defaultRenderContainer() {
	const renderContainer = document.createElement('div')
	renderContainer.className = 'link-preview-container'
	return renderContainer
}
