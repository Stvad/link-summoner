import {LinkLike} from './types'

function buildActions(
    actionProviders: ((link: LinkLike) => HTMLElement)[] | undefined,
    link: HTMLAnchorElement | HTMLAreaElement,
) {
    const actions = document.createElement('div')
    actions.classList.add('link-preview-actions')
    actions.append(...actionProviders?.map(provider => provider(link)) ?? [])
    return actions
}

export function createPreviewWrapper(
    link: LinkLike,
    previewElement: HTMLElement,
    actionProviders: ((link: LinkLike) => HTMLElement)[] | undefined,
) {
    const wrapper = document.createElement('div')
    wrapper.classList.add('link-preview-wrapper')
    wrapper.append(buildActions(actionProviders, link), previewElement)
    return wrapper
}
