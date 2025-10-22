import type { ShelfConfig } from "./shelfConfig"

export const projectsConfig: ShelfConfig = {
    rootRefName: "projects",
    shelfItems: [
        {
            displayName: "Pathfind + MazeGen",
            refPath: "pathfinding+mazegen",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "Snake",
            refPath: "snake",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "Tetris",
            refPath: "tetris",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "Chess(es)",
            refPath: "chess",
        },
        {
            displayName: "Connect Four",
            refPath: "connect-four",
            refPage: "page",
            openInNewTab: true
        },
        {
            displayName: "Racing AI",
            isRemote: true,
            refPath: "https://cck.wtf/racing-ai"
        },
        {
            displayName: "Seating Constraint Solver",
            isRemote: true,
            refPath: "https://cck.wtf/seating-constraint-solver"
        }
    ]
}