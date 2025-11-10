import styles from "@/components/Shelf.module.css";
import type { ShelfConfig, ShelfItem } from "@/configs/shelfConfig";
import { useState, useEffect } from "react";

type ShelfProps = {
    shelfConfig: ShelfConfig;
};
export default function Shelf({ shelfConfig }: ShelfProps) {
    return (
        <div className={styles.shelf}>
            {
                shelfConfig.shelfCategories
                    ? shelfConfig.shelfCategories.map((category) => (
                        <ShelfCategory
                            key={category.categoryName}
                            rootRefName={shelfConfig.rootRefName}
                            categoryName={category.categoryName}
                            shelfItems={category.shelfItems}
                        />
                    ))
                    : null
            }
            {shelfConfig.shelfItems
                ? <ShelfCategory
                    categoryName={shelfConfig.shelfCategories ? "Uncategorised" : undefined}
                    rootRefName={shelfConfig.rootRefName}
                    shelfItems={shelfConfig.shelfItems ?? []}
                />
                : null
            }
        </div>
    );
}

type ShelfCategoryProps = {
    rootRefName: string;
    categoryName?: string;
    shelfItems: ShelfItem[];
};
function ShelfCategory({ rootRefName, categoryName, shelfItems }: ShelfCategoryProps) {
    const filteredShelfItems = shelfItems.filter(item => !item.hideFromShelf);
    if (filteredShelfItems.length === 0) { return null; }

    return (
        <div className={styles.shelfCategory}>
            {categoryName ? <ShelfCategoryHeader categoryName={categoryName} /> : null}
            {filteredShelfItems.map((item: ShelfItem) => (
                <ShelfItem key={item.refPath} rootRefName={rootRefName} shelfItem={item} />
            ))}
        </div>
    );
}

type ShelfCategoryHeaderProps = {
    categoryName: string;
};
function ShelfCategoryHeader({ categoryName }: ShelfCategoryHeaderProps) {
    const headerId =
        categoryName
            .replaceAll(/[^a-zA-Z0-9]/g, '-')
            .replaceAll(/-+/g, '-')
            .toLowerCase();

    return (
        <h3 className={styles.shelfCategoryHeader}>
            <div className={styles.categoryNameWrapper}>
                <a className={styles.categoryName} id={headerId} href={`#${headerId}`}>
                    {categoryName}
                </a>
            </div>
        </h3>
    );
}

type ShelfItemProps = {
    rootRefName: string;
    shelfItem: ShelfItem;
};
function ShelfItem({ rootRefName, shelfItem }: ShelfItemProps) {
    if (shelfItem.hideFromShelf) { return null; }

    const fullRefDir = (
        shelfItem.isRemote
            ? shelfItem.refPath
            : `/${rootRefName}/${shelfItem.refPath}`
    ).replaceAll(/(?<!:\/?)\/+/g, "/");
    const fullRefPage = [fullRefDir, shelfItem.refPage].filter(p => p !== undefined).join('/');
    const thumbnailPath = (shelfItem.thumbnailPathOverride ?? `${fullRefDir}/thumbnail.png`);

    let span1 = "";
    let span2 = "";
    let span2Colour: string | undefined = undefined;
    const [thumbnailExists, setThumbnailExists] = useState(true);

    useEffect(() => {
        fetch(thumbnailPath, { method: 'HEAD' })
            .then(res => setThumbnailExists(res.ok))
            .catch(() => setThumbnailExists(false));
    }, [thumbnailPath]);

    if (shelfItem.underConstruction) {
        span1 = "🚧";
        span2 = "Page under construction!";
        span2Colour = '#f35858';
    } else if (shelfItem.emoji) {
        span1 = shelfItem.emoji;
    } else if (!thumbnailExists) {
        span1 = pickRandom(['😐', '🙃', '🥴', '🤪', '😵', '🤔', '🤨', '💀']);
        span2 = "Thumbnail failed to load";
        span2Colour = '#a6ed8d50';
    }

    return (
        <div className={[styles.shelfItemWrapper, shelfItem.starred ? styles.starred : ''].join(' ')}>
            <a
                href={fullRefPage}
                target={shelfItem.openInNewTab ? "_blank" : undefined}
            >
                <fieldset
                    className={styles.shelfItem}
                    style={
                        thumbnailExists
                            ? ({ "--bg-image": `url(${thumbnailPath})` } as React.CSSProperties)
                            : {}
                    }
                >
                    <legend className={styles.legend}>
                        {shelfItem.displayName}
                    </legend>
                    <span className={styles.shelfSpan1}>
                        {span1}
                    </span>
                    <br />
                    <span className={styles.shelfSpan2} style={{ color: span2Colour }}>
                        {span2}
                    </span>
                </fieldset>
            </a>
        </div>
    );
}

function pickRandom<T>(list: Array<T>): T {
    return list[Math.floor(Math.random() * list.length)];
}