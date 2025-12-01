import styles from "@/styles/curriculum-vitae.module.css";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";
import TitleCard from "@/components/TitleCard";
import ContentCard from "@/components/ContentCard";
import Body from "@/components/Body";
import Shelf from "@/components/Shelf";
import { curriculumVitaeConfig } from "@/configs/curriculumVitaeConfig";

export default function CurriculumVitaePage() {
    return (
        <>
            <TitleCard
                title="Curriculum Vitaeₛ"
                flavourText="Variants of my CV tailored for different fields"
                pageTitleContainerClassName={styles.pageTitleContainer}
                pageTitleClassName={styles.pageTitle}
                flavourTextClassName={styles.flavourText}
            />

            <Body>
                <ContentCard>
                    <Shelf shelfConfig={curriculumVitaeConfig} />
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