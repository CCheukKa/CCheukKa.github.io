import styles from "@/styles/curriculum-vitae.module.css";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";
import TitleCard from "@/components/TitleCard";
import Body from "@/components/Body";
import ContentCard from "@/components/ContentCard";

export default function CurriculumVitaePage() {
    return (
        <>
            <TitleCard
                title="Curriculum Vitae"
                flavourText="My professional experience and qualifications"
                description={
                    "Here is my Curriculum Vitae (CV), detailing my educational background, work experience, skills, and other relevant qualifications. This document provides an overview of my professional journey and accomplishments to date."
                }
            />

            <Body>
                <ContentCard className={styles.contentCard}>
                    <iframe
                        src="https://cck.wtf/curriculum-vitae-redact/CCheukKa Curriculum Vitae (REDACTED).pdf"
                        width="100%"
                        height="100%"
                        className={styles.pdfIFrame}
                        title="Curriculum Vitae"
                    />
                </ContentCard>
            </Body>
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Curriculum Vitae"
        }
    };
};