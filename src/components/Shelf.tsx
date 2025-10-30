import styles from "@/styles/shelf.module.css";
import type { ShelfConfig, ShelfItem } from "@/configs/shelfConfig";
import { useState, useEffect } from "react";

type ShelfProps = {
    shelfConfig: ShelfConfig;
    children?: never;
} | {
    shelfConfig?: never;
    children: React.ReactNode;
};
export default function Shelf({ shelfConfig, children }: ShelfProps) {
    return (
        <div className={styles.shelf}>
            {shelfConfig?.shelfItems.map((item: ShelfItem) => (
                <ShelfItem key={item.refPath} rootRefName={shelfConfig.rootRefName} shelfItem={item} />
            ))}
            {children}
        </div>
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
    ).replaceAll(/\/+/g, "/");
    const fullRefPage = `${fullRefDir}/${shelfItem.refPage ?? ""}`;
    const thumbnailPath = shelfItem.thumbnailPathOverride ?? `${fullRefDir}/thumbnail.png`;

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
        <div className={styles.shelfItemWrapper}>
            <a
                href={fullRefPage}
                target={shelfItem.openInNewTab ? "_blank" : undefined}
            >
                <fieldset
                    className={styles.shelfItem}
                    style={
                        thumbnailExists
                            ? { backgroundImage: `url(${thumbnailPath})` }
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