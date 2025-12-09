import type { ShelfConfig, ShelfItem } from "./shelfConfig"

export type PortfolioTag = {
    displayName: string;
    abbreviation: string;
    starred?: boolean;
};
export const portfolioTags: Record<string, PortfolioTag> = {
    // Project
    RESEARCH_PROJECTS: {
        displayName: "Research Projects",
        abbreviation: "Research",
        starred: true,
    },
    STEM_WORKSHOP_MATERIALS: {
        displayName: "STEM Workshop Materials",
        abbreviation: "STEM",
        starred: true,
    },
    CUHK_BME_PROMOTION_MATERIALS: {
        displayName: "CUHK BME Promotion Materials",
        abbreviation: "BME",
    },
    STUDENT_SOCIETY_MATERIALS: {
        displayName: "Student Society Materials",
        abbreviation: "Society",
    },
    // Medium
    CODING_PROJECTS: {
        displayName: "Coding Projects",
        abbreviation: "Coding",
        starred: true,
    },
    PRESENTATION_SLIDES: {
        displayName: "Presentation Slides",
        abbreviation: "Slides",
    },
    VIDEO_AND_GRAPHICS: {
        displayName: "Video & Graphics",
        abbreviation: "Design",
    },
} as const;

type PortfolioShelfItem = ShelfItem & {
    tags?: (typeof portfolioTags)[keyof typeof portfolioTags][];
};

export const portfolioConfig: ShelfConfig = {
    rootRefName: "portfolio",
    shelfItems: Object.values(portfolioTags)
        .map(tag => ({
            ...tag,
            refPath: tag.abbreviation.toLowerCase(),
        })).sort((a, b) =>
            a.starred === b.starred
                ? 0
                : a.starred
                    ? -1
                    : 1
        ),
}

export const portfolioContentConfig: ShelfConfig<PortfolioShelfItem> = {
    rootRefName: "portfolio",
    shelfItems: [

        //^ ResiSense
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Wiki Website",
            refPath: "https://resisense.github.io",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/resisense/wiki.png",
            tags: [
                portfolioTags.RESEARCH_PROJECTS,
                portfolioTags.CODING_PROJECTS,
            ],
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Promotion Video",
            refPath: "https://www.youtube.com/watch?v=C-wbhdFBsfY",
            thumbnailPathOverride: "https://img.youtube.com/vi/C-wbhdFBsfY/sddefault.jpg",
            tags: [
                portfolioTags.RESEARCH_PROJECTS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Presentation Video",
            refPath: "https://www.youtube.com/watch?v=8oYWNQBkCFI",
            thumbnailPathOverride: "https://img.youtube.com/vi/8oYWNQBkCFI/sddefault.jpg",
            tags: [
                portfolioTags.RESEARCH_PROJECTS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Presentation Slides",
            refPath: "https://www.figma.com/proto/CXkUXf3W9ccRuE5iuGOnCD/Symposium-Material?node-id=100-3",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/resisense/symposium.png",
            tags: [
                portfolioTags.RESEARCH_PROJECTS,
                portfolioTags.PRESENTATION_SLIDES,
            ],
        },

        //^ CINTEC
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "Catapult Workshop Handout",
            refPath: "https://cck.wtf/portfolioAssets/catapult-workshop/handout.pdf",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/catapult-workshop/handout.png",
            tags: [
                portfolioTags.STEM_WORKSHOP_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Racing AI Workshop App",
            refPath: "https://cck.wtf/racing-ai",
            tags: [
                portfolioTags.STEM_WORKSHOP_MATERIALS,
                portfolioTags.CODING_PROJECTS,
            ],
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Racing AI Workshop Slides",
            refPath: "https://cck.wtf/portfolioAssets/racing-ai-workshop/slides.pdf",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/racing-ai-workshop/slides.png",
            tags: [
                portfolioTags.STEM_WORKSHOP_MATERIALS,
                portfolioTags.PRESENTATION_SLIDES,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Hydraulics Workshop Slides",
            refPath: "https://www.canva.com/design/DAGxXhZkBRc/aaeBVacO7Mo0tD_xlTunqA/view",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/hydraulics-workshop/title.png",
            tags: [
                portfolioTags.STEM_WORKSHOP_MATERIALS,
                portfolioTags.PRESENTATION_SLIDES,
            ],
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Vacuum Workshop Slides",
            refPath: "https://www.canva.com/design/DAGk0UIFDqc/jOlMpj4_xQtFZitazNjueA/view",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/vacuum-workshop/title.png",
            tags: [
                portfolioTags.STEM_WORKSHOP_MATERIALS,
                portfolioTags.PRESENTATION_SLIDES,
            ],
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Vacuum Workshop Guide",
            refPath: "https://cck.wtf/portfolioAssets/vacuum-workshop/guide.pdf",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/vacuum-workshop/guide.png",
            tags: [
                portfolioTags.STEM_WORKSHOP_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "InnoCarnival Q&A Game",
            refPath: "https://cck.wtf/Green-STEM-Q-and-A-game",
            refPage: "page.html",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/green-stem-innocarnival-game/game.png",
            tags: [
                portfolioTags.CODING_PROJECTS,
            ],
        },

        //^ CUHK BME
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "BME Programme Video",
            refPath: "https://www.youtube.com/watch?v=ybDdRa6nVQc",
            thumbnailPathOverride: "https://img.youtube.com/vi/ybDdRa6nVQc/sddefault.jpg",
            tags: [
                portfolioTags.CUHK_BME_PROMOTION_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "BME Interview Video",
            refPath: "https://www.instagram.com/p/DMH99Zotj6w",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/bme-dept/ricky-interview.png",
            tags: [
                portfolioTags.CUHK_BME_PROMOTION_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "BME Summer Training Video",
            refPath: "https://www.instagram.com/p/DMMaiDLSpsL",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/bme-dept/summer-training.png",
            tags: [
                portfolioTags.CUHK_BME_PROMOTION_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "BME Department Booklet",
            refPath: "https://cck.wtf/portfolioAssets/bme-dept/booklet.pdf",
            tags: [
                portfolioTags.CUHK_BME_PROMOTION_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        },

        //^ Flaretrikos
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Handbill",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/handbill.pdf",
            tags: [
                portfolioTags.STUDENT_SOCIETY_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Business Card",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/card.pdf",
            tags: [
                portfolioTags.STUDENT_SOCIETY_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society T-Shirt",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/t-shirt.png",
            tags: [
                portfolioTags.STUDENT_SOCIETY_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Animation",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/animation.mp4",
            tags: [
                portfolioTags.STUDENT_SOCIETY_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Posts (Some)",
            refPath: "https://www.instagram.com/cuhk_flaretrikos",
            tags: [
                portfolioTags.STUDENT_SOCIETY_MATERIALS,
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        },

        //^ Miscellaneous
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "(very old!) Putonghua Project Video",
            refPath: "https://www.youtube.com/watch?v=K7gvz_uZ1jg",
            thumbnailPathOverride: "https://img.youtube.com/vi/K7gvz_uZ1jg/sddefault.jpg",
            tags: [
                portfolioTags.VIDEO_AND_GRAPHICS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "CUHK Bus Clock App",
            refPath: "https://github.com/CCheukKa/CUHK-bus-clock",
            tags: [
                portfolioTags.CODING_PROJECTS,
            ],
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Chinese Stroke Input Method",
            refPath: "https://cck.wtf/stroke",
            tags: [
                portfolioTags.CODING_PROJECTS,
            ],
        }
    ]
}