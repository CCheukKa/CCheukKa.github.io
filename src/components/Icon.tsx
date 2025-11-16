type IconProps = {
    className?: string;
    iconName: string;
}

export default function Icon({ className, iconName }: IconProps) {
    return (
        <span className={["material-symbols-rounded", className].filter(Boolean).join(' ')}>
            {iconName}
        </span>
    );
}