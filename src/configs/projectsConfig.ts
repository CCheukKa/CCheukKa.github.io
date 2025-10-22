import type { ShelfConfig } from "./shelfConfig"

export const projectsConfig: ShelfConfig = {
    rootRefName: "projects",
    shelfItems: [
        {
            displayName: "Pathfind + MazeGen",
            refPath: "pathfinding+mazegen/page",
            openInNewTab: true
        },
        {
            displayName: "Snake",
            refPath: "snake/page",
            openInNewTab: true
        },
        {
            displayName: "Tetris",
            refPath: "tetris/page",
            openInNewTab: true
        },
        {
            displayName: "Chess(es)",
            refPath: "chess",
        },
        {
            displayName: "Connect Four",
            refPath: "connect-four/page",
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