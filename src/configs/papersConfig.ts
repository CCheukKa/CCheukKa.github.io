export type Paper = {
    topic: string,
    type: string,
    date: string,
} & ({
    primaryPDFName: string,
    primaryNonPDFName?: never,
} | {
    primaryPDFName?: never,
    primaryNonPDFName: string,
}) & ({
    secondaryPDFName?: string,
    secondaryNonPDFName?: never,
} | {
    secondaryPDFName?: never,
    secondaryNonPDFName?: string,
});

export type Course = {
    courseCode: string,
    courseName: string,
    papers: Paper[],
};

type PapersConfig = {
    rootPath: string,
    courses: Course[],
};

export const papersConfig: PapersConfig = {
    rootPath: "https://cck.wtf/paperPDFs",
    courses: [
        {
            courseCode: "SJC-INTEGRATED-HUMANITIES",
            courseName: "Secondary School Integrated Humanities",
            papers: [
                {
                    primaryPDFName: "IH Tourism Project Report draft",
                    topic: "Tourism in Central & Western District",
                    type: "Project Learning Report (draft?)",
                    date: "28-01-2016",
                },
                {
                    primaryPDFName: "IH Project - Tourism (C&W District)",
                    topic: "Tourism in Central & Western District",
                    type: "Project Learning Presentation",
                    date: "28-01-2016",
                },
                {
                    primaryPDFName: "IH Stress Project Report",
                    topic: "Stress Coping in Hong Kong Secondary Students",
                    type: "Project Learning Report",
                    date: "18-11-2017",
                },
                {
                    primaryNonPDFName: "IH Stress Project Presentation.pptx",
                    secondaryPDFName: "IH Stress Project Presentation",
                    topic: "Stress Coping in Hong Kong Secondary Students",
                    type: "Project Learning Presentation",
                    date: "28-05-2018",
                },
            ],
        },
        {
            courseCode: "SJC-ENGLISH",
            courseName: "Secondary School English",
            papers: [
                {
                    primaryPDFName: "Book Report",
                    topic: "On \"Replay\"",
                    type: "Book Report",
                    date: "12-02-2019",
                },
            ],
        },
        {
            courseCode: "SJC-LIBERAL-STUDIES",
            courseName: "Secondary School Liberal Studies",
            papers: [
                {
                    primaryPDFName: "LS News Commentary 1",
                    topic: "Repurposing Country Parks for Sustainable Development",
                    type: "News Commentary",
                    date: "07-03-2019",
                },
                {
                    primaryPDFName: "IES Report",
                    topic: "Facial Recognition Technology in Public Surveillance Systems",
                    type: "Independent Enquiry Study Report",
                    date: "19-07-2020",
                },
            ],
        },
        {
            courseCode: "CHLT-1100",
            courseName: "University Chinese I",
            papers: [
                {
                    primaryPDFName: "[1] 前測",
                    topic: "飽",
                    type: "Creative Writing",
                    date: "20-09-2021",
                },
                {
                    primaryPDFName: "[2] 語文札記",
                    topic: "中英夾雜",
                    type: "Journal Article",
                    date: "11-11-2021",
                },
                {
                    primaryPDFName: "[3] 散文",
                    topic: "散文",
                    type: "Creative Writing",
                    date: "02-12-2021",
                },
            ],
        },
        {
            courseCode: "GECC-1130",
            courseName: "Idea of a University",
            papers: [
                {
                    primaryPDFName: "[1] GECC1130 Reflective report",
                    topic: "University Goals",
                    type: "Reflective Essay",
                    date: "29-11-2021",
                },
                {
                    primaryPDFName: "[2] Topic Article",
                    topic: "Deontology and Teleology",
                    type: "Argumentative Essay",
                    date: "09-12-2021",
                },
            ],
        },
        {
            courseCode: "GECC-1131",
            courseName: "Idea of a University: Student-Oriented Learning",
            papers: [
                {
                    primaryPDFName: "[1] Book Report",
                    topic: "On \"Justice: What's the Right Thing to Do?\"",
                    type: "Book Report",
                    date: "10-12-2021",
                },
            ],
        },
        {
            courseCode: "PHYS-1110",
            courseName: "Engineering Physics: Mechanics and Thermodynamics",
            papers: [
                {
                    primaryPDFName: "[1] PHYS 1110 Final Cheat Sheet",
                    topic: "Physics: Mechanics and Thermodynamics",
                    type: "Cheat Sheet",
                    date: "09-12-2021",
                },
            ],
        },
        {
            courseCode: "ELTU-1002",
            courseName: "English Communication for University Studies",
            papers: [
                {
                    primaryPDFName: "[1] ChanCheukKa_1002CP_Proposal_1155174356",
                    secondaryPDFName: "[1+] ChanCheukKa_1002CP_Proposal_1155174356 (with markup)",
                    topic: "Institutional Racism",
                    type: "Essay Proposal",
                    date: "30-03-2022",
                },
                {
                    primaryPDFName: "[2] ChanCheukKa_1002CP_Essay_1155174356",
                    topic: "Institutional Racism",
                    type: "Argumentative Essay",
                    date: "29-04-2022",
                },
            ],
        },
        {
            courseCode: "ENGG-1120",
            courseName: "Linear Algebra for Engineers",
            papers: [
                {
                    primaryPDFName: "[1] ENGG 1120 Final Cheat Sheet",
                    topic: "Linear Algebra",
                    type: "Cheat Sheet",
                    date: "04-05-2022",
                },
            ],
        },
        {
            courseCode: "UGED-1111",
            courseName: "Logic",
            papers: [
                {
                    primaryPDFName: "[1] Final Cheat Sheet",
                    topic: "Logic",
                    type: "Cheat Sheet",
                    date: "05-05-2022",
                },
            ],
        },
        {
            courseCode: "UGFN-1000",
            courseName: "In Dialogue with Nature",
            papers: [
                {
                    primaryPDFName: "[1] RJ3-174356",
                    secondaryPDFName: "[1+] RJ3-CHAN-Cheuk-Ka-174356 (Feedback)",
                    topic: "Mathematics and Science",
                    type: "Reflective Essay",
                    date: "05-03-2022",
                },
                {
                    primaryPDFName: "[2] TP4-174356",
                    secondaryPDFName: "[2+] TP4-CHAN-Cheuk-Ka-174356 (Feedback)",
                    topic: "Free Will",
                    type: "Argumentative Essay",
                    date: "30-04-2022",
                },
            ],
        },
        {
            courseCode: "BMEG-2602",
            courseName: "Hospital Experience and Engineering Practicum",
            papers: [
                {
                    primaryPDFName: "[1] PWH+CUMC Training Log Book",
                    topic: "Training Log Book",
                    type: "Log Book",
                    date: "11-06-2022",
                },
            ],
        },
        {
            courseCode: "BMEG-2210",
            courseName: "Orthopaedic Biomechanics and Musculoskeletal Injuries",
            papers: [
                {
                    primaryPDFName: "[1] BMEG 2210 Final Cheat Sheet",
                    topic: "Orthopaedic Biomechanics and Musculoskeletal Injuries",
                    type: "Cheat Sheet",
                    date: "16-12-2022",
                },
            ],
        },
        {
            courseCode: "BMEG-2410",
            courseName: "Complex Analysis and Differential Equations",
            papers: [
                {
                    primaryPDFName: "[1] BMEG 2410 Final Cheat Sheet",
                    topic: "Complex Analysis and Differential Equations",
                    type: "Cheat Sheet",
                    date: "06-12-2022",
                },
            ],
        },
        {
            courseCode: "CHLT-1200",
            courseName: "University Chinese II",
            papers: [
                {
                    primaryPDFName: "[1] 議論文",
                    topic: "取捨",
                    type: "Argumentative Essay",
                    date: "26-10-2022",
                },
                {
                    primaryPDFName: "[2] 演講槁 script",
                    topic: "朋友",
                    type: "Speech Script",
                    date: "28-11-2022",
                },
            ],
        },
        {
            courseCode: "ENGG-1110",
            courseName: "Problem Solving by Programming",
            papers: [
                {
                    primaryPDFName: "[1] projectpart2_1155174356",
                    topic: "Modified Tic Tac Toe Game",
                    type: "Course Project Report",
                    date: "02-12-2022",
                },
            ],
        },
        {
            courseCode: "UGEA-2100",
            courseName: "Outline of Chinese Culture",
            papers: [
                {
                    primaryPDFName: "[1] 1155174356",
                    topic: "莊子、科舉制度 & 孝",
                    type: "Argumentative Essays",
                    date: "10-12-2022",
                },
            ],
        },
        {
            courseCode: "ELTU-2014",
            courseName: "English for Engineering Students 1",
            papers: [
                {
                    primaryPDFName: "[1] 2014BE_Chan Cheuk Ka_presentation",
                    topic: "Artificial Intelligence Explained",
                    type: "Presentation Slides",
                    date: "14-02-2023",
                },
                {
                    primaryPDFName: "[2] 2014BE_Chan Cheuk Ka_script",
                    topic: "Artificial Intelligence Explained",
                    type: "Presentation Script",
                    date: "14-02-2023",
                },
                {
                    primaryPDFName: "[3] Product Presentation PowerPoint",
                    topic: "InfraStrjoke",
                    type: "Product Presentation Slides",
                    date: "13-04-2023",
                },
                {
                    primaryPDFName: "[4] Product Presentation Script",
                    topic: "InfraStrjoke",
                    type: "Product Presentation Script",
                    date: "13-04-2023",
                },
                {
                    primaryPDFName: "[5] [mod] 2014BE_CHAN_CheukKa_HO_YuOn_YEUNG_LokYeung",
                    topic: "InfraStrjoke",
                    type: "Product Proposal",
                    date: "28-04-2023",
                },
            ],
        },
        {
            courseCode: "LSCI-3000",
            courseName: "Synthetic Biology Workshop",
            papers: [
                {
                    primaryPDFName: "[1] Lab Log 1",
                    topic: "Synthetic Biology Workshop Lab Log 1",
                    type: "Lab Log",
                    date: "24-02-2023",
                },
                {
                    primaryPDFName: "[2] Lab Log 2",
                    topic: "Synthetic Biology Workshop Lab Log 2",
                    type: "Lab Log",
                    date: "03-03-2023",
                },
                {
                    primaryPDFName: "[3] Lab Log 3",
                    topic: "Synthetic Biology Workshop Lab Log 3",
                    type: "Lab Log",
                    date: "10-03-2023",
                },
                {
                    primaryPDFName: "[4] Lab Log 4",
                    topic: "Synthetic Biology Workshop Lab Log 4",
                    type: "Lab Log",
                    date: "17-03-2023",
                },
                {
                    primaryPDFName: "[5] Lab Log 5",
                    topic: "Synthetic Biology Workshop Lab Log 5",
                    type: "Lab Log",
                    date: "24-03-2023",
                },
                {
                    primaryPDFName: "[6] Case Study 1",
                    topic: "Synthetic Biology Workshop Case Study 1",
                    type: "Lab Log",
                    date: "28-03-2023",
                },
                {
                    primaryPDFName: "[7] Case Study 2",
                    topic: "Synthetic Biology Workshop Case Study 2",
                    type: "Lab Log",
                    date: "28-03-2023",
                },
                {
                    primaryPDFName: "[8] LSCI 3000 iGEM Idea",
                    topic: "iGEM Project Idea Proposal",
                    type: "Journal Article",
                    date: "28-03-2023",
                },
            ],
        },
        {
            courseCode: "BMEG-2300",
            courseName: "Circuits and Signals for Biomedical Engineering",
            papers: [
                {
                    primaryPDFName: "[1] BMEG 2300 Final Cheat Sheet",
                    topic: "Circuits and Signals for Biomedical Engineering",
                    type: "Cheat Sheet",
                    date: "02-05-2023",
                },
            ],
        },
        {
            courseCode: "STAT-3210",
            courseName: "Statistical Techniques in Life Sciences",
            papers: [
                {
                    primaryPDFName: "[1] STAT 3210 Final Cheat Sheet (jank layout)",
                    topic: "Statistical Techniques in Life Sciences",
                    type: "Cheat Sheet",
                    date: "10-05-2023",
                },
            ],
        },
        {
            courseCode: "BMEG-3103",
            courseName: "Big Data in Healthcare",
            papers: [
                {
                    primaryPDFName: "[1] report",
                    topic: "Artificial Intelligence Illness Prediction",
                    type: "Report: Assignment",
                    date: "10-10-2023",
                },
                {
                    primaryPDFName: "[2] report1",
                    topic: "Artificial Intelligence Pneumonia Identification",
                    type: "Report: Project 1",
                    date: "28-11-2023",
                },
                {
                    primaryPDFName: "[3] powerpoint1",
                    topic: "Artificial Intelligence Pneumonia Identification",
                    type: "Presentation Slides: Project 1",
                    date: "28-11-2023",
                },
                {
                    primaryPDFName: "[4] report2",
                    topic: "Artificial Intelligence Health Class Classification",
                    type: "Report: Project 2",
                    date: "21-11-2023",
                },
                {
                    primaryPDFName: "[5] powerpoint2",
                    topic: "Artificial Intelligence Health Class Classification",
                    type: "Presentation Slides: Project 2",
                    date: "28-11-2023",
                },
            ],
        },
        {
            courseCode: "BMEG-3111",
            courseName: "Medical Instrumentation and Design",
            papers: [
                {
                    primaryPDFName: "[1] Stage 1 Report",
                    topic: "Paralyse need to type word",
                    type: "Report: Stage 1",
                    date: "02-10-2023",
                },
                {
                    primaryPDFName: "[2] Stage 2 Report",
                    topic: "Paralyse need to type word",
                    type: "Report: Stage 2",
                    date: "05-11-2023",
                },
                {
                    primaryPDFName: "[3] Stage 3 Report",
                    topic: "Paralyse need to type word",
                    type: "Report: Stage 3",
                    date: "28-11-2023",
                },
                {
                    primaryPDFName: "[4] BMEG 3111 Final Cheat Sheet",
                    topic: "Medical Instrumentation and Design",
                    type: "Cheat Sheet",
                    date: "11-12-2023",
                },
            ],
        },
        {
            courseCode: "BMEG-3320",
            courseName: "Biomedical Imaging",
            papers: [
                {
                    primaryPDFName: "[1] BMEG 3320 Final Cheat Sheet",
                    topic: "Biomedical Imaging",
                    type: "Cheat Sheet",
                    date: "06-12-2023",
                },
            ],
        },
        {
            courseCode: "BMEG-3330",
            courseName: "Neuroengineering",
            papers: [
                {
                    primaryPDFName: "[1] [P] 1-Page Proposal",
                    topic: "Brain-Computer Interface Game",
                    type: "Project Proposal",
                    date: "02-10-2023",
                },
                {
                    primaryPDFName: "[2] [M] Midterm Report",
                    topic: "Brain-Computer Interface Game",
                    type: "Report: Midterm",
                    date: "04-11-2023",
                },
                {
                    primaryPDFName: "[3] [F] Final Report",
                    topic: "Brain-Computer Interface Game",
                    type: "Report: Final",
                    date: "09-12-2023",
                },
            ],
        },
        {
            courseCode: "GECC-1000",
            courseName: "College Assembly",
            papers: [
                {
                    primaryPDFName: "[1] 1155174356_Wrong Pattern",
                    topic: "College Assembly Reflective Essay",
                    type: "Reflective Essay",
                    date: "22-12-2023",
                },
            ],
        },
        {
            courseCode: "BENG-0004",
            courseName: "Biochemistry and Molecular Biology",
            papers: [
                {
                    primaryPDFName: "[1] DNA Practical Lab Report",
                    topic: "DNA Practical Lab Report",
                    type: "Lab Report",
                    date: "08-03-2024",
                },
                {
                    primaryPDFName: "[2] Protein Practical Lab Report",
                    topic: "Protein Practical Lab Report",
                    type: "Lab Report",
                    date: "30-03-2024",
                },
            ],
        },
        {
            courseCode: "BMEG-3105",
            courseName: "Data Analytics for Personalised Genomics and Precision Medicine",
            papers: [
                {
                    primaryPDFName: "[1] Project Proposal",
                    topic: "Diagnosis of Thyroid Diseases from Blood Work",
                    type: "Project Proposal",
                    date: "08-11-2024",
                },
                {
                    primaryPDFName: "[2] presentation",
                    topic: "Diagnosis of Thyroid Diseases from Blood Work",
                    type: "Project Presentation Slides",
                    date: "29-11-2024",
                },
                {
                    primaryPDFName: "[3] script",
                    topic: "Diagnosis of Thyroid Diseases from Blood Work",
                    type: "Project Presentation Script",
                    date: "29-11-2024",
                },
                {
                    primaryPDFName: "[4] Project Report",
                    topic: "Diagnosis of Thyroid Diseases from Blood Work",
                    type: "Project Report",
                    date: "02-12-2024",
                },
            ],
        },
        {
            courseCode: "BMEG-3140",
            courseName: "Molecular and Cellular Engineering Laboratory",
            papers: [
                {
                    primaryPDFName: "[1] BMEG 3140 Presentation",
                    topic: "Genetically Modified Food",
                    type: "Presentation Slides",
                    date: "26-11-2024",
                },
                {
                    primaryPDFName: "[2] presentation script",
                    topic: "Genetically Modified Food",
                    type: "Presentation Script",
                    date: "26-11-2024",
                },
            ],
        },
        {
            courseCode: "BMEG-3430",
            courseName: "Biomaterials and Tissue Engineering",
            papers: [
                {
                    primaryPDFName: "[1] Project Report",
                    topic: "Biomaterials for Cartilage Tissue Repair and Regeneration",
                    type: "Project Report",
                    date: "21-11-2024",
                },
                {
                    primaryPDFName: "[2] presentation slides",
                    topic: "Biomaterials for Cartilage Tissue Repair and Regeneration",
                    type: "Project Presentation Slides",
                    date: "25-11-2024",
                },
                {
                    primaryPDFName: "[3] presentation script",
                    topic: "Biomaterials for Cartilage Tissue Repair and Regeneration",
                    type: "Project Presentation Script",
                    date: "25-11-2024",
                },
            ],
        },
        {
            courseCode: "ELTU-3415",
            courseName: "English through Food",
            papers: [
                {
                    primaryPDFName: "[1] food journal",
                    secondaryPDFName: "[1+] Ka_3415Q_Food Journal Grading Rubric",
                    topic: "Food Journal",
                    type: "Food Journal",
                    date: "20-09-2024",
                },
                {
                    primaryPDFName: "[2] Annotated Bibliography",
                    secondaryPDFName: "[2+] Annotated Bibliography_Ka",
                    topic: "Video Annotated Bibliography",
                    type: "Video: Annotated Bibliography",
                    date: "27-10-2024",
                },
                {
                    primaryPDFName: "[3] video",
                    secondaryPDFName: "[3+] Ka_3415Q_Food Programme Grading Rubric",
                    // https://www.youtube.com/watch?v=rlTHqr-6cBo
                    topic: "Desserted: On Food, Fun, and Friendship",
                    type: "Video: Food Video",
                    date: "27-11-2024",
                },
            ],
        },
        {
            courseCode: "GECC-4130",
            courseName: "Senior Seminar",
            papers: [
                {
                    primaryPDFName: "[1] Proposal",
                    topic: " Emotional Management of University Students",
                    type: "Project Proposal",
                    date: "31-05-2024",
                },
                {
                    primaryPDFName: "[2] GECC Presentation",
                    topic: "Emotional Management of University Students",
                    type: "Project Presentation Slides",
                    date: "08-11-2024",
                },
                {
                    primaryPDFName: "[3] GECC Discussion",
                    topic: "Emotional Management of University Students",
                    type: "Project Discussion Slides",
                    date: "08-11-2024",
                },
                {
                    primaryPDFName: "[4] Project Report",
                    topic: "Emotional Management of University Students",
                    type: "Project Report",
                    date: "21-11-2024",
                },
                {
                    primaryPDFName: "[5] Reflective Essay",
                    topic: "Senior Seminar Reflective Essay",
                    type: "Reflective Essay",
                    date: "29-11-2024",
                },
            ],
        },
        {
            courseCode: "UGFH-1000",
            courseName: "In Dialogue with Humanity",
            papers: [
                {
                    primaryPDFName: "[1] Reflective Essay",
                    secondaryPDFName: "[1+] 1155174356 Chan_Assignment_1 (RE Feedback)",
                    topic: "The Ladder of Eros and Politics",
                    type: "Reflective Essay",
                    date: "01-11-2024",
                },
                {
                    primaryPDFName: "[2] Term Paper",
                    //TODO: commentedPDFName: "[2+] 1155174356 Chan_Assignment_1 (TP Feedback)",
                    topic: "Termpapia: Democracy, Equality, and Education",
                    type: "Argumentative Essay",
                    date: "15-12-2024",
                },
            ],
        },
        {
            courseCode: "BMEG-3102",
            courseName: "Bioinformatics",
            papers: [
                {
                    primaryPDFName: "[1] 3102_present",
                    topic: "Protein Function Prediction",
                    type: "Product Presentation Slides",
                    date: "09-04-2025",
                },
                {
                    primaryPDFName: "[2] 3102_script",
                    topic: "Protein Function Prediction",
                    type: "Project Presentation Script",
                    date: "09-04-2025",
                },
                {
                    primaryPDFName: "[3] BMEG 3102 Project Report",
                    topic: "Protein Function Prediction",
                    type: "Project Report",
                    date: "28-04-2025",
                },
                {
                    primaryPDFName: "[4] BMEG 3102 Final Cheat Sheet",
                    topic: "Bioinformatics",
                    type: "Cheat Sheet",
                    date: "28-04-2025",
                },
            ],
        },
        {
            courseCode: "BMEG-4450",
            courseName: "Bionanotechnology",
            papers: [
                {
                    primaryPDFName: "[1] BMEG 4450 presentation",
                    topic: "Lab-on-a-chip",
                    type: "Presentation Slides",
                    date: "16-04-2025",
                },
                {
                    primaryPDFName: "[2] BMEG 4450 presentation script",
                    topic: "Lab-on-a-chip",
                    type: "Presentation Script",
                    date: "16-04-2025",
                },
            ],
        },
        {
            courseCode: "BMEG-4510",
            courseName: "Biomolecular Engineering",
            papers: [
                {
                    primaryPDFName: "[1] BMEG 4510 Bispecific Antibodies Presentation",
                    topic: "Bispecific Antibodies",
                    type: "Presentation Slides",
                    date: "25-04-2024",
                },
                {
                    primaryPDFName: "[2] BMEG 4510 Presentation Script",
                    topic: "Bispecific Antibodies",
                    type: "Presentation Script",
                    date: "25-04-2024",
                },
            ],
        },
        {
            courseCode: "BMEG-4998",
            courseName: "Final Year Project 1",
            papers: [
                {
                    primaryPDFName: "[1] Progress Report 1",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Progress Report 1",
                    date: "22-09-2024",
                },
                {
                    primaryPDFName: "[2] Progress Report 2",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Progress Report 2",
                    date: "20-10-2024",
                },
                {
                    primaryPDFName: "[3] Thesis 1",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Thesis 1",
                    date: "01-12-2024",
                },
                {
                    primaryPDFName: "[4] Presentation 1",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Project Presentation 1 Slides",
                    date: "01-12-2024",
                },
                {
                    primaryPDFName: "[5] presentation script",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Project Presentation 1 Script",
                    date: "01-12-2024",
                },
            ],
        },
        {
            courseCode: "BMEG-4999",
            courseName: "Final Year Project 2",
            papers: [
                {
                    primaryPDFName: "[1] Progress Report 3",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Progress Report 3",
                    date: "16-02-2025",
                },
                {
                    primaryPDFName: "[2] Progress Report 4",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Progress Report 4",
                    date: "16-03-2025",
                },
                {
                    primaryPDFName: "[3] Thesis 2",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Thesis 2",
                    date: "13-04-2025",
                },
                {
                    primaryPDFName: "[4] Presentation 2",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Project Presentation 2 Slides",
                    date: "28-04-2025",
                },
                {
                    primaryPDFName: "[5] presentation script",
                    topic: "Hypoxia in Cartilage Tissue Engineering",
                    type: "Project Presentation 2 Script",
                    date: "28-04-2025",
                },
            ],
        },
    ],
};