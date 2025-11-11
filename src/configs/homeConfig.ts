import type { ShelfConfig, ShelfItem } from "./shelfConfig"

export type HomeShelfItem = ShelfItem & {
    hideFromNav?: boolean;
}

type HomeConfig =
    ShelfConfig<HomeShelfItem>
    & {
        constructionExceptionRefPaths: string[]
    };

export const homeConfig: HomeConfig = {
    rootRefName: "",
    shelfItems: [
        {
            refPath: "home",
            displayName: "🏠 Home",
            hideFromShelf: true,
        },
        {
            refPath: "projects",
            displayName: "Projects",
            emoji: "👨🏻‍💻",
        },
        {
            refPath: "plasticity",
            displayName: "Plasticity",
            emoji: "🗑️",
        },
        {
            refPath: "portfolio",
            displayName: "Portfolio",
            emoji: "🖼️",
        },
        {
            refPath: "papers",
            displayName: "Papers",
            emoji: "📑",
        },
        {
            refPath: "journal",
            displayName: "Journal",
            emoji: "📝",
        },
        {
            refPath: "curriculum-vitae",
            displayName: "CV",
            emoji: "📜",
            hideFromShelf: true,
            // hideFromNav: true,
        },
        {
            refPath: "github",
            displayName: "Github ➹",
            hideFromShelf: true,
        }
    ],
    constructionExceptionRefPaths: [
        "chess",
    ]
}