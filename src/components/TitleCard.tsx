import styles from "@/components/TitleCard.module.css";

type TitleCardProps = {
    style?: React.CSSProperties;
    className?: string;
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

export default function TitleCard({ style, className, title, flavourText, description, children }: TitleCardProps) {

    return (
        <div className={[styles.titleCard, className].filter(Boolean).join(" ")} style={style}>
            {children ?? (<>
                <div className={styles.pageTitleContainer}>
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