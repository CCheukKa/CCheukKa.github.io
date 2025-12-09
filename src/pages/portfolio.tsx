import TitleCard from "@/components/TitleCard";
import Body from "@/components/Body";
import ContentCard from "@/components/ContentCard";
import Shelf from "@/components/Shelf";
import { portfolioConfig } from "@/configs/portfolioConfig";
import { AppPageProps } from "./_app";
import { GetStaticProps } from "next";

export default function PortfolioPage() {
    return (
        <>
            <TitleCard
                title="Portfolio"
                flavourText="A showcase of my work"
                description={
                    "A collection of my projects, designs, and creative works that highlight my skills and experiences in various domains."
                    + "\n"
                    + "\n"
                    + "All catalogued works are subject to my copyright and intellectual property rights. You will be subject to legal action for any unauthorized use, reproduction, or distribution of the content presented herein."
                }
            />

            <Body>
                <ContentCard>
                    <Shelf shelfConfig={portfolioConfig} />
                </ContentCard>
            </Body>
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Portfolio"
        }
    };
};