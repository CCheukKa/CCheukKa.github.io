import styles from "@/styles/titleCard.module.css";

type TitleCardProps = {
    title: string;
    flavourText: string;
    description: string;
};

export default function TitleCard({ title, flavourText, description }: TitleCardProps) {
    return (
        <div className={styles.titleCard}>
            <div className={styles.pageTitleContainer}>
                <div className={styles.pageTitle}>{title}</div>
                <div className={styles.flavourText}>{flavourText}</div>
            </div>
            <div className={styles.descriptionWrapper}>
                <span
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
        </div>
    );
}