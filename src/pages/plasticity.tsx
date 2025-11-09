import { plasticityConfig } from "@/configs/plasticityConfig";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";
import TitleCard from "@/components/TitleCard";
import Body from "@/components/Body";
import ContentCard from "@/components/ContentCard";
import Shelf from "@/components/Shelf";

export default function PlasticityPage() {
    return (
        <>
            <TitleCard
                title="Plasticity"
                flavourText="Random dumb pieces of texts I sometimes write"
                description={
                    "Sometimes I just couldn't help myself when some obscure inspiration strikes; I would find myself writing non-stop. The topics they explore are as random and disorganised as can be."
                    + "\n" +
                    "Simply put, these are all just low-quality brain vomits and aimless rambles with little regard for grammar."
                }
            />

            <Body>
                <ContentCard>
                    <Shelf shelfConfig={plasticityConfig} />
                </ContentCard>
            </Body>
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Plasticity"
        }
    };
};