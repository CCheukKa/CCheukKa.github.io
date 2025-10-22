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
                <span className={styles.pageTitle}>{title}</span>
                <br />
                <span className={styles.flavourText}>{flavourText}</span>
            </div>
            <div className={styles.descriptionWrapper}>
                <span className={styles.description}>
                    {description}
                </span>
            </div>
        </div>
    );
}