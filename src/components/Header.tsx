import styles from "@/components/Header.module.css";
import { homeConfig, HomeShelfItem } from "@/configs/homeConfig";
import { useLayout } from "@/context/LayoutContext";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default function Header() {
    const { currentPageRefName, absoluteRefPath } = useLayout();

    const router = useRouter();
    const isNotFoundPage = router.route === "/404";

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => { setHydrated(true); }, []);
    const displayCurrentPageRefName =
        isNotFoundPage
            ? (hydrated ? currentPageRefName : "Loading...")
            : currentPageRefName;
    const displayAbsoluteRefPath =
        isNotFoundPage
            ? (hydrated ? absoluteRefPath : [])
            : absoluteRefPath;

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
                        homeConfig.shelfItems?.map((page, index, array) => {
                            if (page.hideFromNav && page.refPath !== displayCurrentPageRefName) { return null; }
                            return (
                                <Fragment key={index}>
                                    {getCatalogueItem(page, displayCurrentPageRefName)}
                                    {
                                        index < array.length - 1
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