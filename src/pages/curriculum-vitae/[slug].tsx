import styles from "@/styles/curriculum-vitae-content.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import TitleCard from "@/components/TitleCard";
import ContentCard from "@/components/ContentCard";
import { AppPageProps } from "../_app";
import { curriculumVitaeConfig } from "@/configs/curriculumVitaeConfig";

type CurriculumVitaeContentPageProps = AppPageProps & {
    abbreviation: string;
    displayName: string;
};
export default function CurriculumVitaeContentPage({ abbreviation, displayName }: CurriculumVitaeContentPageProps) {
    return (
        <div className={styles.gridContainer}>
            <TitleCard
                title="Curriculum Vitae"
                flavourText={`Field - ${displayName}`}
                description={
                    "Sensitive and personal information has been redacted. The redaction and updating of this document is done daily automatically with a cron job."
                }
                titleCardClassName={styles.titleCard}
                pageTitleContainerClassName={styles.pageTitleContainer}
                pageTitleClassName={styles.pageTitle}
                flavourTextClassName={styles.flavourText}
            />
            <ContentCard className={styles.contentCard}>
                <iframe
                    src={`https://cck.wtf/curriculum-vitae-redact/Curriculum-Vitae-${abbreviation}-(REDACTED).pdf`}
                    width="100%"
                    height="100%"
                    className={styles.pdf}
                    title="Curriculum Vitae"
                />
            </ContentCard>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (curriculumVitaeConfig.shelfItems ?? [])
        .map(item => ([
            { params: { slug: item.refPath } },
            { params: { slug: item.abbreviation.toLowerCase() } },
        ]))
        .flat();

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<CurriculumVitaeContentPageProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const shelfItem = curriculumVitaeConfig.shelfItems?.find(item => item.refPath === slug);
    if (!shelfItem) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            title: `Curriculum Vitae • ${shelfItem.abbreviation}`,
            abbreviation: shelfItem.abbreviation,
            displayName: shelfItem.displayName,
        }
    };
};