import styles from "@/styles/curriculum-vitae.module.css";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";
import TitleCard from "@/components/TitleCard";
import ContentCard from "@/components/ContentCard";

export default function CurriculumVitaePage() {
    return (
        <div className={styles.gridContainer}>
            <TitleCard
                title="Curriculum Vitae"
                description={
                    "Sensitive and personal information has been redacted. The redaction and updating of this document is done daily automatically with a cron job."
                }
                className={styles.titleCard}
            />
            <ContentCard className={styles.contentCard}>
                <embed
                    type="application/pdf"
                    src="https://cck.wtf/curriculum-vitae-redact/CCheukKa Curriculum Vitae (REDACTED).pdf"
                    width="100%"
                    height="100%"
                    className={styles.pdf}
                    title="Curriculum Vitae"
                />
            </ContentCard>
        </div>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Curriculum Vitae"
        }
    };
};