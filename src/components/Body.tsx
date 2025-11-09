import styles from "@/components/Body.module.css";

type BodyProps = {
    width?: string;

    beforeChildren?: React.ReactNode;
    children?: React.ReactNode;

    className?: string;
};

export default function Body({ width, beforeChildren, children, className }: BodyProps) {
    return (
        <div
            className={[styles.body, className].filter(Boolean).join(" ")}
            style={{ width: width ?? "90%" }}
        >
            {beforeChildren}
            <div className={styles.bodyMain}>
                {children}
            </div>
        </div>
    );
}