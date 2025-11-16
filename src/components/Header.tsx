import styles from "@/components/Header.module.css";
import { homeConfig, HomeShelfItem } from "@/configs/homeConfig";
import { useLayout } from "@/context/LayoutContext";
import { Fragment } from "react";

export default function Header() {
    const { currentPageRefName, absoluteRefPath } = useLayout();

    const thisPage = homeConfig.shelfItems?.find(item => item.refPath === currentPageRefName);

    const appendedCatalogue =
        thisPage
            ? homeConfig.shelfItems
            : [...homeConfig.shelfItems ?? [], { refPath: currentPageRefName, displayName: currentPageRefName } as HomeShelfItem];

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
                <nav className={styles.headerCatalogue}>
                    {
                        appendedCatalogue?.map((page, index) => {
                            if (page.hideFromNav && page.refPath !== currentPageRefName) { return null; }
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