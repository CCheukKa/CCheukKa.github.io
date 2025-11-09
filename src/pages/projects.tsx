import { projectsConfig } from "@/configs/projectsConfig";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";
import TitleCard from "@/components/TitleCard";
import Body from "@/components/Body";
import ContentCard from "@/components/ContentCard";
import Shelf from "@/components/Shelf";

export default function ProjectsPage() {
    return (
        <>
            <TitleCard
                title="Projects"
                flavourText="Some random coding projects I have done in the past"
                description={
                    "This is only the tip of the iceberg. Check out <a href=\"https://github.com/CCheukKa/random-small-code\" target=\"_blank\" class=\"bold underline\" style=\"color: #faf8f5;\">my github page</a> for more!"
                }
            />

            <Body>
                <ContentCard>
                    <Shelf shelfConfig={projectsConfig} />
                </ContentCard>
            </Body>
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Projects"
        }
    };
};