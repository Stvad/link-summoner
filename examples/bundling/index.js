import {initPreviews, defaultRenderers, iframeRenderer} from "link-summoner"

initPreviews({
    renderers: [
        iframeRenderer(/example\.com/),
        ...defaultRenderers,
    ]
})
console.log("links are summoned")
