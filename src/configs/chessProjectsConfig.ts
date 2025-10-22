import { ShelfConfig } from "./shelfConfig"

export const chessProjectsConfig: ShelfConfig = {
    rootRefName: "projects/chess",
    shelfItems: [
        {
            displayName: "Chinese Chess",
            refPath: "https://raw.githubusercontent.com/CCheukKa/random-small-code/refs/heads/main/HTML%20JS%20Stuff/HTML%20Chess%20Engine/Project/Chinese%20Chess",
            refPage: "page",
        },
        {
            displayName: "Crowded Chinese Chess",
            refPath: "crowded-chinese-chess/page",
            refPage: "page"
        },
        {
            displayName: "Western Chess",
            refPath: "vectorised-western-chess/page",
            refPage: "page"
        },
        {
            displayName: "Circular Western Chess",
            refPath: "circular-western-chess/page",
            refPage: "page"
        },
        {
            displayName: "(Old) Western Chess",
            refPath: "western-chess/page",
            refPage: "page"
        }
    ]
}