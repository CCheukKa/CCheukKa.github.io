import styles from "@/components/Header.module.css";
import { homeConfig, HomeShelfItem } from "@/configs/homeConfig";
import { useLayout } from "@/context/LayoutContext";
import { Fragment, useEffect, useState } from "react";

export default function Header() {
    const { currentPageRefName, absoluteRefPath } = useLayout();

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => { setHydrated(true); }, []);

    const displayCurrentPageRefName = hydrated ? currentPageRefName : "Loading...";
    const displayAbsoluteRefPath = hydrated ? absoluteRefPath : [];

    const thisPage = hydrated
        ? homeConfig.shelfItems?.find(item => item.refPath === displayCurrentPageRefName)
        : undefined;

    const appendedCatalogue = hydrated
        ? (thisPage
            ? homeConfig.shelfItems
            : [...homeConfig.shelfItems ?? [], { refPath: displayCurrentPageRefName, displayName: displayCurrentPageRefName } as HomeShelfItem])
        : [];

    console.log("Header render:", { hydrated, displayCurrentPageRefName, displayAbsoluteRefPath, thisPage, appendedCatalogue });

    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <a href="/">CCheukKa's Site</a>
                    <span>
                        {displayAbsoluteRefPath.map((path, index) => (
                            <span key={index}>
                                <span> / </span>
                                <a
                                    href={`/${displayAbsoluteRefPath.slice(0, index + 1).join('/')}`}
                                    style={
                                        index === displayAbsoluteRefPath.length - 1
                                            ? { fontWeight: "bold", textDecoration: "underline" }
                                            : {}
                                    }
                                >
                                    {path}
                                </a>
                            </span>
                        ))}
                    </span>
                </div>
                <nav className={styles.headerCatalogue}>
                    {
                        appendedCatalogue?.map((page, index) => {
                            if (page.hideFromNav && page.refPath !== displayCurrentPageRefName) { return null; }
                            return (
                                <Fragment key={index}>
                                    {getCatalogueItem(page, displayCurrentPageRefName)}
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