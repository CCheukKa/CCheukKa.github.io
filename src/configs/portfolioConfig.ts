import type { ShelfConfig, ShelfItem } from "./shelfConfig"

export enum PortfolioProjectCategory {
    STEM_WORKSHOP_MATERIALS = "STEM Workshop Materials",
    RESEARCH_PROJECTS = "Research Projects",
    STUDENT_SOCIETY_MATERIALS = "Student Society Materials",
}

export enum PortfolioMediumCategory {
    PRESENTATION_SLIDES = "Presentation Slides",
    VIDEO_PRODUCTION = "Video Production",
    WEBSITE = "Web Application",
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
            displayName: "Vacuum Workshop Slides",
            refPath: "https://www.canva.com/design/DAGk0UIFDqc/jOlMpj4_xQtFZitazNjueA/view",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/vacuum-workshop/title.png",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.PRESENTATION_SLIDES,
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
            displayName: "Racing AI Workshop Web App",
            refPath: "https://cck.wtf/racing-ai",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.WEBSITE,
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
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "Catapult Workshop Handout",
            refPath: "https://cck.wtf/portfolioAssets/catapult-workshop/handout.pdf",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/catapult-workshop/handout.png",
            projectCategory: PortfolioProjectCategory.STEM_WORKSHOP_MATERIALS,
            mediumCategory: PortfolioMediumCategory.GRAPHIC_DESIGN_AND_ANIMATION,
        },

        //^ ResiSense
        {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Wiki Website",
            refPath: "https://resisense.github.io",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/resisense/wiki.png",
            projectCategory: PortfolioProjectCategory.RESEARCH_PROJECTS,
            mediumCategory: PortfolioMediumCategory.WEBSITE,
        }, {
            isRemote: true,
            openInNewTab: true,
            displayName: "ResiSense Promotion Video",
            refPath: "https://www.youtube.com/watch?v=C-wbhdFBsfY",
            thumbnailPathOverride: "https://img.youtube.com/vi/C-wbhdFBsfY/sddefault.jpg",
            projectCategory: PortfolioProjectCategory.RESEARCH_PROJECTS,
            mediumCategory: PortfolioMediumCategory.VIDEO_PRODUCTION,
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
            displayName: "InnoCarnival Q&A Game",
            refPath: "https://cck.wtf/Green-STEM-Q-and-A-game",
            refPage: "page.html",
            thumbnailPathOverride: "https://cck.wtf/portfolioAssets/green-stem-innocarnival-game/game.png",
            mediumCategory: PortfolioMediumCategory.WEBSITE,
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
            displayName: "Department Booklet",
            refPath: "https://cck.wtf/portfolioAssets/flaretrikos/booklet.pdf",
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
        }
    ]
}