import styles from "@/components/TitleCard.module.css";

type TitleCardProps = {
    style?: React.CSSProperties;
    titleCardClassName?: string;
    pageTitleContainerClassName?: string;
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

export default function TitleCard({ style, titleCardClassName, pageTitleContainerClassName, title, flavourText, description, children }: TitleCardProps) {

    return (
        <div className={[styles.titleCard, titleCardClassName].filter(Boolean).join(" ")} style={style}>
            {children ?? (<>
                <div className={[styles.pageTitleContainer, pageTitleContainerClassName].filter(Boolean).join(" ")}>
                    <div className={styles.pageTitle}>{title}</div>
                    {flavourText
                        ? <div className={styles.flavourText}>{flavourText}</div>
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