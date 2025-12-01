import styles from "@/components/TitleCard.module.css";

type TitleCardProps = {
    style?: React.CSSProperties;
    titleCardClassName?: string;
    pageTitleContainerClassName?: string;
    pageTitleClassName?: string;
    flavourTextClassName?: string;
}
    & ({
        title: string;
        flavourText?: string;
        description?: string;
        children?: never;
    } | {
        title?: never;
        flavourText?: never;
        description?: never;
        children: React.ReactNode;
    });

export default function TitleCard({
    style,
    titleCardClassName,
    pageTitleContainerClassName,
    pageTitleClassName,
    flavourTextClassName,
    title,
    flavourText,
    description,
    children
}: TitleCardProps) {

    return (
        <div className={[styles.titleCard, titleCardClassName].filter(Boolean).join(" ")} style={style}>
            {children ?? (<>
                <div className={[styles.pageTitleContainer, pageTitleContainerClassName].filter(Boolean).join(" ")}>
                    <div className={[styles.pageTitle, pageTitleClassName].filter(Boolean).join(" ")}>
                        {title}
                    </div>
                    {flavourText
                        ? <div className={[styles.flavourText, flavourTextClassName].filter(Boolean).join(" ")}>
                            {flavourText}
                        </div>
                        : null
                    }
                </div>
                {description
                    ? <div className={styles.descriptionWrapper}>
                        <span
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: description ?? "" }}
                        />
                    </div>
                    : null
                }
            </>)
            }
        </div>
    );
}