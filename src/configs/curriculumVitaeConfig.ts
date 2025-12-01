import type { ShelfConfig, ShelfItem } from "./shelfConfig"

export type CurriculumVitaeShelfItem = ShelfItem & {
    abbreviation: string;
}

type CurriculumVitaeConfig = ShelfConfig<CurriculumVitaeShelfItem>;

export const curriculumVitaeConfig: CurriculumVitaeConfig = {
    rootRefName: "curriculum-vitae",
    shelfItems: [
        {
            refPath: "biomedical-engineering",
            displayName: "Biomedical Engineering",
            emoji: "🔧",
            abbreviation: "BME",
        },
        {
            refPath: "computer-science",
            displayName: "Computer Science",
            emoji: "💻",
            abbreviation: "CS",
        },
        {
            refPath: "stem-education",
            displayName: "STEM Education",
            emoji: "📚",
            abbreviation: "STEM",
        },
        {
            refPath: "design",
            displayName: "Design",
            emoji: "🎨",
            abbreviation: "Design",
        },
    ],
}