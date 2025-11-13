import styles from "@/styles/portfolio.module.css";
import TitleCard from "@/components/TitleCard";
import Body from "@/components/Body";
import ContentCard from "@/components/ContentCard";
import Shelf from "@/components/Shelf";
import { portfolioConfig, PortfolioMediumCategory, PortfolioProjectCategory } from "@/configs/portfolioConfig";
import { ShelfConfig } from "@/configs/shelfConfig";
import { useEffect, useMemo, useState } from "react";
import { AppPageProps } from "./_app";
import { GetStaticProps } from "next";
import { useLayout } from "@/context/LayoutContext";

export default function PortfolioPage() {
    const projectCategorisedPortfolioConfig: ShelfConfig = {
        rootRefName: portfolioConfig.rootRefName,
        shelfItems: portfolioConfig.shelfItems?.filter(item => !item.projectCategory),
        shelfCategories: Object.values(PortfolioProjectCategory).map(categoryName => ({
            categoryName,
            shelfItems: portfolioConfig.shelfItems?.filter(item => item.projectCategory === categoryName) || [],
        })),
    };

    const mediumCategorisedPortfolioConfig: ShelfConfig = {
        rootRefName: portfolioConfig.rootRefName,
        shelfItems: portfolioConfig.shelfItems?.filter(item => !item.mediumCategory),
        shelfCategories: Object.values(PortfolioMediumCategory).map(categoryName => ({
            categoryName,
            shelfItems: portfolioConfig.shelfItems?.filter(item => item.mediumCategory === categoryName) || [],
        })),
    };

    const enum Categorisation {
        UNCATEGORISED = "uncategorised",
        PROJECT = "project",
        MEDIUM = "medium",
    }

    const { mainRef } = useLayout();
    const [categorisation, setCategorisation] = useState<Categorisation>();
    function updateUrlWithHashAndSearchParams(categorisation?: Categorisation) {
        const url = new URL(window.location.href);
        if (categorisation !== undefined) {
            url.searchParams.set("categorisation", categorisation);
        }
        if (url.hash && !document.getElementById(url.hash.substring(1))) {
            url.hash = "";
        }
        window.history.replaceState({}, "", url.toString());
        return url;
    }

    useEffect(() => {
        const url = updateUrlWithHashAndSearchParams();
        setCategorisation(url.searchParams.get("categorisation") as Categorisation);
    }, []);

    useEffect(() => {
        if (!categorisation) { return; }
        updateUrlWithHashAndSearchParams(categorisation);
        mainRef.current?.scrollTo({ top: 0 });
    }, [categorisation]);

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

            <Body innerClassName={styles.body}>
                <ContentCard className={styles.contentCard}>
                    {useMemo(() => (
                        <Shelf shelfConfig={(() => {
                            switch (categorisation) {
                                case Categorisation.PROJECT:
                                default:
                                    return projectCategorisedPortfolioConfig;
                                case Categorisation.MEDIUM:
                                    return mediumCategorisedPortfolioConfig;
                                case Categorisation.UNCATEGORISED:
                                    return portfolioConfig;
                            }
                        })()} />
                    ), [categorisation])}
                </ContentCard>
                <div className={styles.controlsContainer}>
                    <select
                        className={styles.categorisationDropdown}
                        value={categorisation}
                        onChange={(e) => {
                            const selectedValue = e.target.value as Categorisation;
                            setCategorisation(selectedValue);
                            console.log(`Selected categorisation: ${selectedValue}`);
                        }}
                    >
                        <option value={Categorisation.PROJECT}>
                            Categorise by Project
                        </option>
                        <option value={Categorisation.MEDIUM}>
                            Categorise by Medium
                        </option>
                        <hr className={styles.divider} />
                        <option value={Categorisation.UNCATEGORISED}>
                            Uncategorised
                        </option>
                    </select>
                </div>
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