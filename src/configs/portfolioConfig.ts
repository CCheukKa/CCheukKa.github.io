import type { ShelfConfig, ShelfItem } from "./shelfConfig"

export enum PortfolioProjectCategory {
    RESEARCH_PROJECTS = "Research Projects",
    STEM_WORKSHOP_MATERIALS = "STEM Workshop Materials",
    CUHK_BME_PROMOTION_MATERIALS = "CUHK BME Promotion Materials",
    STUDENT_SOCIETY_MATERIALS = "Student Society Materials",
}

export enum PortfolioMediumCategory {
    CODING_PROJECTS = "Coding Projects",
    PRESENTATION_SLIDES = "Presentation Slides",
    VIDEO_PRODUCTION = "Video Production",
    GRAPHIC_DESIGN_AND_ANIMATION = "Graphic Design/ Animation",
}

type PortfolioShelfItem = ShelfItem & {
    projectCategory?: PortfolioProjectCategory;
    mediumCategory?: PortfolioMediumCategory;
};

export const portfolioConfig: Omit<ShelfConfig<PortfolioShelfItem>, "shelfCategories"> = {
    rootRefName: "portfolio",
    shelfItems: [

        //^ CINTEC
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "Catapult Workshop Handout",
            refPath: "https://cck.wtf/portfolioAssets/catapult-workshop/handout.pdf",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/catapult-workshop/handout.png",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Racing AI Workshop App",
            refPath: "https://cck.wtf/racing-ai",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.CODING_PROJECTS,
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Racing AI Workshop Slides",
            refPath: "https://cck.wtf/portfolioAssets/racing-ai-workshop/slides.pdf",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/racing-ai-workshop/slides.png",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.PRESENTATION_SLIDES,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Hydraulics Workshop Slides",
            refPath: "https://www.canva.com/design/DAGxXhZkBRc/aaeBVacO7Mo0tD_xlTunqA/view",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/hydraulics-workshop/title.png",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.PRESENTATION_SLIDES,
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Vacuum Workshop Slides",
            refPath: "https://www.canva.com/design/DAGk0UIFDqc/jOlMpj4_xQtFZitazNjueA/view",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/vacuum-workshop/title.png",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.PRESENTATION_SLIDES,
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Vacuum Workshop Guide",
            refPath: "https://cck.wtf/portfolioAssets/vacuum-workshop/guide.pdf",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/vacuum-workshop/guide.png",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "InnoCarnival Q&A Game",
            refPath: "https://cck.wtf/Green-STEM-Q-and-A-game",
            refPage: "page.html",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/green-stem-innocarnival-game/game.png",
            mediumCategory: PortfolioMediumCategory.CODING_PROJECTS,
        },

        //^ ResiSense
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Wiki Website",
            refPath: "https://resisense.github.io",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/resisense/wiki.png",
            projectCategory: PortfolioProjectCategory.RESEARCH_PROJECTS,
            mediumCategory: PortfolioMediumCategory.CODING_PROJECTS,
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Promotion Video",
            refPath: "https://www.youtube.com/watch?v=C-wbhdFBsfY",
            thumbnailPathOverride: "https://img.youtube.com/vi/C-wbhdFBsfY/sddefault.jpg",
            projectCategory: PortfolioProjectCategory.RESEARCH_PROJECTS,
            mediumCategory: PortfolioMediumCategory.VIDEO_PRODUCTION,
            starred: true,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Presentation Video",
            refPath: "https://www.youtube.com/watch?v=8oYWNQBkCFI",
            thumbnailPathOverride: "https://img.youtube.com/vi/8oYWNQBkCFI/sddefault.jpg",
            projectCategory: PortfolioProjectCategory.RESEARCH_PROJECTS,
            mediumCategory: PortfolioMediumCategory.VIDEO_PRODUCTION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Presentation Slides",
            refPath: "https://www.figma.com/proto/CXkUXf3W9ccRuE5iuGOnCD/Symposium-Material?node-id=100-3",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/resisense/symposium.png",
            projectCategory: PortfolioProjectCategory.RESEARCH_PROJECTS,
            mediumCategory: PortfolioMediumCategory.PRESENTATION_SLIDES,
        },

        //^ CUHK BME
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "BME Programme Video",
            refPath: "https://www.youtube.com/watch?v=ybDdRa6nVQc",
            thumbnailPathOverride: "https://img.youtube.com/vi/ybDdRa6nVQc/sddefault.jpg",
            projectCategory: PortfolioProjectCategory.CUHK_BME_PROMOTION_MATERIALS,
            mediumCategory: PortfolioMediumCategory.VIDEO_PRODUCTION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "BME Interview Video",
            refPath: "https://www.instagram.com/p/DMH99Zotj6w",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/bme-dept/ricky-interview.pdf",
            projectCategory: PortfolioProjectCategory.CUHK_BME_PROMOTION_MATERIALS,
            mediumCategory: PortfolioMediumCategory.VIDEO_PRODUCTION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "BME Summer Training Video",
            refPath: "https://www.instagram.com/p/DMMaiDLSpsL",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/bme-dept/summer-training.pdf",
            projectCategory: PortfolioProjectCategory.CUHK_BME_PROMOTION_MATERIALS,
            mediumCategory: PortfolioMediumCategory.VIDEO_PRODUCTION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Department Booklet",
            refPath: "https://cck.wtf/portfolioAssets/bme-dept/booklet.pdf",
            projectCategory: PortfolioProjectCategory.CUHK_BME_PROMOTION_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
        },

        //^ Flaretrikos
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Handbill",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/handbill.pdf",
            projectCategory: PortfolioProjectCategory.STUDENT_SOCIETY_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Business Card",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/card.pdf",
            projectCategory: PortfolioProjectCategory.STUDENT_SOCIETY_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society T-Shirt",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/t-shirt.png",
            projectCategory: PortfolioProjectCategory.STUDENT_SOCIETY_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Animation",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/animation.mp4",
            projectCategory: PortfolioProjectCategory.STUDENT_SOCIETY_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Society Posts (Some)",
            refPath: "https://www.instagram.com/cuhk_flaretrikos",
            projectCategory: PortfolioProjectCategory.STUDENT_SOCIETY_MATERIALS,
        },

        //^ Miscellaneous
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "(very old!) Putonghua Project Video",
            refPath: "https://www.youtube.com/watch?v=K7gvz_uZ1jg",
            thumbnailPathOverride: "https://img.youtube.com/vi/K7gvz_uZ1jg/sddefault.jpg",
            mediumCategory: PortfolioMediumCategory.VIDEO_PRODUCTION,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "CUHK Bus Clock App",
            refPath: "https://github.com/CCheukKa/CUHK-bus-clock",
            mediumCategory: PortfolioMediumCategory.CODING_PROJECTS,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Chinese Stroke Input Method",
            refPath: "https://cck.wtf/stroke",
            mediumCategory: PortfolioMediumCategory.CODING_PROJECTS,
        }
    ]
}