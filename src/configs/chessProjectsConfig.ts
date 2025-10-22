import { ShelfConfig } from "./shelfConfig"

export const chessProjectsConfig: ShelfConfig = {
    rootRefName: "projects/chess",
    shelfItems: [
        {
            displayName: "Chinese Chess",
            refPath: "chinese-chess/page"
        },
        {
            displayName: "Crowded Chinese Chess",
            refPath: "crowded-chinese-chess/page"
        },
        {
            displayName: "Western Chess",
            refPath: "vectorised-western-chess/page"
        },
        {
            displayName: "Circular Western Chess",
            refPath: "circular-western-chess/page"
        },
        {
            displayName: "(Old) Western Chess",
            refPath: "western-chess/page"
        }
    ]
}