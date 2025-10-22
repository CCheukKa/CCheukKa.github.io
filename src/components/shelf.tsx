import styles from "@/styles/shelf.module.css";
import type { ShelfConfig, ShelfItem } from "@/configs/shelfConfig";
import { useState } from "react";

type ShelfProps = {
    shelfConfig: ShelfConfig;
};
export default function Shelf({ shelfConfig }: ShelfProps) {
    return (
        <div className={styles.shelf}>
            {shelfConfig.shelfItems.map((item: ShelfItem) => (
                <ShelfItem key={item.refPath} shelfItem={item} />
            ))}
        </div>
    );

    /* -------------------------------------------------------------------------- */

    type ShelfItemProps = {
        shelfItem: ShelfItem;
    };
    function ShelfItem({ shelfItem }: ShelfItemProps) {
        if (shelfItem.hideFromShelf) { return null; }

        const fullRefPath = shelfItem.isRemote
            ? shelfItem.refPath
            : `/${shelfConfig.rootRefName}/${shelfItem.refPath}`;
        const thumbnailPath = `${fullRefPath}/thumbnail.png`;

        let span1 = "";
        let span2 = "";
        let span2Colour: string | undefined = undefined;
        const [thumbnailExists, setThumbnailExists] = useState(true);

        (async () => {
            const thumbnailExists = await fetch(thumbnailPath, { method: 'HEAD' })
                .then(res => res.ok)
                .catch(() => false);

            setThumbnailExists(thumbnailExists);
        })();

        if (shelfItem.underConstruction) {
            span1 = "🚧";
            span2 = "Page under construction!";
            span2Colour = '#f35858';
        } else if (shelfItem.emoji) {
            span1 = shelfItem.emoji;
        } else if (!thumbnailExists) {
            span1 = pickRandom(['😐', '🙃', '🥴', '🤪', '😵', '🤔', '🤨', '💀']);
            span2 = "Thumbnail failed to load!";
            span2Colour = '#a6ed8d';
        }

        return (
            <div className={styles.shelfItemWrapper}>
                <a
                    href={fullRefPath}
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
}

function pickRandom<T>(list: Array<T>): T {
    return list[Math.floor(Math.random() * list.length)];
}