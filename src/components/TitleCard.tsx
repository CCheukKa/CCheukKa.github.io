import styles from "@/components/TitleCard.module.css";

type TitleCardProps = {
    style?: React.CSSProperties;
}
    & ({
        title: string;
        flavourText: string;
        description: string;
        children?: never;
    } | {
        title?: never;
        flavourText?: never;
        description?: never;
        children: React.ReactNode;
    });

export default function TitleCard({ style, title, flavourText, description, children }: TitleCardProps) {

    return (
        <div className={styles.titleCard} style={style}>
            {children ?? (<>
                <div className={styles.pageTitleContainer}>
                    <div className={styles.pageTitle}>{title}</div>
                    <div className={styles.flavourText}>{flavourText}</div>
                </div>
                <div className={styles.descriptionWrapper}>
                    <span
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: description ?? "" }}
                    />
                </div>
            </>)
            }
        </div>
    );
}