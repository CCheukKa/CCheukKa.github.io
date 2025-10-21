export type Page = {
    refName: string;                // The name of the folder in the root directory
    displayName: string;            // The name that will be displayed on the navigation bar and shelf
    emoji?: string;                 // The emoji that will be displayed on the shelf
    underConstruction?: boolean;    // If true, the page will be displayed as under construction
    openInNewTab?: boolean;         // If true, the page will open in a new tab
    hideFromShelf?: boolean;        // If true, the page will not be displayed on the shelf
    hideFromNav?: boolean;          // If true, the page will not be displayed on the navigation bar
}

export type Config = {
    catalogue: Page[];
    exceptions: {
        refName: string;
    }[];
};

export const config: Config = {
    catalogue: [
        {
            refName: "home",
            displayName: "🏠 Home",
            hideFromShelf: true
        },
        {
            refName: "projects",
            displayName: "Projects",
            emoji: "👨🏻‍💻"
        },
        {
            refName: "plasticity",
            displayName: "Plasticity",
            emoji: "🗑️"
        },
        {
            refName: "papers",
            displayName: "Papers",
            emoji: "📑"
        },
        {
            refName: "journal",
            displayName: "Journal",
            emoji: "📝"
        },
        {
            refName: "curriculum-vitae",
            displayName: "CV",
            emoji: "📜",
            hideFromShelf: true,
            hideFromNav: true
        },
        {
            refName: "github",
            displayName: "Github ➹",
            hideFromShelf: true
        }
    ],
    exceptions: [
        {
            refName: "chess"
        },
        {
            refName: "advertisement"
        }
    ]
};