import styles from "@/components/ContentCard.module.css";

type ContentCardProps = {
    width?: string;
    flexDirection?: React.CSSProperties['flexDirection'];

    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;

    [key: string]: any;
};

export default function ContentCard({ width, flexDirection, className, style, children, ...rest }: ContentCardProps) {
    return (
        <div
            className={[styles.contentCard, className].filter(Boolean).join(' ')}
            style={{
                width,
                flexDirection,
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
}