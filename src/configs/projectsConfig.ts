import type { ShelfConfig } from "./shelfConfig"

export const projectsConfig: ShelfConfig = {
    rootRefName: "projects",
    shelfItems: [
        {
            displayName: "Pathfind + MazeGen",
            isRemote: true,
            refPath: "https://cck.wtf/pathfinding-mazegen",
            openInNewTab: true
        },
        {
            displayName: "Snake",
            isRemote: true,
            refPath: "https://cck.wtf/snake",
            openInNewTab: true
        },
        {
            displayName: "Tetris",
            isRemote: true,
            refPath: "https://cck.wtf/tetris",
            openInNewTab: true
        },
        {
            displayName: "Chess(es)",
            refPath: "chess",
            thumbnailPathOverride: "https://cck.wtf/chess/thumbnail.png"
        },
        {
            displayName: "Connect Four",
            emoji: "🎰",
            isRemote: true,
            refPath: "https://cck.wtf/connect-four",
            openInNewTab: true
        },
        {
            displayName: "Racing AI",
            isRemote: true,
            refPath: "https://cck.wtf/racing-ai",
            openInNewTab: true,
            starred: true,
        },
        {
            displayName: "Seating Constraint Solver",
            emoji: "💺",
            isRemote: true,
            refPath: "https://cck.wtf/seating-constraint-solver",
            openInNewTab: true
        }, {
            displayName: "Chinese Stroke Input Method",
            emoji: "✍🏻",
            isRemote: true,
            refPath: "https://cck.wtf/stroke",
            openInNewTab: true
        }, {
            displayName: "CUHK Bus Clock App",
            emoji: "🚌",
            isRemote: true,
            refPath: "https://github.com/CCheukKa/CUHK-bus-clock",
            openInNewTab: true
        }
    ]
}