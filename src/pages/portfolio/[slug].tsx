import styles from "@/styles/portfolio.module.css"
import { GetStaticPaths, GetStaticProps } from "next";
import TitleCard from "@/components/TitleCard";
import ContentCard from "@/components/ContentCard";
import { AppPageProps } from "../_app";
import Body from "@/components/Body";
import Shelf from "@/components/Shelf";
import { portfolioContentConfig, PortfolioTag, portfolioTags } from "@/configs/portfolioConfig";

type PortfolioContentPageProps = AppPageProps & {
    tag: PortfolioTag;
};
export default function PortfolioContentPage({ tag }: PortfolioContentPageProps) {
    return (
        <>
            <TitleCard
                title={tag.displayName}
                pageTitleClassName={styles.pageTitle}
            />

            <Body>
                <ContentCard>
                    <Shelf shelfConfig={{
                        ...portfolioContentConfig,
                        shelfItems: portfolioContentConfig.shelfItems?.filter(item => item.tags?.some(t => tagsMatch(t, tag))),
                    }} />
                </ContentCard>
            </Body>
        </>
    );

    /* -------------------------------------------------------------------------- */
    function tagsMatch(tag1: PortfolioTag, tag2: PortfolioTag) {
        return Object.entries(tag1).every(([key, value]) => tag2[key as keyof PortfolioTag] === value);
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = Object.values(portfolioTags).map(tag => ({
        params: {
            slug: tag.abbreviation.toLowerCase(),
        },
    }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<PortfolioContentPageProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const tag = Object.values(portfolioTags).find(t => t.abbreviation.toLowerCase() === slug);
    if (!tag) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            title: `Portfolio • ${tag.abbreviation}`,
            tag: tag,
        }
    };
};