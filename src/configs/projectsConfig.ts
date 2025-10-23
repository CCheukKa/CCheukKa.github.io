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
            isRemote: true,
            refPath: "https://cck.wtf/connect-four",
            openInNewTab: true
        },
        {
            displayName: "Racing AI",
            isRemote: true,
            refPath: "https://cck.wtf/racing-ai",
            openInNewTab: true
        },
        {
            displayName: "Seating Constraint Solver",
            isRemote: true,
            refPath: "https://cck.wtf/seating-constraint-solver",
            openInNewTab: true
        }
    ]
}