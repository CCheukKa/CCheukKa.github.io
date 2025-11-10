import styles from "@/components/Body.module.css";

type BodyProps = {
    width?: string;

    beforeChildren?: React.ReactNode;
    children?: React.ReactNode;

    outerClassName?: string;
    innerClassName?: string;
};

export default function Body({ width, beforeChildren, children, outerClassName, innerClassName }: BodyProps) {
    return (
        <div
            className={[styles.body, outerClassName].filter(Boolean).join(" ")}
            style={{ width: width ?? "90%" }}
        >
            {beforeChildren}
            <div className={[styles.bodyMain, innerClassName].filter(Boolean).join(" ")}>
                {children}
            </div>
        </div>
    );
}