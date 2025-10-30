import { ShelfConfig } from "./shelfConfig"

export const chessProjectsConfig: ShelfConfig = {
    rootRefName: "projects/chess",
    shelfItems: [
        {
            displayName: "Chinese Chess",
            isRemote: true,
            refPath: "https://cck.wtf/chess/chinese-chess",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "Crowded Chinese Chess",
            isRemote: true,
            refPath: "https://cck.wtf/chess/crowded-chinese-chess",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "Western Chess",
            isRemote: true,
            refPath: "https://cck.wtf/chess/vectorised-western-chess",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "Circular Western Chess",
            isRemote: true,
            refPath: "https://cck.wtf/chess/circular-western-chess",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "(Old) Western Chess",
            isRemote: true,
            refPath: "https://cck.wtf/chess/western-chess",
            refPage: "page",
            openInNewTab: true
        }
    ]
}