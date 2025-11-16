import styles from "@/components/Header.module.css";
import { homeConfig, HomeShelfItem } from "@/configs/homeConfig";
import { useLayout } from "@/context/LayoutContext";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

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
                    <div className={styles.headerPagePath}>
                        {displayAbsoluteRefPath.map((path, index) => (
                            <span key={index}>
                                <span className={styles.slash}>/</span>
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
                    </div>
                </div>
                <CatalogueNav displayCurrentPageRefName={displayCurrentPageRefName} />
                <HamburgerMenu displayCurrentPageRefName={displayCurrentPageRefName} />
            </header>
        </div>
    );
}

type HamburgerMenuProps = {
    displayCurrentPageRefName: string;
}

function HamburgerMenu({ displayCurrentPageRefName }: HamburgerMenuProps) {
    const [dropped, setDropped] = useState(false);

    const hamburgerMenuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        document.addEventListener("mousedown", e => {
            if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(e.target as Node)) {
                setDropped(false);
            }
        });
    }, []);

    return (
        <nav
            className={styles.headerHamburgerMenu}
            ref={hamburgerMenuRef}
        >
            <button
                className={styles.hamburgerButton}
                onClick={() => setDropped(!dropped)}
                aria-label="Toggle navigation menu"
            >
                <Icon iconName="menu" className={styles.hamburgerMenuIcon} />
            </button>
            <div
                className={[
                    styles.hamburgerMenuDropdown,
                    dropped ? null : styles.hamburgerMenuDropdownHidden
                ].filter(Boolean).join(' ')}
            >
                <div className={styles.hamburgerMenuDropdownContent}>
                    {homeConfig.shelfItems?.map((page, index) => {
                        if (page.hideFromNav && page.refPath !== displayCurrentPageRefName) { return null; }
                        return (
                            <Fragment key={index}>
                                <CatalogueItem shelfItem={page} currentPage={displayCurrentPageRefName} />
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

type CatalogueNavProps = {
    displayCurrentPageRefName: string;
}

function CatalogueNav({ displayCurrentPageRefName }: CatalogueNavProps) {
    return (
        <nav className={styles.headerCatalogue}>
            {homeConfig.shelfItems?.map((page, index, array) => {
                if (page.hideFromNav && page.refPath !== displayCurrentPageRefName) { return null; }
                return (
                    <Fragment key={index}>
                        <CatalogueItem shelfItem={page} currentPage={displayCurrentPageRefName} />
                        {index < array.length - 1
                            ? <span className={styles.headerCatalogueSeparator}> | </span>
                            : null}
                    </Fragment>
                );
            })}
        </nav>
    );
}

type CatalogueItemProps = {
    shelfItem: HomeShelfItem;
    currentPage: string;
}

function CatalogueItem({ shelfItem, currentPage }: CatalogueItemProps) {
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
