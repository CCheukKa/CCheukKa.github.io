import styles from "@/styles/header.module.css";
import { config, Page } from "@/types/config";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    const absolutePath = router.pathname.split('/').slice(1);
    const absoluteRefPath = (absolutePath.length === 1 && absolutePath[0] === "")
        ? ["home"]
        : router.pathname.split('/').slice(1);
    console.log({ absolutePath: absoluteRefPath });

    const thisPageRefName = absoluteRefPath[absoluteRefPath.length - 1];
    const thisPage = config.catalogue.find(page => page.refName === thisPageRefName);

    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <a href="/">CCheukKa's Site</a>
                    {absoluteRefPath.map((path, index) => (
                        <>
                            <span> / </span>
                            <a href={`/${absoluteRefPath.slice(0, index + 1).join('/')}`} style={{ fontWeight: "bold", textDecoration: "underline" }}>{path || 'home'}</a>
                        </>
                    ))}
                </div>
                {
                    ((
                        (thisPage || config.exceptions.find(exc => exc.refName === thisPageRefName))
                        && !thisPage?.underConstruction
                    ) || thisPageRefName === "404")
                        ? null
                        : <>
                            <span className={`${styles.headerCatalogueSelected} ${styles.constructionSign}`}>🚧</span>
                            <span className={`${styles.headerCatalogueSelected} ${styles.constructionText}`}>Page under construction!</span>
                        </>
                }
                <nav className={styles.headerCatalogue}>
                    {
                        (thisPage
                            ? config.catalogue
                            : [...config.catalogue, { refName: thisPageRefName, displayName: thisPageRefName } as Page]
                        ).map((page, index) => {
                            if (page.hideFromNav) { return null; }
                            return (<>
                                {getCatalogueItem(page)}
                                {
                                    index < config.catalogue.length - 1
                                        ? <span className={styles.headerCatalogueSeparator}> | </span>
                                        : null
                                }
                            </>);
                        })
                    }
                </nav>
            </header>
        </div>
    );

    /* -------------------------------------------------------------------------- */

    function getCatalogueItem(page: Page) {
        return (<a
            href={`/${page.refName}`}
            className={
                page.refName === thisPageRefName
                    ? styles.headerCatalogueSelected
                    : styles.headerCatalogueUnselected
            }
        >
            {page.displayName}
        </a>);
    }
}