import styles from "@/styles/header.module.css";
import { homeConfig, HomeShelfItem } from "@/configs/homeConfig";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    const absolutePath = router.pathname.split('/').slice(1);
    const absoluteRefPath = (absolutePath.length === 1 && absolutePath[0] === "")
        ? ["home"]
        : router.pathname.split('/').slice(1);

    const thisPageRefName = absoluteRefPath[absoluteRefPath.length - 1];
    const thisPage = homeConfig.shelfItems.find(item => item.refPath === thisPageRefName);

    const appendedCatalogue = (thisPage
        ? homeConfig.shelfItems
        : [...homeConfig.shelfItems, { refPath: thisPageRefName, displayName: thisPageRefName } as HomeShelfItem]
    );

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
                                style={{ fontWeight: "bold", textDecoration: "underline" }}
                            >
                                {path || 'home'}
                            </a>
                        </span>
                    ))}
                </div>
                {
                    ((thisPage && !thisPage?.underConstruction) || thisPageRefName === "404")
                        ? null
                        : <>
                            <span className={`${styles.headerCatalogueSelected} ${styles.constructionSign}`}>🚧</span>
                            <span className={`${styles.headerCatalogueSelected} ${styles.constructionText}`}>Page under construction!</span>
                        </>
                }
                <nav className={styles.headerCatalogue}>
                    {
                        appendedCatalogue.map((page, index) => {
                            if (page.hideFromNav) { return null; }
                            return (<span key={page.refPath}>
                                {getCatalogueItem(page)}
                                {
                                    index < appendedCatalogue.length - 1
                                        ? <span className={styles.headerCatalogueSeparator}> | </span>
                                        : null
                                }
                            </span>);
                        })
                    }
                </nav>
            </header>
        </div>
    );

    /* -------------------------------------------------------------------------- */

    function getCatalogueItem(shelfItem: HomeShelfItem) {
        return (<a
            href={`/${shelfItem.refPath}`}
            className={
                shelfItem.refPath === thisPageRefName
                    ? styles.headerCatalogueSelected
                    : styles.headerCatalogueUnselected
            }
        >
            {shelfItem.displayName}
        </a>);
    }
}