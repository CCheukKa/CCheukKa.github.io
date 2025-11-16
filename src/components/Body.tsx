import styles from "@/components/Body.module.css";

type BodyProps = {
    width?: string;

    beforeChildren?: React.ReactNode;
    children?: React.ReactNode;

    columnBodyClassName?: string;
    rowBodyClassName?: string;
};

export default function Body({ width, beforeChildren, children, columnBodyClassName, rowBodyClassName }: BodyProps) {
    return (
        <div
            className={[styles.columnBody, columnBodyClassName].filter(Boolean).join(" ")}
            style={width ? { width } : undefined}
        >
            {beforeChildren}
            <div className={[styles.rowBody, rowBodyClassName].filter(Boolean).join(" ")}>
                {children}
            </div>
        </div>
    );
}