import styles from "@/components/Header.module.css";
import { homeConfig, HomeShelfItem } from "@/configs/homeConfig";
import { useRouter } from "next/router";
import { useLayout } from "@/context/LayoutContext";
import { Fragment } from "react";

export default function Header() {
    const router = useRouter();
    const { currentPageRefName, absoluteRefPath } = useLayout();

    const thisPage = homeConfig.shelfItems?.find(item => item.refPath === currentPageRefName);

    const appendedCatalogue =
        thisPage
            ? homeConfig.shelfItems
            : [...homeConfig.shelfItems ?? [], { refPath: currentPageRefName, displayName: currentPageRefName } as HomeShelfItem];

    const isNotFoundPage = router.pathname === '/404';
    const isDynamicPage = router.pathname.includes('[slug]');

    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <a href="/">CCheukKa's Site</a>
                    {absoluteRefPath.map((path, index) => (
                        <span key={index}>
                            <span> / </span>
                            <a
                                href={`/${absoluteRefPath.slice(0, index + 1).join('/')}`}
                                style={
                                    index === absoluteRefPath.length - 1
                                        ? { fontWeight: "bold", textDecoration: "underline" }
                                        : {}
                                }
                            >
                                {path}
                            </a>
                        </span>
                    ))}
                </div>
                {
                    (thisPage && !thisPage?.underConstruction)
                        || homeConfig.constructionExceptionRefPaths.includes(currentPageRefName)
                        || isDynamicPage
                        || isNotFoundPage
                        ? null
                        : <>
                            <span className={`${styles.headerCatalogueSelected} ${styles.constructionSign}`}>🚧</span>
                            <span className={`${styles.headerCatalogueSelected} ${styles.constructionText}`}>Page under construction!</span>
                        </>
                }
                <nav className={styles.headerCatalogue}>
                    {
                        appendedCatalogue?.map((page, index) => {
                            if (page.hideFromNav) { return null; }
                            return (
                                <Fragment key={index}>
                                    {getCatalogueItem(page, currentPageRefName)}
                                    {
                                        index < appendedCatalogue.length - 1
                                            ? <span className={styles.headerCatalogueSeparator}> | </span>
                                            : null
                                    }
                                </Fragment>
                            );
                        })
                    }
                </nav>
            </header>
        </div>
    );

    /* -------------------------------------------------------------------------- */

    function getCatalogueItem(shelfItem: HomeShelfItem, currentPage: string) {
        return (<a
            href={`/${shelfItem.refPath}`}
            className={
                shelfItem.refPath === currentPage
                    ? styles.headerCatalogueSelected
                    : styles.headerCatalogueUnselected
            }
        >
            {shelfItem.displayName}
        </a>);
    }
}